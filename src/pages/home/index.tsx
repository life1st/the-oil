import { FC, useMemo } from 'react'
import ConsumptionItem from '@/components/consumption-item'
import EnergyRecordItem from '@/components/energy-record-item'
import FloatButton from '@/components/float-button'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const mockConsumptionData = [
  {
    date: '2024-02-28',
    oilConsumption: 7.8,
    electricConsumption: 15.2,
    cost: 358.5,
    mileage: 426
  },
  {
    date: '2024-02-27',
    oilConsumption: 6.9,
    electricConsumption: 14.8,
    cost: 312.0,
    mileage: 385
  }
]

const mockEnergyData = [
  {
    type: 'charging' as const,
    date: '2024-02-28',
    amount: 45.6,
    cost: 156.8
  },
  {
    type: 'refueling' as const,
    date: '2024-02-25',
    amount: 35.8,
    cost: 285.5
  }
]

const Home: FC = () => {
  const navigate = useNavigate()
  const data = useMemo(() => {
    return mockConsumptionData.map((data) => ({ type: 'consumption', data })).concat(mockEnergyData.map((data) => ({ type: 'energy', data }))).sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
  }, [
    mockConsumptionData,
    mockEnergyData
  ])
  return (
    <div className="home-container">
      <section className="section">
        <h2>补能记录</h2>
        <div className="energy-list">
          {data.map(({ type, data }, index) => {
            if (type === 'consumption') {
              return <ConsumptionItem key={index} {...data} onClick={() => console.log('consumption clicked:', data)} />
            }
            return <EnergyRecordItem key={index} {...data} onClick={() => console.log('energy clicked:', data)} />
          })}
        </div>
      </section>
      <FloatButton onClick={() => navigate('/record')} />
    </div>
  )
}

export default Home 