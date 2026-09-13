import React, { useState } from 'react';
import { HardDrive, Cpu, Zap, Layers, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

const PARTS = {
  cpu: [
    { id: 'cpu-budget', name: 'Intel Core i3 / Ryzen 3 (Quad Core)', power: 65, perf: 45, price: 9000, socket: 'AM4/LGA1700' },
    { id: 'cpu-mid', name: 'Intel Core i5 / Ryzen 5 (6-Core, 12-Thread)', power: 95, perf: 78, price: 17000, socket: 'AM5/LGA1700' },
    { id: 'cpu-high', name: 'Intel Core i7 / Ryzen 7 (8-Core, 16-Thread)', power: 125, perf: 95, price: 32000, socket: 'AM5/LGA1700' }
  ],
  ram: [
    { id: 'ram-8gb', name: '8 GB DDR4-3200 MHz', type: 'DDR4', power: 10, perf: 40, price: 1800 },
    { id: 'ram-16gb', name: '16 GB DDR4-3600 MHz (Dual Channel)', type: 'DDR4', power: 15, perf: 75, price: 3600 },
    { id: 'ram-32gb', name: '32 GB DDR5-6000 MHz (Dual Channel)', type: 'DDR5', power: 25, perf: 98, price: 8500 }
  ],
  storage: [
    { id: 'storage-hdd', name: '1 TB Mechanical HDD (7200 RPM - SATA III)', type: 'HDD', speed: '120 MB/s', power: 20, perf: 25, price: 3500 },
    { id: 'storage-sata', name: '512 GB SATA III 2.5" SSD', type: 'SATA SSD', speed: '550 MB/s', power: 6, perf: 65, price: 2800 },
    { id: 'storage-nvme', name: '1 TB M.2 NVMe PCIe 4.0 x4 SSD', type: 'NVMe', speed: '7000 MB/s', power: 9, perf: 98, price: 6200 }
  ],
  psu: [
    { id: 'psu-450', name: '450W Bronze 80+ Power Supply', wattage: 450, price: 2800 },
    { id: 'psu-650', name: '650W Gold 80+ Power Supply', wattage: 650, price: 5500 },
    { id: 'psu-850', name: '850W Gold Fully Modular PSU', wattage: 850, price: 9200 }
  ],
  gpu: [
    { id: 'gpu-integrated', name: 'Integrated CPU Graphics (Intel UHD / Radeon)', power: 15, perf: 20, price: 0 },
    { id: 'gpu-mid', name: 'Dedicated GPU (Nvidia RTX 4060 8GB)', power: 115, perf: 80, price: 28000 },
    { id: 'gpu-high', name: 'High-End GPU (Nvidia RTX 4080 16GB)', power: 320, perf: 98, price: 95000 }
  ]
};

export default function BuildAComputerLab() {
  const [selected, setSelected] = useState({
    cpu: PARTS.cpu[1],
    ram: PARTS.ram[1],
    storage: PARTS.storage[2],
    psu: PARTS.psu[1],
    gpu: PARTS.gpu[1]
  });

  const totalPower = selected.cpu.power + selected.ram.power + selected.storage.power + selected.gpu.power + 50; // 50W for motherboard & fans
  const powerSufficient = selected.psu.wattage >= totalPower * 1.2; // 20% headroom recommended
  const totalPrice = selected.cpu.price + selected.ram.price + selected.storage.price + selected.psu.price + selected.gpu.price;
  const overallPerf = Math.round((selected.cpu.perf + selected.ram.perf + selected.storage.perf + selected.gpu.perf) / 4);

  // Check bottleneck
  let bottleneck = 'Balanced System';
  if (selected.storage.type === 'HDD') {
    bottleneck = 'Severe Storage Bottleneck! Mechanical HDD slows down boot and application loading.';
  } else if (selected.cpu.id === 'cpu-budget' && selected.gpu.id === 'gpu-high') {
    bottleneck = 'CPU Bottleneck! Budget Quad-Core limits High-End GPU performance.';
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Interactive 'Build-A-Computer' Lab</h2>
            <p className="text-xs text-slate-400">
              Hardware Compatibility, Power Consumption, and Bottleneck Analysis
            </p>
          </div>
        </div>
      </div>

      {/* Component Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* CPU */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
            <Cpu className="w-4 h-4 text-cyan-400" /> Processor (CPU)
          </label>
          <select
            value={selected.cpu.id}
            onChange={(e) => setSelected({ ...selected, cpu: PARTS.cpu.find(p => p.id === e.target.value) })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {PARTS.cpu.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.power}W) - ₹{p.price}</option>
            ))}
          </select>
          <div className="mt-2 text-[11px] text-slate-400">Socket: {selected.cpu.socket}</div>
        </div>

        {/* RAM */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
            <HardDrive className="w-4 h-4 text-emerald-400" /> Primary Memory (RAM)
          </label>
          <select
            value={selected.ram.id}
            onChange={(e) => setSelected({ ...selected, ram: PARTS.ram.find(p => p.id === e.target.value) })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {PARTS.ram.map(p => (
              <option key={p.id} value={p.id}>{p.name} - ₹{p.price}</option>
            ))}
          </select>
          <div className="mt-2 text-[11px] text-slate-400">Tech: {selected.ram.type} Synchronous DRAM</div>
        </div>

        {/* Storage */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
            <HardDrive className="w-4 h-4 text-amber-400" /> Secondary Storage
          </label>
          <select
            value={selected.storage.id}
            onChange={(e) => setSelected({ ...selected, storage: PARTS.storage.find(p => p.id === e.target.value) })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {PARTS.storage.map(p => (
              <option key={p.id} value={p.id}>{p.name} - ₹{p.price}</option>
            ))}
          </select>
          <div className="mt-2 text-[11px] text-slate-400">Transfer Speed: <strong>{selected.storage.speed}</strong></div>
        </div>

        {/* Graphics GPU */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
            <Cpu className="w-4 h-4 text-purple-400" /> Graphics (GPU)
          </label>
          <select
            value={selected.gpu.id}
            onChange={(e) => setSelected({ ...selected, gpu: PARTS.gpu.find(p => p.id === e.target.value) })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {PARTS.gpu.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.power}W) - ₹{p.price}</option>
            ))}
          </select>
          <div className="mt-2 text-[11px] text-slate-400">Power Draw: {selected.gpu.power}W</div>
        </div>

        {/* Power Supply PSU */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
            <Zap className="w-4 h-4 text-yellow-400" /> Power Supply (PSU)
          </label>
          <select
            value={selected.psu.id}
            onChange={(e) => setSelected({ ...selected, psu: PARTS.psu.find(p => p.id === e.target.value) })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {PARTS.psu.map(p => (
              <option key={p.id} value={p.id}>{p.name} - ₹{p.price}</option>
            ))}
          </select>
          <div className="mt-2 text-[11px] text-slate-400">Rated Capacity: {selected.psu.wattage}W</div>
        </div>

        {/* Performance Benchmark Summary */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Estimated Cost & Score</div>
            <div className="text-2xl font-black text-white font-mono">₹{totalPrice.toLocaleString('en-IN')}</div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Overall Performance</span>
              <span className="font-bold text-cyan-400">{overallPerf} / 100</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-2 rounded-full" style={{ width: `${overallPerf}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostics & Bottlenecks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          powerSufficient ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
        }`}>
          {powerSufficient ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          )}
          <div className="text-xs">
            <strong className={`block mb-0.5 ${powerSufficient ? 'text-emerald-300' : 'text-red-300'}`}>
              Power Supply Status: {powerSufficient ? 'Adequate Headroom' : 'PSU Overload Warning!'}
            </strong>
            <p className="text-slate-400">
              Total system power draw is approx <strong className="text-white">{totalPower}W</strong>. Selected PSU delivers <strong className="text-white">{selected.psu.wattage}W</strong>.
              {!powerSufficient && ' Upgrade to 650W or 850W PSU to avoid unexpected shutdowns.'}
            </p>
          </div>
        </div>

        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          bottleneck.startsWith('Balanced') ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-amber-500/10 border-amber-500/30'
        }`}>
          {bottleneck.startsWith('Balanced') ? (
            <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          )}
          <div className="text-xs">
            <strong className={`block mb-0.5 ${bottleneck.startsWith('Balanced') ? 'text-cyan-300' : 'text-amber-300'}`}>
              Bottleneck Analysis
            </strong>
            <p className="text-slate-400">{bottleneck}</p>
          </div>
        </div>
      </div>

      <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-4 text-xs text-slate-300 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block mb-1">Bank Exam Hardware Insights:</strong>
          <span>
            1. <strong>M.2 NVMe SSDs</strong> communicate via high-speed <strong>PCIe (Peripheral Component Interconnect Express)</strong> lanes directly with the CPU, achieving up to 7000 MB/s versus older SATA III (limited to ~550 MB/s).<br />
            2. <strong>DDR5 SDRAM</strong> operates at lower voltage (1.1V) and higher frequency than DDR4.<br />
            3. The <strong>Power Supply Unit (PSU)</strong> converts alternating household current (AC) into regulated direct current (DC) for internal circuits.
          </span>
        </div>
      </div>
    </div>
  );
}
