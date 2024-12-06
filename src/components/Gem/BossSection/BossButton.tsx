import { MouseEventHandler } from 'react'

interface BossButtonProps {
  id: string
  handleSetBoss: MouseEventHandler<HTMLButtonElement>
  name: string
  tip: string
}

const BossButton = ({ id, handleSetBoss, name, tip }: BossButtonProps) => {
  return (
    <div className="relative group">
      <button
        onClick={handleSetBoss}
        id={id}
        className="px-2 bg-gray-200 rounded-xl"
        type="button"
      >
        {name}
      </button>
      <div
        role="tooltip"
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
      >
        {tip}
      </div>
    </div>
  )
}

export default BossButton
