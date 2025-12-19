import { BOSSES, BossId } from '@/constants/bosses'
import { BossDifficultyType } from '@/types/models/game/Boss'
import { ClearedBoss } from '@/types/storage/JubocCharacter'

type PriceKey = `${BossId}__${BossDifficultyType}`

/** BOSSES -> (bossId+difficulty)로 price 빠르게 찾는 인덱스 */
const buildBossPriceIndex = () => {
  const map = new Map<PriceKey, number>()

  for (const boss of BOSSES) {
    for (const d of boss.difficulties) {
      map.set(`${boss.bossId}__${d.difficulty}`, d.price)
    }
  }

  return map
}

/** 선택한 보스 목록의 price 총합 계산 */
export const calcSelectedBossesTotalPrice = (selectedBosses: ClearedBoss[]) => {
  const priceIndex = buildBossPriceIndex()

  let total = 0
  const missing: { bossId: BossId; difficulty: BossDifficultyType }[] = []

  for (const b of selectedBosses) {
    const key = `${b.bossId}__${b.difficulty as BossDifficultyType}` as const
    const price = priceIndex.get(key)

    if (price == null) {
      missing.push({
        bossId: b.bossId,
        difficulty: b.difficulty as BossDifficultyType,
      })
      continue
    }

    const party = b.partySize > 0 ? b.partySize : 1 // 0 방지
    total += price / party
  }

  return { total: Math.floor(total), missing }
}
