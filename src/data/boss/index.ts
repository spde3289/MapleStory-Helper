import gaenseul from './gaenseulBoss.json'
import geommitsol from './geommitsolBoss.json'
import haseikal from './haseikalBoss.json'
import hasuu from './hasuuBoss.json'
import irushi from './irushiBoss.json'
import nokallica from './nokallicaBoss.json'
import ruwill from './ruwillBoss.json'
import sde from './sdeBoss.json'

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

const bosses: Record<string, BossType> = {
  gaenseul,
  nokallica,
  geommitsol,
  haseikal,
  irushi,
  ruwill,
  hasuu,
  sde,
}

export default bosses
