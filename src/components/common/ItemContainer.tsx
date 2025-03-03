import { memo } from 'react'

interface ItemContainerPropsType {
  children: React.ReactNode
  title?: string
  className?: string
  tip?: string
}

/** 컨텐츠 컨테이너 */
const ItemContainer = ({
  children,
  title,
  className = '',
  tip,
}: ItemContainerPropsType) => {
  return (
    <section
      className={`bg-white border-gray-200 p-3 h-fit rounded-2xl border dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      <div className="flex flex-col justify-between mb-2 xsm:flex-row xsm:items-center">
        <h3 className="text-lg">{title}</h3>
        <p className="text-sm italic font-semibold">{tip}</p>
      </div>
      {children}
    </section>
  )
}

export default memo(ItemContainer)
