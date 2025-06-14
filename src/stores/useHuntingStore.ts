import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface HuntingLog {
  id: string
  date: string
  duration: number
  map: string
  mesos: number
  shards: number
  gemstones: number
  note?: string
}

interface HuntingStore {
  logs: HuntingLog[]
  addLog: (log: HuntingLog) => void
  updateLog: (log: HuntingLog) => void
  removeLog: (id: string) => void
  clearLogs: () => void
}

export const useHuntingStore = create<HuntingStore>()(
  persist(
    (set, get) => ({
      logs: [],
      addLog: (log) => set({ logs: [...get().logs, log] }),
      updateLog: (log) =>
        set({
          logs: get().logs.map((l) => (l.id === log.id ? log : l)),
        }),
      removeLog: (id) => set({ logs: get().logs.filter((l) => l.id !== id) }),
      clearLogs: () => set({ logs: [] }),
    }),
    {
      name: 'hunting-logs', // localStorage key 이름
    },
  ),
)
