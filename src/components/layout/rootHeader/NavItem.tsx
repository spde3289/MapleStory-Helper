import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
interface Props {
  content: string
  href: string
}

const NavItem = ({ content, href }: Props) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={clsx(
        'text-sm md:text-base',
        isActive && 'text-orange-500 font-semibold',
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {content}
    </Link>
  )
}

export default NavItem
