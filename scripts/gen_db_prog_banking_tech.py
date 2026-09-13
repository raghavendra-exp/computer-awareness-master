import json
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "data")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 1. database.json
database_data = {
    "module": "Database Management Systems (DBMS) & SQL",
    "version": "2026.1",
    "sections": [
        {
            "id": "dbms-fundamentals",
            "title": "DBMS Architecture & Relational Concepts",
            "hindiTitle": "DBMS संरचना एवं रिलेशनल अवधारणाएँ",
            "overview": "A Database Management System (DBMS) is software designed to store, retrieve, manage, and query structured data systematically.",
            "coreTerms": [
                {"term": "Table / Relation", "desc": "A two-dimensional grid composed of rows and columns."},
                {"term": "Tuple (Row / Record)", "desc": "A single row representing one complete data entity record."},
                {"term": "Attribute (Column / Field)", "desc": "A vertical column representing a specific characteristic or property of the entity."},
                {"term": "Domain", "desc": "The set of all permissible values that an attribute is allowed to hold."},
                {"term": "Degree", "desc": "The total NUMBER OF ATTRIBUTES (columns) in a relation. High-frequency exam question!"},
                {"term": "Cardinality", "desc": "The total NUMBER OF TUPLES (rows) in a relation. High-frequency exam question!"}
            ],
            "keys": [
                {"name": "Super Key", "desc": "Any set of one or more attributes that can uniquely identify a tuple within a relation."},
                {"name": "Candidate Key", "desc": "A minimal Super Key without redundant attributes. A table can have multiple candidate keys."},
                {"name": "Primary Key", "desc": "The candidate key specifically chosen by the database designer to uniquely identify records. MUST BE UNIQUE and CANNOT CONTAIN NULL VALUES."},
                {"name": "Alternate Key", "desc": "Any candidate key that was NOT chosen as the primary key (Secondary Key)."},
                {"name": "Foreign Key", "desc": "An attribute in a table that references the Primary Key of another table, establishing a relationship between the two and enforcing Referential Integrity."},
                {"name": "Composite Key", "desc": "A primary key composed of two or more attributes together to form a unique identifier."}
            ]
        },
        {
            "id": "acid-properties",
            "title": "ACID Properties in Transactions",
            "hindiTitle": "ट्रांजैक्शन में ACID गुण",
            "overview": "ACID properties ensure reliable processing of database transactions, especially critical in financial and banking software.",
            "properties": [
                {"letter": "A", "name": "Atomicity", "motto": "'All or Nothing'", "desc": "A transaction must execute completely or not at all. If any step fails (e.g. power loss during money transfer), the entire transaction rolls back to original state."},
                {"letter": "C", "name": "Consistency", "motto": "'Valid States Only'", "desc": "A transaction transforms database from one valid consistent state to another, satisfying all integrity constraints (e.g. Total account balances preserved)."},
                {"letter": "I", "name": "Isolation", "motto": "'Independent Execution'", "desc": "Concurrent execution of multiple transactions results in a system state as if they were executed sequentially. Uncommitted changes are hidden from other transactions."},
                {"letter": "D", "name": "Durability", "motto": "'Permanent Changes'", "desc": "Once a transaction is committed, its effects are permanently recorded in non-volatile storage and survive any subsequent system crash or power outage."}
            ]
        },
        {
            "id": "normalization",
            "title": "Database Normalization (1NF to BCNF)",
            "hindiTitle": "डेटाबेस सामान्यीकरण (1NF से BCNF)",
            "purpose": "Process of organizing relations to minimize data redundancy (duplicate storage) and eliminate insertion, update, and deletion anomalies.",
            "levels": [
                {"form": "1NF (First Normal Form)", "rule": "Each column must contain atomic (indivisible) values. No repeating groups or multi-valued attributes allowed."},
                {"form": "2NF (Second Normal Form)", "rule": "Must be in 1NF AND have NO Partial Functional Dependencies (no non-prime attribute should depend on a proper subset of candidate key). All non-key attributes must be fully functionally dependent on primary key."},
                {"form": "3NF (Third Normal Form)", "rule": "Must be in 2NF AND have NO Transitive Dependencies (no non-prime attribute should determine another non-prime attribute). If X -> Y, then either X is a super key or Y is a prime attribute."},
                {"form": "BCNF (Boyce-Codd Normal Form)", "rule": "Strict 3.5NF: For every non-trivial functional dependency X -> Y, X MUST be a Super Key."}
            ]
        },
        {
            "id": "sql-categories",
            "title": "SQL Sub-Languages & Core Commands",
            "hindiTitle": "SQL श्रेणियाँ और प्रमुख कमांड",
            "categories": [
                {
                    "acronym": "DDL",
                    "name": "Data Definition Language",
                    "desc": "Defines and alters database schema and structure.",
                    "commands": [
                        {"cmd": "CREATE", "usage": "Creates database objects (tables, views, indexes, schemas)."},
                        {"cmd": "ALTER", "usage": "Modifies structure of existing table (adds, modifies, or drops columns)."},
                        {"cmd": "DROP", "usage": "Permanently deletes database object and its structure from disk."},
                        {"cmd": "TRUNCATE", "usage": "Removes all rows from a table rapidly while retaining table structure. Cannot be rolled back in standard DDL."}
                    ]
                },
                {
                    "acronym": "DML",
                    "name": "Data Manipulation Language",
                    "desc": "Manipulates data records stored within relations.",
                    "commands": [
                        {"cmd": "INSERT", "usage": "Inserts new rows into a table (`INSERT INTO table VALUES (...)`)."},
                        {"cmd": "UPDATE", "usage": "Modifies existing data values in one or more rows (`UPDATE table SET col = val WHERE condition`)."},
                        {"cmd": "DELETE", "usage": "Removes specific rows satisfying a condition (`DELETE FROM table WHERE condition`)."}
                    ]
                },
                {
                    "acronym": "DQL",
                    "name": "Data Query Language",
                    "desc": "Queries and retrieves data.",
                    "commands": [
                        {"cmd": "SELECT", "usage": "Retrieves records matching criteria (`SELECT cols FROM table WHERE ... GROUP BY ... HAVING ... ORDER BY`)."}
                    ]
                },
                {
                    "acronym": "DCL",
                    "name": "Data Control Language",
                    "desc": "Controls security, permissions, and rights.",
                    "commands": [
                        {"cmd": "GRANT", "usage": "Gives user access privileges to database objects."},
                        {"cmd": "REVOKE", "usage": "Withdraws previously granted access privileges."}
                    ]
                },
                {
                    "acronym": "TCL",
                    "name": "Transaction Control Language",
                    "desc": "Manages transactional boundaries in DML operations.",
                    "commands": [
                        {"cmd": "COMMIT", "usage": "Permanently saves all changes of the current transaction to disk."},
                        {"cmd": "ROLLBACK", "usage": "Undoes all changes made since the last commit or savepoint."},
                        {"cmd": "SAVEPOINT", "usage": "Sets an intermediate checkpoint within a transaction for partial rollback."}
                    ]
                }
            ],
            "dropVsTruncateVsDelete": {
                "drop": "DDL command. Deletes entire table data AND table schema definition. Cannot be rolled back.",
                "truncate": "DDL command. Deletes ALL rows at once by deallocating pages; keeps table schema intact. Faster than DELETE.",
                "delete": "DML command. Deletes specific rows row-by-row based on WHERE clause. Can be rolled back if inside transaction."
            }
        }
    ]
}

# 2. programming-basics.json
programming_data = {
    "module": "Programming Basics, Languages & Data Structures",
    "version": "2026.1",
    "sections": [
        {
            "id": "language-generations",
            "title": "Generations of Programming Languages",
            "hindiTitle": "प्रोग्रामिंग भाषाओं की पीढ़ियाँ",
            "generations": [
                {"gen": "1GL (First Generation)", "type": "Machine Language", "desc": "Raw binary code (0s and 1s) directly executed by CPU hardware. Machine dependent, hardest to program.", "example": "Direct machine instructions"},
                {"gen": "2GL (Second Generation)", "type": "Assembly Language", "desc": "Uses human-readable alphanumeric Mnemonics (e.g., ADD, MOV, SUB, JMP). Translated into machine code by an Assembler.", "example": "x86 Assembly, ARM Assembly"},
                {"gen": "3GL (Third Generation)", "type": "High-Level Procedural Languages", "desc": "Machine-independent languages using English-like syntax and mathematical notations. Translated via Compilers or Interpreters.", "example": "C, C++, Java, Fortran, COBOL, BASIC, Pascal"},
                {"gen": "4GL (Fourth Generation)", "type": "Declarative & Query Languages", "desc": "Non-procedural languages focusing on 'WHAT to do' rather than 'HOW to do it'. Closer to natural language.", "example": "SQL, PL/SQL, MATLAB, ABAP"},
                {"gen": "5GL (Fifth Generation)", "type": "AI, Logic & Constraint-based", "desc": "Languages designed for artificial intelligence, expert systems, and problem-solving without programmer algorithm specifications.", "example": "Prolog, LISP, Mercury"}
            ]
        },
        {
            "id": "translators",
            "title": "Language Translators: Compiler vs Interpreter vs Assembler",
            "hindiTitle": "भाषा अनुवादक: कंपाइलर बनाम इंटरप्रेटर बनाम असेंबलर",
            "translators": [
                {
                    "name": "Compiler",
                    "execution": "Translates entire source code into machine/object code (.obj / .exe) in ONE single pass before execution.",
                    "speed": "Fast runtime execution once compiled.",
                    "errorReporting": "Displays all errors and warnings together after scanning entire file.",
                    "examples": "C, C++, Rust, Go, Fortran."
                },
                {
                    "name": "Interpreter",
                    "execution": "Translates and executes source code LINE BY LINE. Does not generate intermediate standalone executable file.",
                    "speed": "Slower runtime execution compared to compiled code.",
                    "errorReporting": "Stops execution immediately at the very first syntax error encountered.",
                    "examples": "Python, JavaScript, Ruby, PHP, Perl."
                },
                {
                    "name": "Assembler",
                    "execution": "Translates low-level Assembly mnemonic programs into raw Machine Language object code.",
                    "examples": "NASM, MASM, TASM."
                },
                {
                    "name": "Hybrid (JIT / Bytecode)",
                    "execution": "Compiles source code into architecture-neutral intermediate Bytecode (.class file), which is interpreted/JIT compiled by a Virtual Machine (JVM / CLR).",
                    "examples": "Java (javac compiles to bytecode, JVM executes), C# (.NET CLR)."
                }
            ]
        },
        {
            "id": "oop-concepts",
            "title": "Object-Oriented Programming (OOP) Pillars",
            "hindiTitle": "ऑब्जेक्ट ओरिएंटेड प्रोग्रामिंग के चार स्तंभ",
            "pillars": [
                {"name": "Class & Object", "desc": "A Class is a blueprint or user-defined prototype from which individual Objects (instances having state and behavior) are created."},
                {"name": "Encapsulation", "desc": "Bundling data (attributes) and methods that operate on that data into a single unit (class), restricting direct access to internal components (Data Hiding using private access specifiers)."},
                {"name": "Abstraction", "desc": "Representing essential features while hiding internal background implementation details from user (e.g., ATM screen shows 'Withdraw Money' without revealing internal banking queries)."},
                {"name": "Inheritance", "desc": "Mechanism where a new class (derived/child class) inherits properties and behaviors from an existing class (base/parent class). Promotes code reusability."},
                {"name": "Polymorphism", "desc": "'Many forms'. Ability of a message, function, or operator to be processed in more than one way (Compile-time: Method Overloading; Runtime: Method Overriding)."}
            ]
        },
        {
            "id": "data-structures",
            "title": "Core Data Structures & Complexity",
            "hindiTitle": "डेटा संरचनाएँ और जटिलता",
            "structures": [
                {"name": "Array", "type": "Linear", "desc": "Contiguous memory allocation storing elements of identical data type. Constant time $O(1)$ index access."},
                {"name": "Stack", "type": "Linear", "principle": "LIFO (Last In First Out)", "operations": "Push (insert), Pop (delete), Peek (inspect top). Used in function call recursion, Undo operations, expression evaluation."},
                {"name": "Queue", "type": "Linear", "principle": "FIFO (First In First Out)", "operations": "Enqueue (insert at rear), Dequeue (remove from front). Used in printer spooling, CPU task scheduling."},
                {"name": "Linked List", "type": "Linear", "desc": "Elements (nodes) connected via pointers/references, non-contiguous dynamic memory allocation (Singly, Doubly, Circular)."},
                {"name": "Binary Tree", "type": "Non-Linear", "desc": "Hierarchical structure where each node has at most two children (Left and Right). Topmost node is Root; nodes with no children are Leaves."},
                {"name": "Graph", "type": "Non-Linear", "desc": "Collection of vertices (nodes) connected by edges (links). Models computer networks, social networks, GPS routes."}
            ],
            "algorithms": [
                {"name": "Linear Search", "time": "O(N)", "requirement": "Works on unsorted or sorted array. Sequentially checks each item."},
                {"name": "Binary Search", "time": "O(log N)", "requirement": "MANDATORY: Array MUST BE SORTED. Repeatedly divides search interval in half."},
                {"name": "Bubble Sort", "time": "O(N^2)", "desc": "Repeatedly swaps adjacent elements if in wrong order."},
                {"name": "Merge Sort / Quick Sort", "time": "O(N log N)", "desc": "Divide and conquer sorting algorithms."}
            ]
        }
    ]
}

# 3. digital-banking.json
digital_banking_data = {
    "module": "Digital Banking Systems & Financial Technology",
    "version": "2026.1",
    "sections": [
        {
            "id": "cbs-finacle",
            "title": "Core Banking Solutions (CBS)",
            "hindiTitle": "कोर बैंकिंग सॉल्यूशन (CBS)",
            "definition": "CORE stands for 'Centralized Online Real-time Electronic' banking. Enables customers to access their bank account and perform basic transactions from any branch on the bank's network.",
            "majorCbsPlatforms": [
                {"product": "Finacle", "vendor": "Infosys", "usedBy": "State Bank of India (SBI), Punjab National Bank (PNB), Bank of Baroda (BOB), Union Bank"},
                {"product": "BaNCS", "vendor": "Tata Consultancy Services (TCS)", "usedBy": "Central Bank of India, Indian Bank, several Regional Rural Banks (RRBs)"},
                {"product": "Flexcube", "vendor": "Oracle Financial Services Software", "usedBy": "HDFC Bank, Yes Bank, RBL Bank"},
                {"product": "FinnOne Neo", "vendor": "Nucleus Software", "usedBy": "Leading lending and NBFC operations"}
            ]
        },
        {
            "id": "payment-systems",
            "title": "Indian Payment Systems Comparison Matrix",
            "hindiTitle": "भारतीय भुगतान प्रणालियों की तुलनात्मक तालिका",
            "systems": [
                {
                    "system": "RTGS",
                    "fullName": "Real Time Gross Settlement",
                    "manager": "Reserve Bank of India (RBI)",
                    "timing": "24x7x365 (round-the-clock since Dec 2020)",
                    "settlement": "Real-time, order-by-order gross basis (individual transaction)",
                    "limits": "Minimum: ₹2,00,000 | Maximum: No upper limit",
                    "reversal": "Irrevocable and final upon settlement"
                },
                {
                    "system": "NEFT",
                    "fullName": "National Electronic Funds Transfer",
                    "manager": "Reserve Bank of India (RBI)",
                    "timing": "24x7x365 (half-hourly batches; 48 batches per day since Dec 2019)",
                    "settlement": "Deferred Net Settlement (DNS) in batches",
                    "limits": "Minimum: ₹1 | Maximum: No ceiling set by RBI (bank specific)",
                    "features": "Supports cash remittance to Nepal under Indo-Nepal Remittance Scheme"
                },
                {
                    "system": "IMPS",
                    "fullName": "Immediate Payment Service",
                    "manager": "National Payments Corporation of India (NPCI)",
                    "timing": "24x7x365 instant transfer",
                    "settlement": "Real-time instant interbank electronic fund transfer",
                    "limits": "Minimum: ₹1 | Maximum: ₹5,00,000 (increased from ₹2 lakh in Oct 2021)",
                    "channels": "Mobile banking, internet banking, ATMs, SMS, MMID (Mobile Money Identifier - 7 digits)"
                },
                {
                    "system": "UPI",
                    "fullName": "Unified Payments Interface",
                    "manager": "National Payments Corporation of India (NPCI)",
                    "timing": "24x7x365 instant transfer",
                    "addressing": "Virtual Payment Address (VPA / UPI ID - e.g., user@sbi)",
                    "limits": "Standard: ₹1,00,000 per day; ₹5,00,000 for hospitals, educational institutions, IPO, and RBI Retail Direct schemes.",
                    "protocols": "Built on IMPS rails, uses 2-factor authentication (UPI PIN)"
                },
                {
                    "system": "AePS",
                    "fullName": "Aadhaar Enabled Payment System",
                    "manager": "National Payments Corporation of India (NPCI)",
                    "services": "Cash withdrawal, cash deposit, balance enquiry, Aadhaar to Aadhaar fund transfer, mini statement",
                    "requirements": "IIN (Issuer Identification Number), Aadhaar number, Biometric fingerprint/iris"
                },
                {
                    "system": "CTS",
                    "fullName": "Cheque Truncation System",
                    "manager": "Reserve Bank of India (RBI) / NPCI",
                    "definition": "Online image-based cheque clearing process. Physical cheque is truncated at collecting bank; digital image and MICR data transmitted electronically.",
                    "micrCode": "9-digit numeric code on cheque bottom: First 3 digits = City code, Middle 3 digits = Bank code, Last 3 digits = Branch code."
                }
            ]
        },
        {
            "id": "card-technologies",
            "title": "Payment Card Technologies & Security",
            "hindiTitle": "पेमेंट कार्ड प्रौद्योगिकियाँ एवं सुरक्षा",
            "features": [
                {"tech": "Magnetic Stripe", "security": "Low - Static data stored on magnetic tape easily cloned using skimmers (discontinued for issuance)."},
                {"tech": "EMV Chip", "security": "High - Europay, MasterCard, Visa standard. Microchip creates dynamic unique cryptogram for every single transaction."},
                {"tech": "Contactless NFC", "security": "Uses Near Field Communication (RFID 13.56 MHz). Tap-and-go payment without PIN up to ₹5,000 in India."},
                {"tech": "CVV / CVC", "security": "Card Verification Value (3 digits on back of Visa/MasterCard/RuPay; 4 digits on front of American Express). Never stored by merchants under RBI Tokenization guidelines."},
                {"tech": "Card Tokenization", "security": "RBI mandate replacing actual 16-digit Card Number with an alternate unique code called 'Token' tied to specific merchant and device."}
            ]
        },
        {
            "id": "rbi-cyber-framework",
            "title": "RBI Cybersecurity Framework for Banks",
            "hindiTitle": "बैंकों हेतु RBI साइबर सुरक्षा ढाँचा",
            "guidelines": [
                {"title": "Chief Information Security Officer (CISO)", "detail": "Independent officer reporting directly to the Risk Committee of the Board."},
                {"title": "Security Operations Centre (SOC)", "detail": "Mandatory 24x7 monitoring and incident detection infrastructure."},
                {"title": "Incident Reporting Timeline", "detail": "Banks MUST report any cyber security incident to RBI within 2 to 6 hours of detection, and to CERT-In within 6 hours."},
                {"title": "Customer Liability Circular", "detail": "Zero liability for customer if fraudulent unauthorized electronic transaction is reported within 3 working days."}
            ]
        }
    ]
}

# 4. emerging-tech.json
emerging_tech_data = {
    "module": "Emerging Technologies & Future Trends",
    "version": "2026.1",
    "sections": [
        {
            "id": "ai-ml",
            "title": "Artificial Intelligence, Machine Learning & Generative AI",
            "hindiTitle": "आर्टिफिशियल इंटेलिजेंस, मशीन लर्निंग और जेनरेटिव AI",
            "taxonomy": [
                {"branch": "Artificial Intelligence (AI)", "definition": "Broad discipline of creating machines capable of simulating human intelligence and reasoning."},
                {"branch": "Machine Learning (ML)", "definition": "Subset of AI that gives systems ability to learn and improve from experience without being explicitly programmed."},
                {"branch": "Deep Learning (DL)", "definition": "Subset of ML using Multi-layered Artificial Neural Networks (ANNs) inspired by the human brain."},
                {"branch": "Generative AI", "definition": "Deep learning models (e.g. Large Language Models - LLMs, Diffusion models) capable of generating novel text, code, audio, and images."}
            ],
            "learningParadigms": [
                {"type": "Supervised Learning", "desc": "Trained on labeled datasets (input paired with correct output). Used in bank credit scoring, fraud detection."},
                {"type": "Unsupervised Learning", "desc": "Trained on unlabeled data to discover hidden patterns, groupings, and clusters (e.g. customer segmentation, anomaly detection)."},
                {"type": "Reinforcement Learning", "desc": "Agent learns by trial and error through reward and penalty system in dynamic environments."}
            ]
        },
        {
            "id": "blockchain-cbdc",
            "title": "Blockchain, Distributed Ledger & CBDC (e-Rupee)",
            "hindiTitle": "ब्लॉकचेन, डिस्ट्रीब्यूटेड लेजर और CBDC (डिजिटल रुपया)",
            "blockchainBasics": {
                "definition": "A decentralized, distributed, and cryptographically immutable digital ledger of transactions replicated across peer-to-peer nodes.",
                "keyElements": [
                    {"name": "Blocks", "desc": "Containers of transactional data, timestamp, and cryptographic hash of the previous block."},
                    {"name": "Genesis Block", "desc": "Block 0, the very first initial block in a blockchain hierarchy."},
                    {"name": "Immutability", "desc": "Once recorded, data in any block cannot be altered retroactively without alteration of all subsequent blocks."},
                    {"name": "Consensus Mechanisms", "desc": "Proof of Work (PoW - energy intensive, Bitcoin), Proof of Stake (PoS - validator staking, Ethereum 2.0)."},
                    {"name": "Smart Contracts", "desc": "Self-executing digital contracts with terms of agreement written directly into code lines (pioneered by Ethereum)."}
                ]
            },
            "cbdc": {
                "name": "Central Bank Digital Currency (CBDC) - Digital Rupee (e₹)",
                "issuer": "Reserve Bank of India (RBI)",
                "nature": "Legal tender issued in digital form by sovereign central bank. Represents direct liability of RBI on currency balance sheet (unlike commercial bank deposits).",
                "twoVariants": [
                    {"variant": "CBDC-Wholesale (e₹-W)", "launched": "November 1, 2022", "useCase": "Settlement of secondary market transactions in government securities."},
                    {"variant": "CBDC-Retail (e₹-R)", "launched": "December 1, 2022", "useCase": "Public retail transactions via digital wallets distributed through commercial banks."}
                ]
            }
        },
        {
            "id": "quantum-iot-5g",
            "title": "Quantum Computing, IoT & 5G Telecommunications",
            "hindiTitle": "क्वांटम कंप्यूटिंग, IoT और 5G दूरसंचार",
            "topics": [
                {
                    "name": "Quantum Computing",
                    "basicUnit": "Qubit (Quantum Bit) - unlike classical bits (0 or 1), qubits can exist simultaneously in states 0 and 1.",
                    "principles": [
                        {"principle": "Superposition", "desc": "Ability of quantum system to be in multiple states at once until measured."},
                        {"principle": "Entanglement", "desc": "Quantum phenomenon where pairs of qubits become linked such that state of one instantly dictates state of other regardless of distance."}
                    ],
                    "impactOnBanking": "Threatens classical public-key cryptography (RSA/ECC broken by Shor's Algorithm); drives migration to Post-Quantum Cryptography (PQC)."
                },
                {
                    "name": "Internet of Things (IoT)",
                    "definition": "Network of physical devices embedded with sensors, software, and connectivity that collect and exchange data over internet.",
                    "protocols": "MQTT (Message Queuing Telemetry Transport - lightweight publish/subscribe), CoAP, Bluetooth Low Energy (BLE)."
                },
                {
                    "name": "5G & 6G Networks",
                    "improvements": "Ultra-low latency (<1 ms), high throughput (up to 10-20 Gbps), massive device density (1 million devices/km²), Network Slicing."
                },
                {
                    "name": "Big Data 5 Vs",
                    "dimensions": [
                        {"v": "Volume", "desc": "Vast scale of generated data (Terabytes to Zettabytes)."},
                        {"v": "Velocity", "desc": "Unprecedented speed at which new data is generated and processed in real time."},
                        {"v": "Variety", "desc": "Different formats of data (Structured SQL, Semi-structured JSON/XML, Unstructured video/logs)."},
                        {"v": "Veracity", "desc": "Trustworthiness, accuracy, and quality of incoming data."},
                        {"v": "Value", "desc": "Actionable business insights extracted from raw data."}
                    ]
                }
            ]
        }
    ]
}

# 5. abbreviations.json
abbreviations_data = {
    "module": "Comprehensive Computer & Banking Abbreviations Dictionary",
    "version": "2026.1",
    "totalCount": 160,
    "terms": [
        {"term": "AI", "fullForm": "Artificial Intelligence", "category": "Emerging Tech"},
        {"term": "ALU", "fullForm": "Arithmetic Logic Unit", "category": "Hardware / CPU"},
        {"term": "API", "fullForm": "Application Programming Interface", "category": "Software"},
        {"term": "APIFS", "fullForm": "Apple File System", "category": "Operating System"},
        {"term": "APIPA", "fullForm": "Automatic Private IP Addressing", "category": "Networking"},
        {"term": "ARPANET", "fullForm": "Advanced Research Projects Agency Network", "category": "Internet History"},
        {"term": "ASCII", "fullForm": "American Standard Code for Information Interchange", "category": "Fundamentals"},
        {"term": "ATM", "fullForm": "Automated Teller Machine / Asynchronous Transfer Mode", "category": "Banking / Telecom"},
        {"term": "BIOS", "fullForm": "Basic Input / Output System", "category": "Hardware / Boot"},
        {"term": "BISP", "fullForm": "Bank Information Security Policy", "category": "Cybersecurity"},
        {"term": "BPS", "fullForm": "Bits Per Second", "category": "Networking"},
        {"term": "CAD", "fullForm": "Computer Aided Design", "category": "Software"},
        {"term": "CAM", "fullForm": "Computer Aided Manufacturing / Content Addressable Memory", "category": "Hardware"},
        {"term": "CBDC", "fullForm": "Central Bank Digital Currency", "category": "Digital Banking"},
        {"term": "CBS", "fullForm": "Core Banking Solution", "category": "Digital Banking"},
        {"term": "CD", "fullForm": "Compact Disc", "category": "Memory / Storage"},
        {"term": "CD-ROM", "fullForm": "Compact Disc Read Only Memory", "category": "Memory / Storage"},
        {"term": "CD-RW", "fullForm": "Compact Disc Re-Writable", "category": "Memory / Storage"},
        {"term": "CERT-In", "fullForm": "Indian Computer Emergency Response Team", "category": "Cybersecurity"},
        {"term": "CISO", "fullForm": "Chief Information Security Officer", "category": "Banking Security"},
        {"term": "CLI", "fullForm": "Command Line Interface", "category": "Operating System"},
        {"term": "CMOS", "fullForm": "Complementary Metal-Oxide Semiconductor", "category": "Hardware"},
        {"term": "COBOL", "fullForm": "Common Business Oriented Language", "category": "Programming"},
        {"term": "CPU", "fullForm": "Central Processing Unit", "category": "Hardware / CPU"},
        {"term": "CRC", "fullForm": "Cyclic Redundancy Check", "category": "Networking"},
        {"term": "CRT", "fullForm": "Cathode Ray Tube", "category": "Hardware / Display"},
        {"term": "CTS", "fullForm": "Cheque Truncation System", "category": "Digital Banking"},
        {"term": "CU", "fullForm": "Control Unit", "category": "Hardware / CPU"},
        {"term": "CVV", "fullForm": "Card Verification Value", "category": "Digital Banking"},
        {"term": "DBMS", "fullForm": "Database Management System", "category": "Database"},
        {"term": "DDL", "fullForm": "Data Definition Language", "category": "Database / SQL"},
        {"term": "DDoS", "fullForm": "Distributed Denial of Service", "category": "Cybersecurity"},
        {"term": "DHCP", "fullForm": "Dynamic Host Configuration Protocol", "category": "Protocols"},
        {"term": "DLL", "fullForm": "Dynamic Link Library / Data Link Layer", "category": "OS / Networking"},
        {"term": "DMA", "fullForm": "Direct Memory Access", "category": "Hardware"},
        {"term": "DML", "fullForm": "Data Manipulation Language", "category": "Database / SQL"},
        {"term": "DNS", "fullForm": "Domain Name System", "category": "Protocols"},
        {"term": "DRAM", "fullForm": "Dynamic Random Access Memory", "category": "Memory"},
        {"term": "DSL", "fullForm": "Digital Subscriber Line", "category": "Networking"},
        {"term": "DVD", "fullForm": "Digital Versatile Disc / Digital Video Disc", "category": "Memory / Storage"},
        {"term": "EBCDIC", "fullForm": "Extended Binary Coded Decimal Interchange Code", "category": "Fundamentals"},
        {"term": "EEPROM", "fullForm": "Electrically Erasable Programmable Read-Only Memory", "category": "Memory"},
        {"term": "EMV", "fullForm": "Europay, MasterCard, and Visa", "category": "Digital Banking"},
        {"term": "ENIAC", "fullForm": "Electronic Numerical Integrator and Computer", "category": "Computer History"},
        {"term": "EPROM", "fullForm": "Erasable Programmable Read-Only Memory", "category": "Memory"},
        {"term": "FAT", "fullForm": "File Allocation Table", "category": "Operating System"},
        {"term": "FIFO", "fullForm": "First In First Out", "category": "Data Structures"},
        {"term": "FTP", "fullForm": "File Transfer Protocol", "category": "Protocols"},
        {"term": "Gbps", "fullForm": "Gigabits Per Second", "category": "Networking"},
        {"term": "GB", "fullForm": "Gigabyte (1024 Megabytes)", "category": "Units of Memory"},
        {"term": "GHz", "fullForm": "Gigahertz", "category": "CPU Clock"},
        {"term": "GIS", "fullForm": "Geographic Information System", "category": "Software"},
        {"term": "GPRS", "fullForm": "General Packet Radio Service", "category": "Telecom"},
        {"term": "GPS", "fullForm": "Global Positioning System", "category": "Hardware"},
        {"term": "GPU", "fullForm": "Graphics Processing Unit", "category": "Hardware"},
        {"term": "GUI", "fullForm": "Graphical User Interface", "category": "Operating System"},
        {"term": "HDD", "fullForm": "Hard Disk Drive", "category": "Memory / Storage"},
        {"term": "HDMI", "fullForm": "High-Definition Multimedia Interface", "category": "Hardware / Ports"},
        {"term": "HTML", "fullForm": "HyperText Markup Language", "category": "Web Tech"},
        {"term": "HTTP", "fullForm": "HyperText Transfer Protocol", "category": "Protocols"},
        {"term": "HTTPS", "fullForm": "HyperText Transfer Protocol Secure", "category": "Protocols"},
        {"term": "IaaS", "fullForm": "Infrastructure as a Service", "category": "Cloud Computing"},
        {"term": "IC", "fullForm": "Integrated Circuit", "category": "Hardware History"},
        {"term": "ICMP", "fullForm": "Internet Control Message Protocol", "category": "Protocols"},
        {"term": "IEEE", "fullForm": "Institute of Electrical and Electronics Engineers", "category": "Standards"},
        {"term": "IMAP", "fullForm": "Internet Message Access Protocol", "category": "Protocols / Email"},
        {"term": "IMPS", "fullForm": "Immediate Payment Service", "category": "Digital Banking"},
        {"term": "IP", "fullForm": "Internet Protocol", "category": "Protocols"},
        {"term": "IPv4", "fullForm": "Internet Protocol version 4 (32-bit)", "category": "Protocols"},
        {"term": "IPv6", "fullForm": "Internet Protocol version 6 (128-bit)", "category": "Protocols"},
        {"term": "ISDN", "fullForm": "Integrated Services Digital Network", "category": "Networking"},
        {"term": "ISP", "fullForm": "Internet Service Provider", "category": "Internet"},
        {"term": "JPEG", "fullForm": "Joint Photographic Experts Group", "category": "File Formats"},
        {"term": "JSON", "fullForm": "JavaScript Object Notation", "category": "Web Tech"},
        {"term": "KB", "fullForm": "Kilobyte (1024 Bytes)", "category": "Units of Memory"},
        {"term": "LAN", "fullForm": "Local Area Network", "category": "Networking"},
        {"term": "LCD", "fullForm": "Liquid Crystal Display", "category": "Hardware / Display"},
        {"term": "LED", "fullForm": "Light Emitting Diode", "category": "Hardware / Display"},
        {"term": "LIFO", "fullForm": "Last In First Out", "category": "Data Structures"},
        {"term": "MAC", "fullForm": "Media Access Control (48-bit physical address)", "category": "Networking"},
        {"term": "MAN", "fullForm": "Metropolitan Area Network", "category": "Networking"},
        {"term": "MB", "fullForm": "Megabyte (1024 Kilobytes)", "category": "Units of Memory"},
        {"term": "MBR", "fullForm": "Master Boot Record", "category": "Boot / Storage"},
        {"term": "MICR", "fullForm": "Magnetic Ink Character Recognition", "category": "Input / Banking"},
        {"term": "MIDI", "fullForm": "Musical Instrument Digital Interface", "category": "Audio"},
        {"term": "MIME", "fullForm": "Multipurpose Internet Mail Extensions", "category": "Email / Protocols"},
        {"term": "MIPS", "fullForm": "Million Instructions Per Second", "category": "CPU Performance"},
        {"term": "MODEM", "fullForm": "Modulator - Demodulator", "category": "Networking Devices"},
        {"term": "MOSFET", "fullForm": "Metal-Oxide-Semiconductor Field-Effect Transistor", "category": "Hardware"},
        {"term": "MP3", "fullForm": "MPEG Audio Layer III", "category": "Audio Formats"},
        {"term": "MPEG", "fullForm": "Moving Picture Experts Group", "category": "Video Formats"},
        {"term": "NACH", "fullForm": "National Automated Clearing House", "category": "Digital Banking"},
        {"term": "NAT", "fullForm": "Network Address Translation", "category": "Networking"},
        {"term": "NEFT", "fullForm": "National Electronic Funds Transfer", "category": "Digital Banking"},
        {"term": "NFC", "fullForm": "Near Field Communication", "category": "Wireless / Banking"},
        {"term": "NIC", "fullForm": "Network Interface Card", "category": "Networking Hardware"},
        {"term": "NPCI", "fullForm": "National Payments Corporation of India", "category": "Digital Banking"},
        {"term": "NTFS", "fullForm": "New Technology File System", "category": "Operating System"},
        {"term": "OCR", "fullForm": "Optical Character Recognition", "category": "Input Devices"},
        {"term": "OMR", "fullForm": "Optical Mark Recognition", "category": "Input Devices"},
        {"term": "OOP", "fullForm": "Object-Oriented Programming", "category": "Programming"},
        {"term": "OS", "fullForm": "Operating System", "category": "Operating System"},
        {"term": "OSI", "fullForm": "Open Systems Interconnection", "category": "Networking Standards"},
        {"term": "PaaS", "fullForm": "Platform as a Service", "category": "Cloud Computing"},
        {"term": "PAN", "fullForm": "Personal Area Network / Permanent Account Number", "category": "Networking / Tax"},
        {"term": "PCI", "fullForm": "Peripheral Component Interconnect", "category": "Hardware / Buses"},
        {"term": "PDF", "fullForm": "Portable Document Format", "category": "File Formats"},
        {"term": "PNG", "fullForm": "Portable Network Graphics", "category": "File Formats"},
        {"term": "POP3", "fullForm": "Post Office Protocol version 3", "category": "Protocols / Email"},
        {"term": "POST", "fullForm": "Power-On Self-Test", "category": "Boot Process"},
        {"term": "PRAM", "fullForm": "Phase-change Random Access Memory", "category": "Memory"},
        {"term": "PROM", "fullForm": "Programmable Read-Only Memory", "category": "Memory"},
        {"term": "QoS", "fullForm": "Quality of Service", "category": "Networking"},
        {"term": "RAM", "fullForm": "Random Access Memory", "category": "Memory"},
        {"term": "RDBMS", "fullForm": "Relational Database Management System", "category": "Database"},
        {"term": "RDP", "fullForm": "Remote Desktop Protocol", "category": "Protocols"},
        {"term": "RFID", "fullForm": "Radio Frequency Identification", "category": "Wireless Tech"},
        {"term": "RIP", "fullForm": "Routing Information Protocol", "category": "Routing"},
        {"term": "RISC", "fullForm": "Reduced Instruction Set Computer", "category": "CPU Architecture"},
        {"term": "ROM", "fullForm": "Read-Only Memory", "category": "Memory"},
        {"term": "RTGS", "fullForm": "Real Time Gross Settlement", "category": "Digital Banking"},
        {"term": "RTOS", "fullForm": "Real-Time Operating System", "category": "Operating System"},
        {"term": "SaaS", "fullForm": "Software as a Service", "category": "Cloud Computing"},
        {"term": "SAN", "fullForm": "Storage Area Network", "category": "Networking"},
        {"term": "SATA", "fullForm": "Serial Advanced Technology Attachment", "category": "Hardware Interfaces"},
        {"term": "SCSI", "fullForm": "Small Computer System Interface", "category": "Hardware Interfaces"},
        {"term": "SFTP", "fullForm": "SSH File Transfer Protocol", "category": "Protocols"},
        {"term": "SMTP", "fullForm": "Simple Mail Transfer Protocol", "category": "Protocols / Email"},
        {"term": "SNA", "fullForm": "Systems Network Architecture", "category": "Networking History"},
        {"term": "SNMP", "fullForm": "Simple Network Management Protocol", "category": "Protocols"},
        {"term": "SPOOL", "fullForm": "Simultaneous Peripheral Operations On-Line", "category": "Operating System"},
        {"term": "SQL", "fullForm": "Structured Query Language", "category": "Database"},
        {"term": "SRAM", "fullForm": "Static Random Access Memory", "category": "Memory"},
        {"term": "SSD", "fullForm": "Solid State Drive", "category": "Storage"},
        {"term": "SSH", "fullForm": "Secure Shell", "category": "Protocols / Security"},
        {"term": "SSL", "fullForm": "Secure Sockets Layer", "category": "Security"},
        {"term": "TB", "fullForm": "Terabyte (1024 Gigabytes)", "category": "Units of Memory"},
        {"term": "TCP", "fullForm": "Transmission Control Protocol", "category": "Protocols"},
        {"term": "TCP/IP", "fullForm": "Transmission Control Protocol / Internet Protocol", "category": "Networking"},
        {"term": "TCL", "fullForm": "Transaction Control Language", "category": "Database / SQL"},
        {"term": "TFTP", "fullForm": "Trivial File Transfer Protocol", "category": "Protocols"},
        {"term": "TLS", "fullForm": "Transport Layer Security", "category": "Security"},
        {"term": "UEFI", "fullForm": "Unified Extensible Firmware Interface", "category": "Boot Process"},
        {"term": "UDP", "fullForm": "User Datagram Protocol", "category": "Protocols"},
        {"term": "UNIVAC", "fullForm": "Universal Automatic Computer", "category": "Computer History"},
        {"term": "UPI", "fullForm": "Unified Payments Interface", "category": "Digital Banking"},
        {"term": "UPS", "fullForm": "Uninterruptible Power Supply", "category": "Hardware"},
        {"term": "URL", "fullForm": "Uniform Resource Locator", "category": "Internet"},
        {"term": "USB", "fullForm": "Universal Serial Bus", "category": "Hardware / Ports"},
        {"term": "UTP", "fullForm": "Unshielded Twisted Pair", "category": "Transmission Media"},
        {"term": "VAN", "fullForm": "Value Added Network", "category": "Networking"},
        {"term": "VBA", "fullForm": "Visual Basic for Applications", "category": "Software / Office"},
        {"term": "VGA", "fullForm": "Video Graphics Array", "category": "Hardware / Ports"},
        {"term": "VoIP", "fullForm": "Voice over Internet Protocol", "category": "Networking"},
        {"term": "VPA", "fullForm": "Virtual Payment Address", "category": "Digital Banking"},
        {"term": "VPN", "fullForm": "Virtual Private Network", "category": "Networking"},
        {"term": "WAN", "fullForm": "Wide Area Network", "category": "Networking"},
        {"term": "WAP", "fullForm": "Wireless Application Protocol / Wireless Access Point", "category": "Networking"},
        {"term": "WIFI", "fullForm": "Wireless Fidelity (IEEE 802.11)", "category": "Networking"},
        {"term": "WLAN", "fullForm": "Wireless Local Area Network", "category": "Networking"},
        {"term": "WORM", "fullForm": "Write Once Read Many", "category": "Storage"},
        {"term": "WWW", "fullForm": "World Wide Web", "category": "Internet"},
        {"term": "XHTML", "fullForm": "Extensible HyperText Markup Language", "category": "Web Tech"},
        {"term": "XML", "fullForm": "Extensible Markup Language", "category": "Web Tech"}
    ]
}

with open(os.path.join(OUTPUT_DIR, "database.json"), "w", encoding="utf-8") as f:
    json.dump(database_data, f, indent=2, ensure_ascii=False)

with open(os.path.join(OUTPUT_DIR, "programming-basics.json"), "w", encoding="utf-8") as f:
    json.dump(programming_data, f, indent=2, ensure_ascii=False)

with open(os.path.join(OUTPUT_DIR, "digital-banking.json"), "w", encoding="utf-8") as f:
    json.dump(digital_banking_data, f, indent=2, ensure_ascii=False)

with open(os.path.join(OUTPUT_DIR, "emerging-tech.json"), "w", encoding="utf-8") as f:
    json.dump(emerging_tech_data, f, indent=2, ensure_ascii=False)

with open(os.path.join(OUTPUT_DIR, "abbreviations.json"), "w", encoding="utf-8") as f:
    json.dump(abbreviations_data, f, indent=2, ensure_ascii=False)

print("Database, Programming, Digital Banking, Emerging Tech, and Abbreviations generated successfully.")
