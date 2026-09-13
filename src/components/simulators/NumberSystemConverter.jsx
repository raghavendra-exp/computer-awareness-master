import React, { useState } from 'react';
import { Binary, Calculator, RefreshCw, HelpCircle, ArrowRight } from 'lucide-react';

export default function NumberSystemConverter() {
  const [decimalVal, setDecimalVal] = useState(42);

  const handleDecimalChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setDecimalVal(isNaN(val) ? 0 : Math.max(0, Math.min(65535, val)));
  };

  const binaryStr = decimalVal.toString(2).padStart(8, '0');
  const octalStr = decimalVal.toString(8);
  const hexStr = decimalVal.toString(16).toUpperCase();

  // 8-bit array for bit toggler (lowest 8 bits)
  const bits = [];
  for (let i = 7; i >= 0; i--) {
    bits.push((decimalVal >> i) & 1);
  }

  const toggleBit = (bitIndex) => {
    // bitIndex 0 = bit 7 (128), bitIndex 7 = bit 0 (1)
    const power = 7 - bitIndex;
    const mask = 1 << power;
    setDecimalVal(prev => prev ^ mask);
  };

  // Generate division-by-2 steps for decimal to binary
  const getDivisionSteps = (num) => {
    if (num === 0) return [{ quotient: 0, remainder: 0 }];
    const steps = [];
    let n = num;
    while (n > 0) {
      const rem = n % 2;
      const q = Math.floor(n / 2);
      steps.push({ current: n, quotient: q, remainder: rem });
      n = q;
    }
    return steps;
  };

  const steps = getDivisionSteps(decimalVal);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
            <Binary className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Interactive Number System Converter & Bit Toggler</h2>
            <p className="text-xs text-slate-400">
              Decimal (Base 10) • Binary (Base 2) • Octal (Base 8) • Hexadecimal (Base 16) with Step-by-Step Working
            </p>
          </div>
        </div>
      </div>

      {/* 4 Bases Display Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Decimal */}
        <div className="bg-slate-950 border border-cyan-500/40 rounded-xl p-4">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">Decimal (Base 10)</span>
          <input
            type="number"
            min="0"
            max="65535"
            value={decimalVal}
            onChange={handleDecimalChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 font-mono text-xl font-bold text-white focus:outline-none focus:border-cyan-500"
          />
          <span className="text-[10px] text-slate-500 mt-1 block">Symbols: 0 to 9</span>
        </div>

        {/* Binary */}
        <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">Binary (Base 2)</span>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono text-xl font-bold text-emerald-300 select-all overflow-x-auto">
            {binaryStr}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Symbols: 0, 1</span>
        </div>

        {/* Octal */}
        <div className="bg-slate-950 border border-amber-500/40 rounded-xl p-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">Octal (Base 8)</span>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono text-xl font-bold text-amber-300 select-all">
            {octalStr}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Symbols: 0 to 7</span>
        </div>

        {/* Hexadecimal */}
        <div className="bg-slate-950 border border-purple-500/40 rounded-xl p-4">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">Hexadecimal (Base 16)</span>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono text-xl font-bold text-purple-300 select-all">
            0x{hexStr}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Symbols: 0-9 and A-F</span>
        </div>
      </div>

      {/* Interactive 8-Bit Toggler */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Interactive 8-Bit Register (Click any bit to flip 0 ⇋ 1)
          </h4>
          <span className="text-xs font-mono text-emerald-400">Value: {decimalVal} (1 Byte)</span>
        </div>

        <div className="grid grid-cols-8 gap-2">
          {bits.map((bit, idx) => {
            const power = 7 - idx;
            const placeValue = Math.pow(2, power);
            return (
              <button
                key={idx}
                onClick={() => toggleBit(idx)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition duration-150 ${
                  bit === 1
                    ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
                }`}
              >
                <span className="text-2xl font-black font-mono">{bit}</span>
                <span className="text-[10px] text-slate-400 font-mono mt-1">2^{power}</span>
                <span className="text-[9px] text-slate-500 font-mono">({placeValue})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step-by-Step Division Working */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-cyan-400" />
          Step-by-Step Conversion: Decimal {decimalVal} ➔ Binary
        </h4>

        {steps.length === 0 ? (
          <p className="text-xs text-slate-500">Value is 0 (Binary: 0).</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-xs font-mono">
            {steps.map((st, i) => (
              <div key={i} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">{st.current} ÷ 2 = {st.quotient}</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded font-bold">
                  Rem: {st.remainder}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 text-xs text-slate-400 flex items-center gap-1.5">
          <span>Read remainders in reverse order (bottom-up):</span>
          <strong className="text-emerald-400 font-mono">{binaryStr}</strong>
        </div>
      </div>

      {/* Exam Fact Box */}
      <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 text-xs text-slate-300 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block mb-1">Bank Exam Number System Tips:</strong>
          <span>
            1. <strong>Octal to Binary:</strong> Each octal digit maps to exactly 3 binary bits (e.g. 7_8 = 111_2).<br />
            2. <strong>Hexadecimal to Binary:</strong> Each hex digit maps to exactly 4 binary bits / 1 nibble (e.g. F_16 = 1111_2).<br />
            3. <strong>Hexadecimal Letters:</strong> A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.
          </span>
        </div>
      </div>
    </div>
  );
}
