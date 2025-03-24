import { FC } from 'react'
import type { ConsumptionItemProps } from './types'
import './style.scss'

const ConsumptionItem: FC<ConsumptionItemProps> = ({
  // date = '2024-02-28',
  oilConsumption = 7.8,
  electricConsumption = 15.2,
  cost = 358.5,
  mileage = 426,
  onClick,
}) => {
  return (
    <div className="consumption-item" onClick={onClick}>
      {/* <div className="consumption-date">{date}</div> */}
      <div className="consumption-details">
        <div className="detail-row">
          <p className="label">油耗：</p>
          <span className="value">
            {oilConsumption}
            <span className="unit">L/100km</span>
          </span>
        </div>
        <div className="detail-row">
          <p className="label">电耗：</p>
          <span className="value">
            {electricConsumption}
            <span className="unit">kWh/100km</span>
          </span>
        </div>
        <div className="detail-row">
          <p className="label">费用：</p>
          <span className="value">¥{cost}</span>
        </div>
        <div className="detail-row">
          <p className="label">里程：</p>
          <span className="value">{mileage}km</span>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionItem 