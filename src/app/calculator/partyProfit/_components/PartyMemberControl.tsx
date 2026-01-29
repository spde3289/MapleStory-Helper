import CommonButton from '@/components/ui/CommonButton'
import { usePartyDistribution } from '../_hooks/usePartyDistribution'
import AllocationStatusBanner from './AllocationStatusBanner'
import PartyMemberList from './PartyMemberList'

interface Props {
  netAmount: number
  feeRate: number
}

const PartyMemberControl = ({ netAmount, feeRate }: Props) => {
  const {
    mode,
    members,
    overRatio,
    remainingRatio,
    canAddMember,
    addMember,
    equalize,
    resetMembers,
    updateName,
    updateRatio,
    removeMember,
  } = usePartyDistribution(netAmount, feeRate)

  const hasAllocationIssue = overRatio > 0 || remainingRatio > 0
  const isManualMode = mode === 'MANUAL'

  const isAllocationBannerVisible = isManualMode && hasAllocationIssue

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-lg leading-5">파티원 설정</h3>
        <p className="text-[12px] text-gray-500">
          이름은 최대 8글자, 비율은 0~100 정수
        </p>
      </div>
      <div className="flex justify-between">
        <CommonButton onClick={equalize}>균등 분배</CommonButton>
        <div className="flex gap-2">
          <CommonButton disabled={!canAddMember} onClick={addMember}>
            + 추가하기
          </CommonButton>
          <CommonButton onClick={resetMembers}>초기화</CommonButton>
        </div>
      </div>
      <div>
        <AllocationStatusBanner
          isVisible={isAllocationBannerVisible}
          overRatio={overRatio}
          remainingRatio={remainingRatio}
        />
        <PartyMemberList
          members={members}
          onChangeName={updateName}
          onChangeRatio={updateRatio}
          onRemove={removeMember}
        />
      </div>
    </div>
  )
}

export default PartyMemberControl
