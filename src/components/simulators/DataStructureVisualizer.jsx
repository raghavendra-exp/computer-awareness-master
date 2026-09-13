import React, { useState } from 'react';
import { Layers, ArrowDown, ArrowUp, ArrowRight, RotateCcw, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DataStructureVisualizer() {
  const [activeDs, setActiveDs] = useState('stack'); // 'stack' | 'queue'
  const [stack, setStack] = useState([10, 20, 30]);
  const [queue, setQueue] = useState([100, 200, 300]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const MAX_CAPACITY = 6;

  // Stack operations (LIFO)
  const handlePush = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    if (stack.length >= MAX_CAPACITY) {
      setMessage('Stack Overflow! Cannot push into a full stack (Max capacity: 6).');
      return;
    }
    const val = isNaN(Number(inputValue)) ? inputValue.trim() : Number(inputValue);
    setStack(prev => [...prev, val]);
    setInputValue('');
    setMessage(`Pushed '${val}' to TOP of Stack (LIFO).`);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setMessage('Stack Underflow! Cannot pop from an empty stack.');
      return;
    }
    const popped = stack[stack.length - 1];
    setStack(prev => prev.slice(0, -1));
    setMessage(`Popped '${popped}' from TOP of Stack.`);
  };

  // Queue operations (FIFO)
  const handleEnqueue = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    if (queue.length >= MAX_CAPACITY) {
      setMessage('Queue Full! Cannot enqueue into a full queue.');
      return;
    }
    const val = isNaN(Number(inputValue)) ? inputValue.trim() : Number(inputValue);
    setQueue(prev => [...prev, val]);
    setInputValue('');
    setMessage(`Enqueued '${val}' at REAR of Queue.`);
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setMessage('Queue Underflow! Queue is already empty.');
      return;
    }
    const dequeued = queue[0];
    setQueue(prev => prev.slice(1));
    setMessage(`Dequeued '${dequeued}' from FRONT of Queue (FIFO).`);
  };

  const handleReset = () => {
    if (activeDs === 'stack') setStack([10, 20, 30]);
    else setQueue([100, 200, 300]);
    setMessage('Data structure reset to default sample values.');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Interactive Data Structures Visualizer</h2>
            <p className="text-xs text-slate-400">
              Stack (LIFO - Push / Pop) vs Queue (FIFO - Enqueue / Dequeue) Memory Dynamics
            </p>
          </div>
        </div>

        {/* DS Selector Tabs */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => { setActiveDs('stack'); setMessage(''); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              activeDs === 'stack' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Stack (LIFO)
          </button>
          <button
            onClick={() => { setActiveDs('queue'); setMessage(''); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              activeDs === 'queue' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Queue (FIFO)
          </button>
        </div>
      </div>

      {/* Control Actions & Input */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6">
        <form
          onSubmit={activeDs === 'stack' ? handlePush : handleEnqueue}
          className="flex flex-wrap items-center gap-3"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value (e.g. 50 or 'Data')"
            className="bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none w-48"
          />

          {activeDs === 'stack' ? (
            <>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-cyan-400 transition flex items-center gap-1.5"
              >
                <ArrowDown className="w-3.5 h-3.5" />
                Push (Add to Top)
              </button>
              <button
                type="button"
                onClick={handlePop}
                className="px-4 py-2 bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold rounded-lg hover:bg-rose-500/30 transition flex items-center gap-1.5"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                Pop (Remove from Top)
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-emerald-400 transition flex items-center gap-1.5"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                Enqueue (Rear)
              </button>
              <button
                type="button"
                onClick={handleDequeue}
                className="px-4 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold rounded-lg hover:bg-amber-500/30 transition flex items-center gap-1.5"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                Dequeue (Front)
              </button>
            </>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 ml-auto transition"
            title="Reset to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </form>

        {message && (
          <div className="mt-3 text-xs font-mono text-cyan-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{message}</span>
          </div>
        )}
      </div>

      {/* Visual Representation Area */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 mb-6 flex flex-col items-center justify-center min-h-[220px]">
        {activeDs === 'stack' ? (
          /* Stack Vertical Container */
          <div className="flex flex-col items-center">
            <div className="text-[10px] uppercase font-mono text-cyan-400 font-bold mb-2 flex items-center gap-1">
              <span>▼ TOP OF STACK (Push / Pop happens here)</span>
            </div>

            <div className="w-56 border-b-4 border-l-4 border-r-4 border-cyan-500/60 rounded-b-xl p-3 flex flex-col-reverse gap-2 bg-slate-900/50 min-h-[160px] justify-start">
              {stack.length === 0 ? (
                <div className="text-center text-slate-500 text-xs py-8">Stack is Empty</div>
              ) : (
                stack.map((item, idx) => {
                  const isTop = idx === stack.length - 1;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border text-center font-mono font-bold text-xs transition-all duration-300 ${
                        isTop
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/20 scale-105'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      {item} {isTop && <span className="text-[9px] text-cyan-400 ml-2 font-normal">(TOP)</span>}
                    </div>
                  );
                })
              )}
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-2">Bottom of Stack (Closed End)</span>
          </div>
        ) : (
          /* Queue Horizontal Container */
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center justify-between w-full max-w-lg mb-2 text-[10px] uppercase font-mono">
              <span className="text-amber-400 font-bold">◄ DEQUEUE (FRONT)</span>
              <span className="text-emerald-400 font-bold">ENQUEUE (REAR) ◄</span>
            </div>

            <div className="w-full max-w-lg border-t-2 border-b-2 border-emerald-500/60 p-3 flex items-center gap-2 bg-slate-900/50 min-h-[70px] overflow-x-auto justify-start">
              {queue.length === 0 ? (
                <div className="w-full text-center text-slate-500 text-xs">Queue is Empty</div>
              ) : (
                queue.map((item, idx) => {
                  const isFront = idx === 0;
                  const isRear = idx === queue.length - 1;
                  return (
                    <div
                      key={idx}
                      className={`px-4 py-3 rounded-lg border text-center font-mono font-bold text-xs min-w-[70px] transition-all duration-300 ${
                        isFront
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : isRear
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      <div>{item}</div>
                      <div className="text-[9px] text-slate-400 font-normal">
                        {isFront ? '(Front)' : isRear ? '(Rear)' : `[${idx}]`}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Real-World Exam Applications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-6">
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <h4 className="font-bold text-cyan-400 mb-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> Stack (LIFO) in Banking Software:
          </h4>
          <ul className="space-y-1 text-slate-300 list-disc list-inside">
            <li><strong>Undo Operations:</strong> Reverting previous actions (Ctrl + Z).</li>
            <li><strong>Function Call Recursion:</strong> Return addresses stored in Call Stack.</li>
            <li><strong>Parenthesis Matching:</strong> Evaluating mathematical formulas in Excel.</li>
          </ul>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> Queue (FIFO) in Banking Software:
          </h4>
          <ul className="space-y-1 text-slate-300 list-disc list-inside">
            <li><strong>Print Spooling:</strong> Printing customer account statements in order of receipt.</li>
            <li><strong>CPU Scheduling:</strong> First-Come First-Served (FCFS) process dispatch.</li>
            <li><strong>Token Ticketing System:</strong> Managing customer queue numbers at branch counters.</li>
          </ul>
        </div>
      </div>

      {/* Bank Exam Highlights */}
      <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-xl p-4 text-xs text-slate-300 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block mb-1">Bank Exam Fact Check:</strong>
          <span>
            1. <strong>Stack</strong> uses <strong>LIFO (Last-In, First-Out)</strong>; inserting is <strong>Push</strong>, deleting is <strong>Pop</strong>.<br />
            2. <strong>Queue</strong> uses <strong>FIFO (First-In, First-Out)</strong>; inserting is <strong>Enqueue</strong> (at Rear), deleting is <strong>Dequeue</strong> (at Front).<br />
            3. Attempting to pop from an empty stack causes <strong>Stack Underflow</strong>; pushing into a full stack causes <strong>Stack Overflow</strong>.
          </span>
        </div>
      </div>
    </div>
  );
}
