import BossImage from '@/components/common/BossImage'
import { ChangeEvent, Fragment } from 'react'
import { BossRow } from '../_utils/mapper'

interface Props {
  rows: BossRow[]
  onChange: {
    setPlayer: (e: ChangeEvent<HTMLSelectElement>) => void
    setDifficulty: (e: ChangeEvent<HTMLInputElement>) => void
  }
}

const BossTable = ({ rows, onChange }: Props) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b dark:border-white/[0.2]">
          <th className="">보스</th>
          <th className="">
            난이도{' '}
            <span className="text-gray-500 dark:text-gray-400">
              (획득 격전의 흔적)
            </span>
          </th>
          <th className="">파티원</th>
        </tr>
      </thead>
      <tbody className="divide-y dark:divide-white/[0.2] [&>tr>td]:py-2">
        {rows.map((row) => (
          <Fragment key={row.name.name}>
            <tr className="border-b dark:border-white/[0.2]">
              <td align="center" className="flex items-center">
                <div className="size-8 rounded-lg overflow-hidden mr-2">
                  <BossImage boss={row.name.name} alt={row.name.krName} />
                </div>
                <span className="hidden md:block text-black dark:text-white">
                  {row.name.krName}
                </span>
              </td>
              <td className="">
                <form className="flex gap-4 flex-wrap">
                  {row.type.map((type) => (
                    <div className="flex gap-1" key={type.difficulty}>
                      <input
                        type="checkbox"
                        key={type.difficulty + row.name.name}
                        checked={type.current}
                        data-boss-id={row.name.name}
                        data-difficulty-id={type.difficulty}
                        onChange={onChange.setDifficulty}
                        id={`${type.difficulty}_${row.name.name}`}
                      />
                      <label
                        htmlFor={`${type.difficulty}_${row.name.name}`}
                        className="flex items-center text-sm"
                      >
                        {type.difficulty} ({type.reward})
                      </label>
                    </div>
                  ))}
                </form>
              </td>
              <td align="center">
                <select
                  onChange={onChange.setPlayer}
                  className="outline-none dark:border-white/[0.2] dark:bg-neutral-900 px-2 py-1 border rounded-lg"
                  data-boss-id={row.name.name}
                  id={row.name.name}
                  value={row.player.current}
                >
                  {[...Array(row.player.max)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default BossTable
