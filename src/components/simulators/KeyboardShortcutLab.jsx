import React, { useState } from 'react';
import { Keyboard, Sparkles, HelpCircle, Check, BookOpen } from 'lucide-react';

const SHORTCUT_MAP = {
  'Ctrl + C': { app: 'Universal', action: 'Copy selected text or item to clipboard', trap: null },
  'Ctrl + V': { app: 'Universal', action: 'Paste item from clipboard', trap: null },
  'Ctrl + X': { app: 'Universal', action: 'Cut selected text or item to clipboard', trap: null },
  'Ctrl + Z': { app: 'Universal', action: 'Undo last action', trap: null },
  'Ctrl + Y': { app: 'Universal', action: 'Redo previously undone action', trap: null },
  'Ctrl + A': { app: 'Universal', action: 'Select all content in document or folder', trap: null },
  'Ctrl + F': { app: 'Universal', action: 'Open Find dialog or search bar', trap: null },
  'Ctrl + H': { app: 'Universal', action: 'Open Replace dialog box', trap: null },
  'Ctrl + P': { app: 'Universal', action: 'Open Print preview and options', trap: null },
  'Ctrl + S': { app: 'Universal', action: 'Save current file / document', trap: null },
  'Ctrl + B': { app: 'MS Word', action: 'Toggle Bold formatting', trap: null },
  'Ctrl + I': { app: 'MS Word', action: 'Toggle Italic formatting', trap: null },
  'Ctrl + U': { app: 'MS Word', action: 'Toggle Underline formatting', trap: null },
  'Ctrl + E': { app: 'MS Word', action: 'Center align text paragraph', trap: 'Ctrl+E centers text; Ctrl+L left-aligns, Ctrl+R right-aligns.' },
  'Ctrl + J': { app: 'MS Word', action: 'Justify text paragraph', trap: null },
  'Ctrl + K': { app: 'MS Word / Excel', action: 'Insert Hyperlink into text or cell', trap: 'High frequency question!' },
  'Ctrl + M': { app: 'MS PowerPoint', action: 'Insert a NEW SLIDE into presentation', trap: 'EXAM TRAP: Ctrl+M inserts a new SLIDE; Ctrl+N opens a new presentation!' },
  'Ctrl + N': { app: 'Universal', action: 'Create a NEW document / presentation file', trap: null },
  'Ctrl + D': { app: 'MS PowerPoint / Word', action: 'Duplicate slide in PPT; open Font dialog in Word; Bookmark page in Chrome', trap: null },
  'Shift + Delete': { app: 'Windows', action: 'Permanently delete selected file bypassing Recycle Bin', trap: 'Cannot be undone from Recycle Bin!' },
  'F1': { app: 'Universal', action: 'Open Help center', trap: null },
  'F2': { app: 'Excel / Windows', action: 'Edit active cell in Excel; Rename selected file in Windows Explorer', trap: null },
  'F4': { app: 'MS Excel', action: 'Cycle between absolute and relative cell references ($A$1 -> A$1 -> $A1 -> A1)', trap: 'Also repeats last action.' },
  'F5': { app: 'PPT / Browser', action: 'Start slide show from Slide 1 in PPT; Refresh web page in browser', trap: 'Shift+F5 starts from CURRENT slide.' },
  'Shift + F5': { app: 'MS PowerPoint', action: 'Start slide show from the CURRENT active slide', trap: null },
  'F7': { app: 'MS Office', action: 'Run Spelling and Grammar check', trap: 'Shift+F7 opens Thesaurus dictionary.' },
  'Shift + F7': { app: 'MS Word', action: 'Open Thesaurus (synonyms dictionary)', trap: 'F7 is spell check; Shift+F7 is thesaurus!' },
  'F12': { app: 'MS Office', action: 'Open Save As dialog box', trap: 'Ctrl+S saves; F12 opens Save As.' },
  'Alt + Tab': { app: 'Windows', action: 'Switch between active open applications', trap: null },
  'Alt + F4': { app: 'Windows', action: 'Close active window or open Windows shutdown prompt', trap: null },
  'Win + D': { app: 'Windows', action: 'Show / hide Windows desktop (minimize all)', trap: null },
  'Win + E': { app: 'Windows', action: 'Open Windows File Explorer', trap: null },
  'Win + L': { app: 'Windows', action: 'Lock Windows PC or switch user account', trap: null },
  'Win + R': { app: 'Windows', action: 'Open Windows Run dialog box', trap: null }
};

export default function KeyboardShortcutLab() {
  const [activeModifier, setActiveModifier] = useState('Ctrl');
  const [selectedKey, setSelectedKey] = useState('M');

  const fullCombination = activeModifier ? `${activeModifier} + ${selectedKey}` : selectedKey;
  const match = SHORTCUT_MAP[fullCombination];

  const keysRow1 = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
  const keysLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
            <Keyboard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Interactive Keyboard Shortcut & Hotkey Lab</h2>
            <p className="text-xs text-slate-400">
              Interactive 104-Key Virtual Terminal • Test Modifiers • Exam Traps & Real-Time Actions
            </p>
          </div>
        </div>
      </div>

      {/* Modifier Selector */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">Modifier:</span>
        {['None', 'Ctrl', 'Shift', 'Alt', 'Win', 'Shift + Delete'].map(mod => {
          const val = mod === 'None' ? '' : mod;
          const isSel = activeModifier === val;
          return (
            <button
              key={mod}
              onClick={() => setActiveModifier(val)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                isSel
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {mod}
            </button>
          );
        })}
      </div>

      {/* Virtual Keypad */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6 space-y-3">
        {/* Function Keys Row */}
        <div>
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Function Keys</div>
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
            {keysRow1.map(k => (
              <button
                key={k}
                onClick={() => setSelectedKey(k)}
                className={`py-2 px-1 text-center font-mono text-xs font-bold rounded-lg border transition ${
                  selectedKey === k
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {/* Letter Keys Row */}
        <div>
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Alpha Keys (A - Z)</div>
          <div className="grid grid-cols-7 sm:grid-cols-9 md:grid-cols-13 gap-1.5">
            {keysLetters.map(k => (
              <button
                key={k}
                onClick={() => setSelectedKey(k)}
                className={`py-2 text-center font-mono text-xs font-bold rounded-lg border transition ${
                  selectedKey === k
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shortcut Action Result Panel */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Tested Combination:</span>
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-base font-bold rounded-lg">
              {fullCombination}
            </span>
          </div>
          {match && (
            <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold rounded-lg">
              Scope: {match.app}
            </span>
          )}
        </div>

        {match ? (
          <div>
            <div className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              Action: {match.action}
            </div>

            {match.trap && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-300 mt-3 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>High-Frequency Exam Trap Alert:</strong> {match.trap}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">
            This specific combination is not a standard bank exam hotkey. Select combinations like <strong>Ctrl + M</strong>, <strong>Ctrl + K</strong>, <strong>F7</strong>, <strong>Shift + F7</strong>, or <strong>F2</strong>.
          </p>
        )}
      </div>

      {/* Quick High-Yield Shortcuts Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <span className="font-mono text-cyan-400 font-bold block mb-1">Ctrl + M</span>
          <span className="text-slate-300">New Slide in PowerPoint (NOT Ctrl+N).</span>
        </div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <span className="font-mono text-cyan-400 font-bold block mb-1">Shift + F7</span>
          <span className="text-slate-300">Thesaurus (Synonyms) in MS Word.</span>
        </div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <span className="font-mono text-cyan-400 font-bold block mb-1">Ctrl + ;</span>
          <span className="text-slate-300">Insert current system Date into Excel cell.</span>
        </div>
      </div>
    </div>
  );
}
