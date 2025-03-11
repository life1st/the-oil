import { create } from 'zustand';
import { persist } from 'zustand/middleware'

export interface GistConfig {
  token: string
  filename: string
  gistId: string
}

interface SyncStore {
    syncTime: number | null
    gistConfig: GistConfig | null
    setGistConfig: (config: GistConfig) => void
    clearAllConfig: () => void
}

const useSettingStore = create<SyncStore>()(
  persist(
    (set) => ({
        syncTime: null,
        updateSyncTime: () => set({ syncTime: Date.now() }),
        gistConfig: null,
        setGistConfig: (config) => set({ gistConfig: config }),
        clearAllConfig: () => set({ gistConfig: null })
    }),
    {
      name: 'setting-store',
    }
  )
);

export default useSettingStore; 