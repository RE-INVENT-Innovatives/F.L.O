'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, ChevronRight, Play, Download, MoreHorizontal, X, Check, Flame, Clock, CheckCircle2, ExternalLink, Upload, Loader2, LayoutTemplate } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TEMPLATES } from '@/lib/templates';
import { PortfolioDataProvider } from '@/context/PortfolioDataContext';

export default function TemplatesPage() {
  const [focusedId, setFocusedId] = useState<string>(TEMPLATES[0].id);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All Templates');
  
  const { setSelectedTemplate, isPublished, publishPortfolio, githubUser, addNotification } = useStore();
  const router = useRouter();

  const focusedTemplate = TEMPLATES.find(t => t.id === focusedId) || TEMPLATES[0];
  const PreviewComponent = TEMPLATES.find(t => t.id === previewId)?.component;

  const filteredTemplates = TEMPLATES.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         t.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === 'All Templates') return matchesSearch;
    return matchesSearch && t.category.toLowerCase().includes(activeTab.toLowerCase());
  });

  const handleUseTemplate = (id: string) => {
    setSelectedTemplate(id as any);
    setPreviewId(null);
    addNotification(`Template "${TEMPLATES.find(t => t.id === id)?.name}" selected!`, 'success');
    router.push('/preview');
  };

  return (
    <div className="container mx-auto px-4 pt-20 md:pt-8 pb-16 h-full flex flex-col">

      {/* ========================================================================= */}
      {/* MOBILE VIEW (Optimized UX matching Reference UI)                          */}
      {/* ========================================================================= */}
      <div className="block md:hidden space-y-5">
        
        {/* Top Section: New Releases Card */}
        <div className="bg-[#121215] border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-sm font-semibold flex items-center gap-2 text-white">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              New Releases
            </h3>
            <button className="text-[11px] text-zinc-400 flex items-center gap-1 hover:text-white transition-colors">
              Sort by: <span className="text-zinc-200 font-medium">Today</span> <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          
          <div className="space-y-3">
            {TEMPLATES.slice(0, 3).map((t) => (
              <div 
                key={`mobile-new-${t.id}`}
                onClick={() => { setFocusedId(t.id); setPreviewId(t.id); }}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className={cn("w-16 h-11 rounded-xl bg-gradient-to-br shrink-0 overflow-hidden relative shadow-md", t.gradient)}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 text-white fill-current opacity-80" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-white truncate group-hover:text-indigo-400 transition-colors">{t.name}</h4>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">{t.category.split('•')[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Section: Featured Card (Spider-Verse or Focused Template) */}
        <div className="relative rounded-[2rem] overflow-hidden border border-white/15 p-5 sm:p-7 mb-6 bg-gradient-to-r from-[#2a040d] via-[#150308] to-[#080104] shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          {/* Subtle glowing ambient blur */}
          <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-48 h-48 opacity-60 pointer-events-none rounded-full bg-gradient-to-l from-red-600/40 via-purple-600/30 to-transparent blur-2xl" />
          
          {/* Character illustration cutout overlay */}
          <img 
            src="https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=600&q=80" 
            alt="Hero Illustration" 
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-40 sm:w-48 h-auto opacity-75 pointer-events-none object-cover mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#120206] via-[#120206]/90 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-[82%] sm:max-w-[75%]">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-3.5 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-orange-500/15 backdrop-blur-md text-[11px] font-semibold text-orange-300 border border-orange-500/30 flex items-center gap-1.5 shadow-[0_0_12px_rgba(249,115,22,0.15)]">
                <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" /> Trending
              </span>
              {focusedTemplate.tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-md text-[11px] font-medium text-zinc-300 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title & Description */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2.5 tracking-tight drop-shadow-md">
              {focusedTemplate.name}
            </h2>
            <p className="text-zinc-300/90 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
              {focusedTemplate.desc}
            </p>

            {/* Premium Buttons */}
            <div className="flex items-center gap-3 flex-wrap pt-1">
              <button 
                onClick={() => setPreviewId(focusedTemplate.id)}
                className="bg-white text-zinc-950 text-xs sm:text-sm font-extrabold px-5 py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:bg-zinc-100 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] active:scale-[0.97] transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer border border-white"
              >
                <Play className="w-3.5 h-3.5 fill-current shrink-0" /> Live Preview
              </button>
              <button 
                onClick={() => handleUseTemplate(focusedTemplate.id)}
                className="bg-white/10 backdrop-blur-xl border border-white/25 text-white text-xs sm:text-sm font-bold px-5 py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-[0.97] transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 shrink-0 text-zinc-300" /> Use Template
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: You Might Like 2-Column Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">You might like</h3>
            <button className="text-xs text-zinc-400 hover:text-white flex items-center gap-0.5 transition-colors">
              View all <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {TEMPLATES.map((t) => (
              <div 
                key={`mobile-grid-${t.id}`}
                onClick={() => {
                  setFocusedId(t.id);
                  setPreviewId(t.id);
                }}
                className={cn(
                  "bg-[#141417] border rounded-2xl p-2.5 flex items-center gap-2.5 cursor-pointer transition-all active:scale-[0.98]",
                  focusedId === t.id ? "border-indigo-500/50 bg-indigo-500/10" : "border-white/10 hover:border-white/20"
                )}
              >
                {/* Styled Thumbnail box matching reference screenshot cards */}
                <div className={cn(
                  "w-14 h-14 rounded-xl shrink-0 overflow-hidden relative p-1.5 flex flex-col justify-between shadow-md",
                  t.gradient ? `bg-gradient-to-br ${t.gradient}` : "bg-zinc-900"
                )}>
                  {t.id === 'developer' && (
                    <div className="text-[7px] font-mono text-emerald-400 bg-black/70 p-1 rounded h-full flex flex-col justify-center leading-none">
                      <span className="text-[6px] text-zinc-400">👤</span>
                      <span className="truncate">~/alex-rivera</span>
                    </div>
                  )}
                  {t.id === 'minimal' && (
                    <div className="bg-zinc-200 text-zinc-900 p-1 rounded h-full flex flex-col justify-center text-[7px]">
                      <span className="font-bold truncate">Alex Rivera</span>
                      <div className="w-full h-0.5 bg-zinc-400 my-0.5" />
                      <div className="w-2/3 h-0.5 bg-zinc-300" />
                    </div>
                  )}
                  {t.id === 'saas' && (
                    <div className="bg-indigo-950 text-indigo-200 p-1 rounded h-full flex flex-col justify-center text-[7px]">
                      <span className="font-bold truncate">Alex Rivera</span>
                      <div className="w-full h-0.5 bg-indigo-400/50 my-0.5" />
                    </div>
                  )}
                  {t.id === 'brutalist' && (
                    <div className="bg-orange-600 text-white p-1 rounded h-full flex flex-col justify-center text-[7px] font-black uppercase">
                      <span>Alex</span>
                      <span>Rivera</span>
                    </div>
                  )}
                  {t.id === 'dominic' && (
                    <div className="bg-zinc-900 text-orange-400 p-1 rounded h-full flex flex-col justify-center text-[6px] font-bold">
                      <span className="text-[5px] text-zinc-400 uppercase truncate">Creative Technologist</span>
                      <span className="text-white truncate">Alex Rivera</span>
                    </div>
                  )}
                  {t.id === 'vanshika' && (
                    <div className="bg-zinc-950 text-white p-1 rounded h-full flex flex-col justify-center text-[6px] font-bold">
                      <span className="text-[5px] text-zinc-500">──</span>
                      <span className="truncate">Creative Technologist</span>
                    </div>
                  )}
                  {t.id === 'folioblox' && (
                    <div className="bg-red-600 text-white p-1 rounded h-full flex flex-col justify-center text-[6px] font-black uppercase leading-tight">
                      <span>Creative</span>
                      <span>Technologist</span>
                    </div>
                  )}
                  {t.id === 'futuristic' && (
                    <div className="bg-gradient-to-br from-purple-900 to-pink-900 text-white p-1 rounded h-full flex flex-col justify-center text-[6px] font-bold uppercase leading-tight text-center">
                      <span>LET'S BUILD TOGETHER</span>
                    </div>
                  )}
                  {!['developer', 'minimal', 'saas', 'brutalist', 'dominic', 'vanshika', 'folioblox', 'futuristic'].includes(t.id) && (
                    <div className="text-[7px] font-bold text-white flex items-center justify-center h-full text-center">
                      {t.name}
                    </div>
                  )}
                </div>

                {/* Right Text */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-white truncate">{t.name}</h4>
                  <p className="text-[10px] text-zinc-400 line-clamp-2 leading-tight mt-0.5">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* DESKTOP VIEW                                                              */}
      {/* ========================================================================= */}
      <div className="hidden md:flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-8">
          {/* Search */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-3.5 flex items-center gap-3 shadow-lg">
            <Search className="w-5 h-5 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search templates..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-zinc-500" 
            />
          </div>

          {/* New Arrivals */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold flex items-center gap-2 text-white">
                <Flame className="w-4 h-4 text-orange-500" fill="currentColor" /> 
                New Releases
              </h3>
              <span className="text-xs text-zinc-500 flex items-center gap-1">
                Sort by: Today <ChevronDown className="w-3 h-3" />
              </span>
            </div>
            
            <div className="space-y-5">
              {TEMPLATES.slice(0, 3).map(t => (
                <div 
                  key={`side-${t.id}`} 
                  className="flex items-center gap-4 group cursor-pointer" 
                  onClick={() => setFocusedId(t.id)}
                >
                  <div className={cn("w-20 h-14 rounded-xl bg-gradient-to-br flex-shrink-0 relative overflow-hidden", t.gradient)}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <Play className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 fill-current" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate group-hover:text-indigo-400 transition-colors">{t.name}</h4>
                    <p className="text-xs text-zinc-400 truncate mt-0.5">{t.category.split('•')[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Main Area */}
        <div className="flex-1 flex flex-col gap-8 min-w-0">
          
          {/* Top Navigation */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-lg">
              {['All Templates', 'Minimal', 'Creative', 'Developer'].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-medium transition-all",
                    activeTab === tab ? "bg-white/10 text-white shadow-sm" : "text-zinc-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Hero Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={focusedTemplate.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative rounded-[2.5rem] overflow-hidden min-h-[440px] flex flex-col justify-end p-8 md:p-12 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] group bg-gradient-to-r from-[#2a040d] via-[#150308] to-[#080104]"
            >
              {/* Subtle glowing ambient blur */}
              <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-96 h-96 opacity-60 pointer-events-none rounded-full bg-gradient-to-l from-red-600/40 via-purple-600/30 to-transparent blur-3xl" />
              
              {/* Hero illustration cutout background (Same image as mobile view) */}
              <img 
                src="https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=800&q=80" 
                alt="Hero Illustration" 
                className="absolute right-[-30px] top-1/2 -translate-y-1/2 w-[380px] lg:w-[480px] h-auto opacity-80 pointer-events-none object-cover mix-blend-screen transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#120206] via-[#120206]/90 to-transparent pointer-events-none" />

              <div className="relative z-10 w-full max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-white border border-white/20 flex items-center gap-1.5">
                    <Flame className="w-3 h-3 text-orange-400" fill="currentColor" /> Trending
                  </span>
                  {focusedTemplate.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md text-xs font-medium text-zinc-300 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-3 tracking-tight text-white drop-shadow-lg">
                  {focusedTemplate.name}
                </h1>
                
                <p className="text-zinc-300 text-lg md:text-xl mb-6 leading-relaxed drop-shadow max-w-2xl">
                  {focusedTemplate.desc}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button 
                    onClick={() => setPreviewId(focusedTemplate.id)} 
                    className="bg-white text-zinc-950 text-sm font-extrabold px-6 py-3.5 rounded-full flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:bg-zinc-100 hover:shadow-[0_0_35px_rgba(255,255,255,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer border border-white"
                  >
                    <Play className="w-4 h-4 fill-current shrink-0" /> Live Preview
                  </button>
                  <button 
                    onClick={() => handleUseTemplate(focusedTemplate.id)} 
                    className="bg-white/10 backdrop-blur-xl border border-white/25 text-white text-sm font-bold px-6 py-3.5 rounded-full flex items-center justify-center gap-2.5 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Download className="w-4 h-4 shrink-0 text-zinc-300" /> Use Template
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Grid */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">
                {searchQuery || activeTab !== 'All Templates' ? `Results for "${searchQuery || activeTab}"` : 'You might like'}
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredTemplates.filter(t => t.id !== focusedId).map(t => (
                <motion.div 
                  key={`grid-${t.id}`} 
                  onClick={() => setFocusedId(t.id)} 
                  className="group cursor-pointer"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={cn("w-full aspect-[16/10] rounded-[1.25rem] mb-3 relative overflow-hidden bg-zinc-950 border border-white/5 shadow-2xl group-hover:border-white/20 transition-all", t.gradient ? `bg-gradient-to-br ${t.gradient}` : '')}>
                     <div className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 origin-top-left w-[400%] h-[400%] text-left" style={{ transform: 'scale(0.25)' }}>
                        <PortfolioDataProvider isPlaceholder>
                           <t.component />
                        </PortfolioDataProvider>
                     </div>
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
                     <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-2xl transform scale-90 group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                           <Play className="w-5 h-5 text-white fill-current ml-1" />
                        </div>
                     </div>
                  </div>
                  <h4 className="font-semibold text-base text-white mb-0.5 group-hover:text-indigo-400 transition-colors">{t.name}</h4>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Preview Modal */}
      <AnimatePresence>
        {previewId && PreviewComponent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full h-full max-w-7xl bg-zinc-950 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col relative"
            >
              <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-white/10 bg-zinc-900/50 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <h2 className="text-base sm:text-xl font-medium text-white truncate max-w-[180px] sm:max-w-none">
                    Previewing: <span className="text-indigo-400 font-bold">{TEMPLATES.find(t => t.id === previewId)?.name}</span>
                  </h2>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={async () => {
                      const newStatus = !isPublished;
                      await publishPortfolio(newStatus);
                    }}
                    className={cn(
                      "px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-lg",
                      isPublished 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20" 
                        : "bg-white text-black hover:bg-zinc-200"
                    )}
                  >
                    {isPublished ? <CheckCircle2 className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                    <span className="hidden sm:inline">{isPublished ? 'Published' : 'Publish to Live'}</span>
                  </button>
                  
                  {isPublished && (
                    <a
                      href={`/${githubUser?.login || 'profile'}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4" /> <span className="hidden sm:inline">View Live</span>
                    </a>
                  )}

                  <button
                    onClick={() => handleUseTemplate(previewId)}
                    className="bg-white/10 hover:bg-white/20 text-white px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 border border-white/10"
                  >
                    <Check className="w-4 h-4" /> <span className="hidden sm:inline">Set as Default</span>
                  </button>
                  
                  <button
                    onClick={() => setPreviewId(null)}
                    className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors border border-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto relative bg-zinc-950 text-left">
                <PortfolioDataProvider isPlaceholder>
                  <React.Suspense fallback={<div className="w-full h-full flex items-center justify-center"><Loader2 className="w-8 h-8 text-indigo-500 animate-spin" /></div>}>
                    <PreviewComponent />
                  </React.Suspense>
                </PortfolioDataProvider>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

