import json
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "data")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 1. networking.json
networking_data = {
    "module": "Computer Networking",
    "version": "2026.1",
    "sections": [
        {
            "id": "network-types",
            "title": "Geographical Network Classifications",
            "hindiTitle": "भौगोलिक नेटवर्क वर्गीकरण",
            "types": [
                {"acronym": "PAN", "name": "Personal Area Network", "range": "Within 10 meters (approx 33 feet)", "tech": "Bluetooth, Zigbee, NFC, Infrared", "desc": "Connects devices centered on a single person's workspace."},
                {"acronym": "LAN", "name": "Local Area Network", "range": "Within a room, building, or office campus (up to 1 km)", "tech": "Ethernet (IEEE 802.3), Wi-Fi (IEEE 802.11)", "desc": "High data transfer rate, low error rate, privately owned."},
                {"acronym": "CAN", "name": "Campus Area Network", "range": "1 km to 5 km (university or military base)", "tech": "Fiber optic backbone, gigabit Ethernet", "desc": "Spans multiple contiguous buildings belonging to one organization."},
                {"acronym": "MAN", "name": "Metropolitan Area Network", "range": "5 km to 50 km (entire city or large metro area)", "tech": "Cable TV network, WiMAX, city fiber loops", "desc": "Spans a city; larger than LAN, smaller than WAN."},
                {"acronym": "WAN", "name": "Wide Area Network", "range": "Country, continent, or entire globe", "tech": "Leased lines, satellite links, underwater fiber cables", "desc": "The Internet is the world's largest public WAN. High latency compared to LAN."},
                {"acronym": "SAN", "name": "Storage Area Network", "range": "Data centers", "tech": "Fibre Channel (FC), iSCSI", "desc": "Dedicated high-speed network that interconnects and delivers shared pools of storage devices."},
                {"acronym": "VPN", "name": "Virtual Private Network", "range": "Global encrypted overlay", "tech": "IPsec, OpenVPN, WireGuard, SSL/TLS", "desc": "Creates a secure, encrypted tunnel across a public network like the Internet."}
            ]
        },
        {
            "id": "network-topologies",
            "title": "Network Topologies & Formulas",
            "hindiTitle": "नेटवर्क टोपोलॉजी और सूत्र",
            "topologies": [
                {
                    "name": "Star Topology",
                    "structure": "All devices connected to a central Hub or Switch.",
                    "advantages": "Easy to install and wire; failure of one cable/device only disconnects that device, central monitoring.",
                    "disadvantages": "Central hub/switch is a Single Point of Failure (if central hub fails, whole network goes down).",
                    "cablesNeeded": "N cables (where N is number of nodes)",
                    "examFrequency": "Most widely used topology in modern LANs."
                },
                {
                    "name": "Mesh Topology",
                    "structure": "Every device is connected to every other device via dedicated point-to-point links (Fully Connected Mesh).",
                    "advantages": "Highest fault tolerance, robust, dedicated traffic with no congestion, maximum privacy.",
                    "disadvantages": "Most expensive, massive cabling, difficult installation and maintenance.",
                    "formula": "Number of duplex links = N * (N - 1) / 2 | Number of I/O ports per device = N - 1",
                    "examFrequency": "Extremely frequent math calculation in bank exams! (e.g., 6 devices require 6*5/2 = 15 cables)."
                },
                {
                    "name": "Bus Topology",
                    "structure": "All devices share a single common communication line called a 'Backbone' cable, terminated at both ends with Terminators.",
                    "advantages": "Minimal cabling required, cost-effective for small networks.",
                    "disadvantages": "If backbone cable breaks anywhere, entire network goes down. Difficult troubleshooting, packet collisions (uses CSMA/CD).",
                    "terminatorRole": "Absorbs signals to prevent signal reflection (echo) which causes line noise."
                },
                {
                    "name": "Ring Topology",
                    "structure": "Devices connected in a circular closed loop. Data travels in one direction (unidirectional) or bidirectional (dual ring).",
                    "advantages": "Predictable transmission via Token Passing (Token Ring - IEEE 802.5), no collisions.",
                    "disadvantages": "Break in the ring breaks the entire network unless using a redundant dual ring (FDDI)."
                },
                {
                    "name": "Tree Topology",
                    "structure": "Hierarchical combination of Star and Bus topologies. Root node connects to secondary hubs.",
                    "advantages": "Highly scalable, easy expansion of corporate branch networks.",
                    "disadvantages": "Failure of root trunk cable disables the dependent branches."
                },
                {
                    "name": "Hybrid Topology",
                    "structure": "Combination of two or more different topologies (e.g., Star-Ring, Star-Bus).",
                    "advantages": "Flexible and reliable.",
                    "disadvantages": "Complex design and architecture."
                }
            ]
        },
        {
            "id": "network-hardware",
            "title": "Network Hardware & Devices",
            "hindiTitle": "नेटवर्क उपकरण और हार्डवेयर",
            "devices": [
                {"name": "Repeater", "layer": "Layer 1 (Physical)", "desc": "Regenerates and amplifies attenuated signals over long cable runs. Operates on raw bits, does not read headers."},
                {"name": "Hub", "layer": "Layer 1 (Physical)", "desc": "Multi-port repeater. Broadcasts all incoming packets to ALL connected ports (dumb device). High collisions, single collision domain, single broadcast domain."},
                {"name": "Bridge", "layer": "Layer 2 (Data Link)", "desc": "Connects two LAN segments using the same protocol. Filters traffic based on MAC addresses. Divides network into 2 collision domains."},
                {"name": "Switch", "layer": "Layer 2 (Data Link) / Layer 3 (Multilayer)", "desc": "Intelligent multi-port bridge. Builds a MAC Address Table (CAM Table) through learning. Forwards frames only to destination port (unicast). Each port is its own separate collision domain."},
                {"name": "Router", "layer": "Layer 3 (Network)", "desc": "Connects disparate networks (e.g. LAN to WAN / Internet). Routes packets based on logical IP addresses using routing protocols (OSPF, BGP). Blocks broadcasts (breaks broadcast domains)."},
                {"name": "Gateway", "layer": "Layer 4 - Layer 7 (Transport to Application)", "desc": "Protocol translator / converter. Connects two completely different network architectures (e.g., AppleTalk to TCP/IP, or legacy mainframe to cloud)."},
                {"name": "Modem (Modulator-Demodulator)", "layer": "Layer 1/2", "desc": "Converts digital data from computer into analog signals for telephone/cable lines, and vice versa."}
            ],
            "collisionVsBroadcastDomain": {
                "collisionDomain": "Network segment where packet collisions can occur if two devices transmit simultaneously. Hub = 1 collision domain for all ports. Switch = Each port is a separate collision domain.",
                "broadcastDomain": "Portion of network where any device sending a broadcast frame will be received by all other devices. Hub and Switch maintain 1 broadcast domain. Router breaks broadcast domains."
            }
        },
        {
            "id": "transmission-media",
            "title": "Transmission Media (Guided vs Unguided)",
            "hindiTitle": "संचरण माध्यम (गाइडेड बनाम अनगाइडेड)",
            "guided": [
                {"name": "Twisted Pair Cable", "types": "UTP (Unshielded) & STP (Shielded)", "connectors": "RJ-45 (8 pins, Registered Jack 45), RJ-11 (telephones)", "categories": "Cat 5e (1 Gbps up to 100m), Cat 6 (10 Gbps up to 55m), Cat 6a (10 Gbps up to 100m)", "desc": "Pairs of wires twisted together to cancel electromagnetic interference (EMI) and crosstalk."},
                {"name": "Coaxial Cable", "types": "Thicknet (10BASE5) & Thinnet (10BASE2)", "connectors": "BNC (Bayonet Neill-Concelman) connector, F-type (cable TV)", "desc": "Central copper conductor surrounded by dielectric insulator, metallic braided shield, and plastic jacket."},
                {"name": "Fiber Optic Cable", "types": "Single-Mode (long distance, laser, thin core 9µm) vs Multi-Mode (short distance, LED, thicker core 50-62.5µm)", "principle": "Total Internal Reflection (TIR)", "connectors": "SC, LC, ST", "desc": "Transmits light pulses through glass/plastic core. Immune to EMI and radio interference, highest bandwidth."}
            ],
            "unguided": [
                {"name": "Radio Waves", "frequency": "3 kHz to 1 GHz", "propagation": "Omnidirectional (travels in all directions). Penetrates building walls. Used in AM/FM radio, Wi-Fi, cellular."},
                {"name": "Microwaves", "frequency": "1 GHz to 300 GHz", "propagation": "Line-of-Sight (unidirectional, narrow focused beam). Blocked by obstacles. Used in satellite and radar communication."},
                {"name": "Infrared Waves", "frequency": "300 GHz to 400 THz", "propagation": "Line-of-Sight, short range. Cannot penetrate walls (high security). Used in TV remote controls."}
            ]
        }
    ]
}

# 2. protocols-osi.json
protocols_osi_data = {
    "module": "OSI Reference Model, TCP/IP & Protocols",
    "version": "2026.1",
    "osiLayers": [
        {
            "layer": 7,
            "name": "Application Layer",
            "hindiName": "अनुप्रयोग स्तर",
            "pdu": "Data",
            "functions": "Provides network services directly to end-user software applications (Web browsers, Email clients). Human-computer interaction layer.",
            "protocols": ["HTTP", "HTTPS", "FTP", "SMTP", "DNS", "DHCP", "Telnet", "SSH", "SNMP"]
        },
        {
            "layer": 6,
            "name": "Presentation Layer",
            "hindiName": "प्रस्तुति स्तर",
            "pdu": "Data",
            "functions": "Syntax and semantics translation, Data Representation, Encryption & Decryption (SSL/TLS), Compression & Decompression.",
            "standards": "ASCII, EBCDIC, Unicode, JPEG, MPEG, GIF, SSL/TLS, MIME",
            "examHighlight": "Responsible for Data Encryption and Compression. Very frequent question!"
        },
        {
            "layer": 5,
            "name": "Session Layer",
            "hindiName": "सत्र स्तर",
            "pdu": "Data",
            "functions": "Establishes, manages, synchronizes, and terminates communication sessions between applications. Inserts synchronization checkpoints.",
            "modes": "Simplex, Half-Duplex, Full-Duplex dialog management",
            "protocols": ["NetBIOS", "RPC (Remote Procedure Call)", "PPTP"]
        },
        {
            "layer": 4,
            "name": "Transport Layer",
            "hindiName": "परिवहन स्तर",
            "pdu": "Segments (TCP) / Datagrams (UDP)",
            "functions": "End-to-end delivery of the entire message, process-to-process communication via Port Addressing, Flow Control (sliding window), Error Control, Congestion Control.",
            "coreProtocols": [
                {"name": "TCP (Transmission Control Protocol)", "type": "Connection-oriented, reliable, 3-way handshake (SYN, SYN-ACK, ACK), acknowledges receipt, retransmits lost packets.", "headerSize": "20 to 60 bytes"},
                {"name": "UDP (User Datagram Protocol)", "type": "Connectionless, unreliable, lightweight, fast, no acknowledgements, no retransmission.", "headerSize": "8 bytes (fixed)", "usedFor": "VoIP, live streaming, DNS queries, online gaming"}
            ],
            "examHighlight": "Heart of OSI Model. Port addressing happens at Transport Layer."
        },
        {
            "layer": 3,
            "name": "Network Layer",
            "hindiName": "नेटवर्क स्तर",
            "pdu": "Packets",
            "functions": "Source-to-destination packet delivery across multiple network links (Host-to-Host). Logical Addressing (IP addresses), Routing path determination (Dijkstra, Bellman-Ford).",
            "protocols": ["IPv4", "IPv6", "ICMP (ping)", "IGMP", "ARP", "RARP", "OSPF", "BGP", "RIP"],
            "devices": ["Routers", "Layer 3 Switches"]
        },
        {
            "layer": 2,
            "name": "Data Link Layer (DLL)",
            "hindiName": "डेटा लिंक स्तर",
            "pdu": "Frames",
            "sublayers": [
                {"name": "LLC (Logical Link Control)", "desc": "Flow control, error control, multiplexes network layer protocols."},
                {"name": "MAC (Media Access Control)", "desc": "Hardware addressing (48-bit MAC address), regulates medium access (CSMA/CD, CSMA/CA)."}
            ],
            "functions": "Hop-to-hop (node-to-node) delivery, physical addressing (MAC), framing, error detection (CRC - Cyclic Redundancy Check), flow control.",
            "devices": ["Switches", "Bridges", "NIC (Network Interface Card)"]
        },
        {
            "layer": 1,
            "name": "Physical Layer",
            "hindiName": "भौतिक स्तर",
            "pdu": "Bits (0s and 1s)",
            "functions": "Transmission of raw unstructured bitstream over physical transmission medium. Defines electrical voltages, pin configurations, cable types, signal bit duration.",
            "devices": ["Hubs", "Repeaters", "Cables", "Modems"]
        }
    ],
    "mnemonics": {
        "topDown": "All People Seem To Need Data Processing (Application -> Physical)",
        "bottomUp": "Please Do Not Throw Sausage Pizza Away (Physical -> Application)"
    },
    "ipAddressing": {
        "ipv4": {
            "size": "32 bits (4 bytes)",
            "notation": "Dotted decimal (e.g. 192.168.1.1), 4 octets (0-255 each)",
            "classes": [
                {"class": "Class A", "range": "1.0.0.0 to 126.255.255.255", "defaultMask": "255.0.0.0 (/8)", "leadBits": "0", "purpose": "Very large networks (16M hosts/network)"},
                {"class": "Class B", "range": "128.0.0.0 to 191.255.255.255", "defaultMask": "255.255.0.0 (/16)", "leadBits": "10", "purpose": "Medium networks (65k hosts/network)"},
                {"class": "Class C", "range": "192.0.0.0 to 223.255.255.255", "defaultMask": "255.255.255.0 (/24)", "leadBits": "110", "purpose": "Small networks (254 hosts/network)"},
                {"class": "Class D", "range": "224.0.0.0 to 239.255.255.255", "defaultMask": "N/A", "leadBits": "1110", "purpose": "Multicasting"},
                {"class": "Class E", "range": "240.0.0.0 to 255.255.255.255", "defaultMask": "N/A", "leadBits": "1111", "purpose": "Experimental and Research"}
            ],
            "specialAddresses": [
                {"address": "127.0.0.1 (127.0.0.0/8)", "purpose": "Loopback address (localhost testing of TCP/IP stack)"},
                {"address": "169.254.x.x (APIPA)", "purpose": "Automatic Private IP Addressing (assigned when DHCP server is unreachable)"},
                {"address": "0.0.0.0", "purpose": "Default route / unknown network"},
                {"address": "255.255.255.255", "purpose": "Limited broadcast address"}
            ],
            "privateRanges": [
                "Class A Private: 10.0.0.0 - 10.255.255.255 (10.0.0.0/8)",
                "Class B Private: 172.16.0.0 - 172.31.255.255 (172.16.0.0/12)",
                "Class C Private: 192.168.0.0 - 192.168.255.255 (192.168.0.0/16)"
            ]
        },
        "ipv6": {
            "size": "128 bits (16 bytes)",
            "notation": "8 groups of 4 hexadecimal digits separated by colons (e.g. 2001:0db8:85a3:0000:0000:8a2e:0370:7334)",
            "compression": "Leading zeroes in a group can be omitted; consecutive groups of zeroes replaced once by '::'",
            "loopback": "::1",
            "features": "Virtually inexhaustible address space (3.4 * 10^38 addresses), built-in IPsec, no broadcast (uses multicast and anycast), auto-configuration (SLAAC)."
        },
        "macAddress": {
            "size": "48 bits (6 bytes)",
            "notation": "6 hexadecimal pairs (e.g., 00:1A:2B:3C:4D:5E or 00-1A-2B-3C-4D-5E)",
            "structure": "First 24 bits = OUI (Organizationally Unique Identifier assigned by IEEE to hardware manufacturer); Last 24 bits = Device identifier assigned by vendor."
        }
    },
    "masterPortList": [
        {"port": 20, "protocol": "FTP Data", "transport": "TCP", "desc": "File Transfer Protocol data transfer"},
        {"port": 21, "protocol": "FTP Control", "transport": "TCP", "desc": "File Transfer Protocol command control"},
        {"port": 22, "protocol": "SSH / SFTP", "transport": "TCP", "desc": "Secure Shell encrypted remote login"},
        {"port": 23, "protocol": "Telnet", "transport": "TCP", "desc": "Unencrypted remote terminal connection"},
        {"port": 25, "protocol": "SMTP", "transport": "TCP", "desc": "Simple Mail Transfer Protocol (sending email between servers)"},
        {"port": 53, "protocol": "DNS", "transport": "UDP / TCP", "desc": "Domain Name System (resolves domain name to IP address; UDP for queries <512B)"},
        {"port": 67, "protocol": "DHCP Server", "transport": "UDP", "desc": "Dynamic Host Configuration Protocol server listener"},
        {"port": 68, "protocol": "DHCP Client", "transport": "UDP", "desc": "Dynamic Host Configuration Protocol client port (DORA process)"},
        {"port": 69, "protocol": "TFTP", "transport": "UDP", "desc": "Trivial File Transfer Protocol (lightweight file transfer for bootstrapping)"},
        {"port": 80, "protocol": "HTTP", "transport": "TCP", "desc": "HyperText Transfer Protocol (unencrypted web traffic)"},
        {"port": 110, "protocol": "POP3", "transport": "TCP", "desc": "Post Office Protocol version 3 (downloads emails to client and deletes from server)"},
        {"port": 123, "protocol": "NTP", "transport": "UDP", "desc": "Network Time Protocol (clock synchronization)"},
        {"port": 143, "protocol": "IMAP4", "transport": "TCP", "desc": "Internet Message Access Protocol (syncs emails across multiple devices)"},
        {"port": 161, "protocol": "SNMP", "transport": "UDP", "desc": "Simple Network Management Protocol queries/monitoring"},
        {"port": 162, "protocol": "SNMP Trap", "transport": "UDP", "desc": "SNMP asynchronous notifications/traps"},
        {"port": 443, "protocol": "HTTPS", "transport": "TCP", "desc": "HyperText Transfer Protocol Secure (HTTP over SSL/TLS)"},
        {"port": 465, "protocol": "SMTPS", "transport": "TCP", "desc": "SMTP Secure over SSL"},
        {"port": 993, "protocol": "IMAPS", "transport": "TCP", "desc": "IMAP Secure over SSL/TLS"},
        {"port": 995, "protocol": "POP3S", "transport": "TCP", "desc": "POP3 Secure over SSL/TLS"},
        {"port": 3389, "protocol": "RDP", "transport": "TCP", "desc": "Remote Desktop Protocol (Microsoft Windows Remote Desktop)"}
    ]
}

# 3. internet.json
internet_data = {
    "module": "Internet, Web Technologies & Cloud Computing",
    "version": "2026.1",
    "sections": [
        {
            "id": "internet-milestones",
            "title": "Internet History & Foundations",
            "hindiTitle": "इंटरनेट का इतिहास और प्रमुख मील के पत्थर",
            "milestones": [
                {"year": 1969, "name": "ARPANET", "desc": "Advanced Research Projects Agency Network (US Dept of Defense). First packet-switching network. First message 'LO' (intended 'LOGIN')."},
                {"year": 1983, "name": "TCP/IP Adoption", "desc": "ARPANET officially switched from NCP to TCP/IP on January 1, 1983 ('Flag Day' - birth of the modern Internet)."},
                {"year": 1989, "name": "World Wide Web (WWW)", "desc": "Invented by Tim Berners-Lee at CERN (Switzerland). Also created HTML, HTTP, URL, and the first web browser 'WorldWideWeb' (later renamed Nexus)."},
                {"year": 1993, "name": "Mosaic Browser", "desc": "First widely popular graphical web browser developed by Marc Andreessen at NCSA."},
                {"year": 1995, "name": "Internet in India", "desc": "Launched publicly on August 15, 1995 by Videsh Sanchar Nigam Limited (VSNL)."}
            ],
            "keyPioneers": [
                {"person": "Vint Cerf & Bob Kahn", "title": "Fathers of the Internet (designed TCP/IP protocols)."},
                {"person": "Tim Berners-Lee", "title": "Father of the World Wide Web (WWW)."},
                {"person": "Ray Tomlinson", "title": "Father of Email (invented network email on ARPANET and chose '@' symbol in 1971)."}
            ]
        },
        {
            "id": "url-anatomy",
            "title": "URL Anatomy & Domain Names",
            "hindiTitle": "URL की संरचना और डोमेन नाम",
            "urlStructure": {
                "example": "https://www.bankexam.org.in:443/syllabus/computer?topic=networking#osi-layers",
                "components": [
                    {"part": "Protocol / Scheme", "value": "https://", "desc": "Specifies communication protocol and encryption mechanism."},
                    {"part": "Subdomain", "value": "www.", "desc": "Subdivision of main domain name."},
                    {"part": "Second-Level Domain", "value": "bankexam", "desc": "Unique organizational name chosen by registrant."},
                    {"part": "Top-Level Domain (TLD)", "value": ".org", "desc": "Generic TLD (.com = commercial, .org = non-profit, .edu = educational, .gov = government)."},
                    {"part": "Country Code TLD (ccTLD)", "value": ".in", "desc": "Geographic designation (.in = India, .uk = United Kingdom, .au = Australia)."},
                    {"part": "Port Number", "value": ":443", "desc": "Network port service (often omitted when using default ports like 80 or 443)."},
                    {"part": "Path", "value": "/syllabus/computer", "desc": "Hierarchical location of the resource on web server file structure."},
                    {"part": "Query String", "value": "?topic=networking", "desc": "Key-value parameters passed to the server script (starts with '?')."},
                    {"part": "Fragment / Anchor", "value": "#osi-layers", "desc": "Bookmark that scrolls directly to specific section within HTML page (starts with '#')."}
                ]
            },
            "dnsHierarchy": {
                "desc": "DNS (Domain Name System) translates human-readable domain names (www.rbi.org.in) into machine IP addresses (104.18.22.1).",
                "flow": [
                    {"step": 1, "name": "Browser Cache", "detail": "Browser checks its local cache and OS cache."},
                    {"step": 2, "name": "Resolving Name Server", "detail": "Queries ISP recursive resolver."},
                    {"step": 3, "name": "Root Name Servers", "detail": "13 worldwide root server clusters (.) redirect to TLD servers."},
                    {"step": 4, "name": "TLD Name Servers", "detail": "Directs to Authoritative Server for .in or .org."},
                    {"step": 5, "name": "Authoritative Name Server", "detail": "Returns the exact IP address to resolver and client."}
                ]
            }
        },
        {
            "id": "email-architecture",
            "title": "Email Architecture & Headers",
            "hindiTitle": "ईमेल संरचना और हेडर",
            "components": [
                {"name": "MUA (Mail User Agent)", "desc": "Email client software used by the user (Outlook, Thunderbird, Gmail web client)."},
                {"name": "MTA (Mail Transfer Agent)", "desc": "Server software that routes emails using SMTP (Postfix, Sendmail, Exchange)."},
                {"name": "MDA (Mail Delivery Agent)", "desc": "Delivers email into the recipient's mailbox on the destination server."}
            ],
            "headers": [
                {"field": "To", "desc": "Primary intended recipient(s). All recipients can see everyone in 'To' and 'Cc'."},
                {"field": "Cc (Carbon Copy)", "desc": "Secondary recipients kept informed. Visible to all other recipients."},
                {"field": "Bcc (Blind Carbon Copy)", "desc": "Secret recipients. Hidden from 'To' and 'Cc' recipients to protect recipient privacy."},
                {"field": "MIME (Multipurpose Internet Mail Extensions)", "desc": "Extends format of email to support non-ASCII text, audio, video, images, and attachments."}
            ]
        },
        {
            "id": "cloud-computing",
            "title": "Cloud Computing Architecture",
            "hindiTitle": "क्लाउड कंप्यूटिंग संरचना",
            "serviceModels": [
                {"model": "IaaS (Infrastructure as a Service)", "vendorManages": "Virtualization, Servers, Storage, Networking", "userManages": "OS, Middleware, Runtime, Data, Applications", "examples": "Amazon EC2, Google Compute Engine, Microsoft Azure VMs"},
                {"model": "PaaS (Platform as a Service)", "vendorManages": "Virtualization, Servers, Storage, Networking, OS, Runtime", "userManages": "Applications and Data", "examples": "Google App Engine, AWS Elastic Beanstalk, Heroku"},
                {"model": "SaaS (Software as a Service)", "vendorManages": "Everything (Hardware to Application software)", "userManages": "End-user configuration only", "examples": "Google Workspace (Gmail, Docs), Microsoft 365, Salesforce, Dropbox"}
            ],
            "deploymentModels": [
                {"type": "Public Cloud", "desc": "Services owned and operated by third-party provider, shared multi-tenant infrastructure."},
                {"type": "Private Cloud", "desc": "Infrastructure dedicated exclusively to a single organization (highest security for banks)."},
                {"type": "Hybrid Cloud", "desc": "Combines public and private clouds bound together by technology allowing data/apps to be shared between them."},
                {"type": "Community Cloud", "desc": "Shared infrastructure for organizations with common concerns (e.g. shared banking compliance platform)."}
            ]
        }
    ]
}

# 4. cybersecurity.json
cybersecurity_data = {
    "module": "Cybersecurity, Cryptography & IT Law",
    "version": "2026.1",
    "sections": [
        {
            "id": "malware-types",
            "title": "Malware Taxonomy & Classification",
            "hindiTitle": "मैलवेयर का वर्गीकरण",
            "malwareList": [
                {
                    "name": "Virus (Vital Information Resources Under Siege)",
                    "spreadMechanism": "Attaches itself to an executable program/file. Requires human action (running infected file) to replicate and spread.",
                    "damage": "Corrupts files, deletes data, alters system settings.",
                    "historicalFirst": "Creeper (1971) on ARPANET; Brain (1986) was first IBM PC virus created by two Pakistani brothers."
                },
                {
                    "name": "Worm",
                    "spreadMechanism": "Self-replicating standalone program. DOES NOT require a host file or user intervention. Spreads autonomously over computer networks exploiting software vulnerabilities.",
                    "damage": "Consumes massive network bandwidth, crashes servers.",
                    "historicalFirst": "Morris Worm (1988) written by Robert Tappan Morris."
                },
                {
                    "name": "Trojan Horse",
                    "spreadMechanism": "Disguises itself as legitimate, useful software (e.g., free game, codec, utility). Once installed, secretly executes a malicious payload.",
                    "keyDifference": "CANNOT replicate itself (unlike viruses and worms). Often installs backdoors."
                },
                {
                    "name": "Ransomware",
                    "spreadMechanism": "Encrypts victim's critical files using unbreakable asymmetric cryptography and demands ransom (usually in Bitcoin/cryptocurrency) for the decryption key.",
                    "notableExamples": "WannaCry (2017, exploited NSA EternalBlue exploit), NotPetya, LockBit."
                },
                {
                    "name": "Spyware & Keylogger",
                    "spreadMechanism": "Secretly monitors user activities, captures keystrokes (banking passwords, credit card numbers), web history, and sends to attackers.",
                    "mitigation": "Virtual on-screen keyboards used by banks to defeat hardware/software keyloggers."
                },
                {
                    "name": "Rootkit",
                    "spreadMechanism": "Collection of software tools that grants privileged root/administrator access while actively concealing its presence from OS and antivirus tools by subverting the kernel."
                },
                {
                    "name": "Botnet & Zombies",
                    "spreadMechanism": "Network of infected internet-connected devices (bots/zombies) controlled remotely by a 'Bot Herder' via Command and Control (C2) servers. Used to launch massive DDoS attacks."
                }
            ]
        },
        {
            "id": "cyber-attacks",
            "title": "Common Cyber Attacks in Banking",
            "hindiTitle": "बैंकिंग में प्रमुख साइबर हमले",
            "attacks": [
                {"name": "Phishing", "desc": "Fraudulent communication (usually email) disguised as trustworthy entity (e.g. Bank SBI, RBI) to trick user into revealing sensitive credentials."},
                {"name": "Spear Phishing", "desc": "Highly targeted phishing aimed at a specific individual or organization with personalized details."},
                {"name": "Whaling", "desc": "Phishing targeted specifically at high-profile senior executives (CEOs, CFOs, Board members)."},
                {"name": "Vishing (Voice Phishing)", "desc": "Phone call scams pretending to be bank customer care demanding OTP or CVV."},
                {"name": "Smishing (SMS Phishing)", "desc": "Fraudulent text messages containing malicious links claiming account deactivation or lottery reward."},
                {"name": "Man-in-the-Middle (MitM)", "desc": "Attacker secretly intercepts and relays communications between two parties who believe they are communicating directly (mitigated by TLS certificates and HSTS)."},
                {"name": "DoS & DDoS (Distributed Denial of Service)", "desc": "Overwhelming a target server or banking portal with massive floods of bogus traffic to exhaust server resources and deny service to genuine bank customers."},
                {"name": "SQL Injection (SQLi)", "desc": "Inserting malicious SQL query statements via web application input fields (login box) to manipulate backend database and extract secret records."},
                {"name": "Cross-Site Scripting (XSS)", "desc": "Injecting malicious client-side JavaScript scripts into trusted websites visited by other users to steal session cookies."},
                {"name": "Zero-Day Vulnerability", "desc": "A security flaw that is unknown to the software vendor and has zero days of patch protection when actively exploited."}
            ]
        },
        {
            "id": "cryptography",
            "title": "Cryptography & Digital Signatures",
            "hindiTitle": "क्रिप्टोग्राफी और डिजिटल हस्ताक्षर",
            "ciaTriad": {
                "confidentiality": "Ensures information is accessible only to authorized entities (achieved via Encryption).",
                "integrity": "Guarantees data is not altered or tampered with in transit (achieved via Cryptographic Hashing).",
                "availability": "Ensures systems and data are readily accessible to authorized users when needed (resilience against DoS)."
            },
            "ciphers": [
                {
                    "type": "Symmetric Encryption (Secret Key)",
                    "mechanism": "Uses the SAME single secret key for both encryption and decryption.",
                    "algorithms": "DES (56-bit, obsolete), 3DES, AES (Advanced Encryption Standard - 128, 192, 256-bit, worldwide standard), Blowfish, RC4.",
                    "speed": "Very fast, computationally lightweight. Key distribution is challenging."
                },
                {
                    "type": "Asymmetric Encryption (Public Key)",
                    "mechanism": "Uses a KEY PAIR: Public Key (freely shared, used to encrypt) and Private Key (kept strictly secret, used to decrypt).",
                    "algorithms": "RSA (Rivest-Shamir-Adleman), ECC (Elliptic Curve Cryptography), Diffie-Hellman Key Exchange, DSA.",
                    "speed": "Slower than symmetric, computationally intensive. Solves key distribution problem."
                }
            ],
            "hashingVsEncryption": {
                "encryption": "Two-way function. Plaintext can be encrypted into ciphertext and decrypted back into plaintext using the appropriate key.",
                "hashing": "One-way mathematical function (Hash Function). Takes arbitrary input and produces fixed-length digest (e.g. SHA-256 produces 256 bits). Cannot be reversed. Used for password storage and integrity verification."
            },
            "digitalSignature": {
                "definition": "Mathematical scheme for demonstrating the authenticity and integrity of digital messages/documents.",
                "signingProcess": "Sender generates hash of message -> encrypts hash using SENDER'S PRIVATE KEY = Digital Signature.",
                "verificationProcess": "Receiver decrypts signature using SENDER'S PUBLIC KEY to recover original hash -> computes new hash of received message -> if both match, signature is authentic!",
                "properties": "Guarantees: 1. Authenticity, 2. Non-Repudiation (sender cannot deny having sent it), 3. Data Integrity."
            }
        },
        {
            "id": "it-act-india",
            "title": "Information Technology (IT) Act, 2000 & CERT-In",
            "hindiTitle": "सूचना प्रौद्योगिकी (IT) अधिनियम 2000 एवं CERT-In",
            "enacted": "Passed in May 2000, notified on October 17, 2000. Major amendment in 2008 (effective October 27, 2009). Based on UNCITRAL Model Law on Electronic Commerce.",
            "keySections": [
                {"section": "Section 43", "crime": "Penalty and compensation for damage to computer systems (unauthorized copying, introducing virus, denying access)."},
                {"section": "Section 65", "crime": "Tampering with computer source documents (up to 3 years imprisonment or fine up to ₹2 lakh)."},
                {"section": "Section 66", "crime": "Computer-related offences / Hacking (up to 3 years imprisonment or fine up to ₹5 lakh)."},
                {"section": "Section 66B", "crime": "Punishment for dishonestly receiving stolen computer resource or communication device."},
                {"section": "Section 66C", "crime": "Punishment for identity theft (using electronic signature, password of another person)."},
                {"section": "Section 66D", "crime": "Punishment for cheating by personation by using computer resource (phishing scams)."},
                {"section": "Section 66E", "crime": "Punishment for violation of privacy (capturing/publishing private images without consent)."},
                {"section": "Section 66F", "crime": "Punishment for Cyber Terrorism (attacks on critical infrastructure; punishable with life imprisonment)."},
                {"section": "Section 66A", "crime": "Criminalized sending offensive messages through communication services. STRUCK DOWN by Supreme Court in Shreya Singhal v. Union of India (2015) as unconstitutional."}
            ],
            "certIn": {
                "name": "Indian Computer Emergency Response Team (CERT-In)",
                "established": "January 2004 under Section 70B of the IT Act.",
                "role": "National nodal agency for responding to computer security incidents, issuing security advisories, handling incident response for Indian cyber space."
            }
        }
    ]
}

with open(os.path.join(OUTPUT_DIR, "networking.json"), "w", encoding="utf-8") as f:
    json.dump(networking_data, f, indent=2, ensure_ascii=False)

with open(os.path.join(OUTPUT_DIR, "protocols-osi.json"), "w", encoding="utf-8") as f:
    json.dump(protocols_osi_data, f, indent=2, ensure_ascii=False)

with open(os.path.join(OUTPUT_DIR, "internet.json"), "w", encoding="utf-8") as f:
    json.dump(internet_data, f, indent=2, ensure_ascii=False)

with open(os.path.join(OUTPUT_DIR, "cybersecurity.json"), "w", encoding="utf-8") as f:
    json.dump(cybersecurity_data, f, indent=2, ensure_ascii=False)

print("Networking, OSI/Protocols, Internet, and Cybersecurity generated successfully.")
