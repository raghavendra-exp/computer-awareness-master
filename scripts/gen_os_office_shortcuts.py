import json
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "data")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 1. os.json
os_data = {
    "module": "Operating Systems",
    "version": "2026.1",
    "sections": [
        {
            "id": "os-fundamentals",
            "title": "OS Fundamentals & Architecture",
            "hindiTitle": "ऑपरेटिंग सिस्टम की बुनियादी बातें एवं संरचना",
            "overview": "An Operating System (OS) is system software that acts as an intermediary between computer hardware and the user. It manages system resources, executes programs, and provides a stable, consistent environment.",
            "hindiOverview": "ऑपरेटिंग सिस्टम (OS) सिस्टम सॉफ्टवेयर है जो कंप्यूटर हार्डवेयर और उपयोगकर्ता के बीच मध्यस्थ के रूप में कार्य करता है। यह सिस्टम संसाधनों का प्रबंधन करता है।",
            "keyFunctions": [
                {"name": "Processor Management", "desc": "Process scheduling, context switching, CPU allocation algorithms (FCFS, SJF, Round Robin, Priority)."},
                {"name": "Memory Management", "desc": "Tracks primary memory allocation, paging, segmentation, virtual memory, and swapping."},
                {"name": "File Management", "desc": "Organizes directory structures, file allocation tables (FAT/NTFS), permissions, and file access control."},
                {"name": "Device Management", "desc": "Communicates with hardware devices using dedicated Device Drivers and I/O controllers (buffering, caching, spooling)."},
                {"name": "Security & Protection", "desc": "User authentication, access control lists (ACL), process isolation, firewall coordination."},
                {"name": "User Interface", "desc": "Provides CLI (Command Line Interface - e.g., Bash, CMD) and GUI (Graphical User Interface - e.g., Windows Explorer, macOS Aqua)."}
            ],
            "spoolingVsBuffering": {
                "spooling": "Simultaneous Peripheral Operations On-Line (SPOOLing) overlaps I/O of one job with computation of other jobs. Uses disk as a very large buffer (e.g., Print Spooler).",
                "buffering": "Temporarily stores data in main memory (RAM) while being transferred between devices or application to compensate for speed mismatch."
            },
            "examTips": [
                "SPOOLing uses hard disk as buffer, while Buffering uses main memory (RAM). High-frequency bank exam question!",
                "Virtual Memory uses secondary storage (Hard disk/SSD) to simulate additional RAM when physical RAM is insufficient.",
                "Thrashing occurs when the system spends more time paging (swapping pages between RAM and disk) than executing actual instructions."
            ]
        },
        {
            "id": "os-types",
            "title": "Types of Operating Systems",
            "hindiTitle": "ऑपरेटिंग सिस्टम के प्रकार",
            "types": [
                {"type": "Batch OS", "desc": "Jobs with similar needs are batched together and executed without user interaction. No direct interaction between user and computer during execution.", "example": "Early mainframes, payroll systems."},
                {"type": "Multi-programming OS", "desc": "Multiple programs reside in main memory simultaneously. CPU switches between jobs to keep CPU utilization high.", "example": "Modern general OS foundation."},
                {"type": "Multi-tasking / Time-Sharing", "desc": "CPU executes multiple tasks concurrently by rapidly switching between them (Time quantum/slice). Each user gets a share of CPU time.", "example": "Windows 10/11, macOS, Linux, Unix."},
                {"type": "Real-Time OS (RTOS)", "desc": "Guarantees strict deadlines for task completion. Hard RTOS has zero tolerance for missing deadlines (missed deadline = catastrophe). Soft RTOS tolerates minor delays with degraded quality.", "example": "VxWorks, QNX, RTLinux (Used in missile guidance, ATMs, medical monitors)."},
                {"type": "Distributed OS", "desc": "Manages a collection of independent networked computers, presenting them to the user as a single coherent system.", "example": "LOCUS, Amoeba."},
                {"type": "Network OS (NOS)", "desc": "Runs on a dedicated server and manages network traffic, shared printers, files, and security.", "example": "Windows Server, Novell NetWare, Red Hat Enterprise Linux."},
                {"type": "Embedded / Mobile OS", "desc": "Designed for compact devices with limited power and resources.", "example": "Android (based on Linux kernel), iOS, iPadOS, Tizen."}
            ]
        },
        {
            "id": "file-systems",
            "title": "File Systems & Storage Management",
            "hindiTitle": "फ़ाइल सिस्टम और स्टोरेज प्रबंधन",
            "comparison": [
                {"name": "FAT16", "maxFileSize": "2 GB", "maxVolSize": "4 GB", "features": "Legacy MS-DOS, 16-bit cluster addresses, no file permissions."},
                {"name": "FAT32", "maxFileSize": "4 GB", "maxVolSize": "2 TB (Windows format 32GB)", "features": "Supported everywhere (USB drives), no security permissions, no journaling."},
                {"name": "NTFS", "maxFileSize": "16 TB - 16 EB", "maxVolSize": "8 PB - 8 EB", "features": "Windows default since XP. Journaling, file compression, EFS encryption, granular permissions (ACL), disk quotas."},
                {"name": "exFAT", "maxFileSize": "16 EB", "maxVolSize": "128 PB", "features": "Optimized for flash memory (SD cards, USBs) without FAT32's 4GB file limit, cross-platform with Mac."},
                {"name": "ext4", "maxFileSize": "16 TB", "maxVolSize": "1 EB", "features": "Standard Linux file system. Journaling, backwards compatibility with ext2/ext3."},
                {"name": "APFS / HFS+", "maxFileSize": "8 EB", "maxVolSize": "8 EB", "features": "Apple File System (APFS) optimized for SSDs, snapshots, crash protection."}
            ],
            "examTraps": [
                "Question: What is the maximum file size supported by FAT32? Answer: 4 GB (specifically 4GB minus 1 byte).",
                "Question: Which file system introduced file encryption and journaling in Windows? Answer: NTFS (New Technology File System)."
            ]
        },
        {
            "id": "booting-process",
            "title": "Booting Process, BIOS & UEFI",
            "hindiTitle": "बूटिंग प्रक्रिया, BIOS और UEFI",
            "steps": [
                {"step": 1, "name": "Power On", "detail": "Power supply sends Power Good signal to the motherboard clock generator."},
                {"step": 2, "name": "CPU Reset", "detail": "CPU executes jump instruction at standard memory address (0xFFFF0 in x86) pointing to ROM BIOS."},
                {"step": 3, "name": "POST (Power-On Self-Test)", "detail": "Firmware checks hardware integrity (RAM, keyboard, video card, disk). Beep codes signal errors if screen is inactive."},
                {"step": 4, "name": "Boot Device Selection", "detail": "Firmware searches configured boot order (SSD, HDD, USB, Network) for boot sector."},
                {"step": 5, "name": "MBR / GPT & Bootloader", "detail": "Loads Master Boot Record (MBR - Sector 0) or GUID Partition Table (GPT) and hands control to Windows Boot Manager (BOOTMGR) or GRUB."},
                {"step": 6, "name": "Kernel Initialization", "detail": "OS Kernel is loaded into RAM (ntoskrnl.exe in Windows, vmlinuz in Linux), loads critical drivers."},
                {"step": 7, "name": "User Space & Shell", "detail": "System processes launch, login screen displays, user shell initializes."}
            ],
            "typesOfBooting": {
                "coldBoot": "Hard Boot - Starting the computer from a completely powered-off state by pressing the power button.",
                "warmBoot": "Soft Boot - Restarting the computer while it is already running (via OS restart command or Ctrl+Alt+Del) without cutting main electrical power."
            },
            "biosVsUefi": {
                "bios": "Basic Input/Output System: Legacy 16-bit mode, MBR partition table (max 2TB disks, 4 primary partitions), slow boot.",
                "uefi": "Unified Extensible Firmware Interface: Modern 32/64-bit, GPT partition table (up to 9.4 ZB, 128 partitions), Secure Boot feature, graphical mouse interface."
            }
        },
        {
            "id": "linux-unix-commands",
            "title": "Linux & Unix Essentials for Bank Exams",
            "hindiTitle": "बैंक परीक्षाओं हेतु लिनक्स और यूनिक्स आवश्यक कमांड",
            "overview": "Linux is an open-source Unix-like kernel released in 1991 by Linus Torvalds. Unix was created at Bell Labs in 1969 by Ken Thompson and Dennis Ritchie.",
            "topCommands": [
                {"command": "ls", "desc": "List directory contents (`ls -l` for long format with permissions)."},
                {"command": "pwd", "desc": "Print Working Directory (shows current absolute path)."},
                {"command": "cd", "desc": "Change directory (`cd ..` goes up one level, `cd ~` goes to home)."},
                {"command": "mkdir", "desc": "Make directory (`mkdir -p dir/subdir`)."},
                {"command": "rm", "desc": "Remove files or directories (`rm -r` for recursive removal)."},
                {"command": "cp", "desc": "Copy files or directories (`cp file1 file2`)."},
                {"command": "mv", "desc": "Move or rename files (`mv old new`)."},
                {"command": "cat", "desc": "Concatenate and display file content on terminal."},
                {"command": "grep", "desc": "Global Regular Expression Print - searches text for matching patterns."},
                {"command": "chmod", "desc": "Change file access permissions (e.g. `chmod 755 script.sh` - Read=4, Write=2, Execute=1)."},
                {"command": "chown", "desc": "Change file owner and group."},
                {"command": "ps / top", "desc": "Display currently running active processes."},
                {"command": "kill", "desc": "Terminate a process by its PID (Process ID) (`kill -9 PID` sends SIGKILL)."},
                {"command": "man", "desc": "Display reference manual pages for any command."}
            ]
        }
    ]
}

# 2. ms-office.json
ms_office_data = {
    "module": "Microsoft Office Suite",
    "version": "2026.1",
    "apps": [
        {
            "id": "ms-word",
            "name": "Microsoft Word",
            "hindiName": "माइक्रोसॉफ्ट वर्ड",
            "role": "Word Processing Software",
            "defaultExt": ".docx (Office 2007 onwards, XML-based), legacy .doc (97-2003)",
            "defaultFont": "Calibri, size 11pt (previously Times New Roman 12pt in Word 2003)",
            "defaultAlignment": "Left-aligned (Ctrl+L)",
            "ribbonTabs": [
                {"tab": "Home", "items": "Clipboard, Font, Paragraph (alignments, bullets, line spacing), Styles, Editing (Find, Replace)."},
                {"tab": "Insert", "items": "Pages (Cover Page, Blank, Page Break), Tables, Illustrations (Pictures, Shapes, SmartArt, Charts), Header & Footer, Page Number, WordArt, Equation, Symbol."},
                {"tab": "Design / Page Layout", "items": "Themes, Margins (Normal, Narrow, Wide), Orientation (Portrait, Landscape), Size (A4, Letter), Columns, Breaks, Watermark, Page Color, Page Borders."},
                {"tab": "References", "items": "Table of Contents, Footnotes / Endnotes, Citations & Bibliography, Captions, Index, Table of Authorities."},
                {"tab": "Mailings", "items": "Envelopes, Labels, Start Mail Merge (Letters, E-mail, Envelopes, Labels, Directory), Select Recipients, Insert Merge Field, Finish & Merge."},
                {"tab": "Review", "items": "Spelling & Grammar (F7), Thesaurus (Shift+F7), Word Count, Translate, Comments, Tracking (Track Changes), Compare, Protect."},
                {"tab": "View", "items": "Views (Read Mode, Print Layout, Web Layout, Outline, Draft), Ruler, Gridlines, Navigation Pane, Zoom (10% min to 500% max), Macros (Alt+F8)."}
            ],
            "keyFeatures": [
                {"name": "Mail Merge", "desc": "Combines a Main Document (letter, envelope) with a Data Source (Excel sheet, Access table, Outlook contacts) to generate personalized mass documents."},
                {"name": "Header & Footer", "desc": "Content repeated at top (header) and bottom (footer) of every page. Header resides inside the top margin."},
                {"name": "Footnote vs Endnote", "desc": "Footnote appears at the bottom of the current page. Endnote appears at the very end of the document (or section)."},
                {"name": "Drop Cap", "desc": "Decorative large initial letter of a paragraph spanning 3 lines by default (max 10 lines)."},
                {"name": "Watermark", "desc": "Faded background text or image behind the text on all pages (e.g. 'CONFIDENTIAL', 'DO NOT COPY')."}
            ],
            "zoomLimits": {"min": "10%", "max": "500%", "default": "100%"},
            "examTips": [
                "Difference between Footnote and Endnote: Footnote is placed at bottom of each page; Endnote is placed at the end of entire document.",
                "Default extension in modern Word is .docx (XML-based, compressed zip container).",
                "Max Zoom in MS Word is 500% (whereas in Excel and PowerPoint it is 400%)."
            ]
        },
        {
            "id": "ms-excel",
            "name": "Microsoft Excel",
            "hindiName": "माइक्रोसॉफ्ट एक्सेल",
            "role": "Spreadsheet Software",
            "defaultExt": ".xlsx (standard), .xlsm (macro-enabled), .xls (legacy 97-2003)",
            "structure": {
                "rows": "1,048,576 rows per worksheet (numbered 1 to 1048576; previously 65,536 in Excel 2003)",
                "columns": "16,384 columns per worksheet (lettered A to XFD; previously 256 / IV in Excel 2003)",
                "cellAddress": "Intersection of column letter and row number (e.g., A1, B12, XFD1048576)",
                "nameBox": "Displays the address of currently active cell or named range (located left of formula bar)",
                "formulaBar": "Displays the formula or data contained in the active cell. All formulas begin with '=' sign."
            },
            "cellReferencing": [
                {"type": "Relative Reference", "syntax": "A1", "desc": "Changes dynamically when copied to other cells relative to row/column movement."},
                {"type": "Absolute Reference", "syntax": "$A$1", "desc": "Anchors both column and row using '$' symbol. Never changes when copied. Press F4 to toggle."},
                {"type": "Mixed Reference", "syntax": "$A1 or A$1", "desc": "Locks either the column ($A1) or the row (A$1), leaving the other free to change."}
            ],
            "essentialFormulas": [
                {"name": "SUM", "syntax": "=SUM(A1:A10)", "desc": "Calculates total arithmetic sum of numeric values in range."},
                {"name": "AVERAGE", "syntax": "=AVERAGE(A1:A10)", "desc": "Calculates arithmetic mean of numeric cells in range."},
                {"name": "MAX / MIN", "syntax": "=MAX(A1:A10) / =MIN(A1:A10)", "desc": "Finds largest or smallest numeric value in range."},
                {"name": "COUNT", "syntax": "=COUNT(A1:A10)", "desc": "Counts only cells that contain numbers."},
                {"name": "COUNTA", "syntax": "=COUNTA(A1:A10)", "desc": "Counts all non-empty cells (numbers, text, logical values, errors)."},
                {"name": "COUNTBLANK", "syntax": "=COUNTBLANK(A1:A10)", "desc": "Counts empty cells in the specified range."},
                {"name": "IF", "syntax": "=IF(condition, value_if_true, value_if_false)", "desc": "Logical test condition and returns corresponding value."},
                {"name": "VLOOKUP", "syntax": "=VLOOKUP(lookup_val, table_array, col_index, [exact_match_bool])", "desc": "Vertical lookup: searches first column of table for lookup value and returns corresponding column item."},
                {"name": "HLOOKUP", "syntax": "=HLOOKUP(lookup_val, table_array, row_index, [exact_match_bool])", "desc": "Horizontal lookup: searches top row and returns item from specified row."}
            ],
            "commonErrors": [
                {"error": "#####", "cause": "Column width is too narrow to display the number, or negative date/time."},
                {"error": "#DIV/0!", "cause": "Formula attempts to divide by zero or an empty cell."},
                {"error": "#N/A", "cause": "'No value available' - lookup formula fails to find matching record."},
                {"error": "#NAME?", "cause": "Excel does not recognize text in formula (misspelled function name like =SUMM)."},
                {"error": "#NULL!", "cause": "Incorrect intersection operator specified (e.g. space between two non-intersecting ranges)."},
                {"error": "#NUM!", "cause": "Formula contains invalid numeric values (e.g. square root of negative number)."},
                {"error": "#REF!", "cause": "Invalid cell reference (cell was deleted or pasted over)."},
                {"error": "#VALUE!", "cause": "Wrong type of argument (e.g. mathematical operation on a text string like =A1+'text')."}
            ],
            "zoomLimits": {"min": "10%", "max": "400%", "default": "100%"},
            "examTips": [
                "How many columns and rows in Excel 2016/2019/365? 16,384 columns (A to XFD) and 1,048,576 rows.",
                "In Excel, text data is left-aligned by default, while numbers and dates are right-aligned by default.",
                "To start a formula, which symbol is mandatory? '=' (Equals sign)."
            ]
        },
        {
            "id": "ms-powerpoint",
            "name": "Microsoft PowerPoint",
            "hindiName": "माइक्रोसॉफ्ट पावरपॉइंट",
            "role": "Presentation Software",
            "defaultExt": ".pptx (standard), .ppsx (PowerPoint Show - opens directly in slideshow mode), .potx (template)",
            "views": [
                {"name": "Normal View", "desc": "Primary editing view with slide thumbnail pane on left and large active slide workspace in center."},
                {"name": "Slide Sorter View", "desc": "Shows thumbnail grid of all slides; best for reorganizing, reordering, and deleting slides."},
                {"name": "Notes Page View", "desc": "Displays slide with speaker notes beneath it for lecture preparation."},
                {"name": "Slide Show View", "desc": "Full-screen presentation view (F5 from beginning, Shift+F5 from current slide)."},
                {"name": "Slide Master View", "desc": "Hierarchy of slides that stores information about the theme, layout, background, fonts, and colors for the entire presentation."}
            ],
            "transitionsVsAnimations": {
                "transition": "Motion effect that occurs when you move from one slide to the next during a presentation.",
                "animation": "Visual or sound effect applied to individual elements (text, picture, chart, shape) on a single slide."
            },
            "slideShowShortcuts": [
                {"key": "F5", "action": "Start presentation from slide 1."},
                {"key": "Shift + F5", "action": "Start presentation from current slide."},
                {"key": "B", "action": "Turn screen black / return to show."},
                {"key": "W", "action": "Turn screen white / return to show."},
                {"key": "Esc", "action": "Exit slide show immediately."},
                {"key": "Ctrl + P", "action": "Change mouse pointer to Pen tool during show."},
                {"key": "Ctrl + E", "action": "Switch pointer to Eraser tool during show."}
            ],
            "zoomLimits": {"min": "10%", "max": "400%", "default": "100%"},
            "examTips": [
                "Shortcut to insert a NEW SLIDE is Ctrl + M (NOT Ctrl+N, which opens a new presentation file). Extremely common trap!",
                "Shortcut to duplicate current slide is Ctrl + D."
            ]
        }
    ]
}

# 3. keyboard-shortcuts.json
shortcuts_data = {
    "module": "Keyboard Shortcuts & Hotkeys",
    "version": "2026.1",
    "totalCount": 115,
    "categories": [
        {
            "category": "Windows Universal & Navigation",
            "hindiCategory": "विंडोज यूनिवर्सल और नेविगेशन",
            "shortcuts": [
                {"keys": "Ctrl + C", "action": "Copy selected item to clipboard", "category": "General"},
                {"keys": "Ctrl + X", "action": "Cut selected item to clipboard", "category": "General"},
                {"keys": "Ctrl + V", "action": "Paste item from clipboard", "category": "General"},
                {"keys": "Ctrl + Z", "action": "Undo last action", "category": "General"},
                {"keys": "Ctrl + Y", "action": "Redo undone action", "category": "General"},
                {"keys": "Ctrl + A", "action": "Select all items in document or window", "category": "General"},
                {"keys": "Ctrl + F", "action": "Open Find dialog / search bar", "category": "General"},
                {"keys": "Ctrl + H", "action": "Open Replace dialog", "category": "General"},
                {"keys": "Ctrl + P", "action": "Open Print dialog", "category": "General"},
                {"keys": "Ctrl + S", "action": "Save current document", "category": "General"},
                {"keys": "Ctrl + O", "action": "Open existing file", "category": "General"},
                {"keys": "Ctrl + N", "action": "Open new document / window", "category": "General"},
                {"keys": "Ctrl + W", "action": "Close active document or browser tab", "category": "General"},
                {"keys": "Alt + F4", "action": "Close active program or shut down Windows", "category": "Windows"},
                {"keys": "Alt + Tab", "action": "Switch between open applications", "category": "Windows"},
                {"keys": "Win + D", "action": "Show / hide desktop (minimize all)", "category": "Windows"},
                {"keys": "Win + E", "action": "Open File Explorer", "category": "Windows"},
                {"keys": "Win + L", "action": "Lock Windows PC or switch accounts", "category": "Windows"},
                {"keys": "Win + R", "action": "Open Run dialog box", "category": "Windows"},
                {"keys": "Win + X", "action": "Open Quick Link / Power User menu", "category": "Windows"},
                {"keys": "Shift + Delete", "action": "Permanently delete file bypassing Recycle Bin", "category": "Windows"},
                {"keys": "F1", "action": "Open Help center", "category": "Function Keys"},
                {"keys": "F2", "action": "Rename selected file or folder", "category": "Function Keys"},
                {"keys": "F3", "action": "Search for a file or folder in File Explorer", "category": "Function Keys"},
                {"keys": "F5", "action": "Refresh active window or web page", "category": "Function Keys"},
                {"keys": "F11", "action": "Toggle full screen mode", "category": "Function Keys"},
                {"keys": "F12", "action": "Open 'Save As' dialog box in MS Office", "category": "Function Keys"}
            ]
        },
        {
            "category": "Microsoft Word Specific",
            "hindiCategory": "माइक्रोसॉफ्ट वर्ड विशिष्ट शॉर्टकट",
            "shortcuts": [
                {"keys": "Ctrl + B", "action": "Toggle Bold formatting", "category": "Word Formatting"},
                {"keys": "Ctrl + I", "action": "Toggle Italic formatting", "category": "Word Formatting"},
                {"keys": "Ctrl + U", "action": "Toggle Underline formatting", "category": "Word Formatting"},
                {"keys": "Ctrl + Shift + D", "action": "Double underline text", "category": "Word Formatting"},
                {"keys": "Ctrl + E", "action": "Align text to Center", "category": "Word Alignment"},
                {"keys": "Ctrl + L", "action": "Align text to Left", "category": "Word Alignment"},
                {"keys": "Ctrl + R", "action": "Align text to Right", "category": "Word Alignment"},
                {"keys": "Ctrl + J", "action": "Justify text (even margins on both sides)", "category": "Word Alignment"},
                {"keys": "Ctrl + 1", "action": "Set single line spacing", "category": "Word Spacing"},
                {"keys": "Ctrl + 2", "action": "Set double line spacing", "category": "Word Spacing"},
                {"keys": "Ctrl + 5", "action": "Set 1.5 line spacing", "category": "Word Spacing"},
                {"keys": "Ctrl + K", "action": "Insert Hyperlink", "category": "Word Insert"},
                {"keys": "Ctrl + Enter", "action": "Insert hard Page Break", "category": "Word Insert"},
                {"keys": "Shift + Enter", "action": "Insert soft line break without starting new paragraph", "category": "Word Insert"},
                {"keys": "Ctrl + Shift + Enter", "action": "Insert Column Break", "category": "Word Insert"},
                {"keys": "Ctrl + [", "action": "Decrease font size by 1 point", "category": "Word Font"},
                {"keys": "Ctrl + ]", "action": "Increase font size by 1 point", "category": "Word Font"},
                {"keys": "Ctrl + Shift + C", "action": "Copy text formatting (Format Painter)", "category": "Word Formatting"},
                {"keys": "Ctrl + Shift + V", "action": "Paste text formatting", "category": "Word Formatting"},
                {"keys": "Ctrl + Spacebar", "action": "Clear all character formatting (reset to default)", "category": "Word Formatting"},
                {"keys": "F7", "action": "Run Spelling and Grammar check", "category": "Word Tools"},
                {"keys": "Shift + F7", "action": "Open Thesaurus (Synonyms dictionary)", "category": "Word Tools"},
                {"keys": "Shift + F3", "action": "Change case (UPPERCASE, lowercase, Title Case)", "category": "Word Formatting"},
                {"keys": "Alt + Shift + D", "action": "Insert current Date field", "category": "Word Insert"},
                {"keys": "Alt + Shift + T", "action": "Insert current Time field", "category": "Word Insert"}
            ]
        },
        {
            "category": "Microsoft Excel Specific",
            "hindiCategory": "माइक्रोसॉफ्ट एक्सेल विशिष्ट शॉर्टकट",
            "shortcuts": [
                {"keys": "F2", "action": "Edit active cell (places cursor at end of cell contents)", "category": "Excel Editing"},
                {"keys": "F4", "action": "Repeat last action OR cycle absolute/relative cell references ($A$1 -> A$1 -> $A1 -> A1)", "category": "Excel Formula"},
                {"keys": "Alt + =", "action": "AutoSum (automatically inserts =SUM() formula for adjacent cells)", "category": "Excel Formula"},
                {"keys": "Ctrl + ;", "action": "Insert current system Date into cell", "category": "Excel Data Entry"},
                {"keys": "Ctrl + Shift + :", "action": "Insert current system Time into cell", "category": "Excel Data Entry"},
                {"keys": "Ctrl + ` (grave accent)", "action": "Toggle between displaying cell values and formulas across sheet", "category": "Excel View"},
                {"keys": "Ctrl + Shift + L", "action": "Toggle AutoFilter on/off for selected data range", "category": "Excel Data"},
                {"keys": "Shift + Spacebar", "action": "Select entire row", "category": "Excel Selection"},
                {"keys": "Ctrl + Spacebar", "action": "Select entire column", "category": "Excel Selection"},
                {"keys": "Ctrl + Shift + + (Plus)", "action": "Insert new cells, rows, or columns", "category": "Excel Editing"},
                {"keys": "Ctrl + - (Minus)", "action": "Delete selected cells, rows, or columns", "category": "Excel Editing"},
                {"keys": "Ctrl + Arrow Key", "action": "Jump to edge of data region in that direction", "category": "Excel Navigation"},
                {"keys": "Shift + Arrow Key", "action": "Extend cell selection by one cell", "category": "Excel Selection"},
                {"keys": "Ctrl + Page Down", "action": "Switch to next worksheet in workbook", "category": "Excel Navigation"},
                {"keys": "Ctrl + Page Up", "action": "Switch to previous worksheet in workbook", "category": "Excel Navigation"},
                {"keys": "Alt + Enter", "action": "Start a new line within the same cell (word wrap inside cell)", "category": "Excel Data Entry"},
                {"keys": "Ctrl + D", "action": "Fill Down (copies formula/value from cell directly above)", "category": "Excel Editing"},
                {"keys": "Ctrl + R", "action": "Fill Right (copies formula/value from cell directly to the left)", "category": "Excel Editing"}
            ]
        },
        {
            "category": "Microsoft PowerPoint Specific",
            "hindiCategory": "माइक्रोसॉफ्ट पावरपॉइंट विशिष्ट शॉर्टकट",
            "shortcuts": [
                {"keys": "F5", "action": "Start Slide Show from beginning (Slide 1)", "category": "PPT Show"},
                {"keys": "Shift + F5", "action": "Start Slide Show from current active slide", "category": "PPT Show"},
                {"keys": "Ctrl + M", "action": "Insert a NEW SLIDE into presentation", "category": "PPT Slide"},
                {"keys": "Ctrl + D", "action": "Duplicate selected slide or object", "category": "PPT Slide"},
                {"keys": "B", "action": "Turn display black during slide show (press again to resume)", "category": "PPT Show"},
                {"keys": "W", "action": "Turn display white during slide show (press again to resume)", "category": "PPT Show"},
                {"keys": "Esc", "action": "End slide show presentation", "category": "PPT Show"},
                {"keys": "Ctrl + P", "action": "Change mouse pointer to Pen annotation tool", "category": "PPT Show"},
                {"keys": "Ctrl + A", "action": "Change mouse pointer back to Arrow", "category": "PPT Show"},
                {"keys": "Ctrl + E", "action": "Change mouse pointer to Eraser tool", "category": "PPT Show"},
                {"keys": "Ctrl + G", "action": "Group selected shapes or objects together", "category": "PPT Objects"},
                {"keys": "Ctrl + Shift + G", "action": "Ungroup selected group of objects", "category": "PPT Objects"}
            ]
        },
        {
            "category": "Web Browser & Internet Hotkeys",
            "hindiCategory": "वेब ब्राउज़र और इंटरनेट हॉटकीज़",
            "shortcuts": [
                {"keys": "Ctrl + T", "action": "Open new browser tab", "category": "Browser"},
                {"keys": "Ctrl + W", "action": "Close active browser tab", "category": "Browser"},
                {"keys": "Ctrl + Shift + T", "action": "Reopen last closed browser tab", "category": "Browser"},
                {"keys": "Ctrl + Shift + N", "action": "Open new Incognito / InPrivate window", "category": "Browser"},
                {"keys": "Ctrl + H", "action": "Open browsing History", "category": "Browser"},
                {"keys": "Ctrl + J", "action": "Open Downloads page", "category": "Browser"},
                {"keys": "Ctrl + D", "action": "Bookmark current webpage", "category": "Browser"},
                {"keys": "Ctrl + Shift + D", "action": "Bookmark all open tabs into a folder", "category": "Browser"},
                {"keys": "Ctrl + R / F5", "action": "Reload current page", "category": "Browser"},
                {"keys": "Ctrl + Shift + R / Ctrl + F5", "action": "Hard reload page ignoring cached files", "category": "Browser"},
                {"keys": "Alt + Left Arrow", "action": "Go back one page in history", "category": "Browser"},
                {"keys": "Alt + Right Arrow", "action": "Go forward one page in history", "category": "Browser"},
                {"keys": "Ctrl + Tab", "action": "Switch to next tab on the right", "category": "Browser"},
                {"keys": "Ctrl + Shift + Tab", "action": "Switch to previous tab on the left", "category": "Browser"}
            ]
        }
    ]
}

with open(os.path.join(OUTPUT_DIR, "os.json"), "w", encoding="utf-8") as f:
    json.dump(os_data, f, indent=2, ensure_ascii=False)

with open(os.path.join(OUTPUT_DIR, "ms-office.json"), "w", encoding="utf-8") as f:
    json.dump(ms_office_data, f, indent=2, ensure_ascii=False)

with open(os.path.join(OUTPUT_DIR, "keyboard-shortcuts.json"), "w", encoding="utf-8") as f:
    json.dump(shortcuts_data, f, indent=2, ensure_ascii=False)

print("OS, MS Office, and Keyboard Shortcuts generated successfully.")
