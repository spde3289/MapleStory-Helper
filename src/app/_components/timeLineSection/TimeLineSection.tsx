'use client'

import TableCard from '@/components/common/TableCard'
import { ROUTES } from '@/constants/routers/appRoutes'
import { SERVICE_UPDATE_HISTORY } from '@/constants/serviceUpdateHistory'
import clsx from 'clsx'
import Link from 'next/link'
import { MdArrowForwardIos } from 'react-icons/md'

const TimeLineSection = () => {
  const recentItems = [...SERVICE_UPDATE_HISTORY].slice(0, 3)

  return (
    <section
      className={clsx(
        'bg-white py-2 px-4 rounded-md border border-gray-200 dark:border-neutral-700 dark:bg-neutral-800 mb-8',
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="font-bold text-lg">개발자 업데이트 소식</h2>
        <Link
          className="text-gray-600 dark:text-gray-400 flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-300"
          href={ROUTES.GUIDE.ROOT}
        >
          더보기 <MdArrowForwardIos />
        </Link>
      </div>
      <div className="border py-2 px-4 border-gray-200 dark:border-neutral-700 rounded-sm">
        <TableCard
          data={recentItems}
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
              render: (row) => <p className="truncate">{row.title}</p>,
            },
          ]}
        />
      </div>
    </section>
  )
}

export default TimeLineSection
