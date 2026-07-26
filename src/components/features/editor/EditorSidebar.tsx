import React from 'react';
import { motion } from 'motion/react';
import { Play, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWindowSize } from '@/hooks/useWindowSize';

interface EditorSidebarProps {
  activeTab: 'editor' | 'templates' | 'preview';
  setActiveTab: (tab: 'editor' | 'templates' | 'preview') => void;
  isCollapsed: boolean;
  isFullscreen: boolean;
  templates: any[];
  activeTemplateId: string;
  onTemplateSelect: (template: any) => void;
}

// Static thumbnail — no live React tree, just CSS gradients. Zero render cost.
function TemplateThumbnail({ t, isActive }: { t: any; isActive: boolean }) {
  return (
    <div className="w-full aspect-[16/9] rounded-xl mb-3 relative overflow-hidden border border-white/5 shadow-xl group-hover:border-white/20 transition-all duration-300">
      <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient}`} />
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '12px 12px' }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-3">
        <t.icon className={cn('w-6 h-6 drop-shadow-lg', t.color)} />
        <span className={cn('text-[9px] font-bold tracking-widest uppercase opacity-75 text-center', t.textColor)}>
          {t.category}
        </span>
      </div>
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-300 z-10" />
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-2xl transform scale-75 group-hover:scale-100 transition-all duration-300 opacity-0 group-hover:opacity-100">
          <Play className="w-3.5 h-3.5 text-white fill-current ml-0.5" />
        </div>
      </div>
      {isActive && (
        <div className="absolute top-2 right-2 z-30 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.8)]">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
    </div>
  );
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
        "shrink-0 flex flex-col bg-[#1e1e1e] border-white/5 overflow-hidden",
        isMobile ? "border-b" : "border-r"
      )}
      initial={false}
      animate={{ 
        width: isMobile ? '100%' : (isCollapsed || isFullscreen) ? 0 : 320,
        height: isMobile ? (isCollapsed || isFullscreen) ? 0 : 'auto' : '100%',
        opacity: (isCollapsed || isFullscreen) ? 0 : 1
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
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
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Template List — static thumbnails, zero live rendering cost */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-3">
          {templates.map((t) => (
            <div
              key={t.id}
              onClick={() => onTemplateSelect(t)}
              className={cn(
                "group relative flex flex-col p-3 rounded-xl border transition-all duration-200 text-left cursor-pointer",
                activeTemplateId === t.id 
                  ? "bg-indigo-500/10 border-indigo-500/50 ring-1 ring-indigo-500/30" 
                  : "bg-[#2a2a2a] border-white/5 hover:border-white/15 hover:bg-[#2f2f2f]"
              )}
            >
              <TemplateThumbnail t={t} isActive={activeTemplateId === t.id} />
              <h4 className="text-xs font-bold text-white mb-0.5">{t.name}</h4>
              <p className="text-[10px] text-zinc-500 leading-relaxed line-clamp-2">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

