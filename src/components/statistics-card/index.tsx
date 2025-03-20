import { FC, useMemo } from 'react';
import useRecordStore from '@/store/recordStore';
import './style.scss';

const StatisticsCard: FC = () => {
  const { recordList } = useRecordStore();

  const statistics = useMemo(() => {
    // 按时间排序，找到最早和最新的里程数
    const sortedRecords = recordList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const lastRecord = sortedRecords[sortedRecords.length - 1];
    
    // 计算总里程
    const totalKilometers = lastRecord?.kilometerOfDisplay ?? 0;

    // 分别统计加油和充电的总花费
    const { refuelingCost, chargingCost } = recordList.reduce((acc, record) => {
      if (record.type === 'refueling') {
        acc.refuelingCost += Number(record.cost);
      } else {
        acc.chargingCost += Number(record.cost);
      }
      return acc;
    }, { refuelingCost: 0, chargingCost: 0 });

    return {
      refuelingCost,
      chargingCost,
      totalKilometers,
    };
  }, [recordList]);

  // 计算每百公里平均花费
  const averageCostPer100km = useMemo(() => {
    if (statistics.totalKilometers <= 0) return 0;
    const totalCost = statistics.refuelingCost + statistics.chargingCost;
    return (totalCost / statistics.totalKilometers) * 100;
  }, [statistics]);

  return (
    <div className="statistics-card">
      <h3 className="statistics-title">能源消耗统计</h3>
      <div className="statistics-content">
        <div className="statistics-item">
          <span className="label">每百公里平均花费</span>
          <span className="value">{averageCostPer100km.toFixed(2)} 元</span>
        </div>
        <div className="statistics-details">
          <div className="statistics-item">
            <span className="label">总花费：<span className="oil">{statistics.refuelingCost}</span> 元 + <span className="charge">{statistics.chargingCost}</span> 元</span>
            <span className="value">{statistics.refuelingCost + statistics.chargingCost}元</span>
          </div>
          <div className="statistics-item">
            <span className="label">总里程</span>
            <span className="value">{statistics.totalKilometers} km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard; 