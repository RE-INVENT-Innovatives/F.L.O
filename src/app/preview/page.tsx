'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@/store/useStore';
import { useWindowSize } from '@/hooks/useWindowSize';
import { 
  Code, LayoutTemplate, Palette, Github, X, Sparkles,
  ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TEMPLATES } from '@/lib/templates';
import { deployService } from '@/services/deploy.service';
import { useToast } from '@/components/ui/Toast';

import dynamic from 'next/dynamic';

// Components
const EditorSidebar = dynamic(() => import('@/components/features/editor/EditorSidebar').then(mod => mod.EditorSidebar), {
  loading: () => <div className="w-[320px] h-full bg-[#1e1e1e] border-r border-white/10 shrink-0 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-zinc-700" /></div>,
  ssr: false
});
import { BrowserChrome } from '@/components/features/editor/BrowserChrome';
const PreviewFrame = dynamic(() => import('@/components/features/editor/PreviewFrame').then(mod => mod.PreviewFrame), {
  loading: () => <div className="flex-1 h-full bg-[#0a0a0a] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-zinc-700" /></div>,
  ssr: false
});
import { Modal } from '@/components/ui/Modal';
import { useNotchTabStore } from '@/store/notchTabStore';

export type EditorTab = 'editor' | 'templates' | 'preview';

export default function PreviewEditorPage() {
  const { toast } = useToast();
  const { activeTab, setActiveTab } = useNotchTabStore();
  // Initialize default tab for this page
  React.useEffect(() => { if (!activeTab) setActiveTab('editor'); }, []);
  const _activeTab = (activeTab as EditorTab) || 'editor';
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [chatInput, setChatInput] = useState('');
  const [templateSearch, setTemplateSearch] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [isEditorCollapsed, setIsEditorCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [repoName, setRepoName] = useState('my-portfolio-2024');
  const [customDomain, setCustomDomain] = useState('');
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);
  
  React.useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const selectedTemplate = useStore((state) => state.selectedTemplate);
  const setSelectedTemplate = useStore((state) => state.setSelectedTemplate);
  const githubUser = useStore((state) => state.githubUser);
  const customData = useStore((state) => state.customData);
  const updateCustomData = useStore((state) => state.updateCustomData);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const templates = TEMPLATES;

  const [activeTemplateId, setActiveTemplateId] = useState<string>(
    templates.find(t => t.id === selectedTemplate)?.id || 'minimal'
  );

  const handleTemplateSelect = (t: any) => {
    setActiveTemplateId(t.id);
    setSelectedTemplate(t.id as any);
  };

  const editorContent = (
    <div className={cn(
      "h-full w-full flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#1e1e1e] font-sans relative",
      isFullscreen && "w-full h-full bg-[#0a0a0a] rounded-none border-none"
    )}>


      {/* Row containing Sidebar and/or Preview */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 relative">
        {(!isMobile || _activeTab !== 'preview') && (
          <EditorSidebar 
            activeTab={_activeTab as any}
            setActiveTab={setActiveTab as any}
            isCollapsed={isEditorCollapsed}
            isFullscreen={isFullscreen}
            templateSearch={templateSearch}
            setTemplateSearch={setTemplateSearch}
            templates={[...templates]}
            activeTemplateId={activeTemplateId}
            onTemplateSelect={handleTemplateSelect}
            customData={customData}
            updateCustomData={updateCustomData}
            chatInput={chatInput}
            setChatInput={setChatInput}
          />
        )}

        {/* Collapse Toggle Button (Desktop Only) */}
        {!isFullscreen && !isMobile && (
          <motion.button
            animate={{ left: isEditorCollapsed ? 0 : 320 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setIsEditorCollapsed(!isEditorCollapsed)}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-6 h-12 bg-[#2a2a2a] border border-white/10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 shadow-xl",
              isEditorCollapsed && "translate-x-0 rounded-l-none"
            )}
          >
            {isEditorCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </motion.button>
        )}

        {/* Right Main Area (Preview Container) */}
        {(!isMobile || _activeTab === 'preview') && (
          <div className="flex-1 flex flex-col bg-[#0a0a0a] min-w-0 relative">

          <BrowserChrome 
            isFullscreen={isFullscreen}
            setIsFullscreen={setIsFullscreen}
          />
          
          <PreviewFrame 
            deviceMode={deviceMode}
            setDeviceMode={setDeviceMode}
            selectedTemplate={selectedTemplate}
            customData={customData}
            onExport={() => setShowExportModal(true)}
            githubUser={githubUser}
          />
        </div>
        )}
      </div>

      {/* Modals & Overlays */}
      <Modal 
        isOpen={showExportModal} 
        onClose={() => setShowExportModal(false)} 
        title="Publish Portfolio"
      >
        <div className="space-y-4">
          <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-indigo-400">
              <Github className="w-5 h-5" />
              <span className="font-bold text-sm uppercase tracking-wider">GitHub Pages</span>
            </div>
            <p className="text-xs text-indigo-300/70 leading-relaxed">
              We'll create a new repository and deploy your portfolio instantly.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-zinc-400 ml-1 font-semibold uppercase tracking-wider">Repository Name</label>
            <input 
              type="text" 
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-zinc-400 ml-1 font-semibold uppercase tracking-wider">Custom Domain (Optional)</label>
            <input 
              type="text" 
              placeholder="portfolio.yourname.com"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
        </div>

        <button 
          disabled={isDeploying}
          onClick={async () => {
            setIsDeploying(true);
            try {
              const res = await deployService.deployToGitHubPages(repoName, customDomain);
              setDeployedUrl(res.deployedUrl || null);
              setShowExportModal(false);
              setShowShareToast(true);
              setTimeout(() => setShowShareToast(false), 8000);
            } catch (error: any) {
              toast.error(error.message || 'Deployment failed. Please try again.');
            } finally {
              setIsDeploying(false);
            }
          }}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isDeploying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} 
          {isDeploying ? 'Deploying...' : 'Deploy to GitHub'}
        </button>
      </Modal>

      <AnimatePresence>
        {showShareToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[700] px-6 py-4 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Deployment Started!</h4>
              {deployedUrl ? (
                <p className="text-xs text-zinc-400">
                  Your site will be live at: <a href={deployedUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">{deployedUrl}</a>
                </p>
              ) : (
                <p className="text-xs text-zinc-400">Your site will be live in a few minutes.</p>
              )}
            </div>
            <button onClick={() => setShowShareToast(false)} className="ml-4 text-zinc-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Use createPortal for full screen mode if we are on client
  if (typeof document !== 'undefined' && isFullscreen) {
    return createPortal(
      <div className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col">
        {editorContent}
      </div>,
      document.body
    );
  }

  return (
    <div className="w-full h-screen p-2 md:p-4 lg:p-6 pt-24 bg-[#0a0a0a]">
      {editorContent}
    </div>
  );
}
