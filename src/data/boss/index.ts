export type BossType = {
  name: string
  krName: string
  player: number
  type: {
    difficulty: string
    price: number
    current: boolean
  }[]
}[]

export type BossesType = {
  nokallica: BossType
  gaenseul: BossType
  geommitsol: BossType
  haseikal: BossType
  irushi: BossType
  ruwill: BossType
  hasuu: BossType
  sde: BossType
}
