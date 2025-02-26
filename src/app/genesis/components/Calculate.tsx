import BossImage from '@/components/common/BossImage'

import ItemContainer from '@/components/common/ItemContainer'
import { useTheme } from '@/context/ThemeContext'
import quest from '@/data/genesis/quest.json'
import { CalculateProps } from '@/type/genesis'

const Calculate = ({
  currentQuest,
  handleQuest,
  bossList,
  handleBossList,
}: CalculateProps) => {
  const { theme } = useTheme()
  const { handleBoss, handleGauge } = handleQuest
  const { handleType, handlePlayer } = handleBossList

  const currentBoss = quest.find((el) => el.quest === currentQuest.boss)

  const dark = theme === 'dark' ? '#1d2939' : '#f5f5f5'

  const progress = currentBoss?.required_darkness
    ? (currentQuest.gauge / currentBoss.required_darkness) * 100
    : 0 // 퍼센트 계산, required_darkness가 없으면 0%

  return (
    <ItemContainer className=" xl:w-8/12" title="설정">
      <div className="flex flex-col sm:flex-row gap-3 items-center mb-4">
        <div>
          <div className="text-sm">진행중인 보스</div>
          <select
            onChange={handleBoss}
            className="mr-4 outline-none px-4 py-2 border dark:border-white/[0.2] rounded-lg dark:bg-gray-800"
          >
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
        </div>
        <div className="w-full">
          <div className="text-sm">어둠의 흔적</div>
          <div
            style={{
              background: `linear-gradient(to right, #b260c9 ${progress}%, ${dark} ${progress}%)`,
            }}
            className="transition-colors duration-300 ease-in-out flex h-8 text-center border dark:border-white/[0.2] rounded-xl justify-center items-center"
          >
            <input
              alt="보유 어둠의 흔적"
              className="w-12 h-7  bg-transparent outline-none "
              maxLength={4}
              onChange={handleGauge}
              value={currentQuest.gauge}
            />{' '}
            / {currentBoss?.required_darkness}
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-1 text-sm border-b dark:border-white/[0.2]">
          <div className="flex w-full">
            <div className="text-center sm:text-left w-20 sm:min-w-44">
              보스
            </div>
            <div className="w-fit sm:m-0 mx-auto">
              난이도{' '}
              <span className="text-gray-500 dark:text-gray-400 ">
                (획득 어둠의 흔적)
              </span>
            </div>
          </div>
          <div className="w-[67px] sm:min-w-[51px]">파티원</div>
        </div>
        {bossList.map((item) => {
          return (
            <div
              className="flex justify-between border-b dark:border-white/[0.2] py-2 items-center"
              key={item.krName}
            >
              <div className="flex w-full items-center">
                <div className="flex flex-col items-center w-20 sm:w-44 sm:flex-row ">
                  <BossImage className="mr-2 w-6 h-6" boss={item.name} />
                  <div>{item.krName}</div>
                </div>
                <fieldset className="flex flex-col sm:flex-row min-w-32 w-fit sm:m-0 mx-auto ">
                  {item.type.map((type) => {
                    return (
                      <label
                        key={type.difficulty}
                        className="flex flex-col items-start sm:items-center md:mr-5 mr-3"
                        htmlFor={`${type.difficulty}${item.krName}`}
                      >
                        <div className="">
                          <input
                            onChange={handleType}
                            checked={type.current}
                            className="mr-1 text-right"
                            type="checkbox"
                            value={`${item.krName}`}
                            id={`${type.difficulty}${item.krName}`}
                            name="group"
                          />
                          {type.difficulty}{' '}
                          <span className="text-gray-500 dark:text-gray-400 ">
                            ({Math.round(type.reward / item.player)})
                          </span>
                        </div>
                      </label>
                    )
                  })}
                </fieldset>
              </div>
              <select
                className="outline-none dark:border-white/[0.2] dark:bg-gray-800 px-4 py-2 border rounded-lg h-fit md:px-2 md:py-1 "
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
