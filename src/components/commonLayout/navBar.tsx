import Link from "next/link";
import Image from "next/image";
import maple from "@/icons/maple.ico";
import AccordionLayoutButton from "./AccordionLayoutButton";

const NavBar = () => {
  return (
    <>
      <nav className="w-56 pt-3 relative">
        <div className="flex flex-col items-center mb-5">
          <Link href="/">
            <h1 className="flex items-center font-bold">
              <Image
                className="mr-2"
                src={maple}
                width={42}
                height={42}
                alt="메이플 아이콘"
              />
              Maple Helper
            </h1>
          </Link>
          <div className="h-[1px] mt-7 bg-gray-100 w-7/12"></div>
        </div>
        <ul className="ml-3 mr-3 space-y-6 font-bold ">
          <li className="pl-3">
            <Link href="/gem">보스 결졍석</Link>
          </li>
        </ul>
        <AccordionLayoutButton />
      </nav>
    </>
  );
};

export default NavBar;
