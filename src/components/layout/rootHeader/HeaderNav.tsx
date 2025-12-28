import NavItem from './NavItem'

const navItems = [
  {
    path: '/gem',
    name: '주보수익 계산기',
  },
  {
    path: '/genesis',
    name: '제네시스 해방 퀘스트 계산기',
  },
  {
    path: '/destiny',
    name: '데스티니 해방 퀘스트 계산기',
  },
]

const HeaderNav = () => {
  return (
    <nav className="pt-2.5 gap-6 flex">
      {navItems.map((item) => (
        <NavItem key={item.name} href={item.path} content={item.name} />
      ))}
    </nav>
  )
}

export default HeaderNav
