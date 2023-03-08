import SocialIcon from "@/components/icons/Social";
import Link from "next/link";
//EDIT ME PLEASE
const copyrightLabel = `©${new Date().getFullYear()} Soles & Dragons.`;
const socialLink = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/magiobus",
    icon: "facebook",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/magiobus",
    icon: "instagram",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@magiobus",
    icon: "tiktok",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/magiobus",
    icon: "twitter",
  },
];

const extraLinks = [];

const Footer = ({ grayBackground = false }) => {
  return (
    <footer
      className={` flex justify-center items-center w-full ${
        grayBackground ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className="max-w-7xl  py-12 px-4 sm:px-6  lg:px-8">
        <div className="links mt-6">
          <ul className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8">
            {extraLinks.map((item, index) => (
              <li key={index}>
                <Link href={item.href} legacyBehavior>
                  <a className="text-sm text-black font-medium hover:text-gray-500 underline text-center p-0 m-0">
                    {item.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8  md:order-1 flex flex-col justify-center items-center ">
          <p className="text-center text-base text-black">{copyrightLabel}</p>
          <p className="mt-1 flex flex-col items-center justify-center">
            Made With ❤️ and 🎲 by{" "}
            <a
              href="https://twitter.com/magiobus"
              className="text-black text-center font-bold underline"
              target={"_blank"}
              rel="noopener noreferrer"
            >
              {" "}
              @magiobus
            </a>
          </p>
        </div>

        <div className="flex justify-center space-x-6 md:order-2 mt-12">
          {socialLink.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target={"_blank"}
              rel="noopener noreferrer"
            >
              <div className="iconcontainer cursor-pointer w-6 h-6 text-black">
                <SocialIcon type={item.icon} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
