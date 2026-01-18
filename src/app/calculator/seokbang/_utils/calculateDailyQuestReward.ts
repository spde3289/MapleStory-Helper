import { DAILY_QUEST_FRAGMENT_LIST } from '@/constants/domain/astra'
import { BossRow } from './mapper'

export const calculateDailyQuestReward = (lv: number, tableData: BossRow[]) => {
  const currentQuest =
    DAILY_QUEST_FRAGMENT_LIST.find((el) => el.level <= lv)?.fragment ?? 0

  const totalReward = tableData.reduce((sum, item) => {
    const reward = item.type.find((t) => t.current)?.reward
    if (!reward) return sum

    return sum + reward / item.player.current
  }, 0)

  return {
    fragment: currentQuest,
    trace: Math.floor(totalReward),
  }
}
