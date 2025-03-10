import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface RecordState {
  recordList: Record[];
  setRecordData: (key: string, value: any) => void;
};

interface Record {
  type: String,
  oil: number,
  electric: number,
  cost: number,
  kilometerOfDisplay: number,
  date: number; // ts
}

const useRecordStore = create<RecordState>(
  persist(
    (set) => ({
      recordList: [],
      setRecordData: (data: Record) => set((state) => ({ recordList: [...state.recordList, {
        ...data,
        id: Date.now()
      }] })),
      removeRecordById: (id: number) => set((state) => ({recordList: state.recordList.filter(r => r.id !== id)}))
    }),
    {
      name: 'record-store',
    }
  )
);

export default useRecordStore; 