import ItemContainer from '@/components/common/ItemContainer'
import quest from '@/data/genesis/quest.json'
import { bossListType, currentQuestType } from '@/type/genesis'
import { calculateRewards, convertTime } from '@/utils/numberUtils'
import { getDateAfterWeeks } from '@/utils/setDate'

interface ResultProps {
  currentQuest: currentQuestType
  bossList: bossListType
}

const Result = ({ currentQuest, bossList }: ResultProps) => {
  const startIndex = quest.findIndex((item) => item.quest === currentQuest.boss)

  const result = {
    need_darkness: 0,
    bossReward: 0,
    blackMageReward: 0,
    totalReward: 0,
    date: 0,
  }

  for (let i = startIndex; i < quest.length; i += 1) {
    result.need_darkness += quest[i].required_darkness
    if (i >= quest.length - 1) {
      result.need_darkness -= currentQuest.gauge
    }
  }

  result.bossReward = Math.round(
    bossList.slice(0, -1).reduce((sum, boss) => {
      return (
        sum +
        boss.type
          .filter((t) => t.current)
          .reduce((rewardSum, t) => rewardSum + t.reward / boss.player, 0)
      )
    }, 0),
  )

  const checkBlackMage = bossList.find((item) => item.krName === '검은 마법사')

  if (checkBlackMage?.type.some((type) => type.current === true)) {
    result.blackMageReward += Math.round(500 / checkBlackMage.player)
  }

  const value =
    result.need_darkness !== 0 &&
    (result.bossReward !== 0 || result.blackMageReward !== 0)

  if (value) {
    result.date = calculateRewards(result).date
    result.totalReward = calculateRewards(result).totalReward
  }

  return (
    <ItemContainer
      className="relative gmQuest-text-area flex-1"
      title="계산 결과"
    >
      <div className="w-full">
        <table className="mb-3 w-full table-auto ">
          <tbody className="border-b-[1px] border-b-gray-200 dark:border-white/[0.2]">
            <tr className="leading-8">
              <td className="w-44">요구 어둠의 흔적</td>
              <td className="w-20 text-right">{result.need_darkness}</td>
            </tr>
            <tr className="leading-8">
              <td className="w-44">보스 어둠의 흔적</td>
              <td className="w-20 text-right">{result.bossReward} / 주</td>
            </tr>
            <tr className="leading-8">
              <td className="w-44">검은 마법사 어둠의 흔적</td>
              <td className="w-20 text-right">{result.blackMageReward} / 월</td>
            </tr>
          </tbody>
        </table>
        <div className="text-right h-6">
          {convertTime(result.date)}{' '}
          <span className="text-sm">({result.date} 주)</span>
        </div>
        <div className="text-right h-6 flex justify-between">
          <div className="text-left">예상 해방 날짜</div>
          {getDateAfterWeeks(result.date)}
        </div>
      </div>
    </ItemContainer>
  )
}

export default Result
