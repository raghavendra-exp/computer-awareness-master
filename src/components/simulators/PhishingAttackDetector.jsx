import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle, HelpCircle, Eye, RefreshCw } from 'lucide-react';

const SCENARIOS = [
  {
    id: 'sc-1',
    channel: 'SMS (Smishing)',
    sender: 'VM-SBIINB',
    subject: 'URGENT: SBI Account Blocked Notice',
    content: 'Dear Customer, Your SBI NetBanking account will be suspended today due to pending PAN KYC. Click immediately to update: http://sbi-kyc-update.xyz/login to avoid penalty.',
    isPhishing: true,
    forensics: [
      'Deceptive URL: "sbi-kyc-update.xyz" is a spoofed domain (not official "onlinesbi.sbi").',
      'Uses unencrypted HTTP protocol instead of HTTPS.',
      'Manufactured urgency: "Account will be suspended today" creates panic.',
      'Banks NEVER send SMS links demanding password or PAN updates.'
    ]
  },
  {
    id: 'sc-2',
    channel: 'Email',
    sender: 'Reserve Bank of India <noreply@rbi.org.in>',
    subject: 'Press Release: Monetary Policy Committee Statement',
    content: 'The Monetary Policy Committee (MPC) met on April 5, 2024. The policy repo rate under the liquidity adjustment facility remains unchanged. Full press release available on official portal www.rbi.org.in.',
    isPhishing: false,
    forensics: [
      'Sender domain matches official sovereign domain "@rbi.org.in".',
      'No clickable login links or demands for sensitive personal credentials.',
      'Pure informational bulletin directing to main official portal without urgency.'
    ]
  },
  {
    id: 'sc-3',
    channel: 'Email (Phishing)',
    sender: 'HDFC Customer Support <alert@hdfcb-security-verify.net>',
    subject: 'Action Required: Unusual Activity Detected on Debit Card',
    content: 'We noticed an unusual charge of ₹48,500 on your debit card ending in 4092. If you did not authorize this, click here: https://hdfcbank.security-portal.co/verify and submit your 16-digit card number and CVV to reverse transaction.',
    isPhishing: true,
    forensics: [
      'Spoofed sender domain: "@hdfcb-security-verify.net" instead of official "@hdfcbank.com".',
      'Phishing link "hdfcbank.security-portal.co" uses a subdomain trick to imitate the bank.',
      'Explicitly demands 16-digit card number and CVV (strictly forbidden by RBI).'
    ]
  },
  {
    id: 'sc-4',
    channel: 'SMS (Smishing & Malware)',
    sender: 'AD-ITDEPT',
    subject: 'Income Tax Refund of ₹18,450 Approved',
    content: 'Your Income Tax Refund of INR 18,450 has been approved. Please download and install our official IT-Refund.apk file to claim direct deposit to your bank account: http://bit.ly/itr-refund-claim',
    isPhishing: true,
    forensics: [
      'Demands installing an .apk file (Android package), which installs Trojan/Spyware malware.',
      'Uses a shortened bit.ly link to obfuscate the malicious destination server.',
      'Income tax refunds are processed directly via ECS/NEFT into bank accounts, never via APK apps.'
    ]
  },
  {
    id: 'sc-5',
    channel: 'Email',
    sender: 'Google Security <no-reply@accounts.google.com>',
    subject: 'Security alert for your linked Google Account',
    content: 'A new sign-in was detected on Windows PC from New Delhi. If this was you, no action is needed. If you did not sign in, review your activity at accounts.google.com/security.',
    isPhishing: false,
    forensics: [
      'Authentic domain "accounts.google.com" verified with valid SPF/DKIM/DMARC headers.',
      'Standard informational notification that does not ask for password entry in email.',
      'Directs user to the root account security page.'
    ]
  },
  {
    id: 'sc-6',
    channel: 'SMS (Lottery Scam)',
    sender: 'TX-WINNER',
    subject: 'Congratulations! You won ₹25,00,000 in RBI Lucky Draw',
    content: 'Your mobile number won ₹25 Lakh in RBI KBC Lucky Draw 2026. Deposit ₹1,500 processing tax to UPI ID rbi.officer@okaxis to receive transfer. Contact Manager on WhatsApp 9876543210.',
    isPhishing: true,
    forensics: [
      'RBI NEVER runs lucky draws, lotteries, or competitions.',
      'Advance-fee fraud: Asks for deposit of processing fees to personal UPI handle.',
      'RBI strictly warns against unsolicited calls, lottery schemes, and foreign currency rewards.'
    ]
  }
];

export default function PhishingAttackDetector() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userChoice, setUserChoice] = useState(null); // 'phish' | 'safe'
  const [score, setScore] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);

  const curr = SCENARIOS[currentIdx];
  const hasAnswered = userChoice !== null;
  const isCorrect = hasAnswered && ((userChoice === 'phish' && curr.isPhishing) || (userChoice === 'safe' && !curr.isPhishing));

  const handleSelect = (choice) => {
    if (hasAnswered) return;
    setUserChoice(choice);
    const correct = (choice === 'phish' && curr.isPhishing) || (choice === 'safe' && !curr.isPhishing);
    if (correct) setScore(s => s + 1);
    setReviewedCount(r => r + 1);
  };

  const handleNext = () => {
    setUserChoice(null);
    setCurrentIdx(i => (i + 1) % SCENARIOS.length);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Interactive Phishing & Cyber Fraud Detector Lab</h2>
            <p className="text-xs text-slate-400">
              Forensic Analysis of Phishing Emails, Smishing SMS, Deceptive URLs & Social Engineering
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-slate-400">
            Scenario: <strong className="text-white">{currentIdx + 1} / {SCENARIOS.length}</strong>
          </span>
          <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 font-bold">
            Accuracy: {reviewedCount > 0 ? Math.round((score / reviewedCount) * 100) : 100}%
          </span>
        </div>
      </div>

      {/* Message Inspection Card */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-slate-400 font-mono">
              {curr.channel}
            </span>
            <span className="text-slate-400">From: <strong className="text-white font-mono">{curr.sender}</strong></span>
          </div>
          <span className="text-[11px] text-slate-500">Security Rating: Unverified</span>
        </div>

        <div className="text-sm font-bold text-white mb-3">{curr.subject}</div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 leading-relaxed break-all">
          {curr.content}
        </div>
      </div>

      {/* Decision Buttons */}
      {!hasAnswered ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => handleSelect('phish')}
            className="p-4 rounded-xl border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-300 font-bold flex items-center justify-center gap-2 transition"
          >
            <ShieldAlert className="w-5 h-5 text-red-400" />
            FLAG AS PHISHING / FRAUD ATTACK
          </button>

          <button
            onClick={() => handleSelect('safe')}
            className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center gap-2 transition"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            VERIFY AS LEGITIMATE / SAFE
          </button>
        </div>
      ) : (
        /* Forensic Breakdown Card */
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-6">
          <div className={`p-3 rounded-lg border mb-4 flex items-center justify-between ${
            isCorrect ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-red-500/10 border-red-500/40 text-red-300'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {isCorrect ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-red-400" />}
              {isCorrect ? 'Correct Forensic Diagnosis!' : 'Incorrect Identification!'}
            </div>
            <span className="text-xs font-mono font-bold">
              Actual Nature: {curr.isPhishing ? 'MALICIOUS ATTACK' : 'LEGITIMATE COMMUNICATION'}
            </span>
          </div>

          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-cyan-400" /> Forensic Indicators & RBI Red Flags:
          </h4>

          <ul className="space-y-1.5 text-xs text-slate-300 mb-4 list-disc list-inside">
            {curr.forensics.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <button
            onClick={handleNext}
            className="w-full py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-cyan-400 transition"
          >
            Next Threat Scenario →
          </button>
        </div>
      )}

      {/* RBI Security Advice */}
      <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-4 text-xs text-slate-300 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block mb-1">RBI Cybersecurity Mandatory Warning:</strong>
          <span>
            Banks will <strong>NEVER</strong> ask customers for confidential credentials (PIN, OTP, CVV, NetBanking password) via SMS, email, or telephone. Always verify the domain name extension (official banks end in <strong>.bank.sbi</strong>, <strong>.co.in</strong>, or sovereign <strong>.rbi.org.in</strong>, never .xyz, .top, or .apk).
          </span>
        </div>
      </div>
    </div>
  );
}
