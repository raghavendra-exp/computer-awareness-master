# 📝 Content & Data Update Guide for Computer Awareness Master

This guide outlines how to maintain, extend, and update questions, modules, simulators, and abbreviations in **Computer Awareness Master**.

---

## 📂 Data Directory Overview

All application content is cleanly separated from code and stored in JSON files under `public/data/`:

```
public/data/
├── questions.json          # 508+ Bilingual MCQs (English & Hindi)
├── abbreviations.json      # 160+ Terms & Definitions
├── pyq.json                # Shift-wise trends & exam weightages
├── mock-presets.json       # Mock exam templates
├── study-plans.json        # 30-Day & 15-Day Roadmaps
└── [module-id].json        # 15 Module study notes & formulas
```

---

## 1. How to Add New Questions to `questions.json`

Each question in `public/data/questions.json` follows this strict bilingual schema:

```json
{
  "id": "q_fund_051",
  "topicId": "computer-basics",
  "topicName": "Computer Fundamentals",
  "difficulty": "Moderate",
  "type": "PYQ-STYLE",
  "pyqInfo": "RRB Clerk Mains 2024 (Shift 1)",
  "question": {
    "en": "Which of the following units inside the CPU coordinates the movement of data and instructions between the ALU, registers, and memory?",
    "hi": "CPU के अंदर निम्नलिखित में से कौन सी इकाई ALU, रजिस्टरों और मेमोरी के बीच डेटा और निर्देशों के संचलन का समन्वय करती है?"
  },
  "options": {
    "en": [
      "Arithmetic Logic Unit (ALU)",
      "Control Unit (CU)",
      "Memory Management Unit (MMU)",
      "Instruction Decoder",
      "System Bus"
    ],
    "hi": [
      "अंकगणितीय तर्क इकाई (ALU)",
      "नियंत्रण इकाई (CU)",
      "मेमोरी प्रबंधन इकाई (MMU)",
      "निर्देश डिकोडर",
      "सिस्टम बस"
    ]
  },
  "correctAnswer": 1,
  "explanation": {
    "en": "The Control Unit (CU) directs the operation of the processor. It tells the computer's memory, arithmetic/logic unit and input/output devices how to respond to the instructions that have been sent to the processor.",
    "hi": "कंट्रोल यूनिट (CU) प्रोसेसर के संचालन को निर्देशित करती है। यह कंप्यूटर की मेमोरी, ALU और I/O उपकरणों को बताती है कि निर्देशों पर कैसे प्रतिक्रिया करनी है।"
  },
  "examTip": {
    "en": "Exam Tip: Remember ALU does the actual calculation, but CU is the 'Brain/Supervisor' that controls the timing and signal routing.",
    "hi": "परीक्षा टिप: याद रखें कि ALU वास्तविक गणना करता है, लेकिन CU 'पर्यवेक्षक' है जो समय और सिग्नल का समन्वय करता है।"
  },
  "trapAlert": {
    "en": "Don't confuse ALU with CU! ALU performs math/logic; CU never performs computations.",
    "hi": "ALU को CU से भ्रमित न करें! ALU गणित/तर्क करता है; CU कभी गणना नहीं करता।"
  }
}
```

### Schema Rules:
- **`id`**: Unique string identifier (e.g., `q_topic_number`).
- **`topicId`**: Must match one of the system topic IDs:
  - `computer-basics`, `hardware`, `memory`, `number-systems`, `os`, `ms-office`, `keyboard-shortcuts`, `networking`, `protocols-osi`, `internet`, `cybersecurity`, `database`, `programming-basics`, `digital-banking`, `emerging-tech`.
- **`difficulty`**: `"Easy"`, `"Moderate"`, or `"Hard"`.
- **`type`**: `"ACTUAL PYQ"`, `"MEMORY-BASED PYQ"`, `"PYQ-STYLE"`, or `"ORIGINAL PRACTICE"`.
- **`options`**: Must have exactly 5 elements in both `en` and `hi` (Indices 0 through 4 correspond to A through E).
- **`correctAnswer`**: 0-indexed integer (0 for A, 1 for B, 2 for C, 3 for D, 4 for E).

---

## 2. Adding Abbreviations to `abbreviations.json`

Entries in `public/data/abbreviations.json` are organized under categories:

```json
{
  "acronym": "SWIFT",
  "expansion": "Society for Worldwide Interbank Financial Telecommunication",
  "category": "Digital Banking",
  "description": {
    "en": "A secure global messaging network used by financial institutions to transmit information and instructions, such as international wire transfers. Features 8 or 11 character BIC codes.",
    "hi": "वित्तीय संस्थानों द्वारा सूचना और निर्देशों (जैसे अंतर्राष्ट्रीय वायर ट्रांसफर) को प्रसारित करने के लिए उपयोग किया जाने वाला एक सुरक्षित वैश्विक मैसेजिंग नेटवर्क। इसमें 8 या 11 अक्षरों के BIC कोड होते हैं।"
  },
  "examRelevance": "Frequently tested in IBPS RRB Scale-I/II and SBI Clerk Mains under Digital Banking and Cross-Border transactions."
}
```

---

## 3. Creating Custom Mock Tests in `mock-presets.json`

You can add new mock presets by adding an object to the `presets` array in `public/data/mock-presets.json`:

```json
{
  "id": "sbi-clerk-sprint",
  "title": "SBI Clerk Mains High-Yield Sprint",
  "badge": "SBI Clerk",
  "questionsCount": 20,
  "durationMinutes": 12,
  "marksPerCorrect": 1.0,
  "negativeMark": 0.25,
  "description": "High-speed 20-question blitz focused on MS Office, Shortcuts, and Digital Banking.",
  "filter": {
    "topics": ["ms-office", "keyboard-shortcuts", "digital-banking"],
    "difficulties": ["Moderate", "Hard"]
  }
}
```

---

## 4. Bulk Question Importer (UI Feature)

You don't even need to edit files manually to test new questions!
1. Open the web app.
2. Go to **Tools** > **Question Importer**.
3. Paste any JSON array formatted according to the schema above.
4. Click **Validate & Import**.
5. Imported questions are instantly merged into your local practice database.

---

## 5. Rebuilding & Testing
After modifying any JSON file in `public/data/`:
```bash
# Verify the build bundles without errors
npm run build

# Preview the results locally
npm run preview
```
All JSON files in `public/data/` are automatically copied to `dist/data/` during `npm run build`.
