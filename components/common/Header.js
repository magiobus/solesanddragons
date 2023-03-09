/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { AuthContext } from "@/components/AuthProvider";
import { useContext } from "react";

//HEADER SETUP
const Header = ({ fixed = false }) => {
  const { isSignedIn, signIn, signOut } = useContext(AuthContext);
  return (
    <Popover className={`relative bg-white `}>
      <div
        className={`absolute inset-0 pointer-events-none  `}
        aria-hidden="true"
      />
      <div
        className={`${fixed && "fixed z-40"}  bg-happy-pink-600  w-full z-20 `}
      >
        <div className="max-w-7xl mx-auto flex justify-end items-end w-full px-4 py-5 sm:px-6 sm:py-4 lg:px-8  md:space-x-10 ">
          <div className="text-right">
            {isSignedIn ? <p>ta logeao</p> : <p>no ta logeao</p>}
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default Header;
