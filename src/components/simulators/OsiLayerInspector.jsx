import React, { useState } from 'react';
import { Layers, ArrowDown, ArrowUp, HelpCircle, Shield, CheckCircle2 } from 'lucide-react';

const OSI_LAYERS = [
  {
    num: 7,
    name: 'Application Layer',
    hindiName: 'अनुप्रयोग स्तर',
    pdu: 'Data',
    color: 'from-pink-500 to-rose-600',
    border: 'border-pink-500',
    text: 'text-pink-400',
    bg: 'bg-pink-500/10',
    desc: 'Provides network services directly to end-user software applications (Web browsers, email clients).',
    devices: 'Gateways, Layer 7 Firewalls, PCs',
    protocols: 'HTTP, HTTPS, FTP, SMTP, DNS, DHCP, Telnet, SSH',
    examFact: 'Closest to the end user. Human-computer interaction layer.'
  },
  {
    num: 6,
    name: 'Presentation Layer',
    hindiName: 'प्रस्तुति स्तर',
    pdu: 'Data',
    color: 'from-purple-500 to-indigo-600',
    border: 'border-purple-500',
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    desc: 'Handles Syntax translation, Data Encryption / Decryption (SSL/TLS), and Data Compression / Decompression.',
    devices: 'Operating System Redirectors, Gateways',
    protocols: 'SSL, TLS, ASCII, EBCDIC, JPEG, MPEG, MIDI',
    examFact: 'HIGH FREQUENCY: Responsible for Encryption and Compression!'
  },
  {
    num: 5,
    name: 'Session Layer',
    hindiName: 'सत्र स्तर',
    pdu: 'Data',
    color: 'from-indigo-500 to-blue-600',
    border: 'border-indigo-500',
    text: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    desc: 'Establishes, manages, synchronizes, and terminates communication sessions and dialogs between applications.',
    devices: 'Gateways',
    protocols: 'NetBIOS, RPC, PPTP, SOCKS',
    examFact: 'Handles dialog control (simplex, half-duplex, full-duplex) and synchronization checkpoints.'
  },
  {
    num: 4,
    name: 'Transport Layer',
    hindiName: 'परिवहन स्तर',
    pdu: 'Segments (TCP) / Datagrams (UDP)',
    color: 'from-cyan-500 to-teal-600',
    border: 'border-cyan-500',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    desc: 'End-to-end message delivery, process-to-process communication via Port Addressing, Flow Control (sliding window), Error detection.',
    devices: 'Gateways, Firewalls',
    protocols: 'TCP, UDP',
    examFact: 'Heart of the OSI Model. Port addressing takes place here.'
  },
  {
    num: 3,
    name: 'Network Layer',
    hindiName: 'नेटवर्क स्तर',
    pdu: 'Packets',
    color: 'from-emerald-500 to-green-600',
    border: 'border-emerald-500',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    desc: 'Logical Addressing (IP addresses), packet routing across multiple networks, path determination using routing algorithms.',
    devices: 'Routers, Layer 3 Switches',
    protocols: 'IPv4, IPv6, ICMP, IGMP, ARP, OSPF, BGP, RIP',
    examFact: 'Routers operate at Network Layer (Layer 3) to route packets based on IP addresses.'
  },
  {
    num: 2,
    name: 'Data Link Layer (DLL)',
    hindiName: 'डेटा लिंक स्तर',
    pdu: 'Frames',
    color: 'from-amber-500 to-yellow-600',
    border: 'border-amber-500',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    desc: 'Hop-to-hop node delivery, physical hardware addressing (48-bit MAC address), framing, CRC error detection, media access (CSMA/CD).',
    devices: 'Switches, Bridges, Network Interface Cards (NIC)',
    protocols: 'Ethernet (IEEE 802.3), Wi-Fi (IEEE 802.11), PPP',
    examFact: 'Switches operate at Data Link Layer (Layer 2) and forward frames using MAC addresses.'
  },
  {
    num: 1,
    name: 'Physical Layer',
    hindiName: 'भौतिक स्तर',
    pdu: 'Bits (0s and 1s)',
    color: 'from-red-500 to-orange-600',
    border: 'border-red-500',
    text: 'text-red-400',
    bg: 'bg-red-500/10',
    desc: 'Transmission of raw unstructured bitstream over physical physical transmission medium (cables, radio waves, light pulses).',
    devices: 'Hubs, Repeaters, Cables (UTP/Fiber), Modems',
    protocols: '100BASE-T, RS-232, DSL',
    examFact: 'Hubs and Repeaters operate at Layer 1 (Physical Layer).'
  }
];

export default function OsiLayerInspector() {
  const [selectedLayerNum, setSelectedLayerNum] = useState(4); // Default Transport layer
  const [flowDirection, setFlowDirection] = useState('down'); // 'down' (Encapsulation) or 'up' (Decapsulation)

  const activeLayer = OSI_LAYERS.find(l => l.num === selectedLayerNum);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">7-Layer OSI Reference Model Deep Inspector</h2>
            <p className="text-xs text-slate-400">
              Protocol Data Units (PDU) • Hardware Devices • Port Addressing • Encapsulation Flow
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFlowDirection(flowDirection === 'down' ? 'up' : 'down')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg border border-slate-700 text-slate-300 transition"
          >
            {flowDirection === 'down' ? <ArrowDown className="w-3.5 h-3.5 text-cyan-400" /> : <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />}
            Mode: {flowDirection === 'down' ? 'Encapsulation (Sender)' : 'Decapsulation (Receiver)'}
          </button>
        </div>
      </div>

      {/* Mnemonics Quick Reminder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 text-xs font-mono">
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Top-Down Mnemonic (7 ➔ 1)</span>
          <span className="text-cyan-400 font-bold">A</span>ll <span className="text-cyan-400 font-bold">P</span>eople <span className="text-cyan-400 font-bold">S</span>eem <span className="text-cyan-400 font-bold">T</span>o <span className="text-cyan-400 font-bold">N</span>eed <span className="text-cyan-400 font-bold">D</span>ata <span className="text-cyan-400 font-bold">P</span>rocessing
        </div>
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Bottom-Up Mnemonic (1 ➔ 7)</span>
          <span className="text-emerald-400 font-bold">P</span>lease <span className="text-emerald-400 font-bold">D</span>o <span className="text-emerald-400 font-bold">N</span>ot <span className="text-emerald-400 font-bold">T</span>hrow <span className="text-emerald-400 font-bold">S</span>ausage <span className="text-emerald-400 font-bold">P</span>izza <span className="text-emerald-400 font-bold">A</span>way
        </div>
      </div>

      {/* Stack & Details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Vertical Stack */}
        <div className="lg:col-span-5 space-y-2">
          {OSI_LAYERS.map(layer => {
            const isSelected = layer.num === selectedLayerNum;
            return (
              <button
                key={layer.num}
                onClick={() => setSelectedLayerNum(layer.num)}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all duration-200 ${
                  isSelected
                    ? `${layer.bg} ${layer.border} shadow-lg shadow-cyan-500/10 scale-[1.02] ring-1 ring-cyan-500/50`
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-white">
                    {layer.num}
                  </span>
                  <div>
                    <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {layer.name}
                    </div>
                    <div className="text-[10px] text-slate-500">{layer.hindiName}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-300">
                    {layer.pdu}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Forensic View */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                  Layer {activeLayer.num} of 7
                </span>
                <h3 className="text-lg font-bold text-white">{activeLayer.name}</h3>
              </div>
              <div className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono">
                PDU: <strong className="text-cyan-400">{activeLayer.pdu}</strong>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {activeLayer.desc}
            </p>

            <div className="space-y-3 text-xs mb-4">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-mono mb-0.5">Operating Hardware Devices</span>
                <strong className="text-white">{activeLayer.devices}</strong>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-mono mb-0.5">Key Protocols & Standards</span>
                <strong className="text-cyan-300 font-mono">{activeLayer.protocols}</strong>
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-300">
              <strong>High-Yield Bank Exam Fact:</strong> {activeLayer.examFact}
            </div>
          </div>

          {/* Encapsulation Header Graphic */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-xs">
            <span className="text-slate-500 block text-[10px] uppercase font-mono mb-2">Packet Encapsulation Frame Structure:</span>
            <div className="flex items-center gap-1 font-mono text-[10px] overflow-x-auto">
              <span className={`px-2 py-1 rounded border ${activeLayer.num >= 2 ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-600'}`}>
                MAC Hdr (L2)
              </span>
              <span className={`px-2 py-1 rounded border ${activeLayer.num >= 3 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-600'}`}>
                IP Hdr (L3)
              </span>
              <span className={`px-2 py-1 rounded border ${activeLayer.num >= 4 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-600'}`}>
                TCP/UDP Hdr (L4)
              </span>
              <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-white font-bold flex-1 text-center">
                User Payload Data
              </span>
              <span className={`px-2 py-1 rounded border ${activeLayer.num >= 2 ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-600'}`}>
                CRC Trailer (L2)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
