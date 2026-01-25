'use client'

import Divider from '@/components/ui/Divider'
import clsx from 'clsx'
import { useProfitControl } from '../_hooks/useProfitControl'
import ProfitControl from './ProfitControl'

const PartyProfitSplitSection = () => {
  const {
    saleAmount,
    netAmount,
    feeRate,
    fee,
    setSaleAmount,
    setNetAmount,
    setFeeRate,
    reset,
  } = useProfitControl(5)
  return (
    <section
      className={clsx(
        'bg-white py-2 px-4 mb-6 rounded-md border border-gray-200 dark:border-neutral-700 dark:bg-neutral-800',
      )}
    >
      <ProfitControl
        saleAmount={saleAmount}
        netAmount={netAmount}
        feeRate={feeRate}
        fee={fee}
        onChange={{ setSaleAmount, setNetAmount, setFeeRate }}
        onClick={reset}
      />
      <Divider />
    </section>
  )
}

export default PartyProfitSplitSection
