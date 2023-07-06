'use client'

import React from 'react'
import { DateRange, RangeKeyDict, Range } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

type Props = {
  value: Range
  disabledDates?: Date[]
  onChange: (value: RangeKeyDict) => void
}

const Calendar = ({ disabledDates, value, onChange }: Props) => {
  return (
    <DateRange
      rangeColors={['#262626']}
      ranges={[value]}
      direction="vertical"
      date={new Date()}
      onChange={onChange}
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
      className="flex-1"
    />
  )
}

export default Calendar
