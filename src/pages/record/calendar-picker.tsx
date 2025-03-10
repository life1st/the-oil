import { useEffect, useState } from 'react'
import { DatePicker } from 'antd-mobile'
import dayjs from 'dayjs'

const Calendar = ({ onChange }: { onChange: (value: Date) => void }) => {
    const [date, setDate] = useState(new Date(Date.now()))
    const [pickerShow, setPickerShow] = useState(false)

    useEffect(() => {
        onChange(date)
    }, [date])

    return (
        <div>
            <p onClick={() => setPickerShow(true)}>{dayjs(date).format('YYYY.MM.DD')}</p>
            <DatePicker
                visible={pickerShow}
                defaultValue={date}
                onClose={() => { setPickerShow(false) }}
                onConfirm={(value) => {
                    setDate(value)
                    setPickerShow(false)
                }}
            />
        </div>
    )
}

export default Calendar