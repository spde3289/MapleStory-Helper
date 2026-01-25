import { useReducer } from 'react'

// 1000조
const MAX_VALUE = 1e15

type State = {
  saleAmount: number
  netAmount: number
  feeRate: number
  lastEdited: 'SALE' | 'NET'
}

type Action =
  | { type: 'SET_SALE'; value: number }
  | { type: 'SET_NET'; value: number }
  | { type: 'SET_FEE_RATE'; value: number }
  | { type: 'RESET'; defaultFeeRate: number }

const sanitizeValue = (n: number) => {
  if (!Number.isFinite(n) || Number.isNaN(n)) return 0
  if (n < 0) return 0
  if (n > MAX_VALUE) return MAX_VALUE
  return n
}

const toNet = (sale: number, feeRate: number) => {
  const fee = sale * (feeRate / 100)
  return Math.floor(sale - fee)
}

const toSale = (net: number, feeRate: number) => {
  const rate = feeRate / 100
  if (rate >= 1) return 0
  return Math.floor(net / (1 - rate))
}

const clampFeeRate = (n: number) => {
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(n, 99.99))
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_SALE': {
      const sale = sanitizeValue(action.value)
      return {
        ...state,
        saleAmount: sale,
        netAmount: toNet(sale, state.feeRate),
        lastEdited: 'SALE',
      }
    }

    case 'SET_NET': {
      const net = sanitizeValue(action.value)
      return {
        ...state,
        netAmount: net,
        saleAmount: toSale(net, state.feeRate),
        lastEdited: 'NET',
      }
    }

    case 'SET_FEE_RATE': {
      const newRate = clampFeeRate(action.value)

      if (state.lastEdited === 'SALE') {
        return {
          ...state,
          feeRate: newRate,
          netAmount: toNet(state.saleAmount, newRate),
        }
      } else {
        return {
          ...state,
          feeRate: newRate,
          saleAmount: toSale(state.netAmount, newRate),
        }
      }
    }

    case 'RESET':
      return {
        saleAmount: 0,
        netAmount: 0,
        feeRate: action.defaultFeeRate,
        lastEdited: 'SALE',
      }

    default:
      return state
  }
}

export const useProfitControl = (defaultFeeRate = 5) => {
  const [state, dispatch] = useReducer(reducer, {
    saleAmount: 0,
    netAmount: 0,
    feeRate: defaultFeeRate,
    lastEdited: 'SALE',
  })

  return {
    saleAmount: state.saleAmount,
    netAmount: state.netAmount,
    feeRate: state.feeRate,
    fee: state.saleAmount - state.netAmount,

    setSaleAmount: (value: number) => dispatch({ type: 'SET_SALE', value }),
    setNetAmount: (value: number) => dispatch({ type: 'SET_NET', value }),
    setFeeRate: (value: number) => dispatch({ type: 'SET_FEE_RATE', value }),
    reset: () => dispatch({ type: 'RESET', defaultFeeRate }),
  }
}
