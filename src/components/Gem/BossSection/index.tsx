import BossImage from '@/commonComponents/BossImage'
import ItemContainer from '@/commonComponents/ItemContainer'
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
import BossDummy from './BossDummy'

// interface CheckedBoss {
//   current: boolean
//   difficulty: string
//   name: string
//   price: number
// }

const BossSection = () => {
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
        <div className="flex gap-4 mb-2 virtual-text-area w-[520px]">
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
            <div className="flex justify-between" key={boss.name}>
              <div className="flex">
                <div className="flex items-center w-48 mb-1">
                  <BossImage className="mr-2" boss={boss.name} />
                  <div>{boss.krName}</div>
                </div>
                <form>
                  <fieldset className="flex">
                    {boss.type.map((type) => {
                      return (
                        <label
                          key={type.difficulty}
                          className={`flex items-center mr-5 ${
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

                  {/* <label htmlFor="cars">Choose a car:</label> */}
                </form>
              </div>
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
            </div>
          )
        })}
      </>
    </ItemContainer>
  )
}

export default memo(BossSection)