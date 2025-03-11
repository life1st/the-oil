import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface RecordState {
  recordList: Record[];
  setRecordData: (data: Record) => void;
  removeRecordById: (id: number) => void;
  updateRecordById: (id: number, data: Record) => void;
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
        id: data.id || Date.now()
      }] })),
      removeRecordById: (id: number) => set((state) => ({
        recordList: state.recordList.filter(r => r.id !== Number(id))
      })),
      updateRecordById: (id: number, data) => set((state) => ({
        recordList: state.recordList.map(r => {
          if (r.id === id) {
            return data
          }
          return r
        })
      }))
    }),
    {
      name: 'record-store',
    }
  )
);

export default useRecordStore; 