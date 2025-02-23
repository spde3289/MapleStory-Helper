'use client'

import quest from '@/data/genesis/quest.json'
import reward from '@/data/genesis/reward.json'
import { bossListType, currentQuestType } from '@/type/genesis'
import { checkNumberRex } from '@/utils/inputUtils'
import { ChangeEventHandler, useCallback, useMemo, useState } from 'react'
import Calculate from './components/Calculate'
import Result from './components/Result'

function Genesis() {
  const [currentQuest, setCurrentQuest] = useState<currentQuestType>({
    boss: '사자왕 반 레온',
    gauge: 0,
  })
  const [bossList, setBossList] = useState<bossListType>(reward)

  const handleBoss: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCurrentQuest((pre) => {
      return {
        ...pre,
        boss: e.target.selectedOptions[0].id,
      }
    })
  }

  const handleGauge = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const currentBoss = quest.find(
        (el) => el.quest === currentQuest.boss,
      ) || {
        quest: '사자왕 반 레온',
        required_darkness: 500,
      }

      if (checkNumberRex(e.target.value)) {
        setCurrentQuest((pre) => {
          if (currentBoss?.required_darkness >= Number(e.target.value)) {
            return { ...pre, gauge: Number(e.target.value) }
          }
          return { ...pre, gauge: currentBoss?.required_darkness }
        })
      }
    },
    [currentQuest.boss],
  )

  const handleType: ChangeEventHandler<HTMLInputElement> = (e) => {
    setBossList((prev) =>
      prev.map((item) => {
        if (item.krName !== e.target.value) return item

        const updatedType = item.type.map((type) => {
          const isTarget = type.difficulty + item.krName === e.target.id

          return {
            ...type,
            current: isTarget && e.target.checked,
          }
        })

        return { ...item, type: updatedType }
      }),
    )
  }

  const handlePlayer: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setBossList((prev) =>
      prev.map((item) => {
        if (item.krName !== e.target.id) return item

        return { ...item, player: Number(e.target.value) }
      }),
    )
  }

  const handleBossList = useMemo(() => {
    return { handleType, handlePlayer }
  }, [])

  const handleQuest = useMemo(() => {
    return { handleBoss, handleGauge }
  }, [handleGauge])

  return (
    <>
      <Calculate
        handleBossList={handleBossList}
        bossList={bossList}
        currentQuest={currentQuest}
        handleQuest={handleQuest}
      />
      <Result bossList={bossList} currentQuest={currentQuest} />
    </>
  )
}

export default Genesis
