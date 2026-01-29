import { formatKoreanNumber } from '@/utils/numberUtils'
import { IoIosRemove } from 'react-icons/io'
import { DistributionResult } from '../_utils/distributeProfitByPercent'

interface Props {
  member: DistributionResult
  canRemove: boolean
  onChangeName: (id: string, name: string) => void
  onChangeRatio: (id: string, ratio: number) => void
  onRemove: (id: string) => void
}

const PartyMemberCard = ({
  member,
  canRemove,
  onChangeName,
  onChangeRatio,
  onRemove,
}: Props) => {
  return (
    <div className="flex justify-between items-center rounded-md border border-gray-300 dark:border-white/[0.2] dark:bg-neutral-900 px-3 py-2 text-sm md:text-base">
      <div>
        <div className="mb-2 flex gap-2 md:gap-4">
          <input
            className="focus:outline-none w-36 rounded-md border border-gray-300 dark:border-white/[0.2] dark:bg-neutral-900 px-1.5 py-0.5 text-sm md:text-base"
            value={member.name}
            placeholder="핑크빈"
            maxLength={8}
            onChange={(e) => onChangeName(member.id, e.target.value)}
          />
          <div className="flex gap-1 w-20 items-center rounded-md border border-gray-300 dark:border-white/[0.2] dark:bg-neutral-900 px-1.5 py-0.5 text-sm md:text-base">
            <input
              className="min-w-0 text-left flex-1 w-0 bg-transparent focus:outline-none"
              value={member.ratio}
              type="number"
              inputMode="numeric"
              min={0}
              max={100}
              onChange={(e) => onChangeRatio(member.id, Number(e.target.value))}
            />
            <span className="shrink-0 font-light">%</span>
          </div>
        </div>
        <div className="text-[13px] text-gray-600 dark:text-gray-300">
          송금할 금액:{' '}
          <span className="text-[16px] font-semibold text-blue-700 dark:text-blue-400">
            {formatKoreanNumber(member.transferAmount)}
          </span>{' '}
          메소
        </div>
        <div className="text-[13px] text-gray-600 dark:text-gray-300">
          최종 분배금:{' '}
          <span className="text-[16px] font-semibold text-blue-700 dark:text-blue-400">
            {formatKoreanNumber(member.finalReceivedAmount)}
          </span>{' '}
          메소
        </div>
      </div>
      {canRemove && (
        <button
          className="rounded-md p-4 text-red-600 hover:bg-red-50 dark:hover:bg-white/[0.06]"
          onClick={() => onRemove(member.id)}
          aria-label="파티원 제거"
        >
          <IoIosRemove size={24} />
        </button>
      )}
    </div>
  )
}

export default PartyMemberCard
