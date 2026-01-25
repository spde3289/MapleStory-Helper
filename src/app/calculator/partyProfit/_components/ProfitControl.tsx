import CommonButton from '@/components/ui/CommonButton'
import LabeledInput from '@/components/ui/LabeledInput'
import LabeledSelect from '@/components/ui/LabeledSelect'
import { AUCTION_FEE_OPTIONS } from '@/constants/domain/auction'
import { formatKoreanNumber } from '@/utils/numberUtils'

type Props = {
  saleAmount: number
  netAmount: number
  feeRate: number
  onChange: {
    setSaleAmount: (value: number) => void
    setNetAmount: (value: number) => void
    setFeeRate: (value: number) => void
  }
  onClick: () => void
}

const ProfitControl = ({
  saleAmount,
  netAmount,
  feeRate,
  onChange,
  onClick,
}: Props) => {
  return (
    <div className="flex gap-4 justify-center">
      <div>
        <LabeledInput
          id="item-profit"
          label="아이템 판매 수익"
          value={saleAmount}
          onChange={(e) => onChange.setSaleAmount(Number(e.target.value))}
        />
        <div className="text-xs mt-1 ml-3 text-gray-600">
          {formatKoreanNumber(saleAmount)} 메소
        </div>
      </div>
      <div>
        <LabeledInput
          id="net-amount"
          label="실수령액"
          value={netAmount}
          onChange={(e) => onChange.setNetAmount(Number(e.target.value))}
        />
        <div className="text-xs mt-1 ml-3 text-gray-600">
          {formatKoreanNumber(netAmount)} 메소
        </div>
      </div>
      <div className="w-fit">
        <LabeledSelect
          id="auction-fee"
          label="경매장 수수료"
          options={[...AUCTION_FEE_OPTIONS]}
          value={feeRate}
          onChange={(e) => onChange.setFeeRate(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center">
        <CommonButton onClick={onClick}>초기화</CommonButton>
      </div>
    </div>
  )
}

export default ProfitControl
