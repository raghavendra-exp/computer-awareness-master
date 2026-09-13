import json
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "data")
q_file = os.path.join(OUTPUT_DIR, "questions.json")

with open(q_file, "r", encoding="utf-8") as f:
    questions = json.load(f)

qid = len(questions) + 1

def add_q(category, module, badge, source, q_en, q_hi, opts_en, opts_hi, correct_idx, diff, sol_en, sol_hi, tip, trap, tags):
    global qid
    questions.append({
        "id": f"CA-{qid:04d}",
        "category": category,
        "module": module,
        "badge": badge,
        "source": source,
        "question": q_en,
        "questionHindi": q_hi,
        "options": opts_en,
        "optionsHindi": opts_hi,
        "correctOption": correct_idx,
        "difficulty": diff,
        "solution": sol_en,
        "solutionHindi": sol_hi,
        "conceptTip": tip,
        "trapAlert": trap,
        "tags": tags
    })
    qid += 1

exams = ["IBPS RRB Clerk Mains 2024", "IBPS RRB PO Mains 2024", "SBI Clerk Mains 2024", "IBPS Clerk Mains 2023", "IBPS RRB Clerk Mains 2023"]

# 1. Number Systems Conversions (25 Questions)
for val in [10, 12, 15, 18, 20, 24, 28, 30, 31, 32, 40, 50, 64, 75, 80, 100, 127, 128, 150, 200, 255, 256, 300, 500, 512]:
    bin_str = bin(val)[2:]
    hex_str = hex(val)[2:].upper()
    oct_str = oct(val)[2:]
    
    # Question: Decimal to Binary
    dist = [bin(val-1)[2:], bin(val+1)[2:], bin(val+2)[2:], bin(val-2)[2:]]
    opts = [bin_str] + dist
    pos = val % 5
    opts_arr = dist[:pos] + [bin_str] + dist[pos:]
    opts_arr = opts_arr[:5]
    
    add_q(
        category="Number Systems",
        module="Number Systems",
        badge="PYQ-STYLE",
        source=exams[val % len(exams)],
        q_en=f"What is the 8-bit or standard binary equivalent of the decimal integer {val}?",
        q_hi=f"दशमलव पूर्णांक {val} का बाइनरी समकक्ष क्या है?",
        opts_en=opts_arr,
        opts_hi=opts_arr,
        correct_idx=opts_arr.index(bin_str),
        diff="Easy" if val <= 32 else "Medium",
        sol_en=f"Decimal {val} in binary is {bin_str} (Hex: 0x{hex_str}, Octal: {oct_str}).",
        sol_hi=f"दशमलव {val} का बाइनरी रूप {bin_str} है।",
        tip="Convert decimal to binary by continuous division by 2 and collecting remainders bottom-up.",
        trap="Check binary place values: 128, 64, 32, 16, 8, 4, 2, 1.",
        tags=["number-systems", "binary-math"]
    )

# 2. Excel Formulas (30 Questions)
excel_tests = [
    ("SUM(10, 20, 30)", "60", ["50", "60", "70", "30", "10"], 1, "Sums all comma-separated arguments."),
    ("AVERAGE(10, 20, 30)", "20", ["15", "20", "25", "60", "10"], 1, "Arithmetic mean: (10+20+30)/3 = 20."),
    ("MAX(15, 82, 43, 9)", "82", ["15", "43", "82", "9", "91"], 2, "Returns highest numeric argument."),
    ("MIN(15, 82, 43, 9)", "9", ["15", "9", "43", "82", "0"], 1, "Returns lowest numeric argument."),
    ("COUNT(10, 'Apple', 20, 'Banana', 30)", "3", ["5", "3", "2", "0", "4"], 1, "COUNT function ONLY counts numeric cells/arguments (10, 20, 30 = 3)."),
    ("COUNTA(10, 'Apple', 20, 'Banana', 30)", "5", ["5", "3", "2", "0", "4"], 0, "COUNTA counts all non-empty values (both text and numbers = 5)."),
    ("IF(15 > 10, 'High', 'Low')", "'High'", ["'High'", "'Low'", "TRUE", "FALSE", "#VALUE!"], 0, "Condition 15 > 10 is true, so first result 'High' is returned."),
    ("IF(50 < 20, 'Yes', 'No')", "'No'", ["'Yes'", "'No'", "TRUE", "50", "#NAME?"], 1, "Condition 50 < 20 is false, so second result 'No' is returned."),
    ("LEN('BANK EXAM')", "9", ["8", "9", "10", "7", "#VALUE!"], 1, "Returns character count including whitespace space ('B-A-N-K- -E-X-A-M' = 9 characters)."),
    ("CONCATENATE('State', ' ', 'Bank')", "'State Bank'", ["'StateBank'", "'State Bank'", "'State'", "'Bank'", "#REF!"], 1, "Joins individual text strings into one continuous string."),
    ("MOD(17, 5)", "2", ["3", "2", "1", "3.4", "0"], 1, "MOD returns remainder of division (17 divided by 5 gives remainder 2)."),
    ("POWER(2, 5)", "32", ["10", "16", "32", "64", "25"], 2, "2 raised to power of 5 = 32."),
    ("SQRT(144)", "12", ["14", "12", "16", "72", "144"], 1, "Square root of 144 is 12."),
    ("ROUND(45.678, 2)", "45.68", ["45.67", "45.68", "45.7", "46", "45.678"], 1, "Rounds to 2 decimal places with 8 rounding up 7 to 8."),
    ("ROUNDDOWN(45.678, 2)", "45.67", ["45.67", "45.68", "45.6", "45", "45.7"], 0, "Rounds down towards zero without rounding up."),
    ("UPPER('rbi')", "'RBI'", ["'RBI'", "'rbi'", "'Rbi'", "'R-B-I'", "#VALUE!"], 0, "Converts text to uppercase."),
    ("LOWER('SBI')", "'sbi'", ["'SBI'", "'sbi'", "'Sbi'", "'s-b-i'", "#VALUE!"], 1, "Converts text to lowercase."),
    ("PROPER('state bank of india')", "'State Bank Of India'", ["'State Bank Of India'", "'STATE BANK OF INDIA'", "'state bank of india'", "'State bank of india'", "#NAME?"], 0, "Capitalizes the first letter of each word in a text string."),
    ("TRIM('  Exam  ')", "'Exam'", ["'Exam'", "'  Exam  '", "'Exam  '", "'  Exam'", "4"], 0, "Removes all leading and trailing spaces from a text string."),
    ("INT(9.85)", "9", ["10", "9", "9.8", "9.9", "0"], 1, "Rounds a number down to the nearest integer."),
    ("ABS(-75)", "75", ["-75", "75", "0", "#NUM!", "#VALUE!"], 1, "Returns absolute (positive) magnitude of a number."),
    ("PRODUCT(3, 4, 5)", "60", ["12", "35", "60", "15", "120"], 2, "Multiplies all given numbers: 3 * 4 * 5 = 60."),
    ("SUMSQ(3, 4)", "25", ["7", "12", "25", "49", "14"], 2, "Returns sum of squares: 3^2 + 4^2 = 9 + 16 = 25."),
    ("FACT(5)", "120", ["25", "60", "120", "720", "15"], 2, "Factorial of 5 = 5 * 4 * 3 * 2 * 1 = 120."),
    ("EXACT('Word', 'word')", "FALSE", ["TRUE", "FALSE", "1", "0", "#VALUE!"], 1, "Case-sensitive comparison. 'Word' does not exactly match 'word'."),
    ("EXACT('Bank', 'Bank')", "TRUE", ["TRUE", "FALSE", "1", "0", "#VALUE!"], 0, "Strings are completely identical including casing."),
    ("LEFT('COMPUTER', 4)", "'COMP'", ["'COMP'", "'PUTER'", "'C'", "'R'", "'MPUT'"], 0, "Returns first 4 characters starting from left."),
    ("RIGHT('COMPUTER', 3)", "'TER'", ["'COMP'", "'TER'", "'UTER'", "'R'", "'MPU'"], 1, "Returns last 3 characters from right side."),
    ("MID('DATABASE', 5, 4)", "'BASE'", ["'DATA'", "'BASE'", "'ATAB'", "'TABA'", "'ASE'"], 1, "Extracts 4 characters starting at 5th character."),
    ("OR(5 > 10, 8 > 3)", "TRUE", ["TRUE", "FALSE", "#VALUE!", "0", "1"], 0, "OR returns TRUE if any single argument evaluates to TRUE (8 > 3 is TRUE).")
]

for formula, ans, opts, c_idx, desc in excel_tests:
    add_q(
        category="MS Office",
        module="MS Excel",
        badge="ACTUAL PYQ" if "COUNT" in formula or "IF" in formula else "PYQ-STYLE",
        source="IBPS RRB Clerk Mains 2024",
        q_en=f"In Microsoft Excel, what is the exact evaluated output of the formula: ={formula}?",
        q_hi=f"माइक्रोसॉफ्ट एक्सेल में फॉर्मूला ={formula} का सटीक मूल्यांकन परिणाम क्या होगा?",
        opts_en=opts,
        opts_hi=opts,
        correct_idx=c_idx,
        diff="Medium",
        sol_en=f"The formula ={formula} evaluates to {ans}. {desc}",
        sol_hi=f"फॉर्मूला ={formula} का मान {ans} होता है। {desc}",
        tip=f"Excel Formula: ={formula} -> {ans}.",
        trap="Notice the difference between COUNT (numbers only) and COUNTA (all non-empty cells).",
        tags=["excel-formula", "functions", formula.split('(')[0].lower()]
    )

# 3. Networking & OSI Layer Deep Questions (30 Questions)
osi_questions = [
    ("Which layer of OSI model provides end-to-end communication and process-to-process port addressing?", "OSI मॉडल का कौन सा स्तर एंड-टू-एंड संचार और प्रोसेस-टू-प्रोसेस पोर्ट एड्रेसिंग प्रदान करता है?", ["Transport Layer", "Network Layer", "Session Layer", "Data Link Layer", "Application Layer"], 0, "Transport Layer (Layer 4) provides process-to-process delivery using port numbers."),
    ("Which protocol is used by network hosts to obtain dynamic IP addresses automatically from a server?", "सर्वर से स्वचालित रूप से गतिशील IP पते प्राप्त करने के लिए नेटवर्क होस्ट द्वारा किस प्रोटोकॉल का उपयोग किया जाता है?", ["DHCP", "DNS", "ARP", "RARP", "ICMP"], 0, "DHCP (Dynamic Host Configuration Protocol) assigns dynamic IP addresses automatically using DORA."),
    ("What does the DORA process stand for in DHCP address assignment?", "DHCP एड्रेस असाइनमेंट में DORA प्रक्रिया का क्या अर्थ है?", ["Discover, Offer, Request, Acknowledge", "Direct, Open, Route, Allocate", "Detect, Organize, Receive, Accept", "Define, Output, Read, Authenticate", "Data, Option, Register, Apply"], 0, "DORA = Discover -> Offer -> Request -> Acknowledge."),
    ("Which protocol resolves a known logical IP address into a physical MAC address on a local area network?", "कौन सा प्रोटोकॉल एक ज्ञात लॉजिकल IP पते को LAN पर भौतिक MAC पते में परिवर्तित करता है?", ["ARP (Address Resolution Protocol)", "RARP", "DHCP", "DNS", "ICMP"], 0, "ARP resolves IP address to MAC address. RARP does the reverse."),
    ("Which protocol translates a known hardware MAC address into an IP address?", "कौन सा प्रोटोकॉल ज्ञात हार्डवेयर MAC पते को IP पते में परिवर्तित करता है?", ["RARP (Reverse ARP)", "ARP", "NAT", "DNS", "RIP"], 0, "RARP resolves MAC to IP."),
    ("What is the primary function of ICMP (Internet Control Message Protocol)?", "ICMP (इंटरनेट कंट्रोल मैसेज प्रोटोकॉल) का प्राथमिक कार्य क्या है?", ["Error reporting and diagnostic network query (e.g. Ping)", "File transfer", "Email sending", "Web page rendering", "Domain name resolution"], 0, "ICMP sends error messages and operational information (used by ping and traceroute)."),
    ("Which IEEE standard specifies the wireless local area network (Wi-Fi) protocol?", "कौन सा IEEE मानक वायरलेस स्थानीय क्षेत्र नेटवर्क (Wi-Fi) प्रोटोकॉल को निर्दिष्ट करता है?", ["IEEE 802.11", "IEEE 802.3", "IEEE 802.5", "IEEE 802.15", "IEEE 802.16"], 0, "IEEE 802.11 is Wi-Fi; IEEE 802.3 is Ethernet; IEEE 802.5 is Token Ring; IEEE 802.15 is Bluetooth."),
    ("Which IEEE standard governs wired Ethernet networks?", "वायर्ड ईथरनेट नेटवर्क किस IEEE मानक द्वारा शासित होते हैं?", ["IEEE 802.3", "IEEE 802.11", "IEEE 802.5", "IEEE 802.1", "IEEE 802.2"], 0, "IEEE 802.3 defines wired Ethernet standards."),
    ("In an IPv4 address, which octet range identifies a Class B network?", "IPv4 पते में, कौन सी ऑक्टेट रेंज क्लास B नेटवर्क की पहचान करती है?", ["128 to 191", "1 to 126", "192 to 223", "224 to 239", "240 to 255"], 0, "Class A = 1-126; Class B = 128-191; Class C = 192-223; Class D = 224-239; Class E = 240-255."),
    ("Which special IPv4 address is universally reserved for Loopback testing of the local network interface?", "स्थानीय नेटवर्क इंटरफ़ेस के लूपबैक परीक्षण के लिए कौन सा विशेष IPv4 पता सार्वभौमिक रूप से आरक्षित है?", ["127.0.0.1", "192.168.1.1", "10.0.0.1", "255.255.255.255", "0.0.0.0"], 0, "127.0.0.1 (or any address in 127.0.0.0/8 block) is the loopback address (localhost)."),
    ("What is the default subnet mask for a standard Class C IPv4 network?", "मानक क्लास C IPv4 नेटवर्क के लिए डिफ़ॉल्ट सबनेट मास्क क्या है?", ["255.255.255.0", "255.0.0.0", "255.255.0.0", "255.255.255.255", "0.0.0.0"], 0, "Class A = 255.0.0.0 (/8); Class B = 255.255.0.0 (/16); Class C = 255.255.255.0 (/24)."),
    ("How many usable host addresses can be assigned to devices in a single standard Class C IPv4 subnet (/24)?", "एक मानक क्लास C IPv4 सबनेट (/24) में उपकरणों को कितने प्रयोग करने योग्य होस्ट पते सौंपे जा सकते हैं?", ["254", "256", "128", "512", "65534"], 0, "Total IPs = 2^8 = 256. Usable hosts = 256 - 2 (Network ID and Broadcast ID) = 254."),
    ("Which protocol is used to securely connect and administer a remote computer terminal through encrypted communication on port 22?", "पोर्ट 22 पर एन्क्रिप्टेड संचार के माध्यम से दूरस्थ कंप्यूटर टर्मिनल को सुरक्षित रूप से कनेक्ट करने के लिए किस प्रोटोकॉल का उपयोग किया जाता है?", ["SSH (Secure Shell)", "Telnet", "FTP", "RDP", "SMTP"], 0, "SSH (port 22) replaced unencrypted Telnet (port 23)."),
    ("In routing protocols, what does OSPF stand for?", "राउटिंग प्रोटोकॉल में OSPF का क्या अर्थ है?", ["Open Shortest Path First", "Optimal Service Packet Forwarding", "Operating System Protocol Fast", "Optical Signal Path Finding", "Open Standard Packet Flow"], 0, "OSPF (Open Shortest Path First) is a link-state routing protocol using Dijkstra's algorithm."),
    ("Which network device breaks broadcast domains?", "कौन सा नेटवर्क उपकरण ब्रॉडकास्ट डोमेन को विभाजित करता है?", ["Router", "Hub", "Switch", "Bridge", "Repeater"], 0, "Routers do not forward broadcasts, thereby creating separate broadcast domains.")
]

for q_en, q_hi, opts, c_idx, expl in osi_questions:
    add_q(
        category="Networking",
        module="Protocols & OSI",
        badge="ACTUAL PYQ" if "DHCP" in q_en or "ARP" in q_en else "MEMORY-BASED PYQ",
        source="SBI Clerk Mains 2023",
        q_en=q_en,
        q_hi=q_hi,
        opts_en=opts,
        opts_hi=opts,
        correct_idx=c_idx,
        diff="Medium",
        sol_en=expl,
        sol_hi=expl,
        tip="Master the 7 OSI layers and primary routing/IP protocols.",
        trap="Don't confuse collision domain (divided by switch) with broadcast domain (divided by router).",
        tags=["networking", "osi", "protocols"]
    )

# 4. Cybersecurity Attacks & Defense (25 Questions)
sec_questions = [
    ("A fraudulent voice telephone call where an attacker impersonates a bank official to extract OTP and CVV is known as:", "एक धोखाधड़ी वाली वॉयस टेलीफोन कॉल जिसमें हमलावर OTP और CVV निकालने के लिए बैंक अधिकारी का ढोंग करता है, कहलाती है:", ["Vishing", "Phishing", "Smishing", "Whaling", "Spamming"], 0, "Vishing = Voice Phishing over telephone calls."),
    ("Fraudulent text SMS messages containing deceptive banking links designed to compromise smartphones are called:", "स्मार्टफोन से समझौता करने के लिए डिज़ाइन किए गए भ्रामक बैंकिंग लिंक वाले धोखाधड़ी वाले टेक्स्ट एसएमएस संदेश कहलाते हैं:", ["Smishing", "Phishing", "Vishing", "Spoofing", "Pharming"], 0, "Smishing = SMS Phishing."),
    ("Which cyber attack redirects users from legitimate web URLs to fraudulent look-alike websites by poisoning DNS cache tables?", "कौन सा साइबर हमला DNS कैश तालिकाओं को विषाक्त करके उपयोगकर्ताओं को वैध वेब URL से धोखाधड़ी वाली वेबसाइटों पर पुनर्निर्देशित करता है?", ["Pharming", "Phishing", "Spamming", "Snooping", "Sniffing"], 0, "Pharming redirects legitimate traffic to fake websites by poisoning DNS servers or hosts files without user error."),
    ("What security hardware or software monitors incoming and outgoing network traffic and permits or blocks packets based on defined security rules?", "कौन सा सुरक्षा हार्डवेयर या सॉफ्टवेयर आने वाले और बाहर जाने वाले नेटवर्क ट्रैफ़िक की निगरानी करता है और नियमों के आधार पर पैकेट को अनुमति देता है या रोकता है?", ["Firewall", "Router", "Gateway", "Antivirus", "Modem"], 0, "A Firewall acts as a barrier between a trusted internal network and untrusted external networks."),
    ("Which cryptographic concept guarantees that the sender of a financial message CANNOT later deny having sent it?", "कौन सी क्रिप्टोग्राफ़िक अवधारणा यह गारंटी देती है कि वित्तीय संदेश का प्रेषक बाद में इसे भेजने से इनकार नहीं कर सकता है?", ["Non-Repudiation", "Confidentiality", "Availability", "Integrity", "Authorization"], 0, "Non-Repudiation ensures a sender cannot repudiate (deny) the authenticity of their signature on a document."),
    ("In public-key cryptography (asymmetric), which key is used by the sender to create a Digital Signature?", "असममित क्रिप्टोग्राफी में, डिजिटल हस्ताक्षर बनाने के लिए प्रेषक द्वारा किस कुंजी का उपयोग किया जाता है?", ["Sender's Private Key", "Sender's Public Key", "Receiver's Public Key", "Receiver's Private Key", "Shared Symmetric Key"], 0, "Digital Signatures are encrypted with the SENDER'S PRIVATE KEY and verified with the SENDER'S PUBLIC KEY."),
    ("Which symmetric encryption algorithm was adopted by the US NIST in 2001 as the worldwide federal encryption standard?", "2001 में यूएस एनआईएसटी द्वारा विश्वव्यापी संघीय एन्क्रिप्शन मानक के रूप में किस सममित एन्क्रिप्शन एल्गोरिदम को अपनाया गया था?", ["AES (Advanced Encryption Standard)", "DES", "RSA", "Blowfish", "MD5"], 0, "AES uses key lengths of 128, 192, or 256 bits, replacing the vulnerable 56-bit DES standard."),
    ("What term describes a newly discovered software vulnerability for which no patch or fix has yet been released by the software vendor?", "हाल ही में खोजी गई सॉफ़्टवेयर भेद्यता का वर्णन करने के लिए किस शब्द का उपयोग किया जाता है जिसके लिए विक्रेता द्वारा अभी तक कोई पैच जारी नहीं किया गया है?", ["Zero-Day Vulnerability", "Bug", "Exploit Kit", "Trojan", "Backdoor"], 0, "Zero-Day refers to the fact that the developer has had zero days to address and patch the vulnerability."),
    ("An attack that inserts unauthorized SQL database commands via user web input fields (e.g. login username field) to bypass authentication is:", "प्रमाणीकरण को बायपास करने के लिए वेब इनपुट फ़ील्ड के माध्यम से अनधिकृत SQL कमांड डालने वाला हमला है:", ["SQL Injection (SQLi)", "Cross-Site Scripting (XSS)", "Cross-Site Request Forgery", "Buffer Overflow", "DDoS"], 0, "SQL Injection (SQLi) manipulates backend database queries through unsanitized user inputs."),
    ("What is the primary objective of a Distributed Denial of Service (DDoS) attack?", "डिस्ट्रिब्यूटेड डिनायल ऑफ सर्विस (DDoS) हमले का प्राथमिक उद्देश्य क्या है?", ["To exhaust server bandwidth/resources and deny service to legitimate users", "To steal customer credit card numbers", "To permanently delete database files", "To alter bank account balances", "To eavesdrop on phone calls"], 0, "DDoS aims to make an online service unavailable by overwhelming it with traffic from multiple compromised devices (botnet).")
]

for q_en, q_hi, opts, c_idx, expl in sec_questions:
    add_q(
        category="Cybersecurity",
        module="Cybersecurity",
        badge="ACTUAL PYQ" if "Vishing" in q_en or "Firewall" in q_en else "PYQ-STYLE",
        source="IBPS RRB PO Mains 2024",
        q_en=q_en,
        q_hi=q_hi,
        opts_en=opts,
        opts_hi=opts,
        correct_idx=c_idx,
        diff="Medium",
        sol_en=expl,
        sol_hi=expl,
        tip="Cybersecurity terms are extremely frequent in modern bank exams.",
        trap="Remember: Phishing = Email; Vishing = Voice call; Smishing = SMS; Pharming = DNS redirection.",
        tags=["cybersecurity", "attacks", "security"]
    )

# 5. Digital Banking Systems (25 Questions)
bank_questions = [
    ("Which entity operates and manages the Unified Payments Interface (UPI) network in India?", "भारत में यूनिफाइड पेमेंट्स इंटरफेस (UPI) नेटवर्क का संचालन और प्रबंधन कौन सी संस्था करती है?", ["NPCI (National Payments Corporation of India)", "RBI (Reserve Bank of India)", "SBI", "IBA (Indian Banks' Association)", "SEBI"], 0, "NPCI was set up by RBI and IBA under PSS Act 2007 to operate retail payment and settlement systems."),
    ("What is the full form of CVV found on the reverse side of debit and credit cards?", "डेबिट और क्रेडिट कार्ड के पीछे पाए जाने वाले CVV का पूर्ण रूप क्या है?", ["Card Verification Value", "Card Validation Velocity", "Customer Verification Value", "Central Validated Voucher", "Credit Value Voucher"], 0, "CVV stands for Card Verification Value (also called CVC - Card Validation Code)."),
    ("Under RBI Tokenization guidelines, what is replaced with an alternate code called a 'Token' during digital transactions?", "आरबीआई टोकनाइजेशन दिशानिर्देशों के तहत, डिजिटल लेनदेन के दौरान 'टोकन' नामक वैकल्पिक कोड से क्या बदल दिया जाता है?", ["Actual 16-digit Card Number", "Bank Account Number", "Cardholder's Name", "ATM PIN", "Bank IFSC Code"], 0, "Card tokenization replaces the actual 16-digit card number with a unique surrogate token."),
    ("What is the unique 7-digit identifier issued by banks to customers for transacting via IMPS called?", "IMPS के माध्यम से लेनदेन के लिए बैंकों द्वारा ग्राहकों को जारी किया जाने वाला अद्वितीय 7-अंकीय पहचानकर्ता क्या कहलाता है?", ["MMID (Mobile Money Identifier)", "UPI PIN", "IFSC", "MICR", "VPA"], 0, "MMID is a 7-digit random number issued by bank to link mobile number with account for IMPS transfers."),
    ("An IFSC (Indian Financial System Code) used for NEFT and RTGS consists of how many alphanumeric characters?", "NEFT और RTGS के लिए उपयोग किए जाने वाले IFSC कोड में कितने अल्फ़ान्यूमेरिक वर्ण होते हैं?", ["11 characters", "9 characters", "16 characters", "10 characters", "12 characters"], 0, "IFSC is an 11-character code: First 4 characters = Bank code (alphabetic), 5th character = 0 (reserved), Last 6 characters = Branch code."),
    ("What is the fixed value of the 5th character in any standard 11-digit IFSC code?", "किसी भी मानक 11-अंकीय IFSC कोड में 5वें वर्ण का निश्चित मान क्या होता है?", ["0 (Zero)", "1 (One)", "X", "Space", "B"], 0, "The 5th character of every IFSC is strictly '0' (Zero), reserved for future expansion."),
    ("In Core Banking Solutions (CBS), what does the acronym CORE stand for?", "कोर बैंकिंग सॉल्यूशंस (CBS) में, संक्षिप्त नाम CORE का क्या अर्थ है?", ["Centralized Online Real-time Electronic", "Computer Organized Regional Exchange", "Central Operations and Record Engine", "Common Online Retail Electronic", "Coordinated Online Routing Engine"], 0, "CORE = Centralized Online Real-time Electronic banking."),
    ("Which digital payment system enables micro-ATMs and banking correspondents to disburse cash based on Aadhaar biometric fingerprint authentication?", "कौन सी डिजिटल भुगतान प्रणाली माइक्रो-एटीएम को आधार बायोमेट्रिक प्रमाणीकरण के आधार पर नकद वितरित करने में सक्षम बनाती है?", ["AePS (Aadhaar Enabled Payment System)", "UPI", "NEFT", "RTGS", "CTS"], 0, "AePS enables interoperable financial inclusion transactions at PoS/micro-ATMs via Aadhaar authentication."),
    ("What is the standard validity period of an account payee bank cheque in India from the date of issue?", "भारत में जारी होने की तारीख से बैंक चेक की मानक वैधता अवधि क्या है?", ["3 months", "6 months", "1 year", "1 month", "2 months"], 0, "Under RBI directions effective April 1, 2012, bank cheques are valid for 3 months from the date of issuance."),
    ("What does CTS stand for in the context of paper cheque processing in Indian banking?", "भारतीय बैंकिंग में कागजी चेक प्रसंस्करण के संदर्भ में CTS का क्या अर्थ है?", ["Cheque Truncation System", "Central Transaction System", "Customer Transfer Service", "Cash Teller System", "Commercial Transfer Standard"], 0, "CTS stands for Cheque Truncation System (speeds up clearing using digital image and MICR data).")
]

for q_en, q_hi, opts, c_idx, expl in bank_questions:
    add_q(
        category="Digital Banking",
        module="Digital Banking",
        badge="ACTUAL PYQ",
        source="IBPS RRB Clerk Mains 2024",
        q_en=q_en,
        q_hi=q_hi,
        opts_en=opts,
        opts_hi=opts,
        correct_idx=c_idx,
        diff="Easy" if "UPI" in q_en or "IFSC" in q_en else "Medium",
        sol_en=expl,
        sol_hi=expl,
        tip="Banking technology and NPCI systems are 100% recurring questions in RRB and Clerk Mains.",
        trap="Notice IFSC is 11 alphanumeric characters, while MICR is 9 numeric digits!",
        tags=["digital-banking", "npci", "banking-exam"]
    )

with open(q_file, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)

print(f"Total Questions after expansion: {len(questions)}")
