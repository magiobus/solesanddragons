/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

//HEADER SETUP
const logoUrl = "/amlogos/logo.png";

const Header = ({
  fixed = false,
  showLogo = true,
  showLogin = true,
  showMobileMenu = true,
}) => {
  return (
    <Popover className={`relative bg-white `}>
      <div
        className={`absolute inset-0 pointer-events-none  `}
        aria-hidden="true"
      />
      <div
        className={`${fixed && "fixed z-40"}  bg-happy-pink-600  w-full z-20 `}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10 ">
          <div>
            {showLogo && (
              <Link href="/" legacyBehavior>
                <a className="flex items-center justify-center">
                  <img className="h-8 w-auto sm:h-10" src={logoUrl} alt="" />
                  <h4 className="text-xl ml-2 uppercase font-bold ">
                    Soles and Dragons
                  </h4>
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default Header;
