import { useEffect, useState } from 'react'
import { DatePicker } from 'antd-mobile'
import dayjs from 'dayjs'
import './calendar-picker.scss'

interface Props {
  defaultValue?: Date;
  onChange: (value: Date) => void;
}
const Calendar = ({ onChange, defaultValue }: Props) => {
  const [date, setDate] = useState(new Date(Date.now()));
  const [pickerShow, setPickerShow] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      setDate(new Date(defaultValue));
    }
  }, [defaultValue]);

  const map = {
    year: "年",
    month: "月",
    day: "日",
    hour: "时",
  };

  return (
    <div className="calendar-picker">
      <p
        className="calendar-display"
        onClick={() => {
          setPickerShow(true);
        }}
      >
        {dayjs(date).format("YYYY.MM.DD - HH:00")}
      </p>
      <DatePicker
        visible={pickerShow}
        value={date}
        onClose={() => {
          setPickerShow(false);
        }}
        onConfirm={(value) => {
          setDate(value);
          setPickerShow(false);
          onChange(value);
        }}
        precision="hour"
        renderLabel={(label, date) => `${date}${map[label]}`}
      />
    </div>
  );
}

export default Calendar