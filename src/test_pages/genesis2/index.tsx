import HeadMeta from '@/commonComponents/HeadMeta'
import Calculate from '@/components/Genesis/Calculate'
import Result from '@/components/Genesis/Result'
import quest from '@/data/genesis/quest.json'
import reward from '@/data/genesis/reward.json'
import { bossListType, currentQuestType } from '@/type/genesis'
import { checkNumberRex } from '@/utils/inputUtils'
import { ChangeEventHandler, useCallback, useMemo, useState } from 'react'

const Genesis = () => {
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
    <main className="flex xs:flex-col p-3 lg:justify-center lg:items-center w-full h-full xs:pt-12 lg:pl-12 gap-3 box-border overflow-x-auto scrollBar">
      <HeadMeta
        title="해방 퀘스트 계산기 - 메이플 헬퍼"
        description="해방까지 남은 시간을 계산해드려요"
        Keywords="해방퀘, 해방예상, 해방예상시간, 제네시스무기, 제네무기, 제네해방, 어둠의 흔적"
      />
      <Calculate
        handleBossList={handleBossList}
        bossList={bossList}
        currentQuest={currentQuest}
        handleQuest={handleQuest}
      />
      <Result bossList={bossList} currentQuest={currentQuest} />
    </main>
  )
}

export default Genesis
