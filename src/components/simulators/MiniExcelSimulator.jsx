import React, { useState } from 'react';
import { Table, Sparkles, AlertCircle, HelpCircle, RotateCcw } from 'lucide-react';
import { evaluateFormula } from '../../utils/formulaParser';

const COLS = ['A', 'B', 'C', 'D', 'E'];
const ROWS = [1, 2, 3, 4, 5, 6];

const INITIAL_GRID = {
  A1: 'Account No', B1: 'Customer Name', C1: 'Balance (₹)', D1: 'Interest (4%)', E1: 'Total (₹)',
  A2: 1001, B2: 'Rahul', C2: 50000, D2: '=C2 * 0.04', E2: '=C2 + D2',
  A3: 1002, B3: 'Pooja', C3: 75000, D3: '=C3 * 0.04', E3: '=C3 + D3',
  A4: 1003, B4: 'Amit', C4: 25000, D4: '=C4 * 0.04', E4: '=C4 + D4',
  A5: 'Total', B5: '=COUNTA(B2:B4)', C5: '=SUM(C2:C4)', D5: '=SUM(D2:D4)', E5: '=SUM(E2:E4)',
  A6: 'Average', B6: '-', C6: '=AVERAGE(C2:C4)', D6: '=AVERAGE(D2:D4)', E6: '=AVERAGE(E2:E4)'
};

export default function MiniExcelSimulator() {
  const [grid, setGrid] = useState(INITIAL_GRID);
  const [activeCell, setActiveCell] = useState('C5');
  const [formulaInput, setFormulaInput] = useState(INITIAL_GRID['C5'] || '');

  // Compute cell display values
  const getEvaluatedGrid = () => {
    const evaluated = {};
    // First pass literals
    Object.keys(grid).forEach(cell => {
      const raw = grid[cell];
      if (typeof raw !== 'string' || !raw.startsWith('=')) {
        evaluated[cell] = raw;
      }
    });

    // Multi-pass evaluation for dependent formulas
    for (let pass = 0; pass < 3; pass++) {
      Object.keys(grid).forEach(cell => {
        const raw = grid[cell];
        if (typeof raw === 'string' && raw.startsWith('=')) {
          evaluated[cell] = evaluateFormula(raw, evaluated);
        }
      });
    }
    return evaluated;
  };

  const evaluatedGrid = getEvaluatedGrid();

  const handleCellSelect = (cell) => {
    setActiveCell(cell);
    setFormulaInput(grid[cell] !== undefined ? String(grid[cell]) : '');
  };

  const handleFormulaCommit = (e) => {
    e.preventDefault();
    setGrid(prev => ({
      ...prev,
      [activeCell]: formulaInput
    }));
  };

  const handleReset = () => {
    setGrid(INITIAL_GRID);
    setActiveCell('C5');
    setFormulaInput(INITIAL_GRID['C5']);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
            <Table className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Interactive Mini MS Excel Spreadsheet Simulator</h2>
            <p className="text-xs text-slate-400">
              Live Formula Bar • Cell References • Functions (=SUM, =AVERAGE, =IF) • Error Codes (#DIV/0!)
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg border border-slate-700 text-slate-300 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Sheet
        </button>
      </div>

      {/* Formula Bar Header */}
      <form onSubmit={handleFormulaCommit} className="flex items-center gap-2 mb-4">
        {/* Name Box */}
        <div className="w-16 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-center font-mono text-xs font-bold text-cyan-400">
          {activeCell}
        </div>

        {/* fx symbol */}
        <span className="font-serif italic font-bold text-slate-500 text-sm">fx</span>

        {/* Formula Input */}
        <input
          type="text"
          value={formulaInput}
          onChange={(e) => setFormulaInput(e.target.value)}
          placeholder="Enter value or formula e.g. =SUM(C2:C4) or =C2*0.04"
          className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 font-mono text-xs text-white focus:outline-none"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-cyan-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-cyan-400 transition"
        >
          Apply
        </button>
      </form>

      {/* Spreadsheet Grid Table */}
      <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 mb-6">
        <table className="w-full border-collapse font-mono text-xs">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800">
              <th className="w-10 p-2 text-center text-slate-500 border-r border-slate-800 bg-slate-950">#</th>
              {COLS.map(col => (
                <th key={col} className="p-2 text-center font-bold text-slate-400 border-r border-slate-800 min-w-[130px]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map(row => (
              <tr key={row} className="border-b border-slate-800/60 hover:bg-slate-900/30">
                <td className="p-2 text-center text-slate-500 bg-slate-900/80 border-r border-slate-800 font-semibold select-none">
                  {row}
                </td>
                {COLS.map(col => {
                  const cellKey = `${col}${row}`;
                  const isSelected = activeCell === cellKey;
                  const displayVal = evaluatedGrid[cellKey];
                  const rawVal = grid[cellKey];
                  const isFormula = typeof rawVal === 'string' && rawVal.startsWith('=');
                  const isError = typeof displayVal === 'string' && displayVal.startsWith('#');

                  return (
                    <td
                      key={cellKey}
                      onClick={() => handleCellSelect(cellKey)}
                      className={`p-2 border-r border-slate-800/80 cursor-pointer transition ${
                        isSelected
                          ? 'bg-cyan-500/20 ring-2 ring-cyan-500 text-white font-bold'
                          : 'text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`truncate ${isError ? 'text-red-400 font-bold' : ''}`}>
                          {displayVal !== undefined ? String(displayVal) : ''}
                        </span>
                        {isFormula && !isSelected && (
                          <span className="text-[9px] text-cyan-400/60 ml-1 font-serif">fx</span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Common Formulas Quick Tester */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-cyan-400" /> Click to Test High-Yield Exam Formulas in Cell {activeCell}:
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            '=SUM(C2:C4)',
            '=AVERAGE(C2:C4)',
            '=MAX(C2:C4)',
            '=MIN(C2:C4)',
            '=COUNT(A2:E4)',
            '=COUNTA(A2:E4)',
            '=IF(C2 > 40000, "High", "Standard")',
            '=C2 / 0'
          ].map(f => (
            <button
              key={f}
              onClick={() => {
                setFormulaInput(f);
                setGrid(prev => ({ ...prev, [activeCell]: f }));
              }}
              className="px-2.5 py-1 bg-slate-900 border border-slate-700 hover:border-cyan-500 text-cyan-300 rounded text-xs font-mono transition"
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Bank Exam Rules */}
      <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 text-xs text-slate-300 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block mb-1">MS Excel Exam Facts:</strong>
          <span>
            1. Every formula in Excel MUST start with an <strong>equals sign (=)</strong>.<br />
            2. <strong>COUNT</strong> counts cells that contain numeric values only, while <strong>COUNTA</strong> counts all non-empty cells (numbers, text, logicals).<br />
            3. <strong>#DIV/0!</strong> appears when dividing by zero or an empty cell; <strong>#VALUE!</strong> appears when using wrong argument types; <strong>#####</strong> means column width is too narrow.
          </span>
        </div>
      </div>
    </div>
  );
}
