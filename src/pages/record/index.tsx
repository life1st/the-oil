import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LeftOutline } from 'antd-mobile-icons'
import { Selector, Input, Button } from 'antd-mobile'
import './style.scss'

const Record: FC = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    type: '2',
    oil: 0,
    electric: 0,
    cost: 0,
    kilometerOfDisplay: 0,
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  const updateItem = (item: any, value: any) => {
    console.log(item, value)
    // const 
    setData({ ...data, [item.key]: value })
  }

  const formData = [
    {
      key: 'type',
      label: '类型：',
      value: data.type,
      onChange: (value: string) => setData({ ...data, type: value }),
      dataType: 'select',
      data: {
        options: [
            { label: '加油', value: '1' },
            { label: '充电', value: '2' },
        ],
      }
    },
    data.type === '1' && {
      key: 'oil',
      label: '油量：',
      value: data.oil,
      onChange: (value: number) => setData({ ...data, oil: value }),
      dataType: 'number',
    },
    data.type === '2' && {
      key: 'electric',
      label: '电量：',
      value: data.electric,
      onChange: (value: number) => setData({ ...data, electric: value }),
      dataType: 'number',
    },
    {
      key: 'cost',
      label: '费用：',
      value: data.cost,
      onChange: (value: number) => setData({ ...data, cost: value }),
      dataType: 'number',
    },
    {
      key: 'kilometerOfDisplay',
      label: '表显里程：',
      value: data.kilometerOfDisplay,
      onChange: (value: number) => setData({ ...data, kilometerOfDisplay: value }),
      dataType: 'number',
    }
  ].filter(Boolean)

  return (
    <div className="record-container">
      <div className="record-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <LeftOutline />
        </button>
        <h1>新增记录</h1>
      </div>
      <div className="record-content">
        {/* 表单内容待实现 */}
        <div className="record-form">
            {formData.map((item) => (
                <div className="record-form-item">
                    <div className="record-form-item-label">{item.label}</div>
                    <div className="record-form-item-input">
                        {item.dataType === 'select' ? (
                            <Selector
                                options={item.data.options}
                                defaultValue={[item.value]}
                                onChange={(array) => updateItem(item, array[0])}
                            />
                        ) : null}
                        {
                            item.dataType === 'number' ? (
                                <Input
                                    onClick={(e) => {
                                        e.target.select?.()
                                    }}
                                    type="number"
                                    value={item.value}
                                    onChange={(value) => updateItem(item, value)}
                                />
                            ) : null
                        }
                    </div>
                </div>
            ))}
        </div>
        <Button type='submit' color='primary' className='record-form-submit'>提交</Button>
      </div>
    </div>
  )
}

export default Record 