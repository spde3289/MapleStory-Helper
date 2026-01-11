import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
interface Props {
  content: string
  href: string
}

const NavChildrenItem = ({ content, href }: Props) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={clsx(
        'text-xs md:text-sm font-normal text-nowrap px-2.5 py-1.5 rounded-md',
        'hover:bg-stone-100 dark:hover:bg-neutral-700',
        isActive && 'text-orange-500 dark:text-orange-400 font-normal',
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {content}
    </Link>
  )
}

export default NavChildrenItem
