import LabeledInput from '@/components/ui/LabeledInput'
import LabeledSelect from '@/components/ui/LabeledSelect'
import { AUCTION_FEE_OPTIONS } from '@/constants/domain/auction'

const ProfitControl = () => {
  return (
    <div className="flex gap-4 justify-center">
      <LabeledInput id="item-profit" label="아이템 판매 수익" />
      <LabeledInput id="net-amount" label="실수령액" />
      <LabeledSelect
        id="auction-fee"
        label="경매장 수수료"
        options={[...AUCTION_FEE_OPTIONS]}
      />
    </div>
  )
}

export default ProfitControl
