import { create } from 'zustand';

interface NotchTabState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useNotchTabStore = create<NotchTabState>((set) => ({
  activeTab: '',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
