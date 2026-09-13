import json
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "data")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 1. pyq.json
pyq_data = {
    "module": "Bank Exam Previous Year Questions (PYQ) Matrix & Shift Analytics",
    "version": "2026.1",
    "examPatterns": [
        {
            "exam": "IBPS RRB Office Assistant (Multipurpose) Mains",
            "totalQuestions": 40,
            "totalMarks": 20,
            "markPerQuestion": 0.5,
            "negativeMark": 0.125,
            "recommendedTime": "15-20 minutes",
            "scoringPotential": "17.5+ out of 20 (High scoring rank booster)",
            "role": "MANDATORY dedicated section in Mains exam."
        },
        {
            "exam": "IBPS RRB Officer Scale-I (PO) Mains",
            "totalQuestions": 40,
            "totalMarks": 20,
            "markPerQuestion": 0.5,
            "negativeMark": 0.125,
            "recommendedTime": "15-20 minutes",
            "scoringPotential": "16+ out of 20",
            "role": "MANDATORY dedicated section in Mains exam."
        },
        {
            "exam": "SBI Clerk & IBPS Clerk Mains",
            "format": "Reasoning Ability & Computer Aptitude (Merged section: 50 Qs, 60 Marks, 45 Mins)",
            "trend": "Questions are framed as binary logic/flowcharts, digital banking, cybersecurity, and emerging payment systems integrated with reasoning patterns."
        }
    ],
    "yearlyTrends": [
        {
            "year": "2024-2025",
            "difficulty": "Moderate",
            "shiftInsights": "Increased weightage on Digital Banking (NPCI systems, UPI limits, e-Rupee CBDC), Ransomware/Phishing attacks, and MS Excel formula outputs. Classic shortcut keys remained consistent.",
            "topicDistribution": [
                {"topic": "MS Office (Word, Excel, PPT)", "weightage": "22%", "questionCount": "8-10"},
                {"topic": "Networking & Protocols (OSI, Ports, IP)", "weightage": "20%", "questionCount": "7-9"},
                {"topic": "Digital Banking & Cybersecurity", "weightage": "18%", "questionCount": "6-8"},
                {"topic": "Hardware & Memory Hierarchy", "weightage": "15%", "questionCount": "5-7"},
                {"topic": "Operating Systems & Shortcuts", "weightage": "12%", "questionCount": "4-6"},
                {"topic": "Database & Programming Basics", "weightage": "8%", "questionCount": "3-4"},
                {"topic": "Emerging Tech & AI", "weightage": "5%", "questionCount": "2-3"}
            ]
        },
        {
            "year": "2023",
            "difficulty": "Easy to Moderate",
            "shiftInsights": "Heavy focus on OSI layers, differences between Hub and Switch, FAT32 file size limit, and keyboard hotkeys (Ctrl+M, Shift+F7).",
            "topicDistribution": [
                {"topic": "MS Office Suite", "weightage": "25%", "questionCount": "10"},
                {"topic": "Networking & OSI Model", "weightage": "22%", "questionCount": "9"},
                {"topic": "Hardware & Storage Units", "weightage": "18%", "questionCount": "7"},
                {"topic": "Cybersecurity & Malware", "weightage": "15%", "questionCount": "6"},
                {"topic": "Operating Systems", "weightage": "10%", "questionCount": "4"},
                {"topic": "Database & SQL", "weightage": "10%", "questionCount": "4"}
            ]
        },
        {
            "year": "2022",
            "difficulty": "Easy",
            "shiftInsights": "Fundamental definitions: ROM vs RAM, Compiler vs Interpreter, 1st-5th computer generations, binary addition, and full forms (MICR, RTGS, ASCII).",
            "topicDistribution": [
                {"topic": "Fundamentals & History", "weightage": "20%", "questionCount": "8"},
                {"topic": "MS Office & Shortcuts", "weightage": "24%", "questionCount": "10"},
                {"topic": "Networking & Internet", "weightage": "20%", "questionCount": "8"},
                {"topic": "Memory & Storage", "weightage": "16%", "questionCount": "6"},
                {"topic": "Security & Viruses", "weightage": "12%", "questionCount": "5"},
                {"topic": "DBMS", "weightage": "8%", "questionCount": "3"}
            ]
        }
    ],
    "trapCategories": [
        {
            "trap": "Ctrl + N vs Ctrl + M in PowerPoint",
            "trapDesc": "Aspirants assume Ctrl+N creates a new slide. Actually, Ctrl+N opens a new presentation file. Ctrl+M inserts a NEW SLIDE.",
            "frequency": "High"
        },
        {
            "trap": "SPOOLing vs Buffering Memory Device",
            "trapDesc": "SPOOLing uses Hard Disk as the buffer, whereas Buffering uses RAM.",
            "frequency": "Very High"
        },
        {
            "trap": "Degree vs Cardinality in Databases",
            "trapDesc": "Degree = Number of columns/attributes; Cardinality = Number of rows/tuples. Easily inverted under exam pressure.",
            "frequency": "High"
        },
        {
            "trap": "Trojan Horse Replicating Capability",
            "trapDesc": "Unlike Viruses and Worms, a Trojan Horse CANNOT replicate or multiply on its own.",
            "frequency": "High"
        },
        {
            "trap": "IMPS vs RTGS Minimum Limit",
            "trapDesc": "RTGS has a strict minimum limit of ₹2,00,000. NEFT and IMPS have a minimum limit of ₹1.",
            "frequency": "Very High"
        },
        {
            "trap": "Max Zoom in Word vs Excel/PowerPoint",
            "trapDesc": "Word allows up to 500% zoom. Excel and PowerPoint allow up to 400% zoom.",
            "frequency": "Moderate"
        }
    ]
}

# 2. mock-presets.json
mock_presets_data = {
    "presets": [
        {
            "id": "rrb-full-mains-1",
            "title": "IBPS RRB Clerk Mains Full Mock 1",
            "badge": "Full Exam Level",
            "description": "Standard 40 questions pattern for RRB Office Assistant Mains exam (20 minutes, 20 marks, -0.125 negative marking).",
            "questionCount": 40,
            "durationMinutes": 20,
            "marksPerQuestion": 0.5,
            "negativeMark": 0.125,
            "filter": "all",
            "difficulty": "All"
        },
        {
            "id": "rrb-full-mains-2",
            "title": "IBPS RRB PO Mains High-Yield Mock 2",
            "badge": "Challenger Level",
            "description": "Moderate-to-hard level 40 questions covering in-depth networking, cybersecurity, SQL, and digital banking.",
            "questionCount": 40,
            "durationMinutes": 20,
            "marksPerQuestion": 0.5,
            "negativeMark": 0.125,
            "filter": "all",
            "difficulty": "Moderate-Hard"
        },
        {
            "id": "speed-drill-15",
            "title": "Rapid Fire Speed Drill (15 Qs)",
            "badge": "Speed Booster",
            "description": "15 high-frequency questions in 5 minutes (20 seconds per question) to train rapid recall for shortcuts and full forms.",
            "questionCount": 15,
            "durationMinutes": 5,
            "marksPerQuestion": 1.0,
            "negativeMark": 0.25,
            "filter": "shortcuts-fullforms",
            "difficulty": "Speed"
        },
        {
            "id": "office-shortcuts-special",
            "title": "MS Office & Keyboard Hotkeys Special",
            "badge": "Topic Focus",
            "description": "25 questions focusing strictly on Word, Excel formulas, PowerPoint, and hotkeys.",
            "questionCount": 25,
            "durationMinutes": 12,
            "marksPerQuestion": 1.0,
            "negativeMark": 0.25,
            "filter": "ms-office",
            "difficulty": "All"
        },
        {
            "id": "networking-security-special",
            "title": "Networking, OSI Layers & Cybersecurity",
            "badge": "Topic Focus",
            "description": "25 questions testing OSI layers, protocols, port numbers, cyber attacks, and IT Act.",
            "questionCount": 25,
            "durationMinutes": 12,
            "marksPerQuestion": 1.0,
            "negativeMark": 0.25,
            "filter": "networking-security",
            "difficulty": "All"
        },
        {
            "id": "digital-banking-fintech",
            "title": "Digital Banking, Finacle & NPCI Rails",
            "badge": "Banking Special",
            "description": "20 questions covering RTGS, NEFT, IMPS, UPI limits, CTS MICR, EMV chips, and RBI guidelines.",
            "questionCount": 20,
            "durationMinutes": 10,
            "marksPerQuestion": 1.0,
            "negativeMark": 0.25,
            "filter": "digital-banking",
            "difficulty": "All"
        }
    ]
}

# 3. study-plans.json
study_plans_data = {
    "plans": [
        {
            "id": "plan-30-days",
            "title": "30-Day Comprehensive Foundation to Ranker Roadmap",
            "target": "Aspirants targeting 18+ out of 20 marks in RRB Office Assistant / PO Mains",
            "dailyCommitment": "45 - 60 minutes daily",
            "weeks": [
                {
                    "week": 1,
                    "title": "Computer Fundamentals, Architecture & Memory Hierarchy",
                    "days": [
                        {"day": 1, "topic": "Generations of Computers & Hardware Components", "action": "Read Fundamentals module, inspect CPU Simulator."},
                        {"day": 2, "topic": "CPU Architecture, Registers & Machine Cycle", "action": "Run Fetch-Decode-Execute pipeline simulator."},
                        {"day": 3, "topic": "Primary Memory (RAM, ROM, Cache L1-L3)", "action": "Study Memory Hierarchy and solve 25 memory MCQs."},
                        {"day": 4, "topic": "Secondary Storage & File Systems (FAT32 vs NTFS)", "action": "Compare storage drives and write flashcards."},
                        {"day": 5, "topic": "Number Systems & Binary Conversions", "action": "Use Number System Converter tool (Dec, Bin, Oct, Hex)."},
                        {"day": 6, "topic": "Ports, Buses (PCI, SATA) & Peripheral Devices", "action": "Review I/O devices and connectors."},
                        {"day": 7, "topic": "Weekly Revision & Milestone Quiz 1", "action": "Take 30 questions quiz on Week 1 topics."}
                    ]
                },
                {
                    "week": 2,
                    "title": "Operating Systems & Microsoft Office Mastery",
                    "days": [
                        {"day": 8, "topic": "OS Functions & Types (RTOS, Time-Sharing)", "action": "Read OS module and Spooling vs Buffering notes."},
                        {"day": 9, "topic": "Booting Process (POST, BIOS vs UEFI, MBR vs GPT)", "action": "Memorize 7 boot steps and cold vs warm boot."},
                        {"day": 10, "topic": "MS Word: Ribbon Tabs, Mail Merge, Formatting", "action": "Learn Word tab actions and margin definitions."},
                        {"day": 11, "topic": "MS Excel: Grid Architecture & Core Functions", "action": "Practice with Mini Excel Simulator (=SUM, =IF)."},
                        {"day": 12, "topic": "MS Excel: Cell References ($A$1) & Error Codes", "action": "Memorize 8 Excel error types (#DIV/0!, #REF!)."},
                        {"day": 13, "topic": "MS PowerPoint & Universal Keyboard Shortcuts", "action": "Drill top 50 shortcuts in Keyboard Shortcut Lab."},
                        {"day": 14, "topic": "Weekly Revision & Milestone Quiz 2", "action": "Take 35 questions quiz on Office & OS."}
                    ]
                },
                {
                    "week": 3,
                    "title": "Computer Networks, OSI Model & Cybersecurity",
                    "days": [
                        {"day": 15, "topic": "Network Types (LAN, MAN, WAN) & Topologies", "action": "Build topologies in Network Topology Builder."},
                        {"day": 16, "topic": "Network Hardware (Hub, Switch, Router, Gateway)", "action": "Understand collision vs broadcast domains."},
                        {"day": 17, "topic": "7 OSI Layers & TCP/IP Stack In-Depth", "action": "Use OSI Layer Inspector interactive simulator."},
                        {"day": 18, "topic": "Protocols & Port Numbers (80, 443, 21, 25, 110, 143)", "action": "Memorize master port directory."},
                        {"day": 19, "topic": "IP Addressing: IPv4 Classes & Subnetting Basics vs IPv6", "action": "Review private IP ranges and loopback."},
                        {"day": 20, "topic": "Malware Types (Virus, Worm, Trojan, Ransomware)", "action": "Read cybersecurity taxonomy and mitigation."},
                        {"day": 21, "topic": "Cyber Attacks & Cryptography (Symmetric vs Asymmetric)", "action": "Run Phishing Attack Detector simulator."}
                    ]
                },
                {
                    "week": 4,
                    "title": "Database, Digital Banking & Full Exam Simulation",
                    "days": [
                        {"day": 22, "topic": "DBMS Concepts, Keys & Normalization (1NF - BCNF)", "action": "Learn Candidate/Primary/Foreign Keys and ACID."},
                        {"day": 23, "topic": "SQL Sub-Languages (DDL, DML, DQL, DCL, TCL)", "action": "Review DROP vs TRUNCATE vs DELETE."},
                        {"day": 24, "topic": "Programming Basics & Data Structures (Stack, Queue)", "action": "Inspect Stack/Queue animations in DS Visualizer."},
                        {"day": 25, "topic": "Digital Banking: RTGS, NEFT, IMPS, UPI, AePS, CTS", "action": "Memorize timing, limits, and settlement matrix."},
                        {"day": 26, "topic": "Card Tech, RBI Guidelines, IT Act 2000 & CERT-In", "action": "Study Section 66, CISO, and SOC rules."},
                        {"day": 27, "topic": "Abbreviations Dictionary & Flashcards Review", "action": "Review Leitner 5-box spaced repetition deck."},
                        {"day": 28, "topic": "Full Length Mock Test 1 (RRB Mains 40 Qs)", "action": "Simulate real exam under 20 minutes timer."},
                        {"day": 29, "topic": "Mistakes Notebook Analysis & Full Length Mock Test 2", "action": "Review weak concepts and take Mock 2."},
                        {"day": 30, "topic": "Final Exam Eve High-Yield Revision", "action": "Review 50 Top Exam Traps & full forms."}
                    ]
                }
            ]
        },
        {
            "id": "plan-15-days",
            "title": "15-Day High-Yield Sprint",
            "target": "Candidates with basic knowledge wanting rapid revision and score maximization",
            "dailyCommitment": "60 - 90 minutes daily",
            "days": [
                {"day": 1, "focus": "Fundamentals, CPU Architecture & Memory Hierarchy"},
                {"day": 2, "focus": "Operating Systems & Spooling/Buffering"},
                {"day": 3, "focus": "MS Word & Ribbon Tabs"},
                {"day": 4, "focus": "MS Excel Formulas, Errors & Cell References"},
                {"day": 5, "focus": "MS PowerPoint & Top 70 Keyboard Shortcuts"},
                {"day": 6, "focus": "Network Topologies & Network Hardware"},
                {"day": 7, "focus": "OSI 7 Layers & Master Port Numbers"},
                {"day": 8, "focus": "IPv4 vs IPv6 & Internet/DNS Architecture"},
                {"day": 9, "focus": "Cybersecurity, Malware Taxonomy & IT Act"},
                {"day": 10, "focus": "Database Concepts, Keys & SQL Sub-Languages"},
                {"day": 11, "focus": "Data Structures (Stack/Queue) & Translators"},
                {"day": 12, "focus": "Digital Banking Systems (RTGS/NEFT/IMPS/UPI/CTS)"},
                {"day": 13, "focus": "Full Abbreviations Dictionary & Speed Drills"},
                {"day": 14, "focus": "Full Mock Test 1 & Weakness Analysis"},
                {"day": 15, "focus": "Full Mock Test 2 & Mistakes Notebook Review"}
            ]
        }
    ]
}

with open(os.path.join(OUTPUT_DIR, "pyq.json"), "w", encoding="utf-8") as f:
    json.dump(pyq_data, f, indent=2, ensure_ascii=False)

with open(os.path.join(OUTPUT_DIR, "mock-presets.json"), "w", encoding="utf-8") as f:
    json.dump(mock_presets_data, f, indent=2, ensure_ascii=False)

with open(os.path.join(OUTPUT_DIR, "study-plans.json"), "w", encoding="utf-8") as f:
    json.dump(study_plans_data, f, indent=2, ensure_ascii=False)

print("PYQ matrix, Mock Presets, and Study Plans generated successfully.")
