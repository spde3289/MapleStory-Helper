import { memo } from 'react'

interface ItemContainerPropsType {
  children: React.ReactNode
  title: string
  className?: string
}

const ItemContainer = ({
  children,
  title,
  className = '',
}: ItemContainerPropsType) => {
  return (
    <section className={`bg-white p-3 h-fit rounded-md ${className}`}>
      <h3 className="mb-3">{title}</h3>
      {children}
    </section>
  )
}

export default memo(ItemContainer)
