import { useReducer } from 'react'
import { distributeProfitByPercent } from '../_utils/distributeProfitByPercent'

export type PartyMember = {
  id: string
  name: string
  ratio: number
}

type Mode = 'EQUAL' | 'MANUAL'

type State = {
  members: PartyMember[]
  mode: Mode
}

type Action =
  | { type: 'ADD_MEMBER' }
  | { type: 'REMOVE_MEMBER'; id: string }
  | { type: 'UPDATE_NAME'; id: string; name: string }
  | { type: 'UPDATE_RATIO'; id: string; ratio: number }
  | { type: 'EQUALIZE' }
  | { type: 'RESET' }

const MAX_MEMBERS = 6
const MAX_NAME_LENGTH = 8

const createId = () => crypto.randomUUID()
const clampName = (name: string) => name.slice(0, MAX_NAME_LENGTH)

const clampRatio = (n: number) => {
  if (!Number.isFinite(n)) return 0
  if (n < 0) return 0
  if (n > 100) return 100
  return Math.floor(n)
}

const equalizeMembers = (members: PartyMember[]) => {
  const n = members.length
  if (n === 0) return members

  const equalRatio = Math.floor(100 / n)
  return members.map((m) => ({ ...m, ratio: equalRatio }))
}

const initState = (): State => ({
  members: [{ id: createId(), name: '파티장', ratio: 100 }],
  mode: 'EQUAL',
})

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_MEMBER': {
      if (state.members.length >= MAX_MEMBERS) return state

      const nextMembers: PartyMember[] = [
        ...state.members,
        {
          id: createId(),
          name: `파티원 ${state.members.length}`,
          ratio: 0,
        },
      ]

      if (state.mode === 'EQUAL') {
        return { ...state, members: equalizeMembers(nextMembers) }
      }

      return { ...state, members: nextMembers }
    }

    case 'REMOVE_MEMBER': {
      const nextMembers = state.members.filter((m) => m.id !== action.id)

      if (state.mode === 'EQUAL') {
        return { ...state, members: equalizeMembers(nextMembers) }
      }

      return { ...state, members: nextMembers }
    }

    case 'UPDATE_NAME':
      return {
        ...state,
        members: state.members.map((m) =>
          m.id === action.id ? { ...m, name: clampName(action.name) } : m,
        ),
      }

    case 'UPDATE_RATIO':
      return {
        ...state,
        mode: 'MANUAL',
        members: state.members.map((m) =>
          m.id === action.id ? { ...m, ratio: clampRatio(action.ratio) } : m,
        ),
      }

    case 'EQUALIZE':
      return {
        ...state,
        mode: 'EQUAL',
        members: equalizeMembers(state.members),
      }

    case 'RESET':
      return initState()

    default:
      return state
  }
}

export const usePartyDistribution = (totalProfit: number, feeRate: number) => {
  const [state, dispatch] = useReducer(reducer, undefined, initState)

  const usedRatio = state.members.reduce((sum, m) => sum + m.ratio, 0)
  const remainingRatio = Math.max(0, 100 - usedRatio)
  const overRatio = usedRatio > 100 ? usedRatio - 100 : 0
  const canAddMember = state.members.length < MAX_MEMBERS

  const distribution = distributeProfitByPercent(
    totalProfit,
    feeRate,
    state.members,
    state.mode,
  )

  return {
    mode: state.mode,

    members: distribution.results,
    remainder: distribution.remainder,

    canAddMember: canAddMember,
    remainingRatio: remainingRatio,
    overRatio: overRatio,

    addMember: () => dispatch({ type: 'ADD_MEMBER' }),
    removeMember: (id: string) => dispatch({ type: 'REMOVE_MEMBER', id }),
    updateName: (id: string, name: string) =>
      dispatch({ type: 'UPDATE_NAME', id, name }),
    updateRatio: (id: string, ratio: number) =>
      dispatch({ type: 'UPDATE_RATIO', id, ratio }),
    equalize: () => dispatch({ type: 'EQUALIZE' }),
    resetMembers: () => dispatch({ type: 'RESET' }),
  }
}
