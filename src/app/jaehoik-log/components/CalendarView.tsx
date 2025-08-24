'use client'

import { IncomeRecord } from '@/type/income'
import { useEffect, useState } from 'react'
import Calendar from 'react-calendar' // `npm install react-calendar`
// import 'react-calendar/dist/Calendar.css'
import './calender.css'

export default function CalendarView() {
  const [value, setValue] = useState<Date | null>(new Date())
  const [records, setRecords] = useState<IncomeRecord[]>([])

  useEffect(() => {
    // 추후 로컬스토리지나 API fetch로 교체
    const exampleData: IncomeRecord[] = [
      {
        date: '2025-04-01',
        duration: 120,
        pieces: 20,
        meso: 100000000,
        memo: '예시',
      },
      {
        date: '2025-04-02',
        duration: 60,
        pieces: 10,
        meso: 50000000,
        memo: '',
      },
    ]
    setRecords(exampleData)
  }, [])

  const tileContent = ({ date }: { date: Date }) => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const localDateString = `${year}-${month}-${day}`

    const dayData = records.find((r) => r.date === localDateString)
    return dayData ? (
      <div className="text-xs mt-1 text-blue-600">
        💰{dayData.meso.toLocaleString()}
        <br />
        🔹{dayData.pieces}
      </div>
    ) : null
  }

  return (
    <Calendar
      locale="ko-KR"
      calendarType="gregory"
      // view="month"
      onChange={(val) => {
        if (val instanceof Date) {
          setValue(val)
        }
      }}
      value={value}
      tileContent={tileContent}
    />
  )
}
