export type EnergyType = 'charging' | 'refueling'

export interface EnergyRecordItemProps {
  type?: EnergyType
  date?: string
  amount?: number
  cost?: number
  onClick?: () => void
} 