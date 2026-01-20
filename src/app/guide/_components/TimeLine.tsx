import { ServiceUpdateHistory } from '@/types/domain/updateHistory'

interface Props {
  items: ServiceUpdateHistory
}

const TimeLine = ({ items }: Props) => {
  return (
    <ul className="relative pl-6 text-sm">
      {items.map((item, index) => (
        <li
          className="before:bg-orange-500 before:border-orange-200 relative flex items-start pl-6 before:absolute before:top-1 before:left-0 before:z-10 before:h-3 before:w-3 before:rounded-full before:border-2 before:content-['']"
          key={item.title + item.date}
        >
          {items.length - 1 !== index && (
            <div className="bg-orange-300 absolute top-5 bottom-0 left-[5px] w-[2px]" />
          )}
          <div>
            <div className="text-base font-semibold">
              <span className="text-sm font-normal border border-gray-300 dark:border-neutral-700 tracking-wider rounded-full px-2 py-0.5 mr-2">
                {item.date}
              </span>
              {item.title}
            </div>
            <ul className="py-4 text-gray-600 dark:text-gray-400">
              {item.description?.map((description) => (
                <li
                  className="before:mr-2 before:content-['-']"
                  key={description}
                >
                  {description}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TimeLine
