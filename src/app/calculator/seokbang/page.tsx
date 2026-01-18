import AstraRewardsOverview from './_components/AstraRewardsOverview'
import SeokbangCalculatorSection from './_components/SeokbangCalculatorSection'

const SeokbangPage = () => {
  return (
    <div>
      <h2 className="mb-2">아스트라 보조무기 계산기</h2>
      <SeokbangCalculatorSection />
      <AstraRewardsOverview />
    </div>
  )
}

export default SeokbangPage
