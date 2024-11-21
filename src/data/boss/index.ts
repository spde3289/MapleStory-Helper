import gaenseul from './gaenseulBoss.json'
import geommitsol from './geommitsolBoss.json'
import haseikal from './haseikalBoss.json'
import irushi from './irushiBoss.json'
import ruwill from './ruwillBoss.json'
import sde from './sdeBoss.json'

export type Boss = {
  name: string
  krName: string
  player: number
  type: {
    difficulty: string
    price: number
    current: boolean
  }[]
}[]

export type Bosses = {
  gaenseul: Boss
  geommitsol: Boss
  haseikal: Boss
  irushi: Boss
  ruwill: Boss
  sde: Boss
}

const bosses: Record<string, Boss> = {
  gaenseul,
  geommitsol,
  haseikal,
  irushi,
  ruwill,
  sde,
}

export default bosses
