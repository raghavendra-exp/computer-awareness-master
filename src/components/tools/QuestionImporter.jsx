import React, { useState } from 'react';
import { Upload, CheckCircle2, AlertCircle, HelpCircle, FileText } from 'lucide-react';
import { getStoredData, setStoredData } from '../../utils/dataManager';

const CUSTOM_Q_KEY = 'cam_custom_questions_v1';

export default function QuestionImporter({ onImportSuccess }) {
  const [jsonInput, setJsonInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [previewList, setPreviewList] = useState([]);

  const handleValidateAndPreview = () => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const parsed = JSON.parse(jsonInput);
      const items = Array.isArray(parsed) ? parsed : [parsed];

      // Validate schema
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!item.question || !Array.isArray(item.options) || item.correctOption === undefined) {
          throw new Error(`Item ${i + 1} is missing mandatory fields: 'question', 'options' (array), or 'correctOption'.`);
        }
        if (item.options.length < 2) {
          throw new Error(`Item ${i + 1} must provide at least 2 options.`);
        }
      }

      setPreviewList(items);
      setSuccessMsg(`Successfully validated ${items.length} question(s)! Review preview below and click 'Confirm Import'.`);
    } catch (err) {
      setErrorMsg(err.message);
      setPreviewList([]);
    }
  };

  const handleCommitImport = () => {
    const existing = getStoredData(CUSTOM_Q_KEY, []);
    const updated = [...previewList, ...existing];
    setStoredData(CUSTOM_Q_KEY, updated);
    setSuccessMsg(`Successfully imported and saved ${previewList.length} questions to your local question bank!`);
    setPreviewList([]);
    setJsonInput('');
    if (onImportSuccess) onImportSuccess(updated);
  };

  const sampleTemplate = `[
  {
    "id": "CUSTOM-001",
    "module": "Networking",
    "badge": "FACULTY CUSTOM",
    "source": "Institute Test Series 2026",
    "question": "What is the maximum data transfer rate of a standard Cat 6 Ethernet cable up to 55 meters?",
    "questionHindi": "55 मीटर तक के मानक कैट 6 ईथरनेट केबल की अधिकतम डेटा ट्रांसफर दर क्या है?",
    "options": ["100 Mbps", "1 Gbps", "10 Gbps", "100 Gbps", "10 Mbps"],
    "correctOption": 2,
    "difficulty": "Medium",
    "solution": "Cat 6 cables support 10 Gbps speeds at distances up to 55 meters, and 1 Gbps up to 100 meters.",
    "conceptTip": "Cat 5e supports 1 Gbps; Cat 6 supports 10 Gbps up to 55m.",
    "trapAlert": "Beyond 55 meters, Cat 6 drops to 1 Gbps.",
    "tags": ["networking", "cabling", "cat6"]
  }
]`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Faculty & Student Question Importer</h2>
            <p className="text-xs text-slate-400">
              Import Custom Questions in Structured JSON Schema • 100% Offline Local Storage
            </p>
          </div>
        </div>
      </div>

      {/* Input Textarea */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center text-xs">
          <label className="text-slate-400 font-bold uppercase font-mono">Paste JSON Array of Questions</label>
          <button
            onClick={() => setJsonInput(sampleTemplate)}
            className="text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Load Sample Template
          </button>
        </div>

        <textarea
          rows={8}
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Paste JSON array here..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
        />

        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={handleValidateAndPreview}
            disabled={!jsonInput.trim()}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition"
          >
            Validate & Preview Schema
          </button>
          {previewList.length > 0 && (
            <button
              onClick={handleCommitImport}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition"
            >
              Confirm Import ({previewList.length} Questions)
            </button>
          )}
        </div>
      </div>

      {/* Preview Section */}
      {previewList.length > 0 && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 animate-fadeIn">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
            Preview of Validated Questions ({previewList.length})
          </h4>

          {previewList.map((q, idx) => (
            <div key={idx} className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between font-mono text-slate-400">
                <span className="text-white font-bold">{q.id || `Custom-${idx+1}`}</span>
                <span>Module: {q.module || 'General'}</span>
              </div>
              <p className="font-semibold text-white">{q.question}</p>
              <div className="space-y-1">
                {q.options.map((opt, oIdx) => (
                  <div
                    key={oIdx}
                    className={`p-1.5 rounded ${oIdx === q.correctOption ? 'text-emerald-400 font-bold bg-emerald-500/10' : 'text-slate-400'}`}
                  >
                    {String.fromCharCode(65 + oIdx)}. {opt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
