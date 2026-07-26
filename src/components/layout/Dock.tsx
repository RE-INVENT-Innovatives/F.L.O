import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, SlidersHorizontal, MonitorPlay, LayoutTemplate, Inbox, TrendingUp, BookOpen } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/folio-control', label: 'Folio Control', icon: SlidersHorizontal },
  { path: '/templates', label: 'Templates', icon: LayoutTemplate },
  { path: '/preview', label: 'Preview & Editor', icon: MonitorPlay },
  { path: '/seo', label: 'SEO & OG', icon: TrendingUp },
  { path: '/blog', label: 'Blog', icon: BookOpen },
];

export function Dock() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const disconnect = useStore((state) => state.disconnect);

  // Reset inactivity timer on any interaction
  const resetTimer = React.useCallback(() => {
    setIsVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      // Hide dock on inactivity
      setIsVisible(false);
    }, 3000);
  }, []);

  useEffect(() => {
    // Start initial timer
    resetTimer();

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [resetTimer]);

  // Keep visible if hovered to prevent disappearing while user interacts directly with the dock
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    resetTimer();
  };

  return (
    <div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl pointer-events-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : 80, 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.95
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      >
        {navItems.map((item, index) => {
          const isActive = pathname === item.path;
          const isHovered = hoveredIndex === index;
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className={cn(
                  "relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-colors",
                  isActive ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
                animate={{
                  scale: isHovered ? 1.15 : 1,
                  y: isHovered ? -4 : 0,
                }}
                transition={{ type: 'spring', stiffness: 450, damping: 22 }}
              >
                <item.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute -bottom-0.5 w-1 h-1 bg-white rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>

              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && isVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-zinc-800 text-white text-[10px] font-medium rounded-md whitespace-nowrap shadow-xl border border-white/10"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
