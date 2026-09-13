import json
import os

data_dir = os.path.join("public", "data")
os.makedirs(data_dir, exist_ok=True)

# 1. COMPUTER BASICS
basics_data = {
    "title": "Computer Fundamentals, History & Classifications",
    "version": "2026.09",
    "overview": {
        "definition": "An electronic, programmable device that accepts raw data as input, processes it according to stored instructions (software), produces meaningful information as output, and stores results for future use.",
        "gigo_principle": "Garbage In, Garbage Out (GIGO): If invalid data is input into a computer, the resulting output will inevitably be invalid.",
        "characteristics": [
            {"trait": "Speed", "description": "Executes millions to billions of instructions per second (measured in MIPS, BIPS, or GHz clock cycles)."},
            {"trait": "Accuracy", "description": "High degree of calculation precision with zero calculation fatigue or computational error unless programmed wrongly."},
            {"trait": "Diligence", "description": "Free from monotony, tiredness, or lack of concentration; operates continuously for months without loss of accuracy."},
            {"trait": "Versatility", "description": "Can perform diverse tasks simultaneously from core banking transactions to digital graphics."},
            {"trait": "Storage Capacity", "description": "Stores vast volumes of data permanently in secondary storage (terabytes to petabytes)."},
            {"trait": "No IQ & No Feelings", "description": "Cannot think, judge, or feel autonomously without explicit human algorithmic programming."}
        ],
        "fathers_of_computing": [
            {"person": "Charles Babbage", "title": "Father of the Computer", "contribution": "Invented Difference Engine (1822) and Analytical Engine (1837), which introduced input, processing, memory (store), control, and output."},
            {"person": "Lady Ada Lovelace (Augusta Ada Byron)", "title": "First Computer Programmer", "contribution": "Wrote the first algorithm intended to be executed on Charles Babbage's Analytical Engine."},
            {"person": "Alan Turing", "title": "Father of Modern Computer Science & AI", "contribution": "Formulated Turing Machine concept, Turing Test for AI, and designed Bombe machine to crack Enigma code."},
            {"person": "John von Neumann", "title": "Architect of Stored-Program Architecture", "contribution": "Pioneered Von Neumann Architecture (1945), where data and program instructions share common memory."}
        ]
    },
    "generations": [
        {
            "generation": "First Generation (1940 - 1956)",
            "switching_device": "Vacuum Tubes (Thermionic Valves)",
            "memory_storage": "Magnetic Drums & Magnetic Core Memory",
            "language": "Machine Language (0s and 1s) and Assembly Language",
            "speed_measured": "Milliseconds (10^-3 s)",
            "characteristics": "Enormous physical size, consumed massive electricity, generated excessive heat, frequent hardware burnouts.",
            "examples": ["ENIAC (Electronic Numerical Integrator and Computer - First general-purpose electronic computer, built by Eckert & Mauchly)", "EDVAC", "UNIVAC I (Universal Automatic Computer - First commercial computer)", "IBM 701"],
            "exam_fact": "ENIAC was developed at the University of Pennsylvania by J. Presper Eckert and John Mauchly."
        },
        {
            "generation": "Second Generation (1956 - 1963)",
            "switching_device": "Transistors (invented in 1947 at Bell Labs by John Bardeen, Walter Brattain, and William Shockley)",
            "memory_storage": "Magnetic Core Memory, Magnetic Tape and Disks",
            "language": "High-Level Languages emerged: FORTRAN (Formula Translation - 1957, by John Backus) and COBOL (Common Business Oriented Language - 1959, led by Grace Hopper)",
            "speed_measured": "Microseconds (10^-6 s)",
            "characteristics": "Smaller, faster, cheaper, more energy-efficient and reliable than vacuum tubes.",
            "examples": ["IBM 1401", "IBM 1620", "CDC 1604", "UNIVAC 1108"],
            "exam_fact": "Transistors replaced vacuum tubes; FORTRAN and COBOL were introduced in this generation."
        },
        {
            "generation": "Third Generation (1964 - 1971)",
            "switching_device": "Integrated Circuits (ICs) - Small Scale Integration (SSI) & Medium Scale Integration (MSI), invented in 1958 by Jack Kilby and Robert Noyce",
            "memory_storage": "Magnetic Core replaced gradually by Semiconductor RAM",
            "language": "Advanced High-Level Languages: BASIC, PASCAL, PL/1",
            "speed_measured": "Nanoseconds (10^-9 s)",
            "characteristics": "Time-sharing Operating Systems introduced, keyboards and monitors replaced punched cards.",
            "examples": ["IBM System/360", "PDP-8 (Minicomputer)", "TDC-316"],
            "exam_fact": "Silicon chips / Integrated Circuits (ICs) were invented by Jack Kilby."
        },
        {
            "generation": "Fourth Generation (1971 - Present)",
            "switching_device": "Very Large Scale Integration (VLSI) & Microprocessors (Intel 4004 - world's first single-chip 4-bit microprocessor, 1971 by Ted Hoff & Federico Faggin)",
            "memory_storage": "Semiconductor Semiconductor RAM/ROM, Hard Disks, Optical Disks",
            "language": "C, C++, Java, Python, SQL, 4GLs",
            "speed_measured": "Picoseconds (10^-12 s) to Femtoseconds",
            "characteristics": "Birth of Personal Computers (PCs), Graphical User Interface (GUI), Internet, distributed computing.",
            "examples": ["Apple II", "IBM PC (1981)", "CRAY-1 (First commercially successful Supercomputer by Seymour Cray, 1976)"],
            "exam_fact": "Intel 4004 was the world's first commercial microprocessor; CRAY-1 was developed by Seymour Cray ('Father of Supercomputing')."
        },
        {
            "generation": "Fifth Generation (Present & Beyond)",
            "switching_device": "Ultra Large Scale Integration (ULSI), Quantum computing chips, and Optical/Photonic chips",
            "memory_storage": "High-density SSDs (NVMe), Cloud distributed storage, Holographic memory",
            "language": "Natural Language Processing (NLP), Python, R, AI frameworks (PyTorch, TensorFlow)",
            "characteristics": "Artificial Intelligence (AI), Machine Learning, Voice Recognition, Parallel Processing, Quantum Supremacy.",
            "examples": ["Supercomputers (Frontier, Fugaku, PARAM Siddhi-AI, AIRAWAT)", "Robotics", "Neuromorphic systems"],
            "exam_fact": "Fifth generation computers focus on AI, parallel processing, and natural language understanding."
        }
    ],
    "classification": {
        "by_working_principle": [
            {"type": "Analog Computer", "definition": "Operates on continuous physical variables such as voltage, pressure, temperature, and current. Used in scientific measurement and speedometers.", "example": "Mercury thermometer, mechanical speedometer, operational amplifiers."},
            {"type": "Digital Computer", "definition": "Processes data in discrete binary digits (0 and 1). High precision, general purpose, handles arithmetic and logical calculations.", "example": "Laptops, smartphones, bank ATM kiosks, desktops."},
            {"type": "Hybrid Computer", "definition": "Combines features of both Analog (speed of continuous data measurement) and Digital (precision of numerical calculation).", "example": "Intensive Care Unit (ICU) patient heart monitors, petrol pump fuel meters, flight simulators."}
        ],
        "by_size_and_capability": [
            {"type": "Supercomputer", "definition": "Most powerful, fastest, and most expensive computers designed for massive mathematical processing and scientific simulations.", "speed_unit": "FLOPS (Floating Point Operations Per Second: PetaFLOPS, ExaFLOPS)", "father": "Seymour Cray (Father of Supercomputing). Dr. Vijay Bhatkar is the Father of Indian Supercomputing (PARAM 8000 in 1991).", "applications": "Weather forecasting, nuclear weapon simulations, quantum mechanics, drug discovery.", "examples": "Frontier (USA - world's first verified Exascale supercomputer), Fugaku (Japan), PARAM Siddhi-AI (India), AIRAWAT (India)."},
            {"type": "Mainframe Computer", "definition": "High-performance enterprise computers designed to support thousands of concurrent users and process massive transactional databases with 99.999% uptime.", "speed_unit": "MIPS (Million Instructions Per Second)", "applications": "Core Banking Solution (CBS) systems at RBI/SBI, insurance claims, airline ticket reservations, census databases.", "examples": "IBM zSeries (z16), UNISYS, Fujitsu ICL."},
            {"type": "Minicomputer (Midrange Server)", "definition": "Medium-sized multi-user computer lying between mainframes and microcomputers. Can support 4 to 200 users simultaneously.", "applications": "Departmental servers, university research labs, manufacturing control.", "examples": "DEC PDP-11, VAX, IBM AS/400."},
            {"type": "Microcomputer (Personal Computer - PC)", "definition": "Single-user computer powered by a single microprocessor chip. Most ubiquitous category.", "subtypes": "Desktop, Laptop (Notebook), Tablet, Smartphone, Workstation.", "examples": "Dell Inspiron, MacBook, Lenovo ThinkPad."},
            {"type": "Embedded System", "definition": "Specialized computer system with a dedicated function embedded within a larger mechanical or electrical system. Runs on a microcontroller or SoC with fixed firmware in ROM.", "applications": "ATM machines, Point of Sale (POS) terminals, washing machines, car engine ECUs, smart TVs.", "examples": "ATM card reader controller, digital microwave timer."}
        ]
    }
}

with open(os.path.join(data_dir, "computer-basics.json"), "w", encoding="utf-8") as f:
    json.dump(basics_data, f, indent=2, ensure_ascii=False)

# 2. HARDWARE
hardware_data = {
    "title": "Computer Hardware Architecture & Peripherals",
    "version": "2026.09",
    "cpu": {
        "title": "Central Processing Unit (CPU) - The Brain of Computer",
        "speed_measurement": "Gigahertz (GHz) or Clock Cycles per second. Earlier: Megahertz (MHz).",
        "internal_components": [
            {
                "name": "Arithmetic Logic Unit (ALU)",
                "function": "Performs all mathematical arithmetic calculations (Addition, Subtraction, Multiplication, Division) and logical comparisons (AND, OR, NOT, Equal to, Greater than, Less than).",
                "exam_point": "All numerical decisions in computer are performed exclusively inside the ALU."
            },
            {
                "name": "Control Unit (CU)",
                "function": "Acts as the central nervous system / supervisor of the CPU. Coordinates and directs all operations of the computer. It fetches instructions from memory, decodes them, and generates timing and control signals to ALU and peripherals.",
                "exam_point": "Control Unit does NOT execute data processing; it supervises, routes, and schedules data flow."
            },
            {
                "name": "CPU Registers",
                "function": "Extremely small, ultra-fast temporary storage locations situated directly inside the processor core to hold immediate operands, memory addresses, and status flags.",
                "types_of_registers": [
                    {"reg": "Accumulator (AC)", "description": "Holds intermediate arithmetic and logical results generated by the ALU."},
                    {"reg": "Program Counter (PC)", "description": "Holds the memory address of the NEXT instruction waiting to be fetched and executed. Auto-increments after each fetch."},
                    {"reg": "Instruction Register (IR)", "description": "Holds the CURRENT instruction being decoded and executed by the Control Unit."},
                    {"reg": "Memory Address Register (MAR)", "description": "Holds the memory address of data/instruction currently being read from or written to RAM."},
                    {"reg": "Memory Buffer Register (MBR) / MDR", "description": "Holds the actual data read from or waiting to be written to the memory location specified by MAR."},
                    {"reg": "Status / Flag Register", "description": "Contains status bits indicating conditions like Zero flag, Carry flag, Sign flag, Overflow flag."}
                ]
            }
        ],
        "machine_cycle": [
            {"step": "1. Fetch", "details": "Control Unit fetches the instruction from RAM/Cache into the Instruction Register using address in Program Counter."},
            {"step": "2. Decode", "details": "Control Unit decodes opcode to determine required operations and operand locations."},
            {"step": "3. Execute", "details": "ALU performs the required arithmetic or logic operation on registers/operands."},
            {"step": "4. Store (Writeback)", "details": "Result is stored in Accumulator or written back into memory."}
        ],
        "system_buses": [
            {"bus": "Data Bus", "direction": "Bi-directional", "purpose": "Carries actual data between CPU, memory, and I/O devices. Width (32-bit, 64-bit) determines how much data CPU transfers per cycle."},
            {"bus": "Address Bus", "direction": "Unidirectional (CPU to Memory/IO)", "purpose": "Carries the physical memory address of the location CPU wants to read from or write to. Width determines maximum addressable memory (e.g. 32-bit can address 2^32 = 4 GB RAM)."},
            {"bus": "Control Bus", "direction": "Bi-directional / Mixed", "purpose": "Transmits synchronization and control signals like Read, Write, Clock, Interrupt Request (IRQ), and Bus Acknowledgment."}
        ]
    },
    "motherboard_and_ports": [
        {"port": "USB (Universal Serial Bus)", "standard": "Plug-and-Play, hot-swappable interface. USB 2.0 (480 Mbps), USB 3.0 (5 Gbps, blue connector), USB-C (reversible, up to 40 Gbps, supports Power Delivery)."},
        {"port": "HDMI (High-Definition Multimedia Interface)", "standard": "Carries uncompressed digital video and multi-channel digital audio simultaneously on a single cable."},
        {"port": "VGA (Video Graphics Array)", "standard": "Legacy 15-pin 3-row DE-15 analog video connector. Transmits analog RGB signals only (no audio)."},
        {"port": "Ethernet / LAN Port (RJ-45)", "standard": "8-pin registered jack connector used for connecting computer to local area networks and routers (Gigabit Ethernet 1 Gbps)."},
        {"port": "PS/2 Port", "standard": "Legacy 6-pin mini-DIN connector: Purple color for Keyboard, Green color for Mouse."},
        {"port": "Serial Port (RS-232 / COM)", "standard": "Transmits data one bit at a time over a single wire. Used for older modems and industrial machines."},
        {"port": "Parallel Port (Centronics / LPT)", "standard": "Transmits 8 bits (1 byte) simultaneously over 8 parallel wires. Used for older dot-matrix and laser printers."}
    ],
    "peripherals": {
        "input_devices": [
            {"name": "Keyboard", "facts": "Standard layout is QWERTY (designed by Christopher Sholes). Has 101 to 104 keys: Alphanumeric, Function (F1-F12), Cursor control/arrow keys, Modifier keys (Shift, Ctrl, Alt), Toggle keys (Caps Lock, Num Lock, Scroll Lock)."},
            {"name": "Mouse", "facts": "Pointing device invented by Douglas Engelbart in 1964 with a wooden shell. Types: Mechanical (trackball), Optical (LED/photodiode), Laser."},
            {"name": "MICR (Magnetic Ink Character Recognition)", "facts": "Used extensively in the banking industry for clearance of cheques. Reads 9-digit code printed with magnetic iron-oxide ink: First 3 digits = City Code, Middle 3 digits = Bank Code, Last 3 digits = Branch Code. Font used: E-13B or CMC-7."},
            {"name": "OCR (Optical Character Recognition)", "facts": "Converts scanned images of typed, handwritten or printed text into machine-encoded editable text."},
            {"name": "OMR (Optical Mark Recognition)", "facts": "Detects presence or absence of mark (pencil/pen shading) on objective answer sheets by measuring reflected light."},
            {"name": "Barcode Reader & QR Code Reader", "facts": "Barcode represents data in parallel lines of varying widths (1D). QR Code (Quick Response, invented by Denso Wave 1994) is a 2D matrix barcode holding up to 7,089 numeric characters."}
        ],
        "output_devices": [
            {"name": "Monitors (VDU - Visual Display Unit)", "facts": "Displays visual output. Clarity determined by: Resolution (pixels e.g. 1920x1080 Full HD), Dot Pitch (distance between adjacent pixels; smaller is sharper), Refresh Rate (Hz), Aspect Ratio (16:9). Technologies: CRT, LCD, LED, OLED."},
            {"name": "Printers - Classification", "facts": "Divided into Impact Printers and Non-Impact Printers."},
            {"name": "Impact Printers", "facts": "Make mechanical physical contact with ribbon and paper; noisy; cannot print fine graphics. Examples: Dot Matrix Printer (measured in CPS - Characters Per Second), Daisy Wheel Printer (letter-quality), Line Printer (LPM - Lines Per Minute), Chain/Band Printer."},
            {"name": "Non-Impact Printers", "facts": "Do not strike ribbon on paper; quiet, high speed, high resolution. Examples: Laser Printer (uses dry toner powder, laser beam, electrostatic drum; speed measured in PPM - Pages Per Minute; resolution in DPI - Dots Per Inch), Inkjet Printer (sprays tiny droplets of liquid ink via nozzles; measured in PPM and DPI), Thermal Printer (uses heat-sensitive paper; used in ATMs and billing POS counters)."},
            {"name": "Plotters", "facts": "Specialized vector graphics output device using automated pens/knives to draw high-precision large architectural blueprints, engineering CAD drawings, and maps."}
        ]
    }
}

with open(os.path.join(data_dir, "hardware.json"), "w", encoding="utf-8") as f:
    json.dump(hardware_data, f, indent=2, ensure_ascii=False)

# 3. MEMORY HIERARCHY
memory_data = {
    "title": "Computer Memory Hierarchy, Storage Units & Types",
    "version": "2026.09",
    "units": [
        {"unit": "Bit (Binary Digit)", "size": "0 or 1 (Smallest unit of digital data)"},
        {"unit": "Nibble", "size": "4 Bits (Half a byte)"},
        {"unit": "Byte", "size": "8 Bits (Fundamental unit representing one alphanumeric character)"},
        {"unit": "Kilobyte (KB)", "size": "1,024 Bytes (2^10 Bytes)"},
        {"unit": "Megabyte (MB)", "size": "1,024 KB = 1,048,576 Bytes (2^20 Bytes)"},
        {"unit": "Gigabyte (GB)", "size": "1,024 MB (2^30 Bytes)"},
        {"unit": "Terabyte (TB)", "size": "1,024 GB (2^40 Bytes)"},
        {"unit": "Petabyte (PB)", "size": "1,024 TB (2^50 Bytes)"},
        {"unit": "Exabyte (EB)", "size": "1,024 PB (2^60 Bytes)"},
        {"unit": "Zettabyte (ZB)", "size": "1,024 EB (2^70 Bytes)"},
        {"unit": "Yottabyte (YB)", "size": "1,024 ZB (2^80 Bytes)"}
    ],
    "hierarchy_levels": [
        {"level": 1, "name": "CPU Registers", "location": "Inside CPU Core", "speed": "Fastest (Sub-nanosecond <1 ns)", "capacity": "Few bytes to kilobytes (32-bit, 64-bit)", "cost_per_bit": "Most Expensive", "volatility": "Volatile"},
        {"level": 2, "name": "Cache Memory (L1, L2, L3)", "location": "On-chip / Near CPU", "speed": "Extremely Fast (1 to 10 ns)", "capacity": "L1: 32-128 KB, L2: 256KB-1MB, L3: 4-64 MB", "cost_per_bit": "Very Expensive", "volatility": "Volatile (Static RAM - SRAM)"},
        {"level": 3, "name": "Main Memory (RAM)", "location": "Motherboard DIMM Slots", "speed": "Fast (10 to 50 ns)", "capacity": "4 GB to 128 GB", "cost_per_bit": "Moderate", "volatility": "Volatile (Dynamic RAM - DRAM)"},
        {"level": 4, "name": "Secondary Storage (SSD / Flash)", "location": "Internal Drive Bay / M.2", "speed": "Moderate (500 MB/s to 7,000 MB/s)", "capacity": "256 GB to 4 TB", "cost_per_bit": "Low", "volatility": "Non-Volatile (NAND Flash)"},
        {"level": 5, "name": "Magnetic Storage (HDD)", "location": "Internal SATA / External", "speed": "Slow (Mechanical seek time 5-15 ms)", "capacity": "1 TB to 20 TB", "cost_per_bit": "Very Low", "volatility": "Non-Volatile"},
        {"level": 6, "name": "Tertiary / Offline (Magnetic Tape, Optical Disc)", "location": "Removable", "speed": "Slowest (Sequential Access)", "capacity": "Multi-terabytes", "cost_per_bit": "Cheapest", "volatility": "Non-Volatile (Archive)"}
    ],
    "primary_memory": {
        "ram": {
            "name": "Random Access Memory (RAM)",
            "characteristics": "Primary main memory; directly accessible by CPU; read and write; VOLATILE (contents lost instantly when power is cut).",
            "types": [
                {"type": "SRAM (Static RAM)", "mechanism": "Built with flip-flops (transistors). Does NOT need periodic refreshing. Faster, generates less heat, more expensive. Used in CPU Cache."},
                {"type": "DRAM (Dynamic RAM)", "mechanism": "Built with capacitors and transistors. Electric charge leaks, so it REQUIRES periodic refreshing thousands of times per second. Slower, cheaper, higher density. Used as main system RAM."}
            ]
        },
        "rom": {
            "name": "Read Only Memory (ROM)",
            "characteristics": "Permanent memory containing bootstrap loader and basic firmware; read-only during normal operation; NON-VOLATILE (contents retained even when power is off).",
            "types": [
                {"type": "MROM (Mask ROM)", "details": "Hardwired during manufacturing; cannot be altered."},
                {"type": "PROM (Programmable ROM)", "details": "Manufactured blank; can be programmed once using a PROM burner (One-Time Programmable)."},
                {"type": "EPROM (Erasable Programmable ROM)", "details": "Can be erased by exposing the chip to strong Ultraviolet (UV) light through a quartz window for 15-20 minutes, then reprogrammed."},
                {"type": "EEPROM (Electrically Erasable Programmable ROM)", "details": "Can be erased and rewritten electrically byte-by-byte without removing from circuit. Modern computer BIOS/UEFI chips are EEPROM / Flash memory."}
            ]
        },
        "bios_and_booting": {
            "bios": "Basic Input/Output System stored in ROM. Performs Power-On Self-Test (POST) upon system startup to verify CPU, RAM, keyboard, and disk drives are functioning before loading the OS kernel.",
            "booting_types": [
                {"type": "Cold Booting (Hard Boot)", "details": "Starting a computer from completely powered-off state by turning on the physical power switch."},
                {"type": "Warm Booting (Soft Boot)", "details": "Restarting a computer that is already powered on (via Ctrl+Alt+Del or OS Restart command). Does not cut power to the motherboard."}
            ]
        },
        "virtual_memory": {
            "definition": "An OS memory management technique where a portion of secondary storage (hard disk/SSD) is treated as an extension of physical RAM when RAM runs out of space.",
            "terms": [
                {"term": "Page", "details": "A fixed-size block of virtual memory (typically 4 KB)."},
                {"term": "Frame", "details": "A fixed-size block of physical RAM."},
                {"term": "Page Fault", "details": "Occurs when a program requests a memory page that is currently not in physical RAM, triggering OS to load it from disk."},
                {"term": "Thrashing", "details": "A degraded system condition where CPU spends more time swapping pages between RAM and disk than executing user programs."}
            ]
        }
    }
}

with open(os.path.join(data_dir, "memory.json"), "w", encoding="utf-8") as f:
    json.dump(memory_data, f, indent=2, ensure_ascii=False)

# 4. NUMBER SYSTEMS
numbers_data = {
    "title": "Computer Number Systems, Conversions & Data Representation",
    "version": "2026.09",
    "systems": [
        {"name": "Binary", "base": 2, "digits": "0, 1", "prefix": "0b", "example": "(11001)2 = 25 in decimal"},
        {"name": "Octal", "base": 8, "digits": "0, 1, 2, 3, 4, 5, 6, 7", "prefix": "0o", "example": "(31)8 = 25 in decimal"},
        {"name": "Decimal", "base": 10, "digits": "0, 1, 2, 3, 4, 5, 6, 7, 8, 9", "prefix": "", "example": "25"},
        {"name": "Hexadecimal", "base": 16, "digits": "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A (10), B (11), C (12), D (13), E (14), F (15)", "prefix": "0x", "example": "(19)16 = 25 in decimal"}
    ],
    "conversion_rules": [
        {"rule": "Decimal to Binary", "method": "Successive division by 2; record remainders in reverse order (bottom to top)."},
        {"rule": "Binary to Decimal", "method": "Multiply each binary digit by 2 raised to its positional power starting from right (2^0, 2^1, 2^2...) and sum up."},
        {"rule": "Binary to Octal", "method": "Group binary bits in sets of 3 from right to left; convert each 3-bit group to its octal equivalent."},
        {"rule": "Binary to Hexadecimal", "method": "Group binary bits in sets of 4 from right to left; convert each 4-bit nibble to hex (0-9, A-F)."}
    ],
    "complements": {
        "ones_complement": "Invert all bits: 0 becomes 1 and 1 becomes 0.",
        "twos_complement": "1's Complement + 1. Standard method for representing signed negative integers in computer arithmetic."
    },
    "coding_schemes": [
        {"code": "ASCII", "full_form": "American Standard Code for Information Interchange", "facts": "7-bit code representing 128 characters (2^7 = 128, values 0 to 127). Extended ASCII uses 8 bits for 256 characters. Capital 'A' is 65 (01000001); lowercase 'a' is 97 (01100001); digit '0' is 48 (00110000)."},
        {"code": "BCD", "full_form": "Binary Coded Decimal", "facts": "Represents each decimal digit (0-9) using a 4-bit binary nibble (e.g. 25 in BCD is 0010 0101)."},
        {"code": "EBCDIC", "full_form": "Extended Binary Coded Decimal Interchange Code", "facts": "8-bit character encoding developed by IBM for mainframes."},
        {"code": "Unicode", "full_form": "Universal Coded Character Set", "facts": "Universal character encoding standard capable of encoding all world languages, mathematical symbols, and emojis (UTF-8, UTF-16, UTF-32). UTF-8 is the dominant encoding on the World Wide Web."}
    ]
}

with open(os.path.join(data_dir, "number-systems.json"), "w", encoding="utf-8") as f:
    json.dump(numbers_data, f, indent=2, ensure_ascii=False)

print("Basics, Hardware, Memory, and Number Systems generated successfully.")
