import { QUEST_SUCCESS_REQUIREMENTS } from '@/constants/domain/astra'
import clsx from 'clsx'
import { QuestSuccess } from '../_hooks/useQuestSuccessForm'
import { calculateQuestEtas } from '../_utils/calculateQuestEtas'

interface Props {
  currentQuest: QuestSuccess
  result: { fragment: number; trace: number }
}

const Result = ({ currentQuest, result }: Props) => {
  const etas = calculateQuestEtas(
    QUEST_SUCCESS_REQUIREMENTS,
    result,
    new Date(),
    currentQuest,
  )

  return (
    <div className={clsx('flex flex-col gap-4 ')}>
      {etas.map((item) => (
        <div
          key={item.name}
          className="p-4 border rounded-md bg-white border-gray-200 dark:border-neutral-700 dark:bg-neutral-800"
        >
          <h3 className="text-lg font-medium">{item.name}</h3>
          {item.requiredDays !== Infinity ? (
            <>
              <div>{item.expectedDate}</div>
              <div>
                {item.requiredDays}일 후 클리어{' '}
                <span className="text-gray-500 dark:text-gray-400">
                  (매주 {result.trace}흔적/매일 {result.fragment}조각)
                </span>
              </div>
            </>
          ) : (
            <div key={item.name} className="text-red-500">
              <p>계산 불가 (획득량 확인 필요)</p>
            </div>
          )}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span className="mr-2">
              필요 조각 : {item.remaining.fragment.toLocaleString()}
            </span>
            <span>필요 흔적 : {item.remaining.trace.toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Result
