import BossImage from '@/commonComponents/BossImage'
import ItemContainer from '@/commonComponents/ItemContainer'
import BossData from '@/data/boss/boss.json'

const BossDummy = () => {
  return (
    <ItemContainer title="보스 리스트">
      <>
        <div className="flex gap-4 mb-2">
          <button className="px-2 bg-gray-200 rounded-xl" type="button">
            스데
          </button>
          <button className="px-2 bg-gray-200 rounded-xl" type="button">
            가엔슬
          </button>
          <button className="px-2 bg-gray-200 rounded-xl" type="button">
            이루시
          </button>
          <button className="px-2 bg-gray-200 rounded-xl" type="button">
            이루윌
          </button>
          <button className="px-2 bg-gray-200 rounded-xl" type="button">
            검밑솔
          </button>
          <button className="px-2 bg-gray-200 rounded-xl" type="button">
            하세이칼
          </button>
        </div>
        {BossData.map((boss) => {
          return (
            <div className="flex w-[510px]" key={boss.name}>
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
      </>
    </ItemContainer>
  )
}

export default BossDummy
