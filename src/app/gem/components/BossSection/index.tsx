import ItemContainer from '@/components/common/ItemContainer'

import Button from '@/components/ui/button/Button'
import { useCharacterInfoListContext } from '@/context/characterInfoListContext'
import bosses from '@/data/boss'
import {
  ChangeEvent,
  ChangeEventHandler,
  memo,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import BossField from './BossField'

interface BossSectionPropsType {
  unit: '일반' | '유닛'
}

interface sortType {
  value: 'default' | 'up' | 'down'
  icon: JSX.Element
}

type currentBossArrType = string[]

const bossBottons = [
  { id: 'sde', name: '스데', tip: '전투력 500 이상' },
  { id: 'gaenseul', name: '가엔슬', tip: '전투럭 1천 이상' },
  { id: 'irushi', name: '이루시', tip: '전투럭 1천 500 이상' },
  { id: 'ruwill', name: '이루윌', tip: '전투럭 2천 이상' },
  { id: 'hasuu', name: '하스우', tip: '전투럭 3천 이상' },
  { id: 'geommitsol', name: '검밑솔', tip: '전투럭 1억 이상' },
  { id: 'haseikal', name: '하세이칼', tip: '전투럭 1억 5천 이상' },
]

const BossSection = ({ unit }: BossSectionPropsType) => {
  const { characterInfoList, setCharacterInfoList } =
    useCharacterInfoListContext()
  const [currentBossArr, setcurrentBossArr] = useState<currentBossArrType>([])
  const [hideCheckBoss, setHideCheckBoss] = useState<boolean>(false)
  const [sort, setSort] = useState<sortType>({
    value: 'default',
    icon: <FaSort />,
  })

  // 캐릭터 선택
  const currentChar = characterInfoList.find(
    (char) => char.currentCharacter === true,
  )

  useEffect(() => {
    const arr: any[] = []
    currentChar?.boss.forEach((boss) => {
      if (boss.type.filter((type) => type.current === true).length !== 0) {
        arr.push(boss.name)
        setcurrentBossArr(arr)
      } else if (arr.length === 0) {
        setcurrentBossArr([])
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterInfoList])

  // 만약 선택한 캐릭터가 없으면 더미데이터
  // if (!currentChar) return <BossDummy />

  const haldler = (e: ChangeEvent<HTMLInputElement>) => {
    setCharacterInfoList((prev) =>
      prev.map((item) => {
        if (item.ocid !== currentChar?.ocid) return item

        const updatedBoss = item.boss.map((boss) => {
          if (boss.krName !== e.target.value) return boss

          const updatedType = boss.type.map((type) => {
            const isTarget = type.difficulty + boss.krName === e.target.id

            return {
              ...type,
              current: isTarget && e.target.checked,
            }
          })

          return { ...boss, type: updatedType }
        })

        return { ...item, boss: updatedBoss }
      }),
    )
  }
  // 보스돌이 선택버튼
  const handleSetBoss: MouseEventHandler<HTMLButtonElement> = (e) => {
    const key = e.currentTarget.id

    setCharacterInfoList((prev) =>
      prev.map((item) => {
        if (item.ocid !== currentChar?.ocid) return item

        return { ...item, boss: bosses[key] }
      }),
    )
  }

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

  const bossSort = currentChar?.boss.flatMap((boss) => {
    if (sort.value === 'default') {
      return [boss] // 기본 정렬의 경우 배열로 반환
    }
    return boss.type.map((type) => ({
      name: boss.name,
      krName: boss.krName,
      player: boss.player,
      type: [type],
    }))
  })

  // 정렬 수행
  if (sort.value !== 'default') {
    bossSort?.sort((a, b) => {
      if (sort.value === 'up') {
        return a.type[0].price - b.type[0].price // 가격 오름차순
      }
      return b.type[0].price - a.type[0].price // 가격 내림차순
    })
  }

  // 보스 파티원 수
  const handleBossPlayer: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCharacterInfoList((prev) =>
      prev.map((item) => {
        if (item.ocid !== currentChar?.ocid) return item

        const updatedBoss = item.boss.map((boss) => {
          if (boss.name !== e.currentTarget.id.split('_')[0]) return boss

          const changeNum = Number(e.currentTarget.value)

          return { ...boss, player: changeNum }
        })

        return { ...item, boss: updatedBoss }
      }),
    )
  }

  const handleCheckBoss: ChangeEventHandler<HTMLInputElement> = (e) => {
    setHideCheckBoss(e.currentTarget.checked)
  }

  return (
    <ItemContainer
      title="보스 리스트"
      className="relative lg:w-[698px] text-nowrap no-drag overflow-x-scroll scrollBar"
      tip="주관적인 쾌적함 기준입니다."
    >
      <>
        {!bossSort && (
          <div className="w-full m-0 mx-auto text-gray-500 dark:text-gray-400 text-lg text-center break-keep whitespace-normal break-words">
            캐릭터를 선택해 클리어하고 있는 보스를 설정해 보세요!
          </div>
        )}
        {bossSort && (
          <>
            <div className="flex gap-2 mb-2 flex-wrap ">
              {bossBottons.map((el) => {
                return (
                  <Button
                    key={el.name}
                    onClick={handleSetBoss}
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
                {bossSort?.map((boss) => {
                  if (hideCheckBoss && !boss.type.find((type) => type.current))
                    return null
                  return (
                    <BossField
                      sort={sort}
                      unit={unit}
                      currentBossArr={currentBossArr}
                      key={
                        boss.type.length >= 2
                          ? boss.name
                          : `${boss.name}_${boss.type[0].difficulty}`
                      }
                      boss={boss}
                      haldler={haldler}
                      handleBossPlayer={handleBossPlayer}
                    />
                  )
                })}
              </tbody>
            </table>
          </>
        )}
      </>
    </ItemContainer>
  )
}

export default memo(BossSection)
