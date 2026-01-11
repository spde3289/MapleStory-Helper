import CharacterImage from '@/components/common/CharacterImage'

import { useTheme } from '@/context/ThemeContext'
import { useJuboCharacterStore } from '@/stores/useJubocCharacter'
import { JuboCharacter } from '@/types/storage/JubocCharacter'
import { formatKoreanNumber } from '@/utils/numberUtils'
import clsx from 'clsx'
import { memo } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { calcSelectedBossesTotalPrice } from '../../_utils/calcSelectedBossesTotalPrice'

interface CharacterElementPropsType {
  simpleMode: boolean
  character: JuboCharacter
  unit: '일반' | '유닛'
}

const CharacterCard = ({
  simpleMode,
  character,
  unit,
}: CharacterElementPropsType) => {
  const selectCharacter = useJuboCharacterStore((s) => s.selectCharacter)
  const removeCharacter = useJuboCharacterStore((s) => s.removeCharacter)
  const selectedCharacter = useJuboCharacterStore((s) => s.selectedCharacter)
  const { theme } = useTheme()

  const combatPower = formatKoreanNumber(
    character.characterInfo.userStat.combat_power,
  )

  const level = character.characterInfo.userInfo.character_level

  const characterClass = character.characterInfo.userInfo.character_class

  const meso =
    unit === '유닛'
      ? calcSelectedBossesTotalPrice(character.bosses).toLocaleString()
      : formatKoreanNumber(calcSelectedBossesTotalPrice(character.bosses))

  return (
    <div
      role="button"
      onClick={() => selectCharacter(character.characterName)}
      onKeyDown={() => selectCharacter(character.characterName)}
      className={clsx(
        selectedCharacter === character.characterName
          ? 'bg-orange-200 border dark:bg-neutral-900 border-neutral-300 dark:border-neutral-600'
          : 'dark:bg-neutral-800',
        'px-2.5 py-1.5 group border relative rounded-lg flex flex-col dark:border-white/[0.2]',
      )}
    >
      <div className="flex items-center gap-2">
        <div>
          <div
            style={simpleMode ? { display: 'none' } : {}}
            className="w-20 h-24 overflow-hidden bg-white rounded-md border"
          >
            <CharacterImage
              src={character.characterInfo.userInfo.character_image}
            />
          </div>
        </div>
        <div
          className={clsx(
            theme === 'dark' ? 'border-#e5e7eb' : 'border-#111827',
            'flex flex-col justify-between items-start text-gray-900 dark:text-gray-200 text-sm',
          )}
        >
          <div className="text-center">{character.characterName}</div>
          <div className="flex gap-1 items-center ">
            <span>Lv.</span>
            <span>{level}</span>
            <span>{characterClass}</span>
          </div>
          <div className="flex gap-1 items-center ">
            <span>전투력 </span>
            <span className="">{combatPower}</span>
          </div>
          <div className="flex gap-1 font-semibold ">
            <span>수익 : </span>
            <span>{meso} 메소</span>
          </div>
          <div
            className={clsx(
              character.bosses.length < 12
                ? 'text-[#dc2626]'
                : 'text-[#16a34a]',
              'text-sm',
            )}
          >
            {character.bosses.length}
            <span className="text-gray-900 dark:text-white/90"> / 12 </span>
          </div>
        </div>
      </div>
      <button
        onClick={() => removeCharacter(character.characterName)}
        className="size-4 group-hover:block hidden absolute -top-1 -right-1 rounded-full bg-red-400"
        type="button"
        aria-label={`${character.characterName} 삭제 버튼`}
      >
        <IoCloseOutline className="w-full h-full text-white" />
      </button>
    </div>
  )
}

export default memo(CharacterCard)
