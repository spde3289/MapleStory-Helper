interface ItemContainerPropsType {
  children: React.ReactNode
  title: string
}

const ItemContainer = ({ children, title }: ItemContainerPropsType) => {
  return (
    <section className="bg-white p-3 h-fit rounded-md">
      <h3 className="mb-3">{title}</h3>
      {children}
    </section>
  )
}

export default ItemContainer
