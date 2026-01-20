export const setYear = (year: number) => {
  const date = new Date()
  date.setFullYear(date.getFullYear() + year)

  return date
}

export const getDateAfterWeeks = (n: number) => {
  const currentDate = new Date()

  currentDate.setDate(currentDate.getDate() + n * 7)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()

  const koreanDate = `${year}년 ${month}월 ${day}일`

  return koreanDate
}

const WEEKDAY_KR = ['일', '월', '화', '수', '목', '금', '토'] as const

const parseYMD = (iso: string) => {
  const [date] = iso.split('T')
  const [year, month, day] = date.split('-').map(Number)
  return { year, month, day }
}

const getWeekdayKR = (iso: string) => {
  const date = new Date(iso)
  return WEEKDAY_KR[date.getDay()]
}

export const formatEventPeriod = (start: string, end: string): string => {
  const s = parseYMD(start)
  const e = parseYMD(end)

  return `${s.month}/${s.day} ${getWeekdayKR(start)} ~ ${e.month}/${e.day} ${getWeekdayKR(end)}`
}

export const isWithinDays = (targetDate: string | Date, days = 3) => {
  const now = new Date()
  const target = new Date(targetDate)

  const diffMs = now.getTime() - target.getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)

  return diffDays <= days
}
