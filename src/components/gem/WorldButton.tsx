import { WorldType } from '@/type/character/world'
import { memo } from 'react'

type WorldListType = {
  world: WorldType
  current: boolean
}

interface WorldButtonPropsType {
  world: WorldListType
  handleWorldChange: (world: WorldListType) => void
}

const WorldButton = ({ world, handleWorldChange }: WorldButtonPropsType) => {
  return (
    <button
      className="mr-6"
      type="button"
      onClick={() => handleWorldChange(world)}
    >
      {world.world}
    </button>
  )
}

export default memo(WorldButton)
