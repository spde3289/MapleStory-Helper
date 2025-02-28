// import { StaticImageData } from 'next/image'
import Link from 'next/link'

interface NavigationButtonProps {
  name: string
  path: string
  description: string
}

const NavigationButton = ({
  name,
  path,
  description,
}: NavigationButtonProps) => {
  return (
    <Link
      className="rounded-lg px-3 py-2 lg:px-8 lg:py-4 transition-all bg-orange-500 hover:bg-orange-400 text-white/90"
      href={path}
    >
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm break-keep text-balance ">{description}</p>
    </Link>
  )
}

export default NavigationButton
