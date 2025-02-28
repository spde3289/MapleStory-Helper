import { memo } from 'react'

interface ItemContainerPropsType {
  children: React.ReactNode
  title?: string
  className?: string
}

/** 컨텐츠 컨테이너 */
const ItemContainer = ({
  children,
  title,
  className = '',
}: ItemContainerPropsType) => {
  return (
    <section
      className={`bg-white border-gray-200 p-3 h-fit rounded-2xl border dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      <h3 className="mb-4 text-lg">{title}</h3>
      {children}
    </section>
  )
}

export default memo(ItemContainer)
