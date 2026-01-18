import { QuestSuccess } from '../_hooks/useQuestSuccessForm'

type QuestRequirement = { name: string; trace: number; fragment: number }

type Rates = { fragment: number; trace: number }

const ceilDiv = (a: number, b: number) => (b <= 0 ? Infinity : Math.ceil(a / b))

const addDays = (date: Date, days: number) => {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export const calculateQuestEtas = (
  requirements: QuestRequirement[],
  rates: Rates,
  startDate = new Date(),
  progress: QuestSuccess,
) => {
  const startIndex = requirements.findIndex((r) => r.name === progress.name)

  const targetRequirements =
    startIndex >= 0 ? requirements.slice(startIndex) : requirements

  let cursorDate = startDate
  let accumulatedDays = 0

  return targetRequirements.map((req, idx) => {
    const isCurrentQuest = startIndex >= 0 && idx === 0

    const remainingFragment = Math.max(
      0,
      req.fragment - (isCurrentQuest ? progress.fragment : 0),
    )
    const remainingTrace = Math.max(
      0,
      req.trace - (isCurrentQuest ? progress.trace : 0),
    )

    const fragmentDays = ceilDiv(remainingFragment, rates.fragment)
    const traceWeeks = ceilDiv(remainingTrace, rates.trace)
    const traceDays = traceWeeks * 7

    const currentQuestDays = Math.max(fragmentDays, traceDays)

    accumulatedDays += currentQuestDays
    cursorDate = addDays(startDate, accumulatedDays)

    return {
      name: req.name,
      remaining: {
        fragment: remainingFragment,
        trace: remainingTrace,
      },
      requiredDays: accumulatedDays,
      expectedDate: cursorDate.toLocaleDateString('ko-KR'),
    }
  })
}
