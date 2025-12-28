import { WorldType } from '@/types/models/game/World'
import { JuboCharacter } from '@/types/storage/JubocCharacter'
import { useEffect, useMemo, useState } from 'react'

type WorldListType = {
  name: WorldType
  current: boolean
}

const extractUniqueWorldNames = (list: JuboCharacter[]): WorldType[] => {
  const set = new Set<WorldType>()
  for (const ch of list) {
    set.add(ch.characterInfo.userInfo.world_name as WorldType)
  }
  return Array.from(set)
}

const useWorldSelector = (list: JuboCharacter[]) => {
  const [worlds, setWorlds] = useState<WorldListType[]>([])

  const nextWorldNames = useMemo(() => extractUniqueWorldNames(list), [list])

  useEffect(() => {
    setWorlds((prev) => {
      const prevCurrent = prev.find((w) => w.current)?.name ?? prev[0]?.name
      const nextCurrent =
        prevCurrent && nextWorldNames.includes(prevCurrent)
          ? prevCurrent
          : nextWorldNames[0]

      return nextWorldNames.map((name) => ({
        name,
        current: name === nextCurrent,
      }))
    })
  }, [nextWorldNames])

  const selectWorld = (worldName: WorldType) => {
    setWorlds((prev) =>
      prev.map((w) => ({
        ...w,
        current: w.name === worldName,
      })),
    )
  }

  const currentWorld = useMemo(
    () => worlds.find((w) => w.current)?.name ?? worlds[0]?.name,
    [worlds],
  )

  return { worlds, selectWorld, currentWorld }
}

export default useWorldSelector
