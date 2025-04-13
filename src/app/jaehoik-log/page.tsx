'use client'

import ItemContainer from '@/components/common/ItemContainer'
import { useState } from 'react'
import CalendarView from './components/CalendarView'
import IncomeTable from './components/IncomeTable'

type TabType = '달력' | '수익'

function JaehoikLog() {
  const [tab, setTeb] = useState<TabType>('수익')

  return (
    <ItemContainer className="w-full" title="재획 기록">
      <div className="flex gap-2">
        <button
          style={tab === '수익' ? { borderBottom: '2px solid #465fff ' } : {}}
          className=" pb-1 px-2"
          type="button"
          onClick={() => setTeb('수익')}
        >
          수익
        </button>
        <button
          style={tab === '달력' ? { borderBottom: '2px solid #465fff ' } : {}}
          className=" pb-1 px-2"
          type="button"
          onClick={() => setTeb('달력')}
        >
          달력
        </button>
      </div>
      <div className="">
        {tab === '수익' && <IncomeTable />}
        {tab === '달력' && <CalendarView />}
      </div>
    </ItemContainer>
  )
}

export default JaehoikLog
