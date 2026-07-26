import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWindowSize } from '@/hooks/useWindowSize';
import { PortfolioDataProvider } from '@/context/PortfolioDataContext';

interface EditorSidebarProps {
  activeTab: 'editor' | 'templates' | 'preview';
  setActiveTab: (tab: 'editor' | 'templates' | 'preview') => void;
  isCollapsed: boolean;
  isFullscreen: boolean;
  templates: any[];
  activeTemplateId: string;
  onTemplateSelect: (template: any) => void;
}

export function EditorSidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  isFullscreen,
  templates,
  activeTemplateId,
  onTemplateSelect
}: EditorSidebarProps) {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <motion.div 
      className={cn(
        "shrink-0 flex flex-col bg-[#1e1e1e] border-white/5 overflow-hidden transition-all duration-300",
        isMobile ? "border-b" : "border-r"
      )}
      initial={false}
      animate={{ 
        width: isMobile ? '100%' : (isCollapsed || isFullscreen) ? 0 : 320,
        height: isMobile ? (isCollapsed || isFullscreen) ? 0 : '100%' : '100%',
        opacity: (isCollapsed || isFullscreen) ? 0 : 1
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Top Tabs */}
      <div className="h-14 flex items-center p-2 bg-[#0a0a0a] border-b border-white/5 w-full shrink-0">
        <div className="flex p-1 bg-[#1a1a1a] border border-white/5 rounded-full overflow-hidden w-full relative">
          {[
            { id: 'templates', label: 'Templates' },
            ...(isMobile ? [{ id: 'preview', label: 'Preview' }] : [])
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "relative flex-1 py-1.5 text-[11px] font-semibold rounded-full transition-all duration-300", 
                activeTab === tab.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="sidebarActiveTab"
                  className="absolute inset-0 bg-[#2a2a2a] rounded-full"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {templates.map((t) => (
                <div
                  key={t.id}
                  onClick={() => onTemplateSelect(t)}
                  className={cn(
                    "group relative flex flex-col p-3 rounded-xl border transition-all duration-300 text-left cursor-pointer",
                    activeTemplateId === t.id 
                      ? "bg-indigo-500/10 border-indigo-500/50 ring-1 ring-indigo-500/50" 
                      : "bg-[#2a2a2a] border-white/5 hover:border-white/10 hover:bg-[#333]"
                  )}
                >


                  {/* High-Fidelity Thumbnail */}
                  <div className={cn("w-full aspect-[16/9] rounded-xl mb-3 relative overflow-hidden bg-zinc-950 border border-white/5 shadow-2xl group-hover:border-white/20 transition-all", t.color)}>
                    <div className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 origin-top-left w-[400%] h-[400%] text-left pointer-events-none" style={{ transform: 'scale(0.25)' }}>
                        <PortfolioDataProvider isPlaceholder>
                          <t.component />
                        </PortfolioDataProvider>
                    </div>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-2xl transform scale-90 group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                         <Play className="w-4 h-4 text-white fill-current ml-1" />
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="text-xs font-bold text-white mb-1">{t.name}</h4>
                  <p className="text-[10px] text-zinc-500 leading-relaxed line-clamp-2">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
      </div>

    </motion.div>
  );
}
