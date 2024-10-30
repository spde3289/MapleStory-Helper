import { IoIosArrowBack } from 'react-icons/io'

interface PropsInterface {
  navWidth: string
  handelNavWidth: () => void
}

const AccordionLayoutButton = ({
  navWidth,
  handelNavWidth,
}: PropsInterface) => {
  return (
    <button
      type="button"
      onClick={handelNavWidth}
      className="absolute flex items-center justify-center bg-white top-1/2 -translate-y-1/2 -right-6 w-6 h-10 rounded-r-xl"
    >
      <IoIosArrowBack className={navWidth === 'w-56' ? '' : 'rotate-180'} />
    </button>
  )
}

export default AccordionLayoutButton
