'use client'

import BossTable from '@/app/calculator/seokbang/_components/BossTable'
import { BOSS_TRACE_GROUP_LIST } from '@/constants/domain/astra'
import clsx from 'clsx'
import useBossTraceTable from '../_hooks/useBossTraceTable'
import { useQuestSuccessForm } from '../_hooks/useQuestSuccessForm'
import { calculateDailyQuestReward } from '../_utils/calculateDailyQuestReward'
import { mapBossTraceGroupToBossRows } from '../_utils/mapper'
import QuestControl from './QuestControl'
import Result from './Result'

interface Props {}

const SeokbangCalculatorSection = ({}: Props) => {
  const { currentQuest, setName, setLv, setFragment, setTrace } =
    useQuestSuccessForm('1차 성장')

  const { tableData, setDifficulty, setPlayer } = useBossTraceTable(
    mapBossTraceGroupToBossRows(BOSS_TRACE_GROUP_LIST),
  )

  return (
    <section>
      <div
        className={clsx(
          'bg-white py-2 px-4 mb-6 rounded-md border border-gray-200 dark:border-neutral-700 dark:bg-neutral-800',
        )}
      >
        <QuestControl
          currentQuest={currentQuest}
          onChange={{ setName, setLv, setFragment, setTrace }}
        />
        <BossTable rows={tableData} onChange={{ setPlayer, setDifficulty }} />
      </div>
      <Result
        currentQuest={currentQuest}
        result={calculateDailyQuestReward(currentQuest.lv, tableData)}
      />
    </section>
  )
}

export default SeokbangCalculatorSection
