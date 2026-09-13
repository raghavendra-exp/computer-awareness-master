import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Filter, Tag, HelpCircle, ExternalLink } from 'lucide-react';

export default function FullFormsDictionary({ abbreviations = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLetter, setSelectedLetter] = useState('All');

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(abbreviations.map(a => a.category))).sort()];
  }, [abbreviations]);

  const alphabet = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const filtered = useMemo(() => {
    return abbreviations.filter(item => {
      const matchSearch = !searchTerm ||
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fullForm.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchLetter = selectedLetter === 'All' || item.term.toUpperCase().startsWith(selectedLetter);
      return matchSearch && matchCat && matchLetter;
    });
  }, [abbreviations, searchTerm, selectedCategory, selectedLetter]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Full Forms & Abbreviations Dictionary</h2>
            <p className="text-xs text-slate-400">
              Complete A-Z Banking Exam Computer Acronyms • Instant Search & Categories
            </p>
          </div>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search acronyms or full forms (e.g., RTGS, ASCII, BIOS, NPCI, HTTP)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="md:col-span-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Alphabet A-Z Jump Bar */}
      <div className="flex flex-wrap items-center gap-1 mb-6 p-2 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto text-[11px] font-mono">
        {alphabet.map(letter => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(letter)}
            className={`px-2 py-1 rounded transition ${
              selectedLetter === letter
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-mono">
        <span>Showing <strong className="text-cyan-400">{filtered.length}</strong> terms</span>
        <span>Total Dictionary: {abbreviations.length} items</span>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-xl transition duration-150 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-base font-black text-cyan-300 tracking-wider">
                  {item.term}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono">
                  {item.category}
                </span>
              </div>
              <p className="text-xs font-semibold text-white leading-relaxed">
                {item.fullForm}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-8 text-center text-slate-500 text-xs">
          No abbreviations matched your search. Try changing the filter.
        </div>
      )}
    </div>
  );
}
