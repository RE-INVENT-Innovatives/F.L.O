'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useWindowSize } from '@/hooks/useWindowSize';
import { Notch } from '@/components/ui/notch';
import { useNotchTabStore } from '@/store/notchTabStore';

const PAGE_TABS: Record<string, { id: string; label: string }[]> = {
  '/preview': [
    { id: 'editor', label: 'Editor' },
    { id: 'templates', label: 'Templates' },
    { id: 'preview', label: 'Preview' },
  ],
  '/folio-control': [
    { id: 'repos', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'professional', label: 'Professional' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'assets', label: 'Assets' },
  ],
  '/seo': [
    { id: 'basic', label: 'SEO Basics' },
    { id: 'social', label: 'Social Cards' },
    { id: 'advanced', label: 'Advanced' },
  ],
};

const PAGE_DEFAULTS: Record<string, string> = {
  '/preview': 'editor',
  '/folio-control': 'repos',
  '/seo': 'basic',
};

export function MobileNotch() {
  const pathname = usePathname();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const { activeTab, setActiveTab } = useNotchTabStore();

  // Reset to default tab whenever the page changes
  useEffect(() => {
    const defaultTab = PAGE_DEFAULTS[pathname ?? ''];
    if (defaultTab) setActiveTab(defaultTab);
  }, [pathname]);

  const tabs = PAGE_TABS[pathname ?? ''];

  if (!isMobile || !tabs) return null;

  return (
    <Notch
      items={[
        {
          id: 'tabs',
          label: 'View',
          value: activeTab || tabs[0].id,
          onChange: (id) => setActiveTab(id),
          options: tabs,
        },
      ]}
      position="bottom"
      offset={96}
    />
  );
}
