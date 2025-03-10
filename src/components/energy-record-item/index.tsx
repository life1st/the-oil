import { FC } from 'react'
import type { EnergyRecordItemProps, EnergyType } from './types'
import './style.scss'

const EnergyTypeLabel: Record<EnergyType, string> = {
  'charging': '充电',
  'refueling': '加油'
}

const EnergyUnit: Record<EnergyType, string> = {
  'charging': 'kWh',
  'refueling': 'L'
}

const EnergyRecordItem: FC<EnergyRecordItemProps> = ({
  type = 'charging',
  date = '2024-02-28',
  amount = 0,
  cost = 0,
  onClick
}) => {
  return (
    <div className={`energy-record-item ${type}`} onClick={onClick}>
      <div className="record-header">
        <span className="energy-type">{EnergyTypeLabel[type]}</span>
        <span className="record-date">{date}</span>
      </div>
      <div className="record-details">
        <div className="detail-row">
          <span className="label">数量：</span>
          <span className="value">{amount}{EnergyUnit[type]}</span>
        </div>
        <div className="detail-row">
          <span className="label">费用：</span>
          <span className="value">¥{cost.toFixed(2)}</span>
        </div>
        <div className="detail-row">
          <span className="label">单价：</span>
          <span className="value">¥{(cost / amount).toFixed(2)}/{EnergyUnit[type]}</span>
        </div>
      </div>
    </div>
  )
}

export default EnergyRecordItem 