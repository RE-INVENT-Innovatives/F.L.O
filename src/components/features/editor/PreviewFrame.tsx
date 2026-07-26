import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Monitor, Smartphone, RefreshCw, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TEMPLATES } from '@/lib/templates';
import { PortfolioDataProvider } from '@/context/PortfolioDataContext';

interface PreviewFrameProps {
  deviceMode: 'desktop' | 'mobile';
  setDeviceMode: (mode: 'desktop' | 'mobile') => void;
  selectedTemplate: string;
  customData: any;
}

// Custom Frame component to render React components in an IFrame
function PreviewIframe({ children, className, ...props }: React.ComponentProps<'iframe'>) {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!contentRef || !contentRef.contentWindow) return;
    const doc = contentRef.contentWindow.document;
    
    // Set base iframe styles
    const style = doc.createElement('style');
    style.textContent = `
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        background-color: transparent;
      }
    `;
    doc.head.appendChild(style);

    setMountNode(doc.body);

    const copyStyles = () => {
      const head = doc.head;
      
      // Clean existing styles we copied previously to prevent duplicates
      head.querySelectorAll('.copied-style').forEach(el => el.remove());

      Array.from(document.querySelectorAll('link[rel="stylesheet"], style')).forEach(el => {
        const clone = el.cloneNode(true) as HTMLElement;
        clone.classList.add('copied-style');
        head.appendChild(clone);
      });
    };

    copyStyles();

    // Observe changes to parent document head for style injections (Tailwind HMR)
    const observer = new MutationObserver(() => {
      copyStyles();
    });

    observer.observe(document.head, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [contentRef]);

  return (
    <iframe 
      ref={setContentRef} 
      className={cn("w-full h-full border-none bg-white", className)} 
      {...props}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
}

export function PreviewFrame({
  deviceMode,
  setDeviceMode,
  selectedTemplate,
  customData
}: PreviewFrameProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (deviceMode === 'desktop') {
      setScale(1);
      return;
    }

    const updateScale = () => {
      if (!containerRef.current) return;
      const parentWidth = containerRef.current.clientWidth;
      const parentHeight = containerRef.current.clientHeight;

      // Desired mobile frame container bounds including border/padding space
      const frameWidth = 375 + 16; // 375px view + 16px borders
      const frameHeight = 812 + 16;

      const scaleX = parentWidth / frameWidth;
      const scaleY = parentHeight / frameHeight;

      // Fit inside container but do not scale up past 100%
      const newScale = Math.min(scaleX, scaleY, 0.95);
      setScale(newScale);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, [deviceMode]);

  const PreviewComponent = TEMPLATES.find(t => t.id === selectedTemplate)?.component || TEMPLATES[0].component;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0a0a0a]">

      {/* Actual Preview Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-hidden bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px] relative p-4"
      >
        {deviceMode === 'desktop' ? (
          <div className="w-full h-full bg-white shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden">
            <PreviewIframe>
              <PortfolioDataProvider isEditable={true}>
                <React.Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-white"><div className="w-8 h-8 border-2 border-zinc-200 border-t-zinc-800 rounded-full animate-spin" /></div>}>
                  <PreviewComponent />
                </React.Suspense>
              </PortfolioDataProvider>
            </PreviewIframe>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              style={{ 
                transform: `scale(${scale})`,
                transformOrigin: 'center center',
                width: '375px',
                height: '812px'
              }}
              className="bg-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-[3rem] border-[8px] border-zinc-800 overflow-hidden shrink-0 transition-transform duration-200"
            >
            <div className="w-full h-full rounded-[2.3rem] overflow-hidden bg-white">
              <PreviewIframe>
                <PortfolioDataProvider isEditable={true}>
                  <React.Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-white"><div className="w-8 h-8 border-2 border-zinc-200 border-t-zinc-800 rounded-full animate-spin" /></div>}>
                    <PreviewComponent />
                  </React.Suspense>
                </PortfolioDataProvider>
              </PreviewIframe>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
