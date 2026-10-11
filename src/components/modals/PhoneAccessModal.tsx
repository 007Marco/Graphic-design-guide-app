import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Share2,
  PlusSquare,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Layers,
  HardDrive,
  Download,
  Upload,
} from 'lucide-react';

interface PhoneAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhoneAccessModal: React.FC<PhoneAccessModalProps> = ({ isOpen, onClose }) => {
  const [deviceTab, setDeviceTab] = useState<'iphone' | 'android' | 'sync'>('iphone');
  const [copiedLink, setCopiedLink] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://atelier-studio.app';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(currentUrl)}&margin=8`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <span>Open & Install on Your Phone</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                  100% Offline
                </span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Track your syllabus, check off milestones, and practice design on the go!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Quick Scan Card */}
          <div className="p-4 rounded-xl bg-linear-to-br from-blue-50/80 via-indigo-50/30 to-purple-50/30 dark:from-blue-950/20 dark:via-zinc-900 dark:to-purple-950/20 border border-blue-200/80 dark:border-blue-900/50 flex flex-col sm:flex-row items-center gap-5">
            <div className="p-2.5 bg-white rounded-xl shadow-xs border border-zinc-200 shrink-0 text-center">
              {!imageError ? (
                <img
                  src={qrCodeUrl}
                  alt="Scan to open Atelier on phone"
                  className="w-36 h-36 rounded-lg object-contain mx-auto"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-36 h-36 rounded-lg bg-zinc-900 text-white flex flex-col items-center justify-center p-3 text-center">
                  <Smartphone className="w-8 h-8 text-blue-400 mb-1" />
                  <span className="text-[10px] font-mono font-bold">Atelier Mobile</span>
                  <span className="text-[9px] text-zinc-400 mt-1">Tap Copy Link below</span>
                </div>
              )}
              <span className="block text-[9px] text-zinc-400 font-mono mt-1">
                Point Camera at QR Code
              </span>
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
              <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950">
                Quickest Method: 1-Second Camera Scan
              </span>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                1. Open Camera App on your phone
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Point your iPhone or Android camera directly at the QR code on your laptop screen. A notification yellow/blue link will appear—tap it to open Atelier instantly in your mobile browser.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 shadow-2xs cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied! Send to Phone' : 'Copy Mobile Link'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* OS Platform Tabs */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Step-by-Step Installation Guides:
              </span>
              
              <div className="flex p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs self-start sm:self-auto">
                <button
                  onClick={() => setDeviceTab('iphone')}
                  className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                    deviceTab === 'iphone'
                      ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  🍎 iPhone (Safari)
                </button>
                <button
                  onClick={() => setDeviceTab('android')}
                  className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                    deviceTab === 'android'
                      ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  🤖 Android (Chrome)
                </button>
                <button
                  onClick={() => setDeviceTab('sync')}
                  className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                    deviceTab === 'sync'
                      ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  🔄 Sync Progress
                </button>
              </div>
            </div>

            {/* iPhone Guide */}
            {deviceTab === 'iphone' && (
              <div className="space-y-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 text-xs text-zinc-800 dark:text-zinc-200 animate-in fade-in duration-150">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <strong className="block font-semibold text-zinc-900 dark:text-zinc-100">Open in Safari</strong>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Scan the QR code or paste the copied link into Apple Safari on your iPhone.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <strong className="block font-semibold text-zinc-900 dark:text-zinc-100">Tap the "Share" Icon</strong>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Tap the blue square icon with the upward arrow <Share2 className="w-3.5 h-3.5 inline mx-0.5 text-blue-500" /> at the bottom bar of Safari.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <strong className="block font-semibold text-zinc-900 dark:text-zinc-100">Tap "Add to Home Screen"</strong>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Scroll down in the share sheet and tap <strong className="font-semibold text-zinc-900 dark:text-zinc-100">"Add to Home Screen"</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-zinc-500" />, then tap <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Add</strong> (top right).
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-[11px] text-blue-800 dark:text-blue-300 font-medium">
                  🎉 Done! Atelier now has its own app icon on your iPhone home screen. It opens full screen with zero Safari browser bars!
                </div>
              </div>
            )}

            {/* Android Guide */}
            {deviceTab === 'android' && (
              <div className="space-y-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 text-xs text-zinc-800 dark:text-zinc-200 animate-in fade-in duration-150">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <strong className="block font-semibold text-zinc-900 dark:text-zinc-100">Open in Google Chrome</strong>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Scan the QR code or open the link in Chrome or Samsung Internet on your phone.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <strong className="block font-semibold text-zinc-900 dark:text-zinc-100">Tap the Three Dots (⋮) Menu</strong>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Tap the three vertical dots in the top-right corner of Chrome, or look for the "Install Atelier" prompt at the bottom of your screen.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <strong className="block font-semibold text-zinc-900 dark:text-zinc-100">Tap "Install App" or "Add to Home Screen"</strong>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Chrome will automatically install Atelier into your app drawer and place an icon on your home screen!
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">
                  🎉 Done! You can now launch Atelier directly from your app drawer just like any installed app from Google Play!
                </div>
              </div>
            )}

            {/* Sync Progress Guide */}
            {deviceTab === 'sync' && (
              <div className="space-y-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 text-xs text-zinc-800 dark:text-zinc-200 animate-in fade-in duration-150">
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Because Atelier is 100% offline and stores your data privately in your browser without requiring passwords or cloud servers, here is how you sync progress between laptop and phone:
                </p>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <strong className="block font-semibold text-zinc-900 dark:text-zinc-100">On your Laptop: Export Backup</strong>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Click the <Download className="w-3.5 h-3.5 inline mx-0.5 text-blue-500" /> Download icon in the top header or go to "Backup & Sync". This downloads a small <code className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1 rounded">.json</code> file.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <strong className="block font-semibold text-zinc-900 dark:text-zinc-100">Send File or Copy JSON to Phone</strong>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Send the .json file to yourself via WhatsApp, Telegram, AirDrop, or Email.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <strong className="block font-semibold text-zinc-900 dark:text-zinc-100">On your Phone: Tap "Restore"</strong>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Open Atelier on your phone, go to the "Backup & Sync" tab, tap <Upload className="w-3.5 h-3.5 inline mx-0.5 text-emerald-500" /> "Upload Backup", and select the file. All your completed subtopics, trial scores, and notes update in 1 second!
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Offline Security Guarantee */}
          <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 flex items-start gap-3 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-emerald-900 dark:text-emerald-300 block">
                Zero Mobile Data Required After First Load
              </span>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                The service worker caches all curriculum lessons, checklists, and guides directly into your phone’s internal storage. You can ride the subway or study in areas with no cellular service without interruptions.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Need help? Click "Copy Mobile Link" and message it to your phone.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 cursor-pointer"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
