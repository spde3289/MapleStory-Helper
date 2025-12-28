import { BOSSES, BossId } from '@/constants/bosses'
import { BossDifficultyType } from '@/types/models/game/Boss'
import { ClearedBoss } from '@/types/storage/JubocCharacter'

type PriceKey = `${BossId}__${BossDifficultyType}`

const toKey = (bossId: BossId, difficulty: BossDifficultyType): PriceKey =>
  `${bossId}__${difficulty}`

const BOSS_PRICE_INDEX: Record<PriceKey, number> = BOSSES.reduce(
  (acc, boss) => {
    boss.difficulties.forEach(({ difficulty, price }) => {
      acc[`${boss.bossId}__${difficulty}` as PriceKey] = price
    })
    return acc
  },
  {} as Record<PriceKey, number>,
)

export const calcSelectedBossesTotalPrice = (selectedBosses: ClearedBoss[]) => {
  let total = 0

  for (const { bossId, difficulty, partySize } of selectedBosses) {
    const diff = difficulty as BossDifficultyType
    const price = BOSS_PRICE_INDEX[toKey(bossId, diff)] as number

    total += price / Math.max(partySize)
  }

  return Math.floor(total)
}
