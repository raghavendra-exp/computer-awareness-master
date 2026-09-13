import React, { useState, useEffect } from 'react';
import { Cpu, Play, Pause, RotateCcw, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';

const SAMPLE_PROGRAM = [
  { addr: '0x0010', code: 'LOAD R1, [100]', action: 'Fetch data from Memory address 100 into Register R1' },
  { addr: '0x0014', code: 'LOAD R2, [104]', action: 'Fetch data from Memory address 104 into Register R2' },
  { addr: '0x0018', code: 'ADD R1, R2', action: 'ALU adds R1 + R2 and stores result in Accumulator' },
  { addr: '0x001C', code: 'STORE [108], R1', action: 'Write result from R1 back into Memory address 108' }
];

const STAGES = [
  { id: 'FETCH', name: '1. Fetch', desc: 'Read instruction from RAM address pointed by Program Counter (PC)' },
  { id: 'DECODE', name: '2. Decode', desc: 'Control Unit (CU) interprets opcode and identifies required operand registers' },
  { id: 'EXECUTE', name: '3. Execute', desc: 'ALU performs arithmetic or logical calculation' },
  { id: 'WRITEBACK', name: '4. Writeback', desc: 'Store computed result into destination register or primary memory' }
];

export default function CpuPipelineVisualizer() {
  const [currentInstrIdx, setCurrentInstrIdx] = useState(0);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [clockCycles, setClockCycles] = useState(1);
  const [registers, setRegisters] = useState({ R1: 0, R2: 0, ACC: 0, PC: '0x0010' });
  const [memory, setMemory] = useState({ 100: 42, 104: 18, 108: 0 });

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        advanceStep();
      }, 1400);
    }
    return () => clearInterval(timer);
  }, [isRunning, currentStageIdx, currentInstrIdx]);

  const advanceStep = () => {
    setClockCycles(c => c + 1);

    if (currentStageIdx < 3) {
      setCurrentStageIdx(s => s + 1);
    } else {
      // Execute register state changes at end of instruction
      const instr = SAMPLE_PROGRAM[currentInstrIdx];
      if (instr.code.includes('LOAD R1')) {
        setRegisters(r => ({ ...r, R1: memory[100], PC: '0x0014' }));
      } else if (instr.code.includes('LOAD R2')) {
        setRegisters(r => ({ ...r, R2: memory[104], PC: '0x0018' }));
      } else if (instr.code.includes('ADD')) {
        const sum = registers.R1 + registers.R2;
        setRegisters(r => ({ ...r, R1: sum, ACC: sum, PC: '0x001C' }));
      } else if (instr.code.includes('STORE')) {
        setMemory(m => ({ ...m, 108: registers.R1 }));
        setRegisters(r => ({ ...r, PC: '0x0020' }));
      }

      setCurrentStageIdx(0);
      setCurrentInstrIdx(i => (i + 1) % SAMPLE_PROGRAM.length);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentInstrIdx(0);
    setCurrentStageIdx(0);
    setClockCycles(1);
    setRegisters({ R1: 0, R2: 0, ACC: 0, PC: '0x0010' });
    setMemory({ 100: 42, 104: 18, 108: 0 });
  };

  const activeInstr = SAMPLE_PROGRAM[currentInstrIdx];
  const activeStage = STAGES[currentStageIdx];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              CPU Fetch-Decode-Execute Pipeline Visualizer
            </h2>
            <p className="text-xs text-slate-400">
              Machine Instruction Execution Cycle & Internal Register Movement
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause Clock' : 'Start Execution'}
          </button>
          <button
            onClick={advanceStep}
            disabled={isRunning}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            Single Step
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition"
            title="Reset Pipeline"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Pipeline Stages */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        {STAGES.map((st, idx) => {
          const isActive = idx === currentStageIdx;
          const isDone = idx < currentStageIdx;
          return (
            <div
              key={st.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                isActive
                  ? 'bg-cyan-500/10 border-cyan-500/60 shadow-lg shadow-cyan-500/10 scale-[1.02]'
                  : isDone
                  ? 'bg-emerald-500/5 border-emerald-500/30 text-slate-400'
                  : 'bg-slate-950/50 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-cyan-400' : isDone ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {st.name}
                </span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{st.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Machine Architecture State Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Active Instruction */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Current Instruction in IR</h4>
          <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-3 mb-3 font-mono">
            <div className="text-xs text-cyan-400">Address: {activeInstr.addr}</div>
            <div className="text-base font-bold text-white tracking-wide">{activeInstr.code}</div>
          </div>
          <p className="text-xs text-slate-400">
            <span className="font-semibold text-slate-200">Operation:</span> {activeInstr.action}
          </p>
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Clock Cycle: <strong className="text-cyan-400 font-mono">{clockCycles}</strong></span>
            <span>Instruction: <strong className="text-white">{currentInstrIdx + 1} / 4</strong></span>
          </div>
        </div>

        {/* CPU Registers */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Internal CPU Registers</h4>
          <div className="grid grid-cols-2 gap-2 font-mono text-xs">
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">PC (Program Counter)</span>
              <span className="font-bold text-cyan-400">{registers.PC}</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">ACC (Accumulator)</span>
              <span className="font-bold text-emerald-400">{registers.ACC}</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Register R1</span>
              <span className="font-bold text-white">{registers.R1}</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Register R2</span>
              <span className="font-bold text-white">{registers.R2}</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            PC holds the address of the next instruction; ACC holds immediate ALU output.
          </p>
        </div>

        {/* RAM State */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Primary Memory (RAM)</h4>
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-slate-400">RAM[100]</span>
              <span className="font-bold text-cyan-300">{memory[100]}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-slate-400">RAM[104]</span>
              <span className="font-bold text-cyan-300">{memory[104]}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-slate-400">RAM[108] (Result)</span>
              <span className={`font-bold ${memory[108] > 0 ? 'text-emerald-400 animate-pulse' : 'text-slate-600'}`}>
                {memory[108]}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Address bus carries address [100, 104, 108]; Data bus transports the 32-bit values.
          </p>
        </div>
      </div>

      {/* High-Yield Bank Exam Notes */}
      <div className="bg-cyan-950/30 border border-cyan-500/20 rounded-xl p-4 text-xs text-slate-300 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block mb-1">Bank Exam Fact Check:</strong>
          <span>
            During the <strong>FETCH</strong> cycle, the instruction is retrieved into the <strong>Instruction Register (IR)</strong> while the <strong>Program Counter (PC)</strong> automatically increments to point to the subsequent memory address. The <strong>Control Unit (CU)</strong> decodes it, and the <strong>Arithmetic Logic Unit (ALU)</strong> executes calculations.
          </span>
        </div>
      </div>
    </div>
  );
}
