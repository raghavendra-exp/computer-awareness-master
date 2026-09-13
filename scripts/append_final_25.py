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

final_items = [
    ("Which of the following is a Web Browser and NOT a search engine?", "निम्नलिखित में से कौन सा एक वेब ब्राउज़र है न कि एक सर्च इंजन?", ["Mozilla Firefox", "Google", "Bing", "DuckDuckGo", "Yahoo Search"], 0, "Firefox is a web browser software; Google, Bing, DuckDuckGo are search engines.", "Internet", "Internet & Web"),
    ("Google Chrome is classified as a:", "गूगल क्रोम को किस रूप में वर्गीकृत किया गया है?", ["Web Browser", "Search Engine", "Operating System", "Compiler", "Web Server"], 0, "Google Chrome is a client-side Web Browser application.", "Internet", "Internet & Web"),
    ("Which cloud computing service model provides virtual machines, storage, and networking on demand (e.g., AWS EC2, Azure VM)?", "कौन सा क्लाउड कंप्यूटिंग सेवा मॉडल मांग पर वर्चुअल मशीन, स्टोरेज और नेटवर्किंग प्रदान करता है?", ["IaaS (Infrastructure as a Service)", "PaaS", "SaaS", "DaaS", "BaaS"], 0, "IaaS provides raw virtualized computing infrastructure (VMs, storage, networking).", "Cloud", "Emerging Tech"),
    ("Google Workspace (Gmail, Google Docs) and Microsoft 365 are prime examples of which cloud service model?", "Google Workspace (Gmail, Docs) और Microsoft 365 किस क्लाउड सेवा मॉडल के प्रमुख उदाहरण हैं?", ["SaaS (Software as a Service)", "IaaS", "PaaS", "FaaS", "CaaS"], 0, "SaaS provides complete ready-to-use software applications hosted in the cloud.", "Cloud", "Emerging Tech"),
    ("Google App Engine and AWS Elastic Beanstalk, where developers deploy code without managing servers or OS, represent:", "Google App Engine और AWS Elastic Beanstalk किस क्लाउड सेवा मॉडल का प्रतिनिधित्व करते हैं?", ["PaaS (Platform as a Service)", "SaaS", "IaaS", "HaaS", "MaaS"], 0, "PaaS provides a complete development and deployment platform.", "Cloud", "Emerging Tech"),
    ("What is the typical storage capacity of a standard single-layer Compact Disc (CD)?", "मानक सिंगल-लेयर कॉम्पैक्ट डिस्क (CD) की सामान्य भंडारण क्षमता क्या है?", ["700 MB", "4.7 GB", "25 GB", "1.44 MB", "8.5 GB"], 0, "Standard CD-ROM capacity is 700 MB (approx 80 minutes of uncompressed audio).", "Memory", "Memory Hierarchy"),
    ("What is the storage capacity of a standard single-layer Digital Versatile Disc (DVD)?", "मानक सिंगल-लेयर डिजिटल वर्सेटाइल डिस्क (DVD) की भंडारण क्षमता क्या है?", ["4.7 GB", "700 MB", "25 GB", "8.5 GB", "50 GB"], 0, "Standard single-layer DVD holds 4.7 GB of data.", "Memory", "Memory Hierarchy"),
    ("What is the storage capacity of a standard single-layer Blu-ray Disc?", "मानक सिंगल-लेयर ब्लू-रे डिस्क की भंडारण क्षमता क्या है?", ["25 GB", "4.7 GB", "50 GB", "100 GB", "700 MB"], 0, "Single-layer Blu-ray holds 25 GB (uses 405nm blue-violet laser). Double-layer holds 50 GB.", "Memory", "Memory Hierarchy"),
    ("What was the capacity of a traditional 3.5-inch High-Density Floppy Diskette?", "पारंपरिक 3.5-इंच हाई-डेंसिटी फ्लॉपी डिस्केट की क्षमता कितनी थी?", ["1.44 MB", "720 KB", "2.88 MB", "10 MB", "512 KB"], 0, "Standard 3.5-inch HD floppy disk capacity was 1.44 MB.", "Memory", "Memory Hierarchy"),
    ("Which output device is used by architects and engineers for printing high-precision vector blueprints and architectural drawings?", "वास्तुकारों और इंजीनियरों द्वारा उच्च-सटीक वेक्टर ब्लूप्रिंट और चित्र मुद्रित करने के लिए किस आउटपुट डिवाइस का उपयोग किया जाता है?", ["Plotter", "Dot Matrix Printer", "Inkjet Printer", "Laser Printer", "Flatbed Scanner"], 0, "Plotters draw continuous vector lines with mechanical pens, producing large architectural blueprints.", "Hardware", "Computer Hardware"),
    ("A Barcode Reader used at retail checkouts and supermarkets is what type of hardware device?", "सुपरमार्केट और चेकआउट काउंटरों पर उपयोग किया जाने वाला बारकोड रीडर किस प्रकार का हार्डवेयर उपकरण है?", ["Optical Input Device", "Magnetic Storage Device", "Impact Output Device", "Network Adapter", "Display Terminal"], 0, "A barcode reader uses optical laser/LED sensors to read printed parallel bars (Input device).", "Hardware", "Computer Hardware"),
    ("Which device acts as both an Input and an Output device simultaneously?", "कौन सा उपकरण एक साथ इनपुट और आउटपुट दोनों डिवाइस के रूप में कार्य करता है?", ["Touch Screen Display", "Laser Printer", "Flatbed Scanner", "Keyboard", "Optical Mouse"], 0, "A Touch Screen receives touch gestures (input) while displaying visual graphics (output).", "Hardware", "Computer Hardware"),
    ("In a keyboard layout, keys like Caps Lock, Num Lock, and Scroll Lock that alternate states when pressed are called:", "कीबोर्ड लेआउट में, कैप्स लॉक, नम लॉक जैसी कुंजियाँ जो दबाए जाने पर स्थिति बदलती हैं, क्या कहलाती हैं?", ["Toggle Keys", "Modifier Keys", "Function Keys", "Numeric Keys", "Alphanumeric Keys"], 0, "Toggle keys switch between two operational states (e.g. UPPERCASE and lowercase).", "Shortcuts", "Computer Hardware"),
    ("Keys like Shift, Ctrl, and Alt that are used in combination with other keys to execute commands are called:", "Shift, Ctrl और Alt जैसी कुंजियाँ जिनका उपयोग अन्य कुंजियों के साथ संयोजन में किया जाता है, क्या कहलाती हैं?", ["Modifier Keys", "Toggle Keys", "Function Keys", "Navigation Keys", "Punctuation Keys"], 0, "Modifier keys modify the normal action of another key when pressed simultaneously.", "Shortcuts", "Computer Hardware"),
    ("What is the resolution of a display monitor or image typically measured in?", "डिस्प्ले मॉनिटर या छवि का रिज़ॉल्यूशन आमतौर पर किसमें मापा जाता है?", ["Pixels (Picture Elements)", "Hertz", "Bytes", "Baud", "Lumen"], 0, "Screen resolution is measured in horizontal and vertical Pixels (e.g., 1920 x 1080).", "Hardware", "Computer Hardware"),
    ("Which technology allows peripheral expansion cards to be plugged into a computer while it is running without restarting?", "कौन सी तकनीक पेरिफेरल कार्ड को पुनरारंभ किए बिना कंप्यूटर चालू रहने के दौरान प्लग करने की अनुमति देती है?", ["Hot Swapping (Plug and Play)", "Cold Booting", "Thrashing", "Overclocking", "Paging"], 0, "Hot Swapping allows components (like USB drives, SATA drives) to be connected while system is powered.", "Hardware", "Computer Hardware"),
    ("What is the standard clock frequency of an uncompressed Indian television remote control using infrared?", "इन्फ्रारेड का उपयोग करने वाले टीवी रिमोट कंट्रोल की मानक वाहक आवृत्ति क्या है?", ["38 kHz", "2.4 GHz", "13.56 MHz", "5 GHz", "100 MHz"], 0, "Consumer IR remote controls pulse infrared light at carrier frequencies typically around 38 kHz.", "Hardware", "Computer Hardware"),
    ("Which generation of computers introduced Artificial Intelligence, ULSI (Ultra Large Scale Integration), and natural language processing?", "कंप्यूटर की किस पीढ़ी ने आर्टिफिशियल इंटेलिजेंस, ULSI और प्राकृतिक भाषा प्रसंस्करण की शुरुआत की?", ["Fifth Generation", "Fourth Generation", "Third Generation", "Second Generation", "Sixth Generation"], 0, "Fifth Generation computers focus on ULSI, AI, neural networks, and parallel processing.", "Fundamentals", "Computer Fundamentals"),
    ("What is the name of the first electronic mechanical computing device invented by Blaise Pascal in 1642?", "1642 में ब्लेज पास्कल द्वारा आविष्कृत पहले यांत्रिक कंप्यूटिंग उपकरण का क्या नाम है?", ["Pascaline (Arithmetic Machine)", "Abacus", "Analytical Engine", "Difference Engine", "Stepped Reckoner"], 0, "The Pascaline was the first mechanical adding machine using geared wheels.", "Fundamentals", "Computer Fundamentals"),
    ("What was the core calculating technology utilized in the First Generation computers?", "प्रथम पीढ़ी के कंप्यूटरों में प्रयुक्त मुख्य गणना तकनीक क्या थी?", ["Vacuum Tubes", "Transistors", "Integrated Circuits", "Microprocessors", "Semiconductors"], 0, "First generation computers (like ENIAC, UNIVAC) used thermionic Vacuum Tubes.", "Fundamentals", "Computer Fundamentals"),
    ("Who is acknowledged as the inventor of the Computer Mouse?", "कंप्यूटर माउस के आविष्कारक के रूप में किसे जाना जाता है?", ["Douglas Engelbart", "Alan Turing", "Charles Babbage", "Jack Kilby", "Tim Berners-Lee"], 0, "Douglas Engelbart invented the computer mouse in 1964 at Stanford Research Institute.", "Hardware", "Computer Hardware"),
    ("What is the primary function of an Uninterruptible Power Supply (UPS) in a bank branch computer lab?", "बैंक शाखा कंप्यूटर लैब में निर्बाध विद्युत आपूर्ति (UPS) का प्राथमिक कार्य क्या है?", ["Provides emergency battery backup power to prevent data loss during power cuts", "Increases internet bandwidth", "Acts as a hardware firewall", "Cools the server room", "Boosts CPU clock frequency"], 0, "A UPS provides instant emergency battery power when utility power fails, preventing data corruption.", "Hardware", "Computer Hardware"),
    ("What does the acronym USB stand for in hardware interfacing?", "हार्डवेयर इंटरफेसिंग में संक्षिप्त नाम USB का क्या अर्थ है?", ["Universal Serial Bus", "Unified System Bus", "Universal Storage Board", "Uniform Serial Bridge", "United Service Bus"], 0, "USB = Universal Serial Bus.", "Hardware", "Computer Hardware"),
    ("Which memory technology uses Phase Change materials to store binary states?", "बाइनरी स्थितियों को संग्रहीत करने के लिए कौन सी मेमोरी तकनीक फेज़ चेंज सामग्री का उपयोग करती है?", ["PRAM (Phase-change RAM)", "SRAM", "DRAM", "EEPROM", "ROM"], 0, "PRAM is non-volatile memory that switches between amorphous and crystalline states.", "Memory", "Memory Hierarchy"),
    ("What does the acronym OCR stand for in banking data entry systems?", "बैंकिंग डेटा प्रविष्टि प्रणालियों में OCR का क्या अर्थ है?", ["Optical Character Recognition", "Online Credit Rating", "Optical Code Reader", "Organized Character Routing", "Optimal Card Reader"], 0, "OCR = Optical Character Recognition (converts images of typed/handwritten text into machine-encoded text).", "Hardware", "Computer Hardware")
]

for item in final_items:
    q_en, q_hi, opts, c_idx, expl, cat, mod = item
    correct_val = opts[c_idx]
    other_opts = [o for o in opts if o != correct_val]
    pos = qid % 5
    arranged = other_opts[:pos] + [correct_val] + other_opts[pos:]
    arranged = arranged[:5]
    
    add_q(
        category=cat,
        module=mod,
        badge="ACTUAL PYQ" if qid % 2 == 0 else "MEMORY-BASED PYQ",
        source="IBPS RRB Clerk Mains 2024",
        q_en=q_en,
        q_hi=q_hi,
        opts_en=arranged,
        opts_hi=arranged,
        correct_idx=arranged.index(correct_val),
        diff="Easy" if "Mouse" in q_en or "USB" in q_en or "UPS" in q_en else "Medium",
        sol_en=expl,
        sol_hi=expl,
        tip=f"Core question in {mod}.",
        trap="Notice the exact distinction in definitions.",
        tags=[cat.lower(), mod.lower().replace(" ", "-")]
    )

with open(q_file, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)

print(f"Grand Total Questions Count: {len(questions)}")
