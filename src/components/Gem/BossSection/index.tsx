import BossImage from '@/commonComponents/BossImage'
import ItemContainer from '@/commonComponents/ItemContainer'
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
import BossButton from './BossButton'
import BossDummy from './BossDummy'

interface BossSectionPropsType {
  unit: '일반' | '유닛'
}

interface sortType {
  value: 'default' | 'up' | 'down'
  icon: JSX.Element
}

const bossBottons = [
  { id: 'sde', name: '스데', tip: '전투력 500 이상' },
  { id: 'gaenseul', name: '가엔슬', tip: '전투럭 1천 이상' },
  { id: 'irushi', name: '이루시', tip: '전투럭 1천 500 이상' },
  { id: 'ruwill', name: '이루윌', tip: '전투럭 2천 이상' },
  { id: 'geommitsol', name: '검밑솔', tip: '전투럭 1억 이상' },
  { id: 'haseikal', name: '하세이칼', tip: '전투럭 1억 5천 이상' },
]

const BossSection = ({ unit }: BossSectionPropsType) => {
  const { characterInfoList, setCharacterInfoList } =
    useCharacterInfoListContext()
  const [currentBossArr, setcurrentBossArr] = useState<any[]>([])
  const [sort, setSort] = useState<sortType>({
    value: 'default',
    icon: <FaSort />,
  })

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

  if (!currentChar) return <BossDummy />

  const haldler = (e: ChangeEvent<HTMLInputElement>) => {
    setCharacterInfoList((prev) =>
      prev.map((item) => {
        if (item.ocid !== currentChar.ocid) return item

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

  const handleSetBoss: MouseEventHandler<HTMLButtonElement> = (e) => {
    const key = e.currentTarget.id

    setCharacterInfoList((prev) =>
      prev.map((item) => {
        if (item.ocid !== currentChar.ocid) return item

        return { ...item, boss: bosses[key] }
      }),
    )
  }

  const handleBossPlayer: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCharacterInfoList((prev) =>
      prev.map((item) => {
        if (item.ocid !== currentChar.ocid) return item

        const updatedBoss = item.boss.map((boss) => {
          if (boss.krName + boss.type[0].difficulty !== e.currentTarget.id)
            return boss

          const changeNum = Number(e.currentTarget.value)

          return { ...boss, player: changeNum }
        })

        return { ...item, boss: updatedBoss }
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

  const bossSort = currentChar.boss.flatMap((boss) => {
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
    bossSort.sort((a, b) => {
      if (sort.value === 'up') {
        return a.type[0].price - b.type[0].price // 가격 오름차순
      }
      return b.type[0].price - a.type[0].price // 가격 내림차순
    })
  }

  return (
    <ItemContainer title="보스 리스트" className="relative">
      <>
        <div className="flex gap-4 mb-2 virtual-text-area w-[675px] xs:w-full xxxs:flex-wrap xxxs:gap-2 xxxs:mb-4">
          {bossBottons.map((el) => {
            return (
              <BossButton
                key={el.name}
                handleSetBoss={handleSetBoss}
                id={el.id}
                name={el.name}
                tip={el.tip}
              />
            )
          })}
        </div>
        <div className="flex xxxs:justify-between">
          <div className="text-center items-center w-44 xxxs:w-fit min-w-44 xxxs:min-w-fit">
            보스
          </div>
          <div className="min-w-40 w-full xxxs:w-fit xxxs:min-w-fit text-center">
            난이도
          </div>
          <div className="flex w-48  min-w-48 xxs:min-w-48 xxs:w-48 xxxs:w-3/12 xxxs:min-w-24">
            <div className="whitespace-nowrap">파티원</div>
            <div
              role="button"
              tabIndex={0}
              onKeyDown={handelPriceSort}
              onClick={handelPriceSort}
              className="w-full text-center flex items-center justify-center gap-1"
            >
              가격
              {sort.icon}
            </div>
          </div>
        </div>
        {bossSort.map((boss) => {
          return (
            <div
              className="flex justify-between xxxs:mb-3 xxxs:border-b-[1px]"
              key={boss.name + boss.type[0].difficulty}
            >
              <div className="flex w-fit xxxs:flex-col">
                <div className="flex items-center w-44 xxxs:w-36 min-w-44 xxxs:min-w-36 mb-1">
                  <BossImage className="mr-2" boss={boss.name} />
                  <div>{boss.krName}</div>
                </div>
                <form className="">
                  <fieldset className="flex xxs:flex-wrap min-w-40 w-full">
                    {boss.type.map((type) => {
                      return (
                        <label
                          key={type.difficulty}
                          className={`flex items-center mr-5 xxxs:mr-3 ${
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
                            value={`${boss.krName}`}
                            id={`${type.difficulty}${boss.krName}`}
                            name="group"
                          />
                          {type.difficulty}
                        </label>
                      )
                    })}
                  </fieldset>
                </form>
              </div>
              <div className="flex w-48 min-w-48 xxs:min-w-48 xxs:w-48 xxxs:w-3/12 xxxs:min-w-24 justify-between xxxs:items-center">
                <select
                  onChange={handleBossPlayer}
                  className={` ${
                    currentBossArr.length < 12
                      ? ''
                      : !currentBossArr.includes(boss.name) && 'text-gray-500'
                  }`}
                  disabled={
                    currentBossArr.length < 12
                      ? false
                      : !currentBossArr.includes(boss.name)
                  }
                  name="player"
                  value={boss.player}
                  id={boss.krName + boss.type[0].difficulty}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
                <div className="">
                  {boss.type.map((el) => {
                    return (
                      (el.current || sort.value !== 'default') && (
                        <div
                          className={`ml-2 w-full break-all ${el.current ? 'text-black' : 'text-gray-500'}`}
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
            </div>
          )
        })}
      </>
    </ItemContainer>
  )
}

export default memo(BossSection)
