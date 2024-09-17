import React from 'react'
import './CustomDatePicker.css'
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import { startOfDay, endOfDay, addDays, subDays } from 'date-fns';


export default function CustomDatePicker(props) {
  const Ranges = [
    {
      label: 'today',
      value: [endOfDay(new Date()), endOfDay(new Date())]
    },
    {
      label: 'yesterday',
      value: [endOfDay(addDays(new Date(), -1)), endOfDay(addDays(new Date(), -1))]
    },
    {
      label: 'last7Days',
      value: [endOfDay(subDays(new Date(), 6)), endOfDay(new Date())]
    }
  ];

  return (
    <div className="field">
    <DateRangePicker
    className='w-100 font-2'
      format="dd-MM-yyyy"
      showMeridian
      // defaultCalendarValue={[new Date(), new Date()]}
      value={props.dates}
      onChange={props.setDates}
      placement="auto"
      ranges={Ranges}
    />
  </div>

   

  )
}
