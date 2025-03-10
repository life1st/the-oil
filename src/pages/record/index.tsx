import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { LeftOutline } from 'antd-mobile-icons'
import { Selector, Input, Button } from 'antd-mobile'
import CalendarPicker from './calendar-picker'
import useRecordStore from '@/store/recordStore'
import type { EnergyType } from '@/utils/types'
import './style.scss'

const Record: FC = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<{
    type: EnergyType;
    oil: number;
    electric: number;
    cost: number;
    kilometerOfDisplay: number;
    date: string;
  }>({
    type: 'charging',
    oil: 0,
    electric: 0,
    cost: 0,
    kilometerOfDisplay: 0,
    date: dayjs(Date.now()).format('YYYY.MM.DD'),
  })
  const { setRecordData } = useRecordStore();

  const updateItem = (item: any, value: any) => {
    setData({
      ...data,
      [item.key]: value,
    });
  }

  const handleSubmit = () => {
    setRecordData(data)
    navigate(-1);
    console.log(setRecordData, data, 'submit')
  }

  const formData = [
    {
      key: 'type',
      label: '类型：',
      value: data.type,
      dataType: 'select',
      data: {
        options: [
            { label: '加油', value: 'refueling' },
            { label: '充电', value: 'charging' },
        ],
      }
    },
    data.type === 'refueling' && {
      key: 'oil',
      label: '油量：',
      value: data.oil,
      dataType: 'number',
      unit: '升'
    },
    data.type === 'charging' && {
      key: 'electric',
      label: '电量：',
      value: data.electric,
      dataType: 'number',
      unit: '度'
    },
    {
      key: 'cost',
      label: '费用：',
      value: data.cost,
      dataType: 'number',
      unit: '元（CNY）'
    },
    {
      key: 'kilometerOfDisplay',
      label: '表显里程：',
      value: data.kilometerOfDisplay,
      dataType: 'number',
      unit: 'Km'
    },
    {
      key: 'date',
      label: '时间',
      value: data.date,
      dataType: 'date',
    }
  ].filter(Boolean);

  return (
    <div className="record-container">
      <div className="record-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <LeftOutline />
        </button>
        <h1>新增记录</h1>
      </div>
      <div className="record-content">
        <div className="record-form">
            {formData.map((item) => (
                <div className="record-form-item" key={item.key}>
                    <div className="record-form-item-label">{item.label}</div>
                    <div className="record-form-item-input">
                        { item.dataType === 'select' ? (
                            <Selector
                                options={item.data.options}
                                defaultValue={[item.value]}
                                onChange={(array) => updateItem(item, array[0])}
                            />
                        ) : null }
                        { item.dataType === 'number' ? (
                            <Input
                                onClick={(e) => {
                                    e.target.select?.();
                                }}
                                type="number"
                                value={item.value}
                                onChange={(value) => updateItem(item, value)}
                            />
                        ) : null }
                        { item.dataType === 'date' ? (
                            <CalendarPicker onChange={(value) => updateItem(item, value)} />
                        ) : null }
                        <p className="record-form-item-unit">{item.unit}</p>
                    </div>
                </div>
            ))}
        </div>
        <Button type='submit' color='primary' className='record-form-submit' onClick={handleSubmit}>提交</Button>
      </div>
    </div>
  )
}

export default Record; 