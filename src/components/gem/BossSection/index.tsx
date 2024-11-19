import BossImage from '@/commonComponents/BossImage'
import ItemContainer from '@/commonComponents/ItemContainer'
import { useCharacterInfoListContext } from '@/context/characterInfoListContext'
import { ChangeEvent, memo, useEffect, useState } from 'react'
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

  return (
    <ItemContainer title="보스 리스트">
      <>
        {currentChar.boss.map((boss) => {
          return (
            <div className="flex" key={boss.name}>
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
              </form>
            </div>
          )
        })}
      </>
    </ItemContainer>
  )
}

export default memo(BossSection)
