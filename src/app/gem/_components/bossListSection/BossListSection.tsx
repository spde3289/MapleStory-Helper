import ItemContainer from '@/components/common/ItemContainer'
import Button from '@/components/ui/button/Button'
import { BOSSES } from '@/constants/bosses'
import { useJuboCharacterStore } from '@/stores/useJubocCharacter'
import { BossInfo } from '@/types/models/game/Boss'
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

type PresetBoss = {
  id: string
  name: string
  tip: string
  bossEntries: ClearedBoss[]
}

const PRESET_BOSSES: PresetBoss[] = [
  {
    id: 'sde',
    name: '스데',
    tip: '전투력 500 이상',
    bossEntries: [
      { bossId: 'Zakum', difficulty: '카오스', partySize: 1 },
      { bossId: 'Magnus', difficulty: '하드', partySize: 1 },
      { bossId: 'Hilla', difficulty: '하드', partySize: 1 },
      { bossId: 'Papulatus', difficulty: '카오스', partySize: 1 },
      { bossId: 'Pierre', difficulty: '카오스', partySize: 1 },
      { bossId: 'BanBan', difficulty: '카오스', partySize: 1 },
      { bossId: 'BloodyQueen', difficulty: '카오스', partySize: 1 },
      { bossId: 'Vellum', difficulty: '카오스', partySize: 1 },
      { bossId: 'PinkBean', difficulty: '카오스', partySize: 1 },
      { bossId: 'Cygnus', difficulty: '노멀', partySize: 1 },
      { bossId: 'Lotus', difficulty: '노멀', partySize: 1 },
      { bossId: 'Damien', difficulty: '노멀', partySize: 1 },
    ],
  },
  {
    id: 'gaenseul',
    name: '가엔슬',
    tip: '전투럭 1천 이상',
    bossEntries: [
      { bossId: 'Zakum', difficulty: '카오스', partySize: 1 },
      { bossId: 'Magnus', difficulty: '하드', partySize: 1 },
      { bossId: 'Papulatus', difficulty: '카오스', partySize: 1 },
      { bossId: 'Pierre', difficulty: '카오스', partySize: 1 },
      { bossId: 'BanBan', difficulty: '카오스', partySize: 1 },
      { bossId: 'BloodyQueen', difficulty: '카오스', partySize: 1 },
      { bossId: 'Vellum', difficulty: '카오스', partySize: 1 },
      { bossId: 'PinkBean', difficulty: '카오스', partySize: 1 },
      { bossId: 'Cygnus', difficulty: '노멀', partySize: 1 },
      { bossId: 'Lotus', difficulty: '노멀', partySize: 1 },
      { bossId: 'Damien', difficulty: '노멀', partySize: 1 },
      { bossId: 'GuardianAngelSlime', difficulty: '카오스', partySize: 1 },
    ],
  },
  {
    id: 'irushi',
    name: '이루시',
    tip: '전투럭 1천 500 이상',
    bossEntries: [
      { bossId: 'Zakum', difficulty: '카오스', partySize: 1 },
      { bossId: 'Magnus', difficulty: '하드', partySize: 1 },
      { bossId: 'Papulatus', difficulty: '카오스', partySize: 1 },
      { bossId: 'Pierre', difficulty: '카오스', partySize: 1 },
      { bossId: 'BanBan', difficulty: '카오스', partySize: 1 },
      { bossId: 'BloodyQueen', difficulty: '카오스', partySize: 1 },
      { bossId: 'Vellum', difficulty: '카오스', partySize: 1 },
      { bossId: 'Cygnus', difficulty: '노멀', partySize: 1 },
      { bossId: 'Lotus', difficulty: '노멀', partySize: 1 },
      { bossId: 'Damien', difficulty: '노멀', partySize: 1 },
      { bossId: 'GuardianAngelSlime', difficulty: '노멀', partySize: 1 },
      { bossId: 'Lucid', difficulty: '이지', partySize: 1 },
    ],
  },
  {
    id: 'ruwill',
    name: '이루윌',
    tip: '전투럭 2천 이상',
    bossEntries: [
      { bossId: 'Zakum', difficulty: '카오스', partySize: 1 },
      { bossId: 'Magnus', difficulty: '하드', partySize: 1 },
      { bossId: 'Papulatus', difficulty: '카오스', partySize: 1 },
      { bossId: 'Pierre', difficulty: '카오스', partySize: 1 },
      { bossId: 'BanBan', difficulty: '카오스', partySize: 1 },
      { bossId: 'BloodyQueen', difficulty: '카오스', partySize: 1 },
      { bossId: 'Vellum', difficulty: '카오스', partySize: 1 },
      { bossId: 'Lotus', difficulty: '노멀', partySize: 1 },
      { bossId: 'Damien', difficulty: '노멀', partySize: 1 },
      { bossId: 'GuardianAngelSlime', difficulty: '노멀', partySize: 1 },
      { bossId: 'Lucid', difficulty: '이지', partySize: 1 },
      { bossId: 'Will', difficulty: '이지', partySize: 1 },
    ],
  },
  {
    id: 'hasuu',
    name: '하스우',
    tip: '전투럭 3천 이상',
    bossEntries: [
      { bossId: 'Magnus', difficulty: '하드', partySize: 1 },
      { bossId: 'Papulatus', difficulty: '카오스', partySize: 1 },
      { bossId: 'Pierre', difficulty: '카오스', partySize: 1 },
      { bossId: 'BloodyQueen', difficulty: '카오스', partySize: 1 },
      { bossId: 'Vellum', difficulty: '카오스', partySize: 1 },
      { bossId: 'Lotus', difficulty: '하드', partySize: 1 },
      { bossId: 'Damien', difficulty: '하드', partySize: 1 },
      { bossId: 'GuardianAngelSlime', difficulty: '노멀', partySize: 1 },
      { bossId: 'Lucid', difficulty: '노멀', partySize: 1 },
      { bossId: 'Will', difficulty: '노멀', partySize: 1 },
      { bossId: 'GiantMonsterGloom', difficulty: '노멀', partySize: 1 },
      { bossId: 'GuardCaptainDarknell', difficulty: '노멀', partySize: 1 },
    ],
  },
  {
    id: 'geommitsol',
    name: '검밑솔',
    tip: '전투럭 1억 이상',
    bossEntries: [
      { bossId: 'Magnus', difficulty: '하드', partySize: 1 },
      { bossId: 'Papulatus', difficulty: '카오스', partySize: 1 },
      { bossId: 'BloodyQueen', difficulty: '카오스', partySize: 1 },
      { bossId: 'Vellum', difficulty: '카오스', partySize: 1 },
      { bossId: 'Lotus', difficulty: '하드', partySize: 1 },
      { bossId: 'Damien', difficulty: '하드', partySize: 1 },
      { bossId: 'GuardianAngelSlime', difficulty: '카오스', partySize: 1 },
      { bossId: 'Lucid', difficulty: '하드', partySize: 1 },
      { bossId: 'Will', difficulty: '하드', partySize: 1 },
      { bossId: 'GiantMonsterGloom', difficulty: '카오스', partySize: 1 },
      { bossId: 'VerusHilla', difficulty: '하드', partySize: 1 },
      { bossId: 'GuardCaptainDarknell', difficulty: '하드', partySize: 1 },
    ],
  },
  {
    id: 'haseikal',
    name: '하세이칼',
    tip: '전투럭 1억 5천 이상',
    bossEntries: [
      { bossId: 'Papulatus', difficulty: '카오스', partySize: 1 },
      { bossId: 'Vellum', difficulty: '카오스', partySize: 1 },
      { bossId: 'Lotus', difficulty: '하드', partySize: 1 },
      { bossId: 'Damien', difficulty: '하드', partySize: 1 },
      { bossId: 'GuardianAngelSlime', difficulty: '카오스', partySize: 1 },
      { bossId: 'Lucid', difficulty: '하드', partySize: 1 },
      { bossId: 'Will', difficulty: '하드', partySize: 1 },
      { bossId: 'GiantMonsterGloom', difficulty: '카오스', partySize: 1 },
      { bossId: 'VerusHilla', difficulty: '하드', partySize: 1 },
      { bossId: 'GuardCaptainDarknell', difficulty: '하드', partySize: 1 },
      { bossId: 'ChosenSeren', difficulty: '하드', partySize: 1 },
      { bossId: 'KalostheGuardian', difficulty: '이지', partySize: 1 },
    ],
  },
  {
    id: 'nokallica',
    name: '노칼이카',
    tip: '전투럭 2억 이상',
    bossEntries: [
      { bossId: 'Lotus', difficulty: '하드', partySize: 1 },
      { bossId: 'Damien', difficulty: '하드', partySize: 1 },
      { bossId: 'GuardianAngelSlime', difficulty: '카오스', partySize: 1 },
      { bossId: 'Lucid', difficulty: '하드', partySize: 1 },
      { bossId: 'Will', difficulty: '하드', partySize: 1 },
      { bossId: 'GiantMonsterGloom', difficulty: '카오스', partySize: 1 },
      { bossId: 'VerusHilla', difficulty: '하드', partySize: 1 },
      { bossId: 'GuardCaptainDarknell', difficulty: '하드', partySize: 1 },
      { bossId: 'ChosenSeren', difficulty: '하드', partySize: 1 },
      { bossId: 'KalostheGuardian', difficulty: '노멀', partySize: 1 },
      { bossId: 'TheFirstAdversary', difficulty: '노멀', partySize: 1 },
      { bossId: 'Kaling', difficulty: '이지', partySize: 1 },
    ],
  },
] satisfies readonly PresetBoss[]

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
      className="relative lg:w-[698px] text-nowrap no-drag overflow-x-scroll scrollBar"
      tip="주관적인 쾌적함 기준입니다."
    >
      <div className="flex gap-2 mb-2 flex-wrap ">
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
      <table align="center" cellPadding={8} className="w-full">
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
              className="w-full flex items-center justify-center gap-1 cursor-pointer"
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
