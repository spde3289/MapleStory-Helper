import ItemContainer from '@/components/common/ItemContainer'
import Button from '@/components/ui/Button'
import { BOSSES } from '@/constants/domain/bosses'
import { PRESET_BOSSES } from '@/constants/presetBosses'
import { useJuboCharacterStore } from '@/stores/useJubocCharacter'
import { BossInfo } from '@/types/domain/boss'
import { ClearedBoss } from '@/types/storage/JubocCharacter'
import { ChangeEventHandler, memo, useMemo, useState } from 'react'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import BossField from './BossField'

interface Props {
  unit: '일반' | '유닛'
}

interface sortType {
  value: 'default' | 'up' | 'down'
  icon: JSX.Element
}

type SortValue = 'default' | 'up' | 'down'

export const getSortedBosses = (
  bosses: BossInfo[],
  sort: SortValue,
): BossInfo[] => {
  if (sort === 'default') {
    return bosses
  }

  const flattened: BossInfo[] = bosses.flatMap((boss) =>
    boss.difficulties.map((difficulty) => ({
      bossId: boss.bossId,
      bossName: boss.bossName,
      difficulties: [difficulty],
    })),
  )

  return flattened.sort((a, b) => {
    const priceA = a.difficulties[0].price
    const priceB = b.difficulties[0].price

    return sort === 'up' ? priceA - priceB : priceB - priceA
  })
}

const BossListSection = ({ unit }: Props) => {
  const [sort, setSort] = useState<sortType>({
    value: 'default',
    icon: <FaSort />,
  })
  const [hideCheckBoss, setHideCheckBoss] = useState(false)
  const characters = useJuboCharacterStore((s) => s.characters)
  const selectedCharacter = useJuboCharacterStore((s) => s.selectedCharacter)
  const replaceBossesByCharacterName = useJuboCharacterStore(
    (s) => s.replaceBossesByCharacterName,
  )

  const handelPriceSort = () => {
    if (sort.value === 'default') {
      setSort({
        value: 'up',
        icon: <FaSortUp />,
      })
    }
    if (sort.value === 'up') {
      setSort({
        value: 'down',
        icon: <FaSortDown />,
      })
    }
    if (sort.value === 'down') {
      setSort({
        value: 'default',
        icon: <FaSort />,
      })
    }
  }

  const handleCheckBoss: ChangeEventHandler<HTMLInputElement> = (e) => {
    setHideCheckBoss(e.currentTarget.checked)
  }

  const handleSetPresetBosses = (bossEntries: ClearedBoss[]) => {
    if (!selectedCharacter) return

    replaceBossesByCharacterName(selectedCharacter, bossEntries)
  }

  const bossesToRender = useMemo(() => {
    const sorted = getSortedBosses([...BOSSES], sort.value)

    if (!selectedCharacter) return sorted

    if (!hideCheckBoss) return sorted

    const selectedBossIds = new Set(
      characters
        .find((c) => c.characterName === selectedCharacter)
        ?.bosses.map((b) => b.bossId) ?? [],
    )

    return sorted.filter((b) => selectedBossIds.has(b.bossId))
  }, [sort.value, hideCheckBoss, selectedCharacter, characters])

  return (
    <ItemContainer
      title="보스 리스트"
      className="relative text-nowrap no-drag flex-1 w-full"
      tip="주관적인 쾌적함 기준입니다."
    >
      <div className="flex gap-2 mb-2 flex-wrap">
        {PRESET_BOSSES.map((el) => {
          return (
            <Button
              key={el.name}
              onClick={() => handleSetPresetBosses(el.bossEntries)}
              id={el.id}
              tip={el.tip}
            >
              <div id="tooltip-root" />
              {el.name}
            </Button>
          )
        })}
      </div>
      <label
        className="flex gap-2 w-fit hover:cursor-pointer hover:text-gray-600 dark:hover:text-gray-400"
        htmlFor="보스 숨기기"
      >
        <input
          checked={hideCheckBoss}
          onChange={handleCheckBoss}
          className="hover:cursor-pointer"
          type="checkbox"
          id="보스 숨기기"
        />{' '}
        보스 숨기기
      </label>
      <table align="center" cellPadding={6} className="w-full">
        <thead>
          <tr className="border-b w-full dark:border-white/[0.2]">
            <th className="text-center">보스</th>
            <th className="text-center">난이도</th>
            <th className="whitespace-nowrap text-center ">파티원</th>
            <th
              role="button"
              tabIndex={0}
              onKeyDown={handelPriceSort}
              onClick={handelPriceSort}
              className="w-36 flex items-center justify-center gap-1 cursor-pointer "
            >
              가격
              {sort.icon}
            </th>
          </tr>
        </thead>
        <tbody className="">
          {bossesToRender.map((boss) => {
            return (
              <BossField
                sort={sort}
                unit={unit}
                key={
                  boss.difficulties.length >= 2
                    ? boss.bossName
                    : `${boss.bossName}_${boss.difficulties[0].difficulty}`
                }
                boss={boss}
              />
            )
          })}
        </tbody>
      </table>
    </ItemContainer>
  )
}

export default memo(BossListSection)
