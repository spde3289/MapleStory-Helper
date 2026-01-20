'use client'

import TableCard from '@/components/common/TableCard'
import { BOSS_TRACE_GROUP_LIST } from '@/constants/domain/astra'
import { mapAndSortBossTraces } from '../_utils/mapper'

const AstraRewardsOverview = () => {
  const result = mapAndSortBossTraces(BOSS_TRACE_GROUP_LIST)

  return (
    <section className="flex flex-col sm:flex-row gap-4 w-full text-sm">
      <div className="w-full h-fit bg-white py-2 px-4 rounded-md border border-gray-200 dark:border-neutral-700 dark:bg-neutral-800">
        <h3 className="text-center mb-2 font-semibold">보스별 획득 흔적</h3>
        <TableCard
          data={result}
          getRowKey={(row) => row.bossName + row.difficulty}
          columns={[
            {
              key: 'boss',
              header: '보스',
              render: (row) => row.bossName,
            },
            {
              key: 'difficulty',
              header: '난이도',
              render: (row) => row.difficulty,
            },
            {
              key: 'trace',
              header: '흔적',
              render: (row) => row.trace,
            },
          ]}
        />
      </div>
      <div className="w-full h-fit bg-white py-2 px-4 rounded-md border border-gray-200 dark:border-neutral-700 dark:bg-neutral-800">
        <h3 className="text-center mb-2 font-semibold">
          일일 퀘스트별 획득 조각
        </h3>
        <TableCard
          data={result}
          getRowKey={(row) => row.bossName + row.difficulty}
          columns={[
            {
              key: 'boss',
              header: '보스',
              render: (row) => row.bossName,
            },
            {
              key: 'difficulty',
              header: '난이도',
              render: (row) => row.difficulty,
            },
            {
              key: 'trace',
              header: '흔적',
              render: (row) => row.trace,
            },
          ]}
        />
      </div>
    </section>
  )
}

export default AstraRewardsOverview
