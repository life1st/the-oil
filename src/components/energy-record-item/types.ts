import { EnergyType } from '@/utils/consts'

export interface EnergyRecordItemProps {
  type?: EnergyType
  date?: string
  amount?: number
  cost?: number
  onClick?: () => void
} 