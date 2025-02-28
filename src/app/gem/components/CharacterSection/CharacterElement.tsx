// import bossIcons from '@/assets/icons/boss'
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
  character: characterInfo
  currentWorld: WorldListType | undefined
}

const CharacterElement = ({
  character,
  currentWorld,
}: CharacterElementPropsType) => {
  const { setCharacterInfoList } = useCharacterInfoListContext()
  const [currentBossList, setCurrentBossList] = useState<any[]>([])
  const { theme } = useTheme()

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

  // const currentCss = character.currentCharacter
  //   ? 'dark:bg-gray-900 bg-gray-200 '
  //   : ''

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
      className="p-4 border relative rounded-lg flex flex-col dark:border-white/[0.2]"
    >
      <div className="flex flex-col xsm:flex-row justify-between items-center gap-4 ">
        <div>
          <div className="w-24 h-24 overflow-hidden">
            <CharacterImage src={character.character_image} />
          </div>
          <div className="text-center">
            <span>{character.character_name}</span>
          </div>
        </div>
        <div className="flex w-60 xsm:w-full justify-start flex-wrap gap-2 ">
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
      </div>
      <div className="flex flex-col xsm:flex-row justify-between items-center mt-3 border-t pt-2 ">
        <div className="flex gap-1 items-center">
          <span>{character.final_stat[42].stat_name}:</span>
          <span>{combatPower}</span>
        </div>
        <div className="flex gap-1">
          <span>수익: </span>
          <span>{formatKoreanNumber(totalPrice)} 메소</span>
        </div>
      </div>
      <button
        onClick={deleteCharacter}
        className="w-4 h-4 absolute -top-2 -right-2 rounded-full  bg-red-400"
        type="button"
        aria-label={`${character.character_name} 삭제 버튼`}
      >
        <IoCloseOutline className="w-full h-full text-white" />
      </button>
    </div>
  )
}

export default memo(CharacterElement)

// <div
//   onClick={handleCharacter}
//   onKeyDown={handleCharacter}
//   tabIndex={0}
//   role="button"
//   className={`border rounded-lg justify-center items-center dark:border-white/[0.2] border-b flex ${currentCss} lg:justify-between relative`}
// >
//   <div className="flex flex-col sm:w-full xsm:items-end xsm:flex-row px-4 xsm:gap-0 lg:w-fit ">
//     <div className="flex min-w-32 items-end xsm:items-start lg:items-start gap-4 xsm:gap-1 mb-2 xsm:flex-col sm:gap-0 sm:mb-0">
//       <div className=" flex items-center flex-col text-sm lg:mr-4 min-w-24 h-32 ">
//         <CharacterImage className="" src={character.character_image} />
//         {character.character_name}
//       </div>
//       <div>
//         <div className="sm:w-full sm:text-center">
//           LV. {character.character_level}
//         </div>
//         <div>
//           <div className="text-xs">
//             {character.final_stat[42].stat_name}
//           </div>
//           <div>{combatPower}</div>
//         </div>
//       </div>
//     </div>
//     <div className="sm:w-full">
//       <div className="justify-around w-full items-center lg:gap-1 flex-1 grid grid-cols-6 gap-2 justify-items-center mb-2 ">
//         {currentBossList.map((boss) => {
//           return (
//             <div className="flex flex-col items-center" key={boss.name}>
//               <BossImage boss={boss.name} />
//               <div className="text-xs">{boss.difficulty}</div>
//             </div>
//           )
//         })}
//       </div>
//       <div className="text-right flex justify-end items-end">
//         {/* <span className="ml-1">{currentBossList.length} / 12</span> */}
//         <span>
//           <div className="text-xs">수익</div>
//           <div>{formatKoreanNumber(totalPrice)} 메소</div>
//         </span>
//       </div>
//     </div>
//   </div>
//   <button
//     onClick={deleteCharacter}
//     className="w-4 h-4 absolute -top-2 -right-2 rounded-full  bg-red-400"
//     type="button"
//     aria-label={`${character.character_name} 삭제 버튼`}
//   >
//     <IoCloseOutline className="w-full h-full text-white" />
//   </button>
// </div>
