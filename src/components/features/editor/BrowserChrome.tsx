import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown, Monitor, Smartphone, RefreshCw, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BrowserChromeProps {
  isFullscreen: boolean;
  setIsFullscreen: (val: boolean) => void;
  deviceMode: 'desktop' | 'mobile';
  setDeviceMode: (mode: 'desktop' | 'mobile') => void;
  onExport: () => void;
  githubUser: any;
}

export function BrowserChrome({ 
  isFullscreen, 
  setIsFullscreen,
  deviceMode,
  setDeviceMode,
  onExport,
  githubUser
}: BrowserChromeProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <div className="h-14 flex items-center justify-between px-3 sm:px-6 bg-[#070b12] border-b border-[#172436] shrink-0 w-full relative z-10">
      <div className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#121a28] text-zinc-300 hover:text-white transition-colors border border-white/10 shrink-0">
          <ArrowLeft className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-[#121a28] rounded-full border border-white/10 shrink-0">
            <button 
              onClick={() => setDeviceMode('desktop')}
              className={cn(
                "p-1.5 rounded-full transition-all duration-300",
                deviceMode === 'desktop' ? "bg-indigo-600 text-white shadow-md" : "text-zinc-400 hover:text-zinc-200"
              )}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setDeviceMode('mobile')}
              className={cn(
                "p-1.5 rounded-full transition-all duration-300",
                deviceMode === 'mobile' ? "bg-indigo-600 text-white shadow-md" : "text-zinc-400 hover:text-zinc-200"
              )}
              title="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* URL Pill */}
      <div className="hidden sm:flex items-center gap-1.5 px-4 py-1 bg-[#121a28] rounded-full border border-white/10 text-[11px] font-mono text-zinc-300 cursor-pointer hover:bg-[#182336] transition-colors shrink-0">
        <span className="text-zinc-500">preview-your-portfolio.app</span>
        <span className="text-zinc-600">/</span>
        <span className="text-zinc-200 font-bold">index</span>
        <ChevronDown className="w-3 h-3 ml-1 text-zinc-500" />
      </div>

      <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3 shrink-0 mr-24 sm:mr-44 lg:mr-52">
        <a 
          href={`/${(isMounted && githubUser?.login) ? githubUser.login : 'profile'}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-[11px] font-mono font-bold text-zinc-300 hover:text-white transition-colors px-2 py-1"
        >
          Open <ExternalLink className="w-3 h-3 text-zinc-400" />
        </a>
        <button 
          onClick={onExport}
          className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-[11px] font-mono font-extrabold rounded-full transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_22px_rgba(99,102,241,0.6)] active:scale-95 cursor-pointer"
        >
          Preview
        </button>
      </div>
    </div>
  );
}
