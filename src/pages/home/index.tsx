import { FC, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import ConsumptionItem from '@/components/consumption-item'
import EnergyRecordItem from '@/components/energy-record-item'
import FloatButton from '@/components/float-button'
import useRecordStore from '@/store/recordStore'
import demoDeta from './data.json'
import './style.scss'

const Home: FC = () => {
  const { recordList } = useRecordStore()
  const navigate = useNavigate()
  const hasData = recordList?.length > 0
  const data = useMemo(() => {
    const source = hasData ? recordList : demoDeta
    return source.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((data) => ({ type: 'energy', data }))
  }, [
    recordList,
  ])
  return (
    <div className="home-container">
      <section className="section">
        <h2>补能统计{!hasData && '(DEMO MODE)'}</h2>
        <div className="energy-list">
          {data.map(({ type, data }, index) => {
            if (type === "consumption") {
              return (
                <ConsumptionItem
                  key={index}
                  {...data}
                  onClick={() => {
                    console.log("consumption clicked:", data);
                  }}
                />
              );
            }
            return (
              <EnergyRecordItem
                key={index}
                {...data}
                onClick={() => {
                  console.log("energy clicked:", data);
                }}
              />
            );
          })}
        </div>
      </section>
      <FloatButton
        onClick={() => {
          void navigate("/record");
        }}
      />
    </div>
  );
}

export default Home 