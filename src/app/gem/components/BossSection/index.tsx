import BossImage from '@/components/common/BossImage'
import ItemContainer from '@/components/common/ItemContainer'

import Button from '@/components/ui/button/Button'
import { useCharacterInfoListContext } from '@/context/characterInfoListContext'
import bosses from '@/data/boss'
import { formatKoreanNumber } from '@/utils/numberUtils'
import {
  ChangeEvent,
  ChangeEventHandler,
  memo,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'

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
          // console.log(e.currentTarget.id.split('_')[0])
          // const target =
          //   boss.type.length >= 2
          //     ? boss.name
          //     : `${boss.name}_${boss.type[0].difficulty}`

          if (boss.name !== e.currentTarget.id.split('_')[0]) return boss

          const changeNum = Number(e.currentTarget.value)

          return { ...boss, player: changeNum }
        })

        return { ...item, boss: updatedBoss }
      }),
    )
  }

  return (
    <ItemContainer
      title="보스 리스트"
      className="relative no-drag w-full overflow-x-scroll scrollBar lg:overflow-hidden lg:w-[720px] lg:min-w-[720px]"
    >
      <>
        <div className="flex gap-4 mb-2 virtual-text-area boss-table-min-w flex-wrap ">
          {bossBottons.map((el) => {
            return (
              <Button
                key={el.name}
                onClick={handleSetBoss}
                id={el.id}
                tip={el.tip}
              >
                {el.name}
              </Button>
            )
          })}
        </div>
        <div className="boss-table border-b boss-table-min-w w-full dark:border-white/[0.2]">
          <div className="text-center ">보스</div>
          <div className="text-center">난이도</div>
          <div className="whitespace-nowrap text-center ">파티원</div>
          <div
            role="button"
            tabIndex={0}
            onKeyDown={handelPriceSort}
            onClick={handelPriceSort}
            className="w-full flex items-center justify-center gap-1 cursor-pointer"
          >
            가격
            {sort.icon}
          </div>
        </div>
        <div className="flex flex-col items-start boss-table-min-w">
          {bossSort?.map((boss) => {
            return (
              <div
                className="boss-table py-2 dark:border-white/[0.2] border-b"
                key={
                  boss.type.length >= 2
                    ? boss.name
                    : `${boss.name}_${boss.type[0].difficulty}`
                }
              >
                {/* 1번째 열: 보스명 + 이미지 */}
                <div className="flex items-center">
                  <BossImage className="mr-2" boss={boss.name} />
                  <div className="hidden xsm:block">{boss.krName}</div>
                </div>

                {/* 2번째 열: 난이도 체크박스 */}
                <form className="lg:w-[680px]">
                  <fieldset className="flex flex-col sm:flex-row gap-4 2xl:flex-row">
                    {boss.type.map((type) => {
                      return (
                        <label
                          key={type.difficulty}
                          className={`flex items-center ${
                            currentBossArr.length < 12
                              ? ''
                              : !currentBossArr.includes(boss.name) &&
                                'text-gray-500'
                          }`}
                          htmlFor={`${type.difficulty}${boss.krName}`}
                        >
                          <input
                            disabled={
                              currentBossArr.length < 12
                                ? false
                                : !currentBossArr.includes(boss.name)
                            }
                            onChange={haldler}
                            checked={type.current}
                            className="mr-1"
                            type="checkbox"
                            value={boss.krName}
                            id={`${type.difficulty}${boss.krName}`}
                            name="group"
                          />
                          {type.difficulty}
                        </label>
                      )
                    })}
                  </fieldset>
                </form>

                {/* 3번째 열: 파티원 Select */}
                <select
                  onChange={handleBossPlayer}
                  className={`${
                    currentBossArr.length < 12
                      ? ''
                      : !currentBossArr.includes(boss.name) && 'text-gray-500'
                  } w-fit dark:bg-gray-800 dark:border-white/[0.2] border rounded-lg h-fit px-2 py-1 outline-none`}
                  disabled={
                    currentBossArr.length < 12
                      ? false
                      : !currentBossArr.includes(boss.name)
                  }
                  name="player"
                  value={boss.player}
                  id={
                    boss.type.length >= 2
                      ? boss.name
                      : `${boss.name}_${boss.type[0].difficulty}`
                  }
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>

                {/* 4번째 열: 가격(메소) 정보 */}
                <div className="min-w-fit whitespace-nowrap text-xs md:text-sm">
                  {boss.type.map((el) => {
                    return (
                      (el.current || sort.value !== 'default') && (
                        <div
                          className={` text-right ${
                            el.current
                              ? 'text-gray-900 dark:text-white/90'
                              : 'text-gray-500'
                          }`}
                          key={el.difficulty}
                        >
                          {unit === '유닛'
                            ? Math.floor(
                                el.price / boss.player,
                              ).toLocaleString()
                            : formatKoreanNumber(
                                Math.floor(el.price / boss.player),
                              )}{' '}
                          메소
                        </div>
                      )
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </>
    </ItemContainer>
  )
}

export default memo(BossSection)
