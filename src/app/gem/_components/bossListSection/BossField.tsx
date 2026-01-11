'use client'

import BossImage from '@/components/common/BossImage'
import { useJuboCharacterStore } from '@/stores/useJubocCharacter'
import { BossDifficultyType, BossInfo } from '@/types/domain/game/bosstype'
import { useEffect, useMemo, useState } from 'react'
import BossPrice from './BossPrice'

interface Props {
  boss: BossInfo
  unit: '일반' | '유닛'
  sort: {
    value: 'default' | 'up' | 'down'
    icon: JSX.Element
  }
}

const BossField = ({ sort, unit, boss }: Props) => {
  const characters = useJuboCharacterStore((s) => s.characters)
  const selectedCharacter = useJuboCharacterStore((s) => s.selectedCharacter)
  const setBossSelection = useJuboCharacterStore((s) => s.setBossSelection)

  const currentBosses = useMemo(() => {
    if (!selectedCharacter) return []
    return (
      characters.find((c) => c.characterName === selectedCharacter)?.bosses ??
      []
    )
  }, [characters, selectedCharacter])

  const currentBoss = useMemo(() => {
    return currentBosses.find((b) => b.bossId === boss.bossId) ?? null
  }, [currentBosses, boss.bossId])

  const [selectedDifficulty, setSelectedDifficulty] =
    useState<BossDifficultyType | null>(null)
  const [partySize, setPartySize] = useState<number>(1)

  useEffect(() => {
    setSelectedDifficulty(currentBoss?.difficulty ?? null)
    setPartySize(currentBoss?.partySize ?? 1)
  }, [
    selectedCharacter,
    boss.bossId,
    currentBoss?.difficulty,
    currentBoss?.partySize,
  ])

  const emit = (
    nextDifficulty: BossDifficultyType | null,
    nextPartySize: number,
  ) => {
    if (!selectedCharacter) return

    setBossSelection(selectedCharacter, {
      bossId: boss.bossId,
      difficulty: nextDifficulty,
      partySize: nextPartySize,
    })
  }

  const handleSelectedDifficulty = (difficulty: BossDifficultyType) => {
    const next = selectedDifficulty === difficulty ? null : difficulty
    setSelectedDifficulty(next)

    emit(next, partySize)
  }

  const handlePartySize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextPartySize = Number(e.target.value)
    setPartySize(nextPartySize)

    if (selectedDifficulty === null) return
    emit(selectedDifficulty, nextPartySize)
  }
  const isSelected = currentBoss !== null
  const isLimitReached = currentBosses.length >= 12
  const isSelectionDisabled =
    !selectedCharacter || (isLimitReached && !isSelected)

  return (
    <tr
      className="w-max dark:border-white/[0.2] border-b"
      key={
        boss.difficulties.length >= 2
          ? boss.bossId
          : `${boss.bossId}_${boss.difficulties[0].difficulty}`
      }
    >
      <td className="flex items-center gap-2 w-fit">
        <div className="size-10 md:size-8 rounded-lg overflow-hidden">
          <BossImage boss={boss.bossId} alt={boss.bossName} />
        </div>
        <div className="text-sm hidden sm:block">{boss.bossName}</div>
      </td>
      <td>
        <form
          style={
            sort.value === 'default'
              ? { justifyContent: '' }
              : { justifyContent: 'center' }
          }
          className="flex flex-row flex-wrap gap-2"
        >
          {boss.difficulties.map((type) => (
            <label
              key={type.difficulty}
              className="flex items-center"
              htmlFor={`${type.difficulty}${boss.bossName}`}
            >
              <input
                checked={selectedDifficulty === type.difficulty}
                onChange={() => handleSelectedDifficulty(type.difficulty)}
                className="mr-1"
                type="checkbox"
                value={boss.bossName}
                id={`${type.difficulty}${boss.bossName}`}
                name={`difficulty-${boss.bossId}`}
                disabled={isSelectionDisabled}
              />
              {type.difficulty}
            </label>
          ))}
        </form>
      </td>
      <td>
        <select
          onChange={handlePartySize}
          value={partySize}
          className="w-fit dark:bg-gray-800 dark:border-white/[0.2] border rounded-lg h-fit px-2 py-1 outline-none"
          name="player"
          id={
            boss.difficulties.length >= 2
              ? boss.bossId
              : `${boss.bossName}_${boss.difficulties[0].difficulty}`
          }
          disabled={isSelectionDisabled}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </td>
      <td className="min-w-fit whitespace-nowrap text-xs md:text-sm">
        <BossPrice
          boss={boss}
          selectedDifficulty={selectedDifficulty}
          partySize={partySize}
          unit={unit}
        />
      </td>
    </tr>
  )
}

export default BossField
