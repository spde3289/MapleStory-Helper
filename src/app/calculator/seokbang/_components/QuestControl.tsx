import { QUEST_SUCCESS_REQUIREMENTS } from '@/constants/domain/astra'
import { ChangeEvent } from 'react'
import { QuestSuccess } from '../_hooks/useQuestSuccessForm'

interface Props {
  currentQuest: QuestSuccess
  onChange: {
    setName: (e: ChangeEvent<HTMLSelectElement>) => void
    setLv: (e: ChangeEvent<HTMLInputElement>) => void
    setFragment: (e: ChangeEvent<HTMLInputElement>) => void
    setTrace: (e: ChangeEvent<HTMLInputElement>) => void
  }
}

const QuestControl = ({ onChange, currentQuest }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center mb-4">
      <div>
        <div className="text-sm mb-1">진행중인 보스</div>
        <select
          onChange={onChange.setName}
          className="mr-4 outline-none px-4 py-2 border dark:border-white/[0.2] rounded-lg dark:bg-neutral-900"
        >
          {QUEST_SUCCESS_REQUIREMENTS.map((item) => {
            return (
              <option key={item.name} id={item.name} value={item.name}>
                {item.name}
              </option>
            )
          })}
        </select>
      </div>
      <div className="flex flex-col ">
        <label className="text-sm mb-1" htmlFor="fragment">
          캐릭터 레벨
        </label>
        <input
          id="fragment"
          type="number"
          alt="캐릭터 레벨"
          className="w-20 py-2 px-3 border dark:border-white/[0.2] rounded-lg dark:bg-neutral-900 outline-none"
          onChange={onChange.setLv}
          value={currentQuest.lv}
        />{' '}
      </div>
      <div className="flex flex-col ">
        <label className="text-sm mb-1" htmlFor="fragment">
          보유 에리온의 조각
        </label>
        <input
          id="fragment"
          type="number"
          alt="보유 에리온의 조각"
          className="w-28 py-2 px-3 border dark:border-white/[0.2] rounded-lg dark:bg-neutral-900 outline-none"
          onChange={onChange.setFragment}
          value={currentQuest.fragment}
        />{' '}
      </div>
      <div className="flex flex-col  ">
        <label className="text-sm mb-1" htmlFor="trace">
          보유 격전의 흔적
        </label>
        <input
          id="trace"
          type="number"
          alt="보유 보유 격전의 흔적"
          className="w-28 py-2 px-3 border dark:border-white/[0.2] rounded-lg dark:bg-neutral-900 outline-none"
          onChange={onChange.setTrace}
          value={currentQuest.trace}
        />{' '}
      </div>
    </div>
  )
}

export default QuestControl
