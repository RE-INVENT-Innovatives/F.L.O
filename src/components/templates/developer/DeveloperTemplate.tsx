'use client';

import React from 'react';
import { 
  Github, Mail, MapPin, ExternalLink, Star, Briefcase, GraduationCap, Quote, FolderOpen, 
  Linkedin, Twitter, Globe, Terminal, ChevronRight, Search, Command, FileCode, Cpu, User 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { StackIcon } from '@/components/ui/StackIcon';
import { motion } from 'motion/react';

import { usePortfolioData } from '@/context/PortfolioDataContext';

export function DeveloperTemplate() {
  const { githubUser, customData, repos, selectedRepos, skills, experiences, education, approvedTestimonials, assets } = usePortfolioData();

  return (
    <div className="min-h-full bg-[#060a12] text-[#94a3b8] font-mono p-4 sm:p-6 md:p-10 selection:bg-sky-500/30 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Identity Header Bento Card */}
        <header className="relative p-6 sm:p-10 border border-[#172436] rounded-[2rem] bg-[#0a111a] overflow-hidden group shadow-[0_15px_40px_rgba(0,0,0,0.5)] text-center flex flex-col items-center justify-center">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-white pointer-events-none group-hover:opacity-10 transition-opacity">
            <Terminal className="w-64 h-64" />
          </div>
          
          {/* Avatar Image Frame */}
          {githubUser?.avatar_url && (
            <div className="relative group/avatar mb-3">
              <div className="absolute inset-0 bg-sky-500 rounded-[2.5rem] blur-2xl opacity-15 group-hover/avatar:opacity-35 transition-opacity" />
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-[2rem] sm:rounded-[2.4rem] border-2 border-[#1c2e44] p-1.5 bg-[#0e1726] shadow-2xl relative z-10">
                <img 
                  src={githubUser.avatar_url} 
                  alt="Avatar" 
                  className="w-full h-full rounded-[1.6rem] sm:rounded-[2rem] object-cover" 
                />
              </div>
            </div>
          )}

          {/* Badges Row */}
          <div className="flex items-center justify-center gap-2.5 my-3 flex-wrap">
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> SYSTEM ACTIVE
            </span>
            <span className="px-3.5 py-1 rounded-full bg-[#131d2c] text-zinc-300 border border-white/10 text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Command className="w-3 h-3 text-zinc-400" /> ROOT ACCESS
            </span>
          </div>

          {/* Name & Bio */}
          <h1 className="text-3xl sm:text-5xl font-extrabold font-mono text-white tracking-tight my-2">
            ~/{customData.name.toLowerCase().replace(/\s+/g, '-')}
          </h1>
          <p className="text-[#94a3b8] text-xs sm:text-sm font-mono leading-relaxed max-w-lg mx-auto my-2 px-2">
            // {customData.bio}
          </p>

          {/* Location & Social Row */}
          <div className="flex items-center justify-center gap-3 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex-wrap pt-4 mt-2 border-t border-[#172436]/60 w-full max-w-lg">
            {customData.location && (
              <span className="flex items-center gap-1.5 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" /> {customData.location}
              </span>
            )}
            {customData.location && customData.github && <span className="text-zinc-600">|</span>}
            {customData.github && (
              <a href={customData.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors">
                <Github className="w-3.5 h-3.5 shrink-0" /> GITHUB
              </a>
            )}
            {customData.twitter && (
              <>
                <span className="text-zinc-600">|</span>
                <a href={customData.twitter} target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-white transition-colors">X</a>
              </>
            )}
            {customData.linkedin && (
              <>
                <span className="text-zinc-600">|</span>
                <a href={customData.linkedin} target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-white transition-colors">LINKEDIN</a>
              </>
            )}
          </div>
        </header>

        {/* Content Fork Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Repos & Trajectory */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Repositories Section */}
            <section>
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-base sm:text-lg font-mono font-extrabold text-white flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                    <FileCode className="w-4 h-4" />
                  </div>
                  src/repositories
                </h2>
                <span className="text-xs font-mono font-bold text-zinc-400 tracking-wider uppercase">
                  COUNT: {selectedRepos.length}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedRepos.map((repo, i) => (
                  <motion.div 
                    key={repo.id} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-5 border border-[#172436] rounded-2xl bg-[#0a111a] hover:border-sky-500/40 transition-all duration-300 group/repo relative overflow-hidden flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <a 
                          href={repo.html_url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-sm font-bold font-mono text-[#38bdf8] hover:text-sky-300 tracking-tight transition-colors truncate"
                        >
                          {repo.name}
                        </a>
                        <ChevronRight className="w-4 h-4 text-zinc-500 group-hover/repo:text-[#38bdf8] group-hover/repo:translate-x-0.5 transition-all shrink-0" />
                      </div>
                      <p className="text-xs font-mono text-[#8b949e] leading-relaxed line-clamp-2 mb-4">
                        // {repo.description || 'Automated artifact description generated by system...'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#172436]/80 pt-3 mt-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#131d2c] border border-[#203248] text-zinc-300 text-[10px] font-mono font-bold uppercase">
                        <StackIcon name={repo.language || 'TypeScript'} className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{repo.language || 'TYPESCRIPT'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400 shrink-0" />
                        <span>{repo.stargazers_count || 0}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Experience / History Loop */}
            {(experiences.length > 0 || education.length > 0) && (
              <section className="p-6 sm:p-8 border border-[#172436] rounded-[2rem] bg-[#0a111a] shadow-lg">
                <h2 className="text-base sm:text-lg font-mono font-extrabold text-white mb-8 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  usr/logs/trajectory
                </h2>

                <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#172436]">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-9 group/item">
                      <div className="absolute left-1.5 top-1.5 w-3 h-3 bg-[#0a111a] border-2 border-[#172436] rounded-full group-hover/item:border-sky-400 group-hover/item:bg-sky-400 transition-all" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                        <h3 className="text-base font-bold text-white tracking-tight">{exp.position}</h3>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#131d2c] border border-white/10 px-3 py-0.5 rounded-full text-zinc-400 w-fit">
                          {exp.startDate} — {exp.endDate || 'CURRENT'}
                        </span>
                      </div>
                      <p className="text-xs font-mono font-bold text-[#38bdf8] mb-2">{exp.company}</p>
                      <p className="text-xs font-mono text-[#8b949e] leading-relaxed italic">
                        " {exp.description} "
                      </p>
                    </div>
                  ))}

                  {education.map(edu => (
                    <div key={edu.id} className="relative pl-9 opacity-80 hover:opacity-100 transition-opacity">
                      <div className="absolute left-1.5 top-1.5 w-3 h-3 border-2 border-[#172436] rounded-full bg-[#0a111a]" />
                      <h3 className="text-sm font-bold text-white mb-0.5">{edu.school}</h3>
                      <p className="text-xs font-mono text-zinc-400">{edu.degree} // {edu.fieldOfStudy}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Testimonials Stream */}
            {approvedTestimonials.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-base sm:text-lg font-mono font-extrabold text-white flex items-center gap-2.5 border-b border-[#172436] pb-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                    <Quote className="w-4 h-4" />
                  </div>
                  shared/shoutouts.io
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {approvedTestimonials.map(t => (
                    <div key={t.id} className="p-5 border border-[#172436] rounded-2xl bg-[#0a111a] relative group/quote flex flex-col justify-between shadow-lg">
                      <Quote className="absolute top-4 right-4 w-8 h-8 text-[#172436] opacity-30" />
                      <p className="text-xs font-mono text-[#8b949e] italic mb-6 leading-relaxed relative z-10">
                        "{t.content}"
                      </p>
                      <div className="flex items-center gap-3 border-t border-[#172436]/80 pt-3">
                        <img src={t.avatarUrl || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${t.name}`} alt={t.name} className="w-9 h-9 rounded-xl border border-white/10 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold text-white text-xs truncate">{t.name}</p>
                          <p className="text-[10px] text-zinc-400 font-mono truncate">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Skills & Static Assets */}
          <div className="lg:col-span-4 space-y-8">
            <aside className="space-y-8 sticky top-6">
              
              {/* Stack Matrix */}
              <div className="p-6 border border-[#172436] rounded-[2rem] bg-[#0a111a] shadow-lg">
                <h2 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                  <span>bin/capabilities</span>
                  <Cpu className="w-4 h-4 text-sky-400" />
                </h2>
                <div className="grid grid-cols-2 gap-2.5">
                  {skills.map(skill => (
                    <div key={skill} className="flex items-center gap-2 p-3 border border-[#172436] rounded-xl bg-[#0e1726] hover:border-sky-500/30 transition-all cursor-default group/skill">
                      <StackIcon name={skill} className="w-5 h-5 shrink-0" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-tight text-zinc-200 truncate">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Asset Vault */}
              {assets.length > 0 && (
                <div className="p-6 border border-[#172436] rounded-[2rem] bg-[#0a111a] shadow-lg">
                  <h2 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-4">mnt/static_assets</h2>
                  <div className="space-y-2.5">
                    {assets.map(asset => (
                      <a 
                        key={asset.id} 
                        href={asset.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center gap-3 p-3 border border-[#172436] rounded-xl bg-[#0e1726] hover:border-sky-500/30 transition-all group/asset"
                      >
                        <div className="w-9 h-9 bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-400 group-hover/asset:text-sky-400 shrink-0">
                          <FolderOpen className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-mono font-bold text-zinc-200 truncate group-hover/asset:text-white transition-colors">{asset.name.toUpperCase()}</p>
                          <span className="text-[10px] text-zinc-500 font-mono uppercase">{asset.type}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* System Footer */}
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-600 text-center py-4 border-t border-[#172436]">
                Generated by F.L.O v1.0.4
              </div>
            </aside>
          </div>
        </div>

      </div>
    </div>
  );
}

