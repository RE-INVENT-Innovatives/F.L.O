'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useStore, GithubUser, Repository, AppState } from '@/store/useStore';
import { Testimonial } from '@/services/testimonials.service';
import { Asset } from '@/services/assets.service';
import { Education, Experience } from '@/services/profile.service';
import { 
  MOCK_GITHUB_USER, MOCK_CUSTOM_DATA, MOCK_REPOS, MOCK_SKILLS, 
  MOCK_EXPERIENCES, MOCK_EDUCATION, MOCK_TESTIMONIALS, MOCK_ASSETS 
} from '@/lib/mock';

interface PortfolioData {
  githubUser: GithubUser | null;
  customData: AppState['customData'];
  repos: Repository[];
  selectedRepos: Repository[];
  skills: string[];
  education: Education[];
  experiences: Experience[];
  testimonials: Testimonial[];
  approvedTestimonials: Testimonial[];
  assets: Asset[];
  updateCustomData: (data: Partial<AppState['customData']>) => void;
  isEditable: boolean;
}

const PortfolioDataContext = createContext<PortfolioData | null>(null);

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);
  const store = useStore();

  if (context) {
    return context;
  }

  // If no context provider, return store data (default behavior)
  return {
    githubUser: store.githubUser,
    customData: store.customData,
    repos: store.repos,
    selectedRepos: store.repos.filter(r => store.selectedRepoIds.includes(r.id)),
    skills: store.skills,
    education: store.education,
    experiences: store.experiences,
    testimonials: store.testimonials,
    approvedTestimonials: store.testimonials.filter(t => t.isApproved),
    assets: store.assets,
    updateCustomData: store.updateCustomData,
    isEditable: false, // Default fallback
  };
}

export function PortfolioDataProvider({ children, isPlaceholder = false, isEditable = false }: { children: ReactNode, isPlaceholder?: boolean, isEditable?: boolean }) {
  const store = useStore();

  const data: PortfolioData = isPlaceholder ? {
    githubUser: MOCK_GITHUB_USER,
    customData: MOCK_CUSTOM_DATA,
    repos: MOCK_REPOS,
    selectedRepos: MOCK_REPOS,
    skills: MOCK_SKILLS,
    education: MOCK_EDUCATION,
    experiences: MOCK_EXPERIENCES,
    testimonials: MOCK_TESTIMONIALS,
    approvedTestimonials: MOCK_TESTIMONIALS,
    assets: MOCK_ASSETS,
    updateCustomData: () => {}, // No-op for placeholder
    isEditable: false,
  } : {
    githubUser: store.githubUser,
    customData: store.customData,
    repos: store.repos,
    selectedRepos: store.repos.filter(r => store.selectedRepoIds.includes(r.id)),
    skills: store.skills,
    education: store.education,
    experiences: store.experiences,
    testimonials: store.testimonials,
    approvedTestimonials: store.testimonials.filter(t => t.isApproved),
    assets: store.assets,
    updateCustomData: store.updateCustomData,
    isEditable,
  };

  return (
    <PortfolioDataContext.Provider value={data}>
      {children}
    </PortfolioDataContext.Provider>
  );
}
