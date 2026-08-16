import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
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

// Styled Thumbnail matching reference screenshot
function TemplateThumbnail({ t, isActive }: { t: any; isActive: boolean }) {
  return (
    <div className="w-full aspect-[16/9] rounded-2xl mb-1 relative overflow-hidden border border-white/10 shadow-xl group-hover:border-white/20 transition-all duration-300">
      <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient}`} />
      <div
        className="absolute inset-0 opacity-15"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '12px 12px' }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-3">
        <t.icon className={cn('w-7 h-7 drop-shadow-lg', t.color)} />
        <span className={cn('text-[10px] font-mono font-bold tracking-widest uppercase opacity-90 text-center', t.textColor)}>
          {t.category}
        </span>
      </div>
      
      {/* Active Green Checkmark Badge on Top Right */}
      {isActive && (
        <div className="absolute top-3 right-3 z-30 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.8)]">
          <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
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
        "shrink-0 flex flex-col bg-[#060a12] border-[#172233] overflow-hidden",
        isMobile ? "border-b" : "border-r"
      )}
      initial={false}
      animate={{ 
        width: isMobile ? '100%' : (isCollapsed || isFullscreen) ? 0 : 340,
        height: isMobile ? (isCollapsed || isFullscreen) ? 0 : 'auto' : '100%',
        opacity: (isCollapsed || isFullscreen) ? 0 : 1
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      {/* Template List — styled to match reference screenshot */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 pt-20 md:pt-4 space-y-4">
          {templates.map((t) => {
            const isActive = activeTemplateId === t.id;
            return (
              <div
                key={t.id}
                onClick={() => onTemplateSelect(t)}
                className={cn(
                  "group relative flex flex-col p-3.5 rounded-3xl border transition-all duration-300 text-left cursor-pointer shadow-lg",
                  isActive 
                    ? "bg-[#0d1422] border-indigo-500/60 ring-1 ring-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.15)]" 
                    : "bg-[#090d14] border-[#172233] hover:border-white/20 hover:bg-[#0c121c]"
                )}
              >
                <TemplateThumbnail t={t} isActive={isActive} />

                {/* Card Info Section: Title + Description on left, Circular Arrow button on right */}
                <div className="flex items-center justify-between gap-3 px-1 pt-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{t.name}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">{t.desc}</p>
                  </div>

                  {/* Circular Arrow Button ( → ) */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); onTemplateSelect(t); }}
                    className="w-9 h-9 rounded-full bg-[#141b27] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-300 shrink-0 shadow-md"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

