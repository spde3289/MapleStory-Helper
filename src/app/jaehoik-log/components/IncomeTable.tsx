'use client'

import { IncomeRecord } from '@/type/income'
import { useState } from 'react'

export default function IncomeTable() {
  const [records, setRecords] = useState<IncomeRecord[]>([
    {
      date: '',
      duration: 0,
      pieces: 0,
      meso: 0,
      memo: '',
    },
  ])

  const handleChange = <K extends keyof IncomeRecord>(
    index: number,
    key: K,
    value: IncomeRecord[K],
  ) => {
    const newRecords = [...records]
    newRecords[index][key] = value
    setRecords(newRecords)
  }

  const addRow = () => {
    setRecords([
      ...records,
      { date: '', duration: 0, pieces: 0, meso: 0, memo: '' },
    ])
  }

  return (
    <div>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">날짜</th>
            <th className="border px-2 py-1">재획 시간 (분)</th>
            <th className="border px-2 py-1">조각</th>
            <th className="border px-2 py-1">메소</th>
            <th className="border px-2 py-1">비고</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, i) => (
            <tr key={record.date}>
              <td aria-label="date">
                <input
                  type="date"
                  value={record.date}
                  onChange={(e) => handleChange(i, 'date', e.target.value)}
                  className="border w-full px-2"
                />
              </td>
              <td aria-label="duration">
                <input
                  type="number"
                  value={record.duration}
                  onChange={(e) =>
                    handleChange(i, 'duration', Number(e.target.value))
                  }
                  className="border w-full px-2"
                />
              </td>
              <td aria-label="pieces">
                <input
                  type="number"
                  value={record.pieces}
                  onChange={(e) =>
                    handleChange(i, 'pieces', Number(e.target.value))
                  }
                  className="border w-full px-2"
                />
              </td>
              <td aria-label="meso">
                <input
                  type="number"
                  value={record.meso}
                  onChange={(e) =>
                    handleChange(i, 'meso', Number(e.target.value))
                  }
                  className="border w-full px-2"
                />
              </td>
              <td aria-label="memo">
                <input
                  type="text"
                  value={record.memo}
                  onChange={(e) => handleChange(i, 'memo', e.target.value)}
                  className="border w-full px-2"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={addRow}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
      >
        행 추가
      </button>
    </div>
  )
}
