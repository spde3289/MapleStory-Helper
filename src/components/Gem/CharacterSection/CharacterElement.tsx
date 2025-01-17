import BossImage from '@/commonComponents/BossImage'
import CharacterImage from '@/commonComponents/CharacterImage'
import {
  characterInfo,
  useCharacterInfoListContext,
} from '@/context/characterInfoListContext'
import { WorldType } from '@/type/character/world'
import { formatKoreanNumber } from '@/utils/numberUtils'
import { memo, useEffect, useState } from 'react'
import { IoTrashOutline } from 'react-icons/io5'

type WorldListType = {
  world: WorldType
  current: boolean
}

interface CharacterElementPropsType {
  character: characterInfo
  currentWorld: WorldListType | undefined
}

const CharacterElement = ({
  character,
  currentWorld,
}: CharacterElementPropsType) => {
  const { setCharacterInfoList } = useCharacterInfoListContext()
  const [currentBossList, setCurrentBossList] = useState<any[]>([])

  // 보스 난이도 선택 로직
  useEffect(() => {
    const arr: any[] = []
    character?.boss.forEach((boss) => {
      if (boss.type.filter((type) => type.current === true).length !== 0) {
        arr.push({
          name: boss.name,
          krName: boss.krName,
          difficulty: boss.type.find((type) => type.current === true)
            ?.difficulty,
          price: boss.type.find((type) => type.current === true)?.price,
        })
        setCurrentBossList(arr)
      } else if (arr.length === 0) {
        setCurrentBossList([])
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character])
  // 선택한 월드 캐릭터만 보여줌
  if (currentWorld?.world !== character.world_name) return null
  // 캐릭터 선택 로직
  const handleCharacter = () => {
    setCharacterInfoList((pre) =>
      pre.map((char) => {
        return {
          ...char,
          currentCharacter:
            char.ocid === character.ocid ? !char.currentCharacter : false,
        }
      }),
    )
  }

  const combatPower = formatKoreanNumber(character.final_stat[42].stat_value)

  const currentCss = character.currentCharacter ? 'bg-white' : ''

  const deleteCharacter = () => {
    setCharacterInfoList((pre) =>
      pre.filter((char) => {
        return char.character_name !== character.character_name
      }),
    )
  }

  const totalPrice = currentBossList.reduce((acc, cur) => {
    return acc + cur.price
  }, 0)
  console.log(totalPrice)

  return (
    <div
      onClick={handleCharacter}
      onKeyDown={handleCharacter}
      tabIndex={0}
      role="button"
      className={`items-center flex ${currentCss} lg:justify-between rounded-lg pr-3 xxxs:px-1 xxs:py-2 xxxs:relative`}
    >
      <div className="flex items-center xxxs:flex-col xxxs:w-full w-full flex-1">
        <div className="flex items-center min-w-52 xxxs:mb-1">
          <div className="flex items-center flex-col text-sm lg:mr-4 w-24 min-w-24 xs:mr-2 ">
            <CharacterImage
              width={48}
              height={48}
              src={character.character_image}
            />
            {character.character_name}
            <span>LV. {character.character_level}</span>
          </div>
          <div className="h-fit w-32 min-w-32">
            <div>
              <div className="text-xs">
                {character.final_stat[42].stat_name}
              </div>
              <div>{combatPower}</div>
            </div>
            <div>
              <div className="text-xs">수익</div>
              <div>{formatKoreanNumber(totalPrice)} 메소</div>
            </div>
          </div>
        </div>
        <div className="flex justify-around w-full items-center lg:gap-1 mr-3 xxxs:mr-0 flex-1 xxs:grid xxs:grid-cols-6 xxxs:gap-4 xxxs:w-full justify-items-center">
          {currentBossList.map((boss) => {
            return (
              <div className="flex flex-col w-10 items-center" key={boss.name}>
                <BossImage boss={boss.name} />
                <div className="text-xs">{boss.difficulty}</div>
              </div>
            )
          })}
        </div>
      </div>
      <button
        onClick={deleteCharacter}
        className="xs:w-6 xs:h-6 xxxs:w-5 xxxs:h-5 xxxs:absolute xxxs:top-2 xxxs:right-2"
        type="button"
        aria-label={`${character.character_name} 삭제 버튼`}
      >
        <IoTrashOutline className="w-full h-full" />
      </button>
    </div>
  )
}

export default memo(CharacterElement)
