import { BossDifficultyType, BossInfo } from '@/types/domain/game/boss'
import { formatKoreanNumber } from '@/utils/numberUtils'

interface Props {
  boss: BossInfo
  selectedDifficulty: BossDifficultyType | null
  partySize: number
  unit: '일반' | '유닛'
}

const BossPrice = ({ boss, selectedDifficulty, partySize, unit }: Props) => {
  const selected = boss.difficulties.find(
    (d) => d.difficulty === selectedDifficulty,
  )

  if (!selected) return null

  const alignStyle = {
    textAlign: unit === '유닛' ? 'right' : 'center',
  } as const

  const price = Math.floor(selected.price / partySize)
  const priceText =
    unit === '유닛' ? price.toLocaleString() : formatKoreanNumber(price)

  return (
    <div style={alignStyle} className="text-gray-900 dark:text-white/90">
      {priceText} 메소
    </div>
  )
}

export default BossPrice
