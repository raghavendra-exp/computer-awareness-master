import React, { useState, useEffect } from 'react';
import {
  Cpu, Layers, BookOpen, Zap, Trophy, BarChart3, AlertTriangle, Bookmark,
  Calendar, Upload, Database, Search, Shuffle, Target, Table, Binary, Network,
  ShieldAlert, ShieldCheck, Globe, Menu, X, Flame, ChevronRight, Sparkles
} from 'lucide-react';

// Utilities
import { calculateReadiness } from './utils/readinessCalculator';
import { getStoredData, setStoredData, updateDailyStreak } from './utils/dataManager';

// Components
import Dashboard from './components/dashboard/Dashboard';
import BilingualArena from './components/practice/BilingualArena';
import SpeedLab from './components/practice/SpeedLab';
import FlashcardDeck from './components/practice/FlashcardDeck';
import FullFormsDictionary from './components/practice/FullFormsDictionary';
import QuestionSelectionTrainer from './components/practice/QuestionSelectionTrainer';
import DragAndDropMatcher from './components/practice/DragAndDropMatcher';
import ExamSimulator from './components/mock/ExamSimulator';
import ScorecardAnalytics from './components/mock/ScorecardAnalytics';
import PyqAnalytics from './components/analytics/PyqAnalytics';
import WeaknessEngine from './components/analytics/WeaknessEngine';
import MistakesNotebook from './components/tools/MistakesNotebook';
import BookmarksManager from './components/tools/BookmarksManager';
import StudyRoadmaps from './components/tools/StudyRoadmaps';
import QuestionImporter from './components/tools/QuestionImporter';
import BackupSync from './components/tools/BackupSync';
import GlobalSearchModal from './components/common/GlobalSearchModal';
import ConceptModuleViewer from './components/modules/ConceptModuleViewer';

// 10 Interactive Simulators
import CpuPipelineVisualizer from './components/simulators/CpuPipelineVisualizer';
import BuildAComputerLab from './components/simulators/BuildAComputerLab';
import NumberSystemConverter from './components/simulators/NumberSystemConverter';
import KeyboardShortcutLab from './components/simulators/KeyboardShortcutLab';
import MiniExcelSimulator from './components/simulators/MiniExcelSimulator';
import WebsiteLoadingFlow from './components/simulators/WebsiteLoadingFlow';
import NetworkTopologyBuilder from './components/simulators/NetworkTopologyBuilder';
import OsiLayerInspector from './components/simulators/OsiLayerInspector';
import PhishingAttackDetector from './components/simulators/PhishingAttackDetector';
import DataStructureVisualizer from './components/simulators/DataStructureVisualizer';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Core Datasets
  const [questions, setQuestions] = useState([]);
  const [abbreviations, setAbbreviations] = useState([]);
  const [shortcuts, setShortcuts] = useState([]);
  const [mockPresets, setMockPresets] = useState([]);
  const [pyqData, setPyqData] = useState(null);
  const [studyPlans, setStudyPlans] = useState(null);
  const [activeModuleData, setActiveModuleData] = useState(null);

  // Mock Test State
  const [selectedMockPreset, setSelectedMockPreset] = useState(null);
  const [mockResult, setMockResult] = useState(null);

  // Fetch all initial data
  useEffect(() => {
    updateDailyStreak();

    const fetchJson = async (path, setter) => {
      try {
        const res = await fetch(`./data/${path}`);
        if (res.ok) {
          const data = await res.json();
          setter(data);
        }
      } catch (err) {
        console.warn(`Could not load ./data/${path}`, err);
      }
    };

    fetchJson('questions.json', (data) => {
      // Check for any imported custom questions
      const customQ = getStoredData('cam_custom_questions_v1', []);
      setQuestions([...customQ, ...data]);
    });

    fetchJson('abbreviations.json', (data) => setAbbreviations(data.terms || []));
    fetchJson('keyboard-shortcuts.json', (data) => {
      const flattened = [];
      (data.categories || []).forEach(cat => {
        (cat.shortcuts || []).forEach(sc => flattened.push({ ...sc, category: cat.category }));
      });
      setShortcuts(flattened);
    });
    fetchJson('mock-presets.json', (data) => setMockPresets(data.presets || []));
    fetchJson('pyq.json', setPyqData);
    fetchJson('study-plans.json', setStudyPlans);
  }, []);

  // Compute readiness score
  const readinessData = calculateReadiness(questions);

  // Load conceptual module file on demand
  const handleLoadModule = async (fileKey, viewKey) => {
    try {
      const res = await fetch(`./data/${fileKey}.json`);
      if (res.ok) {
        const data = await res.json();
        setActiveModuleData(data);
        setActiveView(viewKey);
      }
    } catch (e) {
      console.error('Failed to load module:', fileKey, e);
    }
  };

  const handleStartMock = (presetId) => {
    const preset = mockPresets.find(p => p.id === presetId) || mockPresets[0];
    setSelectedMockPreset(preset);
    setActiveView('mock-exam');
  };

  const handleFinishMock = (result) => {
    setMockResult(result);
    setActiveView('mock-scorecard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white lg:hidden transition"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition duration-200">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="font-black text-sm tracking-tight text-white flex items-center gap-1.5">
                COMPUTER AWARENESS <span className="text-cyan-400 text-xs px-1.5 py-0.2 bg-cyan-500/10 border border-cyan-500/20 rounded font-mono">MASTER</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
                SBI Clerk • IBPS Clerk/CSA • RRB Office Assistant
              </div>
            </div>
          </div>
        </div>

        {/* Center/Right Nav Controls */}
        <div className="flex items-center gap-3">
          {/* Quick Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 text-xs transition font-mono"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search topics & shortcuts...</span>
            <kbd className="px-1.5 py-0.5 bg-slate-950 rounded text-[10px] border border-slate-800">Ctrl K</kbd>
          </button>

          {/* Readiness Score Pill */}
          <div
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer hover:border-cyan-500/40 transition text-xs font-mono"
          >
            <span className="text-slate-400 hidden md:inline">Readiness:</span>
            <span className="font-black text-cyan-400">{readinessData.score}%</span>
          </div>

          {/* Active Streak */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-xs font-mono font-bold">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>{readinessData.metrics.activeStreak}d</span>
          </div>
        </div>
      </header>

      {/* Body Area with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Responsive Sidebar Drawer */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-slate-950 border-r border-slate-800/80 p-4 flex flex-col justify-between overflow-y-auto transform transition-transform duration-200 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="space-y-6">
            {/* Primary Main Menu */}
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
                Core Preparation
              </div>
              <div className="space-y-1">
                {[
                  { id: 'dashboard', name: 'Dashboard & Readiness', icon: Cpu },
                  { id: 'practice', name: 'Bilingual Practice Arena', icon: BookOpen, badge: '508 Qs' },
                  { id: 'mocks', name: 'Mains Exam Simulator', icon: Trophy, badge: 'RRB Live' },
                  { id: 'speed-lab', name: 'Rapid Speed Lab (20s)', icon: Zap, color: 'text-amber-400' }
                ].map(item => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveView(item.id); setSidebarOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                          : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : item.color || 'text-cyan-400'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                          isActive ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 10 Visual Interactive Simulators */}
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 mb-2 flex items-center justify-between">
                <span>10 Visual Simulators</span>
                <span className="text-cyan-400 text-[9px]">INTERACTIVE</span>
              </div>
              <div className="space-y-1">
                {[
                  { id: 'cpu-sim', name: 'CPU Pipeline Visualizer', icon: Cpu },
                  { id: 'pc-builder', name: 'Build-A-Computer Lab', icon: Layers },
                  { id: 'binary-sim', name: 'Number Base Converter', icon: Binary },
                  { id: 'shortcut-lab', name: 'Keyboard Shortcut Lab', icon: Zap },
                  { id: 'excel-sim', name: 'Mini Excel Simulator', icon: Table },
                  { id: 'web-flow', name: 'Website Loading Flow', icon: Globe },
                  { id: 'topology-sim', name: 'Network Topologies', icon: Network },
                  { id: 'osi-sim', name: '7-Layer OSI Inspector', icon: Layers },
                  { id: 'phishing-sim', name: 'Phishing Attack Detector', icon: ShieldAlert },
                  { id: 'ds-sim', name: 'Data Structures (Stack/Queue)', icon: Layers }
                ].map(item => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveView(item.id); setSidebarOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs transition ${
                        isActive
                          ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/20'
                          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Revision & Recall Drills */}
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
                Active Recall & Drills
              </div>
              <div className="space-y-1">
                {[
                  { id: 'flashcards', name: 'Leitner 5-Box Flashcards', icon: Layers },
                  { id: 'dictionary', name: 'Full Forms Dictionary', icon: BookOpen },
                  { id: 'triage', name: 'Question Selection Trainer', icon: Target },
                  { id: 'matcher', name: 'Concept Drag & Matcher', icon: Shuffle }
                ].map(item => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveView(item.id); setSidebarOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs transition ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Conceptual Modules */}
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
                Syllabus Study Modules
              </div>
              <div className="space-y-1">
                {[
                  { key: 'computer-basics', name: 'Fundamentals & History', icon: BookOpen },
                  { key: 'hardware', name: 'Hardware & Architecture', icon: Cpu },
                  { key: 'memory', name: 'Memory & Storage Units', icon: Binary },
                  { key: 'os', name: 'Operating Systems', icon: Layers },
                  { key: 'ms-office', name: 'MS Office (Word, Excel, PPT)', icon: Table },
                  { key: 'networking', name: 'Computer Networks', icon: Network },
                  { key: 'protocols-osi', name: 'Protocols & OSI Layers', icon: Layers },
                  { key: 'internet', name: 'Internet & Cloud Computing', icon: Globe },
                  { key: 'cybersecurity', name: 'Cybersecurity & IT Act', icon: ShieldAlert },
                  { key: 'database', name: 'Database & SQL', icon: Database },
                  { key: 'programming-basics', name: 'Programming & Data Structures', icon: Layers },
                  { key: 'digital-banking', name: 'Digital Banking Systems', icon: Trophy },
                  { key: 'emerging-tech', name: 'Emerging Tech & AI', icon: Sparkles }
                ].map(mod => {
                  const Icon = mod.icon;
                  const isActive = activeView === `mod-${mod.key}`;
                  return (
                    <button
                      key={mod.key}
                      onClick={() => { handleLoadModule(mod.key, `mod-${mod.key}`); setSidebarOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-1 rounded-lg text-[11px] transition ${
                        isActive
                          ? 'bg-slate-800 text-cyan-300 font-bold'
                          : 'text-slate-500 hover:bg-slate-900 hover:text-slate-300'
                      }`}
                    >
                      <Icon className="w-3 h-3 text-slate-500" />
                      <span className="truncate">{mod.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Analytics & Tools */}
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
                Diagnostics & Tools
              </div>
              <div className="space-y-1">
                {[
                  { id: 'pyq-analytics', name: 'PYQ Shift Trends (2020-26)', icon: BarChart3 },
                  { id: 'weakness', name: 'Weakness Engine', icon: AlertTriangle, color: 'text-amber-400' },
                  { id: 'mistakes', name: 'Mistakes Notebook', icon: Bookmark, badge: readinessData.metrics.unresolvedMistakesCount },
                  { id: 'bookmarks', name: 'Bookmarked Questions', icon: Bookmark },
                  { id: 'roadmaps', name: 'Study Roadmaps (30 Days)', icon: Calendar },
                  { id: 'importer', name: 'Question Importer', icon: Upload },
                  { id: 'backup', name: 'Backup & Privacy', icon: Database }
                ].map(item => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveView(item.id); setSidebarOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : item.color || 'text-slate-400'}`} />
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item.badge > 0 && (
                        <span className="px-1.5 py-0.2 bg-red-500/20 border border-red-500/30 text-red-300 rounded text-[10px] font-mono">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="pt-4 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 space-y-1">
            <div>CAM v2026.1 • 100% Offline</div>
            <div className="text-slate-600">Free Open-Source Banking Platform</div>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {activeView === 'dashboard' && (
            <Dashboard
              readinessData={readinessData}
              onNavigate={(v) => setActiveView(v)}
              onLaunchMock={handleStartMock}
            />
          )}

          {activeView === 'practice' && (
            <BilingualArena questions={questions} />
          )}

          {activeView === 'speed-lab' && (
            <SpeedLab questions={questions} />
          )}

          {activeView === 'flashcards' && (
            <FlashcardDeck abbreviations={abbreviations} shortcuts={shortcuts} />
          )}

          {activeView === 'dictionary' && (
            <FullFormsDictionary abbreviations={abbreviations} />
          )}

          {activeView === 'triage' && (
            <QuestionSelectionTrainer />
          )}

          {activeView === 'matcher' && (
            <DragAndDropMatcher />
          )}

          {activeView === 'mocks' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-2">Mains Mock Test Presets</h2>
              <p className="text-xs text-slate-400 mb-6">
                Choose an exam level simulation. Full RRB tests include strict 20-minute countdowns with negative marking.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockPresets.map(preset => (
                  <div key={preset.id} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold">
                          {preset.badge}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{preset.durationMinutes} Mins</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-1">{preset.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">{preset.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono">
                      <span className="text-slate-400">{preset.questionCount} Questions</span>
                      <button
                        onClick={() => handleStartMock(preset.id)}
                        className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition"
                      >
                        Start Test →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'mock-exam' && (
            <ExamSimulator
              questions={questions}
              preset={selectedMockPreset}
              onFinishMock={handleFinishMock}
            />
          )}

          {activeView === 'mock-scorecard' && (
            <ScorecardAnalytics
              result={mockResult}
              onRetake={() => setActiveView('mocks')}
            />
          )}

          {/* 10 Simulators */}
          {activeView === 'cpu-sim' && <CpuPipelineVisualizer />}
          {activeView === 'pc-builder' && <BuildAComputerLab />}
          {activeView === 'binary-sim' && <NumberSystemConverter />}
          {activeView === 'shortcut-lab' && <KeyboardShortcutLab />}
          {activeView === 'excel-sim' && <MiniExcelSimulator />}
          {activeView === 'web-flow' && <WebsiteLoadingFlow />}
          {activeView === 'topology-sim' && <NetworkTopologyBuilder />}
          {activeView === 'osi-sim' && <OsiLayerInspector />}
          {activeView === 'phishing-sim' && <PhishingAttackDetector />}
          {activeView === 'ds-sim' && <DataStructureVisualizer />}

          {/* Analytics & Tools */}
          {activeView === 'pyq-analytics' && <PyqAnalytics pyqData={pyqData} />}
          {activeView === 'weakness' && (
            <WeaknessEngine
              readinessData={readinessData}
              onLaunchWeaknessDrill={(mod) => {
                setActiveView('practice');
              }}
            />
          )}
          {activeView === 'mistakes' && <MistakesNotebook />}
          {activeView === 'bookmarks' && <BookmarksManager allQuestions={questions} />}
          {activeView === 'roadmaps' && <StudyRoadmaps studyPlansData={studyPlans} />}
          {activeView === 'importer' && (
            <QuestionImporter
              onImportSuccess={(newQs) => setQuestions(newQs)}
            />
          )}
          {activeView === 'backup' && <BackupSync />}

          {/* Conceptual Modules */}
          {activeView.startsWith('mod-') && activeModuleData && (
            <ConceptModuleViewer
              moduleData={activeModuleData}
              onLaunchSimulator={(sim) => setActiveView(sim)}
            />
          )}
        </main>
      </div>

      {/* Global Quick Search Modal (Ctrl + K) */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={(v) => {
          if (v === 'search-open') setSearchOpen(true);
          else setActiveView(v);
        }}
        abbreviations={abbreviations}
        shortcuts={shortcuts}
        questions={questions}
      />
    </div>
  );
}
