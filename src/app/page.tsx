import { calculatorItems, ledgerItems } from '@/constants/route'
import NavigationContainer from './components/NavigationContainer'

function Home() {
  return (
    <section className="w-full bg-white lg:px-10 lg:py-6 border-gray-200 p-4 h-fit text-center rounded-3xl border dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-lg lg:text-2xl font-bold">
        메이플 헬퍼 - Maple Helper
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        메이플스토리를 하며 불편했던 부분들을 채워주는 여러 서비스를 제공하고
        있습니다.
      </p>
      <div className="flex flex-col lg:flex-row justify-center gap-4 ">
        <NavigationContainer title="계산기" items={calculatorItems} />
        <NavigationContainer title="가계부" items={ledgerItems} />
      </div>
    </section>
  )
}

export default Home
