import { ItemType } from '@/constants/route'
import Link from 'next/link'

interface NavigationButtonProps {
  item: ItemType
}

const NavigationButton = ({ item }: NavigationButtonProps) => {
  return (
    <Link className=" item-button hover:item-button-active" href={item.path}>
      <h2 className="text-lg font-bold ">{item.name}</h2>
      <p className="text-sm break-keep text-balance ">{item.description}</p>
    </Link>
  )
}

export default NavigationButton
