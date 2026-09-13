import React, { useState } from 'react';
import { Globe, ArrowRight, CheckCircle, ShieldCheck, Server, Laptop, HelpCircle, Play, Pause, RotateCcw } from 'lucide-react';

const STEPS = [
  {
    step: 1,
    title: 'URL Parsing & Local Cache Check',
    actor: 'Client Browser',
    desc: 'Browser parses protocol (https), domain (www.rbi.org.in), and port (443). Checks browser cache and OS DNS cache for existing IP record.',
    tech: 'Local DNS Cache'
  },
  {
    step: 2,
    title: 'DNS Recursive Resolver Query',
    actor: 'ISP Recursive Resolver',
    desc: 'Cache miss triggers query to ISP Recursive Resolver (e.g. 8.8.8.8). If not in resolver cache, begins hierarchical iterative DNS lookup.',
    tech: 'UDP Port 53'
  },
  {
    step: 3,
    title: 'Root & TLD Name Server Lookup',
    actor: 'Root (.) & TLD (.in) Servers',
    desc: 'Root server (.) directs resolver to .in TLD server. The .in TLD server directs resolver to RBI authoritative nameservers.',
    tech: '13 Global Root Clusters'
  },
  {
    step: 4,
    title: 'Authoritative DNS Response',
    actor: 'Authoritative Nameserver',
    desc: 'Authoritative server resolves domain to IP address (e.g. 104.18.22.1) and returns A/AAAA record with TTL to client.',
    tech: 'A Record / TTL'
  },
  {
    step: 5,
    title: 'TCP 3-Way Handshake',
    actor: 'Transport Layer (Layer 4)',
    desc: 'Client and Server establish reliable connection: 1. SYN (Client) -> 2. SYN-ACK (Server) -> 3. ACK (Client). Port 443.',
    tech: 'TCP SYN / ACK'
  },
  {
    step: 6,
    title: 'TLS 1.3 Cryptographic Handshake',
    actor: 'Presentation Layer (Layer 6)',
    desc: 'Server presents SSL/TLS certificate issued by trusted CA. Diffie-Hellman key exchange generates symmetric session keys (AES-256).',
    tech: 'HTTPS / TLS 1.3'
  },
  {
    step: 7,
    title: 'HTTP GET Request & Server Response',
    actor: 'Application Layer (Layer 7)',
    desc: 'Browser sends encrypted HTTP GET / index.html request. Banking web server returns HTTP 200 OK with HTML payload.',
    tech: 'HTTP/2 over TLS'
  },
  {
    step: 8,
    title: 'Browser DOM Parsing & Rendering',
    actor: 'Browser Rendering Engine',
    desc: 'Browser parses HTML into DOM tree, CSS into CSSOM tree, executes JavaScript, and paints the banking portal on screen.',
    tech: 'DOM Tree / Paint'
  }
];

export default function WebsiteLoadingFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStep(prev => {
          if (prev >= STEPS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const curr = STEPS[activeStep];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">What Happens When You Type a URL?</h2>
            <p className="text-xs text-slate-400">
              Interactive Web Journey: DNS Hierarchy • TCP 3-Way Handshake • TLS Encryption • HTTP Rendering
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-cyan-400 transition"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? 'Pause' : 'Auto Play'}
          </button>
          <button
            onClick={() => { setIsPlaying(false); setActiveStep(0); }}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Simulated Browser URL Bar */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 mb-6 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-2 font-mono text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400">https://</span>
          <span className="text-white font-semibold">www.rbi.org.in</span>
          <span className="text-slate-500">:443/home</span>
        </div>
      </div>

      {/* 8-Step Timeline Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-1.5 mb-6">
        {STEPS.map((s, idx) => {
          const isCurrent = idx === activeStep;
          const isPast = idx < activeStep;
          return (
            <button
              key={s.step}
              onClick={() => { setIsPlaying(false); setActiveStep(idx); }}
              className={`p-2 rounded-lg border text-center transition ${
                isCurrent
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold shadow-md'
                  : isPast
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] uppercase font-mono">Step {s.step}</div>
              <div className="text-[11px] font-bold truncate">{s.tech}</div>
            </button>
          );
        })}
      </div>

      {/* Active Step Details Card */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center font-mono text-sm border border-cyan-500/30">
              {curr.step}
            </span>
            <div>
              <h3 className="text-base font-bold text-white">{curr.title}</h3>
              <span className="text-xs text-cyan-400 font-mono">Entity: {curr.actor}</span>
            </div>
          </div>
          <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs font-mono text-slate-300">
            {curr.tech}
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          {curr.desc}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
          <button
            disabled={activeStep === 0}
            onClick={() => setActiveStep(p => Math.max(0, p - 1))}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 rounded-lg border border-slate-800"
          >
            ← Previous Step
          </button>
          <span className="text-slate-500 font-mono">Step {activeStep + 1} of 8</span>
          <button
            disabled={activeStep === STEPS.length - 1}
            onClick={() => setActiveStep(p => Math.min(STEPS.length - 1, p + 1))}
            className="px-3 py-1.5 bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 disabled:opacity-40 rounded-lg"
          >
            Next Step →
          </button>
        </div>
      </div>

      {/* High-Yield Exam Box */}
      <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-xl p-4 text-xs text-slate-300 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block mb-1">Bank Exam Highlights:</strong>
          <span>
            1. <strong>DNS</strong> uses <strong>UDP port 53</strong> for fast name resolution (queries &lt;512 bytes).<br />
            2. The <strong>TCP 3-Way Handshake</strong> consists of <strong>SYN ➔ SYN-ACK ➔ ACK</strong>.<br />
            3. <strong>HTTPS</strong> uses <strong>TCP port 443</strong> and provides encryption via <strong>TLS (Transport Layer Security)</strong>, protecting against Man-in-the-Middle (MitM) eavesdropping.
          </span>
        </div>
      </div>
    </div>
  );
}
