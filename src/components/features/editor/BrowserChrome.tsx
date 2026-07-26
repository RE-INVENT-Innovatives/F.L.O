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
    <div className="h-14 flex items-center justify-between px-4 sm:px-6 bg-[#0a0a0a] border-b border-white/5 shrink-0 w-full relative z-10">
      <div className="flex-1 flex items-center gap-4">
        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a1a1a] text-zinc-400 hover:text-white transition-colors border border-white/5">
          <ArrowLeft className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center p-1 bg-[#1a1a1a] rounded-full border border-white/5">
            <button 
              onClick={() => setDeviceMode('desktop')}
              className={cn(
                "p-1.5 rounded-full transition-all duration-300",
                deviceMode === 'desktop' ? "bg-[#2a2a2a] text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setDeviceMode('mobile')}
              className={cn(
                "p-1.5 rounded-full transition-all duration-300",
                deviceMode === 'mobile' ? "bg-[#2a2a2a] text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-[11px] font-medium text-zinc-400 hover:text-white transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 px-5 py-1.5 bg-[#1a1a1a] rounded-full border border-white/5 text-[11px] sm:text-xs text-zinc-300 cursor-pointer hover:bg-[#222] transition-colors font-medium">
        <span className="text-zinc-500">preview--your-portfolio.app</span> <span className="text-zinc-600 mx-0.5">/</span> index <ChevronDown className="w-3 h-3 ml-1.5 text-zinc-500" />
      </div>

      <div className="flex-1 flex items-center justify-end gap-3">
        <a 
          href={`/${(isMounted && githubUser?.login) ? githubUser.login : 'profile'}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 hover:text-white transition-colors"
        >
          Open <ExternalLink className="w-3 h-3" />
        </a>
        <button 
          onClick={onExport}
          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold rounded-full transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
