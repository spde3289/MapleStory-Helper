import NavItem from './NavItem'

interface ItemContainerProps {
  title: string
  items: {
    path: string
    name: string
  }[]
}

const ItemContainer = ({ items, title }: ItemContainerProps) => {
  return (
    <div>
      <h3 className="mb-2 text-xs uppercase flex leading-[20px] text-gray-400 justify-start">
        {title}
      </h3>
      <ul className="flex gap-1 flex-col w-full font-bold">
        {items.map((item) => (
          <NavItem path={item.path} name={item.name} key={item.name} />
        ))}
      </ul>
    </div>
  )
}

export default ItemContainer
