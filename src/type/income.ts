// types/income.ts
export interface IncomeRecord {
  date: string // '2025-04-01'
  duration: number // 재획 시간 (분)
  pieces: number // 조각 수
  meso: number // 메소 수
  memo?: string // 비고
}
