import { FC, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { SetOutline } from 'antd-mobile-icons'
import ConsumptionItem from '@/components/consumption-item'
import EnergyRecordItem from '@/components/energy-record-item'
import FloatButton from '@/components/float-button'
import useRecordStore from '@/store/recordStore'
import StatisticsCard from '@/components/statistics-card'
import './style.scss'

const Home: FC = () => {
  const { recordList } = useRecordStore()
  const navigate = useNavigate()
  const data = useMemo(() => {
    return recordList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((data) => ({ type: 'energy', data }))
  }, [
    recordList,
  ])
  return (
    <div className="home-container">
      <StatisticsCard />
      <section className="section">
        <h2>补能统计</h2>
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
      <FloatButton icon={<SetOutline/>} onClick={() => navigate('/preference')} position='bottom-left' />
    </div>
  )
}

export default Home 