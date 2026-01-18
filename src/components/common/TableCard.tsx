'use client'

import { ReactNode } from 'react'

export interface TableColumn<T> {
  key: string
  header: ReactNode
  render: (row: T) => ReactNode
}

interface TableCardProps<T> {
  title: string
  columns: TableColumn<T>[]
  data: T[]
  getRowKey: (row: T, index: number) => string
}

const TableCard = <T,>({
  title,
  columns,
  data,
  getRowKey,
}: TableCardProps<T>) => {
  return (
    <div className="w-full h-fit bg-white py-2 px-4 rounded-md border border-gray-200 dark:border-neutral-700 dark:bg-neutral-800">
      <h3 className="text-center mb-2 font-semibold">{title}</h3>
      <table className="w-full font-normal" align="center">
        <thead>
          <tr className="border-b dark:border-white/[0.2]">
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y dark:divide-white/[0.2] [&>tr>td]:py-2">
          {data.map((row, index) => (
            <tr
              key={getRowKey(row, index)}
              className="border-b dark:border-white/[0.2]"
            >
              {columns.map((col) => (
                <td key={col.key} align="center">
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableCard
