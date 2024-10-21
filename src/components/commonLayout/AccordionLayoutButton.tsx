import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const AccordionLayoutButton = () => {
  return (
    <>
      <div className="absolute flex items-center justify-center bg-white top-1/2 -translate-y-1/2 -right-6 w-6 h-10 rounded-r-xl">
        <IoIosArrowBack />
      </div>
    </>
  );
};

export default AccordionLayoutButton;
