import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import maple from "@/icons/maple.ico";
import AccordionLayoutButton from "./AccordionLayoutButton";

const NavBar = () => {
  const [navWidth, setNavWidth] = useState<string>("w-56");

  const handelNavWidth = () => {
    if (navWidth === "w-56") return setNavWidth("w-0");
    if (navWidth === "w-0") return setNavWidth("w-56");
  };

  return (
    <>
      <nav className={`${navWidth} pt-3 relative transition-all`}>
        {navWidth === "w-56" && (
          <>
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
          </>
        )}
        <AccordionLayoutButton
          navWidth={navWidth}
          handelNavWidth={handelNavWidth}
        />
      </nav>
    </>
  );
};

export default NavBar;
