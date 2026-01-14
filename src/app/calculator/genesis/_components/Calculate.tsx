import BossImage from '@/components/common/BossImage'
import { Dispatch, SetStateAction } from 'react'

import genesis_pass from '@/assets/imgs/genesis_pass.png'
import ItemContainer from '@/components/common/ItemContainer'
import { useTheme } from '@/context/ThemeContext'
import quest from '@/data/genesis/quest.json'
import { CalculateProps } from '@/types/domain/genesis'
import Image from 'next/image'

interface Props extends CalculateProps {
  isPass: boolean
  setIsPass: Dispatch<SetStateAction<boolean>>
}

const Calculate = ({
  isPass,
  setIsPass,
  currentQuest,
  handleQuest,
  bossList,
  handleBossList,
}: Props) => {
  const { theme } = useTheme()
  const { handleBoss, handleGauge } = handleQuest
  const { handleType, handlePlayer } = handleBossList

  const currentBoss = quest.find((el) => el.quest === currentQuest.boss)

  const dark = theme === 'dark' ? '#1d2939' : '#f5f5f5'

  const progress = currentBoss?.required_darkness
    ? (currentQuest.gauge / currentBoss.required_darkness) * 100
    : 0 // 퍼센트 계산, required_darkness가 없으면 0%

  return (
    <ItemContainer
      className="no-drag lg:min-w-[800px] text-nowrap overflow-x-scroll scrollBar"
      title="설정"
    >
      <div className="p-1 px-2">
        <label className="flex items-center" htmlFor="제네시스 패스">
          {' '}
          제네시스 패스 적용하기
          <Image src={genesis_pass} alt="제네시스 패스" />
          <input
            className="ml-2"
            checked={isPass}
            onChange={(e) => {
              setIsPass(e.target.checked)
            }}
            id="제네시스 패스"
            type="checkbox"
          />
        </label>
      </div>
      <div className=" flex flex-col sm:flex-row gap-3 items-center mb-4">
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
              className="w-12 h-7 bg-transparent outline-none "
              maxLength={4}
              onChange={handleGauge}
              value={currentQuest.gauge}
            />{' '}
            / {currentBoss?.required_darkness}
          </div>
        </div>
      </div>
      <table className="w-full border-collapse dark:border-white/[0.2] text-sm md:text-base">
        <thead>
          <tr className="border-b dark:border-white/[0.2]">
            <th className="">보스</th>
            <th className="">
              난이도{' '}
              <span className="text-gray-500 dark:text-gray-400">
                (획득 어둠의 흔적)
              </span>
            </th>
            <th className="">파티원</th>
          </tr>
        </thead>
        <tbody>
          {bossList.map((item) => (
            <tr key={item.krName} className="border-b dark:border-white/[0.2]">
              <td className="">
                <div className="flex items-center">
                  <div className="size-8 rounded-lg overflow-hidden mr-2">
                    <BossImage boss={item.name} alt={item.krName} />
                  </div>
                  {item.krName}
                </div>
              </td>
              <td className="">
                <form className="flex gap-2 flex-wrap">
                  {item.type.map((type) => (
                    <label
                      key={type.difficulty}
                      htmlFor={`${type.difficulty}${item.krName}`}
                      className="flex items-center"
                    >
                      <input
                        onChange={handleType}
                        checked={type.current}
                        className="mr-1 size-4"
                        type="checkbox"
                        value={item.krName}
                        id={`${type.difficulty}${item.krName}`}
                        name="group"
                      />
                      {type.difficulty}{' '}
                      <span className="text-gray-500 dark:text-gray-400 ml-1">
                        (
                        {Math.round(
                          (type.reward * (isPass ? 3 : 1)) / item.player,
                        )}
                        )
                      </span>
                    </label>
                  ))}
                </form>
              </td>
              <td align="center" className="p-2">
                <select
                  className="outline-none dark:border-white/[0.2] dark:bg-gray-800 px-4 py-2 border rounded-lg"
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ItemContainer>
  )
}

export default Calculate
