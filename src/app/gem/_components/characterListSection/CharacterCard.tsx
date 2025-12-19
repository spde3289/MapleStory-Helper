import BossImage from '@/components/common/BossImage'
import CharacterImage from '@/components/common/CharacterImage'

import { useTheme } from '@/context/ThemeContext'
import { useJuboCharacterStore } from '@/stores/useJubocCharacter'
import { JuboCharacter } from '@/types/storage/JubocCharacter'
import { formatKoreanNumber } from '@/utils/numberUtils'
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

  const meso =
    unit === '유닛'
      ? Math.floor(
          calcSelectedBossesTotalPrice(character.bosses).total,
        ).toLocaleString()
      : formatKoreanNumber(
          Math.floor(calcSelectedBossesTotalPrice(character.bosses).total),
        )

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => selectCharacter(character.characterName)}
      onKeyDown={() => selectCharacter(character.characterName)}
      style={
        selectedCharacter === character.characterName
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
            <CharacterImage
              src={character.characterInfo.userInfo.character_image}
            />
          </div>
          <div className="text-center">
            <span className="">{character.characterName}</span>
          </div>
        </div>
        <div
          style={simpleMode ? { display: 'none' } : {}}
          className="flex w-60 xsm:w-full justify-start flex-wrap gap-2 "
        >
          {character.bosses?.map((boss) => {
            return (
              <div className="" key={boss.bossId}>
                <div className="size-8 md:size-10 rounded-lg overflow-hidden">
                  <BossImage boss={boss.bossId} alt={boss.bossId} />
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
            ...(character.bosses.length < 12
              ? { color: '#dc2626' }
              : { color: '#16a34a' }),
          }}
        >
          {character.bosses.length}{' '}
          <span className="text-gray-900 dark:text-white/90"> / 12 </span>
        </div>
      </div>
      <div
        style={{
          ...(character.characterName
            ? { borderColor: theme === 'dark' ? '#e5e7eb' : '#111827' }
            : {}),
          ...(simpleMode ? { marginTop: '4px', paddingTop: '4px' } : {}),
        }}
        className="flex flex-col xsm:flex-row justify-between items-center mt-3 border-t pt-2 "
      >
        <div className="flex gap-1 items-center">
          <span>전투력 : </span>
          <span>{combatPower}</span>
        </div>
        <div className="flex gap-1">
          <span>수익 : </span>
          <span>{meso} 메소</span>
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
