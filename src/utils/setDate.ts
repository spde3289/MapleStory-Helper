export const setYear = (year: number) => {
  const date = new Date()
  date.setFullYear(date.getFullYear() + year)

  return date
}
