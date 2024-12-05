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
import BossDummy from './BossDummy'

interface BossSectionPropsType {
  unit: '일반' | '유닛'
}

const BossSection = ({ unit }: BossSectionPropsType) => {
  const { characterInfoList, setCharacterInfoList } =
    useCharacterInfoListContext()
  const [currentBossArr, setcurrentBossArr] = useState<any[]>([])

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
          if (boss.krName !== e.currentTarget.id) return boss

          const changeNum = Number(e.currentTarget.value)

          return { ...boss, player: changeNum }
        })

        return { ...item, boss: updatedBoss }
      }),
    )
  }
  return (
    <ItemContainer title="보스 리스트" className="relative">
      <>
        <div className="flex gap-4 mb-2 virtual-text-area w-[675px] xs:w-full xxxs:flex-wrap xxxs:gap-2 xxxs:mb-4">
          <button
            onClick={handleSetBoss}
            id="sde"
            className="px-2 bg-gray-200 rounded-xl"
            type="button"
          >
            스데
          </button>
          <button
            onClick={handleSetBoss}
            id="gaenseul"
            className="px-2 bg-gray-200 rounded-xl"
            type="button"
          >
            가엔슬
          </button>
          <button
            onClick={handleSetBoss}
            id="irushi"
            className="px-2 bg-gray-200 rounded-xl"
            type="button"
          >
            이루시
          </button>
          <button
            onClick={handleSetBoss}
            id="ruwill"
            className="px-2 bg-gray-200 rounded-xl"
            type="button"
          >
            이루윌
          </button>
          <button
            onClick={handleSetBoss}
            id="geommitsol"
            className="px-2 bg-gray-200 rounded-xl"
            type="button"
          >
            검밑솔
          </button>
          <button
            onClick={handleSetBoss}
            id="haseikal"
            className="px-2 bg-gray-200 rounded-xl"
            type="button"
          >
            하세이칼
          </button>
        </div>
        {currentChar.boss.map((boss) => {
          return (
            <div
              className="flex justify-between xxxs:mb-3 xxxs:border-b-[1px]"
              key={boss.name}
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
                  id={boss.krName}
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
                      el.current && (
                        <div
                          className="ml-2 w-full break-all"
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
