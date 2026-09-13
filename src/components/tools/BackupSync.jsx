import React, { useState } from 'react';
import { Download, Upload, Trash2, CheckCircle2, AlertTriangle, ShieldCheck, Database } from 'lucide-react';
import { exportEntireUserData, importUserData, clearAllUserData } from '../../utils/dataManager';

export default function BackupSync() {
  const [importStatus, setImportStatus] = useState(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleExport = () => {
    const jsonStr = exportEntireUserData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `computer-awareness-master-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importUserData(event.target.result);
      setImportStatus(res);
      if (res.success) {
        setTimeout(() => window.location.reload(), 1200);
      }
    };
    reader.readAsText(file);
  };

  const handleClearAll = () => {
    clearAllUserData();
    setShowConfirmClear(false);
    window.location.reload();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl max-w-2xl mx-auto">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Backup, Sync & Data Privacy</h2>
            <p className="text-xs text-slate-400">
              100% Client-Side Offline Storage • Export & Restore Across Devices
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Export Card */}
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-400" /> Export All Student Data
            </h3>
            <p className="text-xs text-slate-400">
              Downloads a JSON snapshot of your mock test scores, mistakes notebook, bookmarks, and flashcard box progress.
            </p>
          </div>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition shrink-0"
          >
            Download Backup (.json)
          </button>
        </div>

        {/* Restore Card */}
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Upload className="w-4 h-4 text-cyan-400" /> Restore from JSON Backup
            </h3>
            <p className="text-xs text-slate-400">
              Upload a previously downloaded backup file to restore your study data and streak on another browser or device.
            </p>
          </div>
          <label className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl transition cursor-pointer shrink-0">
            Select Backup File
            <input type="file" accept=".json" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {/* Status Alert */}
        {importStatus && (
          <div className={`p-4 rounded-xl border text-xs flex items-center gap-2 ${
            importStatus.success
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}>
            {importStatus.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span>{importStatus.message}</span>
          </div>
        )}

        {/* Clear Data Reset */}
        <div className="p-5 bg-red-950/20 border border-red-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-red-300 mb-1 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-red-400" /> Factory Reset Local Storage
            </h3>
            <p className="text-xs text-slate-400">
              Permanently clears all mock history, mistakes notebook, and bookmarks from this browser.
            </p>
          </div>
          {!showConfirmClear ? (
            <button
              onClick={() => setShowConfirmClear(true)}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-bold rounded-xl transition shrink-0"
            >
              Reset All Data
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearAll}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition"
              >
                Confirm Delete
              </button>
              <button
                onClick={() => setShowConfirmClear(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-700"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
