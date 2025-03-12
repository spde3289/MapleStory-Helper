import BossImage from '@/components/common/BossImage'
import { formatKoreanNumber } from '@/utils/numberUtils'
import { ChangeEventHandler } from 'react'

interface BossFieldProps {
  boss: {
    name: string
    krName: string
    player: number
    type: {
      difficulty: string
      price: number
      current: boolean
    }[]
  }
  unit: '일반' | '유닛'
  sort: {
    value: 'default' | 'up' | 'down'
    icon: JSX.Element
  }
  currentBossArr: string[]
  haldler: ChangeEventHandler<HTMLInputElement>
  handleBossPlayer: ChangeEventHandler<HTMLSelectElement>
}

const BossField = ({
  boss,
  handleBossPlayer,
  currentBossArr,
  haldler,
  sort,
  unit,
}: BossFieldProps) => {
  return (
    <tr
      className=" w-max dark:border-white/[0.2] border-b"
      key={
        boss.type.length >= 2
          ? boss.name
          : `${boss.name}_${boss.type[0].difficulty}`
      }
    >
      <td className="flex items-center gap-2 w-fit xsm:w-[180px]">
        <div className="size-8 rounded-lg overflow-hidden">
          <BossImage boss={boss.name} />
        </div>
        <div className="hidden xsm:block">{boss.krName}</div>
      </td>
      <td className="">
        <form
          style={
            sort.value === 'default'
              ? { justifyContent: '' }
              : { justifyContent: 'center' }
          }
          className="flex gap-4 w-[262px]"
        >
          {boss.type.map((type) => {
            return (
              <label
                key={type.difficulty}
                className={`flex items-center ${
                  currentBossArr.length < 12
                    ? 'hover:text-gray-600 dark:hover:text-gray-400'
                    : !currentBossArr.includes(boss.name) && 'text-gray-500'
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
                  value={boss.krName}
                  id={`${type.difficulty}${boss.krName}`}
                  name="group"
                />
                {type.difficulty}
              </label>
            )
          })}
        </form>
      </td>
      <td>
        <select
          onChange={handleBossPlayer}
          style={
            currentBossArr.length >= 12 && !currentBossArr.includes(boss.name)
              ? { color: '#6B7280' }
              : {}
          }
          className="w-fit dark:bg-gray-800 dark:border-white/[0.2] border rounded-lg h-fit px-2 py-1 outline-none"
          disabled={
            currentBossArr.length < 12
              ? false
              : !currentBossArr.includes(boss.name)
          }
          name="player"
          value={boss.player}
          id={
            boss.type.length >= 2
              ? boss.name
              : `${boss.name}_${boss.type[0].difficulty}`
          }
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </td>
      <td className="min-w-fit w-36 whitespace-nowrap text-xs md:text-sm">
        {boss.type.map((el) => {
          return (
            (el.current || sort.value !== 'default') && (
              <div
                style={
                  unit === '유닛'
                    ? { textAlign: 'right' }
                    : { textAlign: 'center' }
                }
                className={` ${
                  el.current
                    ? 'text-gray-900 dark:text-white/90'
                    : 'text-gray-500'
                }`}
                key={el.difficulty}
              >
                {unit === '유닛'
                  ? Math.floor(el.price / boss.player).toLocaleString()
                  : formatKoreanNumber(Math.floor(el.price / boss.player))}{' '}
                메소
              </div>
            )
          )
        })}
      </td>
    </tr>
  )
}

export default BossField
