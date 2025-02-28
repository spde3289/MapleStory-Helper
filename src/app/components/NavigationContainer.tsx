import NavigationButton from './NavigationButton'

const navItems = [
  {
    path: '/gem',
    name: '주보 수익 계산기',
    description: 'API 키를 등록해 계정 내의 모든 주보캐를 불러와보세요',
  },
  {
    path: '/genesis',
    name: '해방 퀘스트 계산기',
    description: '복잡한 조건 없이 해방퀘 완료 일정을 계산해드려요',
  },
]

const NavigationContainer = () => {
  return (
    <section className="bg-white mt-5 lg:px-10 lg:py-6 border-gray-200 p-4 h-fit text-center rounded-3xl border dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-lg lg:text-2xl font-bold">
        메이플 헬퍼 - Maple Helper
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        메이플스토리를 하며 불편했던 부분들을 채워주는 여러 서비스를 제공하고
        있습니다.
      </p>
      <div className="flex gap-6 flex-col">
        {navItems.map((item) => (
          <NavigationButton
            key={item.name}
            path={item.path}
            name={item.name}
            description={item.description}
          />
        ))}
      </div>
    </section>
  )
}

export default NavigationContainer
