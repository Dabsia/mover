import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import SecondaryBtn from "./SecondaryBtn";
import InvoiceIcon from "../Assets/SVG/Invoice";
import TrackingIcon from "../Assets/SVG/TrackingIcon";
import TruckIcon from "../Assets/SVG/TruckIcon";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [menuOptionsOpen, setMenuOptionsOpen] = useState(false);
  const menuRef = useRef(null); // Ref for the menu options container

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
  };

  // Function to open the menu options
  const openMenuOptions = () => {
    setMenuOptionsOpen(true);
  };

  // Function to close the menu options
  const closeMenuOptions = () => {
    setMenuOptionsOpen(false);
  };

  // Handle clicks outside the menu options
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenuOptions(); // Close the menu if the click is outside
      }
    };

    // Add event listener when the menu is open
    if (menuOptionsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOptionsOpen]);

  let activeClassName = " text-[#121212] text-[18px] font-bold";
  let activeMobileClassName =
    " text-[#121212] font-unbounded text-[18px] font-bold";

  return (
    <header className="h-[80px] header mx-auto w-[100vw] border-b-[1px] border-[#d1d1d1] z-50 bg-white fixed top-0 left-0 flex justify-center items-center">
      <nav className="flex w-[90vw] desktopNav relative items-center mx-auto max-w-[1500px] justify-between">
        <Link to="/" className="">
          <Logo />
        </Link>
        <ul className="flex justify-between items-center gap-[16px] ">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? activeClassName
                  : "font-sans text-[14px] leading-[19.6px] text-[#9E9E9E] "
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive
                  ? activeClassName
                  : "font-sans text-[14px] leading-[19.6px] text-[#9E9E9E] "
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                isActive
                  ? activeClassName
                  : "font-sans text-[14px] leading-[19.6px] text-[#9E9E9E] "
              }
            >
              FAQs
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center">
          <LanguageSwitcher />
          <SecondaryBtn
            handlePress={openMenuOptions}
            className={"text-[14px] "}
          >
            GET STARTED
          </SecondaryBtn>
        </div>
        {menuOptionsOpen && (
          <div
            ref={menuRef} // Attach the ref to the menu options container
            className="bg-white w-[304px] top-[45px] absolute right-0 h-fit p-[4px] rounded-[8px] border-[1px] border-[#E4F2FB] "
          >
            <Link to="/quote">
              <div className="p-[8px] hover:bg-[#f7f7f7] mb-[4px] flex items-center w-full ">
                <InvoiceIcon />
                <p className="ml-[8px] font-sans text-[#373737] ">Get Quotes</p>
              </div>
            </Link>
            <Link to="/track-code">
              <div className="p-[8px] hover:bg-[#f7f7f7] mb-[4px] flex items-center w-full ">
                <TrackingIcon />
                <p className="ml-[8px] font-sans text-[#373737] ">Track Move</p>
              </div>
            </Link>
            <Link to="/vendor-login">
              <div className="p-[8px] hover:bg-[#f7f7f7] border-t-[1px] border-[#E4F2FB] flex items-center w-full ">
                <TruckIcon />
                <p className="ml-[8px] font-sans text-[#373737] ">
                  Become a partner
                </p>
              </div>
            </Link>
          </div>
        )}
      </nav>
      <nav className=" w-[90vw] mobileNav hidden relative items-center mx-auto max-w-[1500px] justify-between">
        <Link to="/" className="">
          <Logo />
        </Link>
        <div
          onClick={toggleMobileMenu}
          className="h-[26px] w-[26px] border-[1px] border-[#d9d9d9] rounded-full flex items-center justify-center "
        >
          {!isMobileOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M18.6184 8H4.77224C4.45685 8 4.19531 7.54667 4.19531 7C4.19531 6.45333 4.45685 6 4.77224 6H18.6184C18.9338 6 19.1953 6.45333 19.1953 7C19.1953 7.54667 18.9338 8 18.6184 8Z"
                fill="#1F0047"
              />
              <path
                d="M18.6184 13H4.77224C4.45685 13 4.19531 12.5467 4.19531 12C4.19531 11.4533 4.45685 11 4.77224 11H18.6184C18.9338 11 19.1953 11.4533 19.1953 12C19.1953 12.5467 18.9338 13 18.6184 13Z"
                fill="#1F0047"
              />
              <path
                d="M18.6184 18H4.77224C4.45685 18 4.19531 17.5467 4.19531 17C4.19531 16.4533 4.45685 16 4.77224 16H18.6184C18.9338 16 19.1953 16.4533 19.1953 17C19.1953 17.5467 18.9338 18 18.6184 18Z"
                fill="#1F0047"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M7.68 18L12 13.68L16.32 18L18 16.32L13.68 12L18 7.68L16.32 6L12 10.32L7.68 6L6 7.68L10.32 12L6 16.32L7.68 18Z"
                fill="#DE2527"
              />
            </svg>
          )}
        </div>
        {isMobileOpen && (
          <div className="pt-3 w-full bg-gradient-to-b from-[#E8F5F5] to-white z-100 fixed flex-col  items-center justify-center top-[80px] left-0 h-[calc(100vh-80px)]  ">
            <ul className="flex justify-between flex-col px-4 gap-[16px] ">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? activeMobileClassName
                      : "font-unbounded text-[14px] headerMobileLinks leading-[19.6px] text-[#9E9E9E] "
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="my-3">
                <NavLink
                  to="/about-us"
                  className={({ isActive }) =>
                    isActive
                      ? activeMobileClassName
                      : "font-unbounded headerMobileLinks text-[14px] leading-[19.6px] text-[#9E9E9E] "
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/faq"
                  className={({ isActive }) =>
                    isActive
                      ? activeMobileClassName
                      : "font-unbounded text-[14px] headerMobileLinks leading-[19.6px] text-[#9E9E9E] "
                  }
                >
                  FAQs
                </NavLink>
              </li>
            </ul>

            <div
              onClick={openMenuOptions}
              className="flex w-fit px-4 mt-5 items-center"
            >
              <p className="font-unbounded font-bold text-[18px] text-[#054D96] ">
                Get Started
              </p>
              <div className="w-[24px] ml-2 h-[24px] bg-white rounded-full flex items-center justify-center ">
                {menuOptionsOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M14.364 10.7075C14.1764 10.895 13.9221 11.0003 13.657 11.0003C13.3918 11.0003 13.1375 10.895 12.95 10.7075L7.99995 5.75754L3.04995 10.7075C2.86135 10.8897 2.60875 10.9905 2.34655 10.9882C2.08435 10.9859 1.83354 10.8808 1.64813 10.6954C1.46272 10.5099 1.35756 10.2591 1.35528 9.99694C1.353 9.73474 1.45379 9.48214 1.63595 9.29354L7.29295 3.63654C7.48048 3.44907 7.73479 3.34375 7.99995 3.34375C8.26512 3.34375 8.51942 3.44907 8.70695 3.63654L14.364 9.29354C14.5514 9.48106 14.6567 9.73537 14.6567 10.0005C14.6567 10.2657 14.5514 10.52 14.364 10.7075Z"
                      fill="#525252"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      d="M1.63605 5.79344C1.82358 5.60597 2.07788 5.50065 2.34305 5.50065C2.60821 5.50065 2.86252 5.60597 3.05005 5.79344L8.00005 10.7434L12.95 5.79344C13.1387 5.61128 13.3913 5.51049 13.6535 5.51277C13.9156 5.51504 14.1665 5.62021 14.3519 5.80562C14.5373 5.99103 14.6424 6.24184 14.6447 6.50404C14.647 6.76624 14.5462 7.01884 14.364 7.20744L8.70705 12.8644C8.51952 13.0519 8.26521 13.1572 8.00005 13.1572C7.73488 13.1572 7.48058 13.0519 7.29305 12.8644L1.63605 7.20744C1.44858 7.01991 1.34326 6.7656 1.34326 6.50044C1.34326 6.23528 1.44858 5.98097 1.63605 5.79344Z"
                      fill="#525252"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div className="m-4">
              <LanguageSwitcher />
            </div>

            <div>
              {menuOptionsOpen && (
                <div className="w-full mt-3 flex ">
                  <div
                    ref={menuRef} // Attach the ref to the menu options container
                    className=" w-full h-fit px-4 "
                  >
                    <Link to="/quote">
                      <div className="py-[8px] mb-[4px] flex items-center w-full ">
                        <InvoiceIcon />
                        <p className="ml-[8px] font-sans text-[#373737] ">
                          Get Quotes
                        </p>
                      </div>
                    </Link>
                    <Link to="/track-code">
                      <div className="py-[8px] mb-[4px] flex items-center w-full ">
                        <TrackingIcon />
                        <p className="ml-[8px] font-sans text-[#373737] ">
                          Track Move
                        </p>
                      </div>
                    </Link>
                    <Link to="/get-started">
                      <div className="py-[8px] border-t-[1px] border-[#E4F2FB] flex items-center w-full ">
                        <TruckIcon />
                        <p className="ml-[8px] font-sans text-[#373737] ">
                          Become a partner
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
