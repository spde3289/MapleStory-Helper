'use client'

import TableCard from '@/components/common/TableCard'
import { ROUTES } from '@/constants/routers/appRoutes'
import { SERVICE_UPDATE_HISTORY } from '@/constants/serviceUpdateHistory'
import clsx from 'clsx'
import Link from 'next/link'

const TimeLineSection = () => {
  return (
    <section
      className={clsx(
        'bg-white py-2 px-4 rounded-md border border-gray-200 dark:border-neutral-700 dark:bg-neutral-800 text-sm',
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <h2 className="font-bold text-base">최신 업데이트</h2>
        <Link href={ROUTES.GUIDE.ROOT}>더보기</Link>
      </div>
      <TableCard
        title=""
        data={[...SERVICE_UPDATE_HISTORY]}
        getRowKey={(row) => row.date + row.title}
        columns={[
          {
            key: 'date',
            header: '날짜',
            headerClassName: 'w-32 md:w-64',
            render: (row) => row.date,
          },
          {
            key: 'conetent',
            header: '주요내용',
            headerClassName: 'w-auto',
            render: (row) => <p className="truncate text-start">{row.title}</p>,
          },
        ]}
      />
    </section>
  )
}

export default TimeLineSection
