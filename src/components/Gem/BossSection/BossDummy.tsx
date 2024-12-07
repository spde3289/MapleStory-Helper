import BossImage from '@/commonComponents/BossImage'
import ItemContainer from '@/commonComponents/ItemContainer'
import BossData from '@/data/boss/boss.json'
import { FaSort } from 'react-icons/fa'

const BossDummy = () => {
  return (
    <ItemContainer className="relative" title="보스 리스트">
      <>
        <div className="flex gap-4 mb-2 virtual-text-area w-[675px] xs:w-full xxxs:flex-wrap xxxs:gap-2 xxxs:mb-4">
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
            하스우
          </button>
          <button className="px-2 bg-gray-200 rounded-xl" type="button">
            검밑솔
          </button>
          <button className="px-2 bg-gray-200 rounded-xl" type="button">
            하세이칼
          </button>
        </div>
        <div className="flex xxxs:justify-between">
          <div className="text-center items-center w-44 xxxs:w-fit min-w-44 xxxs:min-w-fit">
            보스
          </div>
          <div className="min-w-40 w-full xxxs:w-fit xxxs:min-w-fit text-center">
            난이도
          </div>
          <div className="flex w-48  min-w-48 xxs:min-w-48 xxs:w-48 xxxs:w-3/12 xxxs:min-w-24">
            <div className="whitespace-nowrap">파티원</div>
            <div
              // role="button"
              // tabIndex={0}
              // onKeyDown={handelPriceSort}
              // onClick={handelPriceSort}
              className="w-full text-center flex items-center justify-center gap-1"
            >
              가격
              <FaSort />
            </div>
          </div>
        </div>
        {BossData.map((boss) => {
          return (
            <div
              className="flex justify-between xxxs:mb-3 xxxs:border-b-[1px]"
              key={boss.name}
            >
              <div className="flex w-fit xxxs:flex-col">
                <div className="flex items-center w-44 xxxs:w-36 min-w-44 xxxs:min-w-36 mb-1">
                  <BossImage className="mr-2" boss={boss.name} />
                  <div>{boss.krName}</div>
                </div>
                <form>
                  <fieldset className="flex xxs:flex-wrap min-w-40 w-full">
                    {boss.type.map((type) => {
                      return (
                        <label
                          key={type.difficulty}
                          className="flex items-center mr-5 text-gray-500 xxxs:mr-3"
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
              <div className="flex w-48 min-w-48 xxs:min-w-48 xxs:w-48 xxxs:w-3/12 xxxs:min-w-24 justify-between xxxs:items-center">
                <select
                  className="text-gray-500"
                  disabled
                  name="player"
                  defaultValue={1}
                  id={boss.krName}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
                <div className="ml-2 w-full break-all text-gray-500" />
              </div>
            </div>
          )
        })}
      </>
    </ItemContainer>
  )
}

export default BossDummy
