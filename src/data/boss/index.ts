import gaenseul from './gaenseulBoss.json'
import geommitsol from './geommitsolBoss.json'
import haseikal from './haseikalBoss.json'
import irushi from './irushiBoss.json'
import ruwill from './ruwillBoss.json'
import sde from './sdeBoss.json'

type Boss = {
  name: string
  krName: string
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
