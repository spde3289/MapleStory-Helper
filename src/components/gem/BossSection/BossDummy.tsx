import BossImage from '@/commonComponents/BossImage'
import ItemContainer from '@/commonComponents/ItemContainer'
import BossData from '@/data/boss.json'

const BossDummy = () => {
  return (
    <ItemContainer title="보스 리스트">
      {BossData.map((boss) => {
        return (
          <div className="flex" key={boss.name}>
            <div className="flex items-center w-48 mb-1">
              <BossImage className="mr-2" boss={boss.name} />
              <div>{boss.krName}</div>
            </div>
            <form>
              <fieldset className="flex">
                {boss.type.map((type) => {
                  return (
                    <label
                      key={type.difficulty}
                      className="flex items-center mr-5 text-gray-500"
                      htmlFor={`${type.difficulty}${boss.krName}`}
                    >
                      <input
                        disabled
                        className="mr-1"
                        type="checkbox"
                        value={`${boss.krName}`}
                        id={`${type.difficulty}${boss.krName}`}
                        name="group"
                      />
                      {type.difficulty}
                    </label>
                  )
                })}
              </fieldset>
            </form>
          </div>
        )
      })}
    </ItemContainer>
  )
}

export default BossDummy
