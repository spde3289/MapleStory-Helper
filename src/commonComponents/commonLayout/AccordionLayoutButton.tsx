import { IoIosArrowBack } from 'react-icons/io'

interface PropsInterface {
  navSize: string
  width: string
  handelNavSize: () => void
}

const AccordionLayoutButton = ({
  navSize,
  width,
  handelNavSize,
}: PropsInterface) => {
  const lgClass =
    'lg:top-1/2 lg:-right-6 lg:w-6 lg:h-10 lg:-translate-y-1/2 lg:rounded-r-xl'
  return (
    <button
      aria-label="메뉴바 버튼"
      type="button"
      onClick={handelNavSize}
      className={`${
        navSize === width ? '' : ''
      } xs:right-1/2 xs:-bottom-5 absolute z-50 w-10 h-6 xs:rounded-b-xl ${lgClass} flex items-center justify-center bg-white`}
    >
      <IoIosArrowBack
        className={`${navSize === width ? 'xs:rotate-90 lg:rotate-0' : 'xs:-rotate-90 lg:rotate-180'}`}
      />
    </button>
  )
}

export default AccordionLayoutButton
