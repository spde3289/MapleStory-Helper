import { DistributionResult } from '../_utils/distributeProfitByPercent'
import PartyMemberCard from './PartyMemberCard'

interface Props {
  members: DistributionResult[]
  onChangeName: (id: string, name: string) => void
  onChangeRatio: (id: string, ratio: number) => void
  onRemove: (id: string) => void
}

const PartyMemberList = ({
  members,
  onChangeName,
  onChangeRatio,
  onRemove,
}: Props) => {
  const canRemove = members.length > 1

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs">
      {members.map((member) => (
        <PartyMemberCard
          key={member.id}
          member={member}
          canRemove={canRemove}
          onChangeName={onChangeName}
          onChangeRatio={onChangeRatio}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}

export default PartyMemberList
