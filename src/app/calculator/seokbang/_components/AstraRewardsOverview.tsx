'use client'

import TableCard from '@/components/common/TableCard'
import { BOSS_TRACE_GROUP_LIST } from '@/constants/domain/astra'
import { mapAndSortBossTraces } from '../_utils/mapper'

const AstraRewardsOverview = () => {
  const result = mapAndSortBossTraces(BOSS_TRACE_GROUP_LIST)

  return (
    <section className="flex flex-col sm:flex-row gap-4 w-full text-sm">
      <TableCard
        title="보스별 획득 흔적"
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
      <TableCard
        title="일일 퀘스트별 획득 조각"
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
    </section>
  )
}

export default AstraRewardsOverview
