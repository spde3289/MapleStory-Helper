import BossImage from '@/commonComponents/BossImage'

import ItemContainer from '@/commonComponents/ItemContainer'
import quest from '@/data/genesis/quest.json'
import { CalculateProps } from '@/type/genesis'

const Calculate = ({
  currentQuest,
  handleQuest,
  bossList,
  handleBossList,
}: CalculateProps) => {
  const { handleBoss, handleGauge } = handleQuest
  const { handleType, handlePlayer } = handleBossList

  const currentBoss = quest.find((el) => el.quest === currentQuest.boss)

  const progress = currentBoss?.required_darkness
    ? (currentQuest.gauge / currentBoss.required_darkness) * 100
    : 0 // 퍼센트 계산, required_darkness가 없으면 0%

  return (
    <ItemContainer title="진행중인 퀘스트">
      <div className="flex xxxs:flex-col gap-3 items-center mb-4">
        <select onChange={handleBoss} className="h-8 mr-4 outline-none">
          {quest.map((item) => {
            return (
              <option
                key={item.quest}
                id={item.quest}
                value={item.required_darkness}
              >
                {item.quest}
              </option>
            )
          })}
        </select>
        <div className="w-full">
          <div className="text-sm">어둠의 흔적</div>
          <div
            style={{
              background: `linear-gradient(to right, #db7ef5 ${progress}%, #f5f5f5 ${progress}%)`,
            }}
            className="bg-[#db7ef5] transition-colors duration-300 ease-in-out flex h-8 text-center border-[1px] rounded-xl justify-center items-center"
          >
            <input
              className="w-12 h-7 bg-transparent outline-none "
              maxLength={4}
              onChange={handleGauge}
              value={currentQuest.gauge}
            />{' '}
            / {currentBoss?.required_darkness}
          </div>
        </div>
      </div>
      <div>
        <div className="flex xxxs:justify-between mb-3 text-sm">
          <div className="text-center xxxs:w-20 xxxs:min-w-20 items-center w-44 min-w-44">
            보스
          </div>
          <div className="min-w-40 w-full xxxs:w-fit xxxs:min-w-fit text-center">
            난이도
          </div>
          <div className="min-w-fit">파티원</div>
        </div>
        {bossList.map((item) => {
          return (
            <div className="flex justify-between " key={item.krName}>
              <div className="flex w-fit xxxs:flex-col">
                <div className="flex w-44 xxxs:w-32 xxxs:min-w-32">
                  <BossImage className="mr-2 w-6 h-6" boss={item.name} />
                  <div>{item.krName}</div>
                </div>
                <fieldset className="flex xxs:flex-wrap min-w-40 flex-1  w-full">
                  {item.type.map((type) => {
                    return (
                      <label
                        key={type.difficulty}
                        className={`flex flex-col items-center mr-5 text-gray-500 xxxs:mr-3 mb-3 `}
                        htmlFor={`${type.difficulty}${item.krName}`}
                      >
                        <div className="text-black">
                          <input
                            onChange={handleType}
                            checked={type.current}
                            className="mr-1 "
                            type="checkbox"
                            value={`${item.krName}`}
                            id={`${type.difficulty}${item.krName}`}
                            name="group"
                          />
                          {type.difficulty}
                        </div>
                        {Math.round(type.reward / item.player)}
                      </label>
                    )
                  })}
                </fieldset>
              </div>
              <select
                className="outline-none"
                id={item.krName}
                value={item.player}
                onChange={handlePlayer}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          )
        })}
      </div>
    </ItemContainer>
  )
}

export default Calculate
