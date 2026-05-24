import { create } from 'zustand';

export interface MapLevel {
  level: 'country' | 'province' | 'city' | 'county';
  currentCode: string;
  name: string;
  parentCode?: string;
}

export interface RegionData {
  code: string;
  name: string;
  children?: RegionData[];
  value: number;
  color: string;
}

export interface StatsData {
  total: number;
  regions: number;
  avgValue: number;
  maxValue: { name: string; value: number };
}

interface MapState {
  currentLevel: MapLevel;
  history: MapLevel[];
  stats: StatsData;
  regions: RegionData[];
  setCurrentLevel: (level: MapLevel) => void;
  goBack: () => void;
  reset: () => void;
  setStats: (stats: StatsData) => void;
  setRegions: (regions: RegionData[]) => void;
}

const initialLevel: MapLevel = {
  level: 'country',
  currentCode: '100000',
  name: '中国',
};

const initialStats: StatsData = {
  total: 1395380000,
  regions: 34,
  avgValue: 45678,
  maxValue: { name: '广东省', value: 123456 },
};

export const useMapStore = create<MapState>((set) => ({
  currentLevel: initialLevel,
  history: [initialLevel],
  stats: initialStats,
  regions: [],
  setCurrentLevel: (level) =>
    set((state) => ({
      currentLevel: level,
      history: [...state.history, level],
    })),
  goBack: () =>
    set((state) => {
      if (state.history.length > 1) {
        const newHistory = state.history.slice(0, -1);
        return {
          currentLevel: newHistory[newHistory.length - 1],
          history: newHistory,
        };
      }
      return state;
    }),
  reset: () =>
    set(() => ({
      currentLevel: initialLevel,
      history: [initialLevel],
    })),
  setStats: (stats) => set(() => ({ stats })),
  setRegions: (regions) => set(() => ({ regions })),
}));
