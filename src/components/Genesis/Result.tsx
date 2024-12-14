import ItemContainer from '@/commonComponents/ItemContainer'
import quest from '@/data/genesis/quest.json'
import { bossListType, currentQuestType } from '@/type/genesis'
import { convertTime } from '@/utils/setDate'

interface ResultProps {
  currentQuest: currentQuestType
  bossList: bossListType
}

const Result = ({ currentQuest, bossList }: ResultProps) => {
  const startIndex = quest.findIndex((item) => item.quest === currentQuest.boss)

  let sum_darkness = 0

  for (let i = startIndex; i < quest.length; i += 1) {
    sum_darkness += quest[i].required_darkness
  }

  let totalReward = Math.round(
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
    totalReward += Math.round(500 / checkBlackMage.player)
  }

  return (
    <ItemContainer title="결과">
      <div className="w-full">
        <table className="mb-3 w-full table-auto ">
          <tbody className="border-b-[1px] border-b-gray-200">
            <tr className="leading-8">
              <td className="w-32">요구 어둠의 흔적</td>
              <td className="w-20 text-right">
                {sum_darkness - currentQuest.gauge}
              </td>
            </tr>
            <tr className="leading-8">
              <td className="w-32">어둠의 흔적</td>
              <td className="w-20 text-right">{totalReward} / 주</td>
            </tr>
          </tbody>
        </table>
        <div className="text-right">
          {convertTime((sum_darkness - currentQuest.gauge) / totalReward)}
        </div>
      </div>
    </ItemContainer>
  )
}

export default Result
