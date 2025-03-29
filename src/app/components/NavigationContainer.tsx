import { ItemType } from '@/constants/route'
import NavigationButton from './NavigationButton'

interface NavigationContainerProps {
  title: string
  items: ItemType[]
}

const NavigationContainer = ({ title, items }: NavigationContainerProps) => {
  return (
    <div className="item-frame  flex-1 pt-8 pb-3 px-3">
      <div className="item-frame-top" />
      <h3 className="item-frame-title">{title}</h3>
      <div className="item-frame-container">
        {items.map((item) => (
          <NavigationButton key={item.name} item={item} />
        ))}
      </div>
    </div>
  )
}

export default NavigationContainer
