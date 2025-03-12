import BossImage from '@/components/common/BossImage'
import CharacterImage from '@/components/common/CharacterImage'
import {
  characterInfo,
  useCharacterInfoListContext,
} from '@/context/characterInfoListContext'
import { useTheme } from '@/context/ThemeContext'
import { WorldType } from '@/type/character/world'
import { formatKoreanNumber } from '@/utils/numberUtils'
import { memo, useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'

type WorldListType = {
  world: WorldType
  current: boolean
}

interface CharacterElementPropsType {
  simpleMode: boolean
  character: characterInfo
  currentWorld: WorldListType | undefined
  unit: '일반' | '유닛'
}

const CharacterElement = ({
  simpleMode,
  character,
  currentWorld,
  unit,
}: CharacterElementPropsType) => {
  const { setCharacterInfoList } = useCharacterInfoListContext()
  const [currentBossList, setCurrentBossList] = useState<any[]>([])
  const { theme } = useTheme()

  // 보스 난이도 선택 로직
  useEffect(() => {
    if (!character?.boss) {
      setCurrentBossList([])
      return
    }

    const bossList = character.boss
      .filter((boss) => boss.type.some((type) => type.current))
      .map((boss) => {
        const currentType = boss.type.find((type) => type.current)
        const price =
          currentType?.price && boss.player && boss.player !== 0
            ? currentType.price / boss.player
            : 0

        return {
          name: boss.name,
          krName: boss.krName,
          difficulty: currentType?.difficulty,
          price,
        }
      })

    setCurrentBossList(bossList)
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

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCharacter}
      onKeyDown={handleCharacter}
      style={
        character.currentCharacter
          ? { backgroundColor: theme === 'dark' ? '#111827' : '#e5e7eb' }
          : {}
      }
      className="p-4 group border relative rounded-lg flex flex-col dark:border-white/[0.2]"
    >
      <div className="flex flex-col xsm:flex-row justify-between items-center gap-4 ">
        <div>
          <div
            style={simpleMode ? { display: 'none' } : {}}
            className="w-24 h-24 overflow-hidden"
          >
            <CharacterImage src={character.character_image} />
          </div>
          <div className="text-center">
            <span className="">{character.character_name}</span>
          </div>
        </div>
        <div
          style={simpleMode ? { display: 'none' } : {}}
          className="flex w-60 xsm:w-full justify-start flex-wrap gap-2 "
        >
          {currentBossList?.map((boss) => {
            return (
              <div className="" key={boss.name}>
                <div className="size-8 md:size-10 rounded-lg overflow-hidden">
                  <BossImage boss={boss.name} />
                </div>
                <div className="text-xs w-[32px] text-center truncate">
                  <span>{boss.difficulty}</span>
                </div>
              </div>
            )
          })}
        </div>
        <div
          style={{
            ...(simpleMode ? {} : { display: 'none' }),
            ...(currentBossList.length < 12
              ? { color: '#dc2626' }
              : { color: '#16a34a' }),
          }}
        >
          {currentBossList.length}{' '}
          <span className="text-gray-900 dark:text-white/90"> / 12 </span>
        </div>
      </div>
      <div
        style={{
          ...(character.currentCharacter
            ? { borderColor: theme === 'dark' ? '#e5e7eb' : '#111827' }
            : {}),
          ...(simpleMode ? { marginTop: '4px', paddingTop: '4px' } : {}),
        }}
        className="flex flex-col xsm:flex-row justify-between items-center mt-3 border-t pt-2 "
      >
        <div className="flex gap-1 items-center">
          <span>{character.final_stat[42].stat_name} : </span>
          <span>{combatPower}</span>
        </div>
        <div className="flex gap-1">
          <span>수익 : </span>
          <span>
            {/* {formatKoreanNumber(totalPrice)} */}
            {unit === '유닛'
              ? Math.floor(totalPrice).toLocaleString()
              : formatKoreanNumber(Math.floor(totalPrice))}{' '}
            메소
          </span>
        </div>
      </div>
      <button
        onClick={deleteCharacter}
        className="size-4 group-hover:block hidden absolute -top-1 -right-1 rounded-full bg-red-400"
        type="button"
        aria-label={`${character.character_name} 삭제 버튼`}
      >
        <IoCloseOutline className="w-full h-full text-white" />
      </button>
    </div>
  )
}

export default memo(CharacterElement)
