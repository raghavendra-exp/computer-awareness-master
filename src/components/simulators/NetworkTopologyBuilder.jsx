import React, { useState } from 'react';
import { Network, AlertTriangle, CheckCircle, RotateCcw, HelpCircle, Scissors } from 'lucide-react';

const TOPOLOGIES = [
  {
    id: 'star',
    name: 'Star Topology',
    hubBased: true,
    cableFormula: (n) => `${n} Cables`,
    portsPerDevice: '1 Port per node',
    pros: 'Easy to install; failure of one cable only disconnects that single node.',
    cons: 'Central Hub/Switch is a Single Point of Failure.',
    bankFact: 'Most widely used topology in modern Ethernet LANs.'
  },
  {
    id: 'mesh',
    name: 'Mesh Topology (Fully Connected)',
    hubBased: false,
    cableFormula: (n) => `${(n * (n - 1)) / 2} Duplex Cables (Formula: n(n-1)/2)`,
    portsPerDevice: (n) => `${n - 1} I/O Ports per node`,
    pros: 'Highest fault tolerance; dedicated point-to-point links with zero congestion.',
    cons: 'Most expensive; requires massive cabling and ports.',
    bankFact: 'Formula N*(N-1)/2 is a guaranteed math calculation in bank exams!'
  },
  {
    id: 'bus',
    name: 'Bus Topology',
    hubBased: false,
    cableFormula: () => '1 Shared Backbone Cable + Drop lines',
    portsPerDevice: '1 T-Connector (BNC)',
    pros: 'Minimal cabling; cheap and simple for small test networks.',
    cons: 'If the central backbone cable breaks, the ENTIRE network collapses.',
    bankFact: 'Requires Terminators at both ends to prevent signal reflection (echo).'
  },
  {
    id: 'ring',
    name: 'Ring Topology',
    hubBased: false,
    cableFormula: (n) => `${n} Point-to-point Links`,
    portsPerDevice: '2 Ports (In and Out)',
    pros: 'Orderly transmission via Token Passing (IEEE 802.5 Token Ring); no collisions.',
    cons: 'Break in the ring stops the entire network unless using redundant dual rings (FDDI).',
    bankFact: 'Uses token passing where only the token holder transmits data.'
  }
];

export default function NetworkTopologyBuilder() {
  const [activeTopologyId, setActiveTopologyId] = useState('star');
  const [nodeCount, setNodeCount] = useState(6);
  const [brokenNode, setBrokenNode] = useState(null); // Node index that is disconnected
  const [isCentralHubDead, setIsCentralHubDead] = useState(false);

  const activeTop = TOPOLOGIES.find(t => t.id === activeTopologyId);

  // Generate node positions in a circle for SVG canvas
  const centerX = 200;
  const centerY = 150;
  const radius = 105;
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    const angle = (2 * Math.PI * i) / nodeCount;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    nodes.push({ id: i, x, y });
  }

  // Calculate links based on topology
  const links = [];
  if (activeTopologyId === 'star') {
    nodes.forEach(n => {
      links.push({ from: { x: centerX, y: centerY }, to: n, id: `hub-${n.id}`, targetNode: n.id });
    });
  } else if (activeTopologyId === 'mesh') {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        links.push({ from: nodes[i], to: nodes[j], id: `${i}-${j}` });
      }
    }
  } else if (activeTopologyId === 'ring') {
    for (let i = 0; i < nodes.length; i++) {
      const next = (i + 1) % nodes.length;
      links.push({ from: nodes[i], to: nodes[next], id: `${i}-${next}` });
    }
  } else if (activeTopologyId === 'bus') {
    // Single backbone line in center
    // Drop lines from each node to backbone line
    nodes.forEach(n => {
      links.push({ from: { x: n.x, y: centerY }, to: n, id: `drop-${n.id}` });
    });
  }

  const handleResetFails = () => {
    setBrokenNode(null);
    setIsCentralHubDead(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Interactive Network Topology Builder</h2>
            <p className="text-xs text-slate-400">
              Star • Mesh • Bus • Ring • Fault Tolerance Simulation & Formula Calculations
            </p>
          </div>
        </div>

        <button
          onClick={handleResetFails}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg border border-slate-700 text-slate-300 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Repair Network
        </button>
      </div>

      {/* Controls: Topology Type & Node Slider */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Select Topology Type:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TOPOLOGIES.map(t => (
              <button
                key={t.id}
                onClick={() => { setActiveTopologyId(t.id); handleResetFails(); }}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition ${
                  activeTopologyId === t.id
                    ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {t.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Connected Nodes: <span className="font-mono text-cyan-400 font-bold">{nodeCount}</span>
            </label>
            <span className="text-xs text-slate-500">Range: 3 to 10</span>
          </div>
          <input
            type="range"
            min="3"
            max="10"
            value={nodeCount}
            onChange={(e) => { setNodeCount(parseInt(e.target.value, 10)); handleResetFails(); }}
            className="w-full accent-purple-500 cursor-pointer"
          />
        </div>
      </div>

      {/* SVG Canvas & Simulation Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* SVG Network Canvas */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center">
          <svg viewBox="0 0 400 300" className="w-full max-w-[400px] h-[300px]">
            {/* Bus backbone if bus */}
            {activeTopologyId === 'bus' && (
              <line
                x1="40"
                y1={centerY}
                x2="360"
                y2={centerY}
                stroke={isCentralHubDead ? '#ef4444' : '#a855f7'}
                strokeWidth={isCentralHubDead ? 4 : 5}
                strokeDasharray={isCentralHubDead ? '4 4' : 'none'}
              />
            )}

            {/* Render Links */}
            {links.map((link) => {
              const isDead = isCentralHubDead || (brokenNode !== null && link.targetNode === brokenNode);
              return (
                <line
                  key={link.id}
                  x1={link.from.x}
                  y1={link.from.y}
                  x2={link.to.x}
                  y2={link.to.y}
                  stroke={isDead ? '#ef4444' : '#64748b'}
                  strokeWidth="2"
                  strokeDasharray={isDead ? '4 4' : 'none'}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Central Hub for Star Topology */}
            {activeTopologyId === 'star' && (
              <g
                onClick={() => setIsCentralHubDead(!isCentralHubDead)}
                className="cursor-pointer"
              >
                <circle
                  cx={centerX}
                  cy={centerY}
                  r="24"
                  fill={isCentralHubDead ? '#ef4444' : '#a855f7'}
                  className="transition duration-200"
                />
                <text
                  x={centerX}
                  y={centerY + 4}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="9"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {isCentralHubDead ? 'HUB DEAD' : 'HUB'}
                </text>
              </g>
            )}

            {/* Nodes */}
            {nodes.map(n => {
              const isCut = brokenNode === n.id;
              return (
                <g
                  key={n.id}
                  onClick={() => setBrokenNode(isCut ? null : n.id)}
                  className="cursor-pointer group"
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="15"
                    fill={isCut ? '#ef4444' : '#06b6d4'}
                    stroke="#0f172a"
                    strokeWidth="3"
                    className="transition duration-200 group-hover:scale-110"
                  />
                  <text
                    x={n.x}
                    y={n.y + 4}
                    textAnchor="middle"
                    fill="#0f172a"
                    fontSize="10"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    N{n.id + 1}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="text-[11px] text-slate-500 mt-2 text-center">
            Click any node or central hub to test cable failure / node failure.
          </div>
        </div>

        {/* Live Topology Metrics Panel */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Network className="w-4 h-4 text-purple-400" />
              {activeTop.name} Metrics
            </h3>

            <div className="space-y-3 text-xs mb-4">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Cables Required</span>
                <strong className="text-sm font-mono text-purple-300">
                  {typeof activeTop.cableFormula === 'function' ? activeTop.cableFormula(nodeCount) : activeTop.cableFormula}
                </strong>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">I/O Ports Per Node</span>
                <strong className="text-sm font-mono text-cyan-300">
                  {typeof activeTop.portsPerDevice === 'function' ? activeTop.portsPerDevice(nodeCount) : activeTop.portsPerDevice}
                </strong>
              </div>
            </div>

            {/* Failure Impact Diagnostic */}
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Failure Simulation Status</span>
              {isCentralHubDead ? (
                <div className="text-red-400 flex items-start gap-1.5 font-semibold">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>CATASTROPHIC: Central Hub Failed! Entire Star network is completely disabled.</span>
                </div>
              ) : brokenNode !== null ? (
                <div className="text-amber-300 flex items-start gap-1.5 font-semibold">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Node N{brokenNode + 1} disconnected.
                    {activeTopologyId === 'star'
                      ? ' Other nodes remain 100% operational!'
                      : activeTopologyId === 'mesh'
                      ? ' Remaining mesh nodes reroute traffic without issue!'
                      : ' Network flow is interrupted!'}
                  </span>
                </div>
              ) : (
                <div className="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>All nodes and links are fully functional.</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
            <strong>Key Advantage:</strong> {activeTop.pros}
          </div>
        </div>
      </div>

      {/* Bank Exam Note */}
      <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-4 text-xs text-slate-300 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block mb-1">Bank Exam Math Formula:</strong>
          <span>
            In a fully connected Mesh topology with <strong>N devices</strong>, the number of duplex links required is strictly <strong>N * (N - 1) / 2</strong>, and each device requires <strong>N - 1</strong> I/O ports. (For example, 6 devices require 6 * 5 / 2 = 15 cables).
          </span>
        </div>
      </div>
    </div>
  );
}
