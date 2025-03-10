import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface RecordState {
  recordList: Record[];
  setRecordData: (data: Record) => void;
  removeRecordById: (id: number) => void;
};

interface Record {
  id: number;
  type: String,
  oil: number,
  electric: number,
  cost: number,
  kilometerOfDisplay: number,
  date: number; // ts
}

const useRecordStore = create<RecordState>()(
  persist(
    (set) => ({
      recordList: [],
      setRecordData: (data: Record) => set((state) => ({ recordList: [...state.recordList, {
        ...data,
        id: Date.now()
      }] })),
      removeRecordById: (id: number) => set((state) => {
        const list = state.recordList.filter(r => r.id !== Number(id))
        set({recordList: list})
      })
    }),
    {
      name: 'record-store',
    }
  )
);

export default useRecordStore; 