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
