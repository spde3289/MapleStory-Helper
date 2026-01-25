import clsx from 'clsx'
import ProfitControl from './ProfitControl'

const PartyProfitSplitSection = () => {
  return (
    <section
      className={clsx(
        'bg-white py-2 px-4 mb-6 rounded-md border border-gray-200 dark:border-neutral-700 dark:bg-neutral-800',
      )}
    >
      <ProfitControl />
    </section>
  )
}

export default PartyProfitSplitSection
