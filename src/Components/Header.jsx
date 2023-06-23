/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import headerLogo from "../assets/images/logo.png";
import { BiSearch } from "react-icons/bi";
import { AiOutlineBars } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { headerLinks } from "../assets/constants";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [headerColor, setHeaderColor] = useState("[rgba(0,0,70,0.2)]");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setIsSearchOpen(false);
    setSearchTerm("");
  };

  const handleHeaderShow = () => {
    if (window.scrollY > 78) {
      if (window.scrollY > lastScroll) {
        setShow(false);
      } else {
        setShow(true);
        setHeaderColor("indigo-950");
      }
    } else if (window.scrollY <= 78 && !isMenuOpen) {
      setHeaderColor("[rgba(0,0,70,0.2)]");
    } else {
      setHeaderColor("indigo-950");
    }

    setLastScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleHeaderShow);
    return () => {
      window.removeEventListener("scroll", handleHeaderShow);
    };
  }, [lastScroll]);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
    setIsSearchOpen(false);
    setHeaderColor("indigo-950");
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    setHeaderColor("[rgba(0,0,70,0.2)]");
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
    setIsMenuOpen(false);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const handleLogoNavigation = () => {
    navigate(`/`);
  };

  const handleLinkNavigation = (type) => {
    window.scrollTo(0, 0);
    if (type === "movies") {
      navigate(`/explore/movie`);
    } else if (type === "tvshows") {
      navigate(`/explore/tv`);
    } else if (type === "trending") {
      navigate(`/explore/trending`);
    }
    setIsMenuOpen(false);
  };

  const renderedLinks = headerLinks.map((link) => {
    return (
      <li
        key={link.value}
        className="hover:bg-gradient-to-r from-[#36D1DC] to-[#5B86E5] hover:text-transparent hover:bg-clip-text transition-all cursor-pointer text-lg"
        onClick={() => handleLinkNavigation(link.value)}
      >
        {link.name}
      </li>
    );
  });

  return (
    <div
      className={`sticky top-0 z-[999] transition-all duration-500 shadow-xl backdrop-blur-lg ${
        show || isMenuOpen ? "" : "-translate-y-[100px]"
      }`}
    >
      <div className={` p-4 transition-all bg-${headerColor}  `}>
        <div className="flex justify-between items-center max-w-[1400px] mx-auto">
          <div
            className="flex items-center cursor-pointer gap-3"
            onClick={handleLogoNavigation}
          >
            <img src={headerLogo} alt="Website Logo" className="w-10 " />
            <h1 className="font-Darumadrop text-2xl bg-gradient-to-r from-[#36D1DC] to-[#5B86E5] text-transparent bg-clip-text lg:text-3xl">
              CineManiaZone
            </h1>
          </div>
          <div>
            <ul className=" hidden md:flex md:gap-12 mr-8 text-white text-base">
              {renderedLinks}
            </ul>
          </div>
          <div className="flex gap-4 items-center text-white text-xl">
            <div className="cursor-pointer">
              <BiSearch onClick={handleSearchOpen} />
            </div>
            {isMenuOpen ? (
              <div>
                <RxCross1
                  className="cursor-pointer md:hidden"
                  onClick={handleMenuClose}
                />
              </div>
            ) : (
              <div>
                <AiOutlineBars
                  className="cursor-pointer md:hidden"
                  onClick={handleMenuOpen}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`w-full bg-indigo-950 absolute ${
          isMenuOpen ? "top-[72px]" : "-top-96"
        } px-6 py-4 h-[200px] border-t border-black transition-all duration-500`}
      >
        <ul className="flex flex-col gap-4 justify-center items-center h-full text-white text-xl">
          {renderedLinks}
        </ul>
      </div>
      <div
        className={`w-full absolute ${
          isSearchOpen && show ? "top-[72px]" : "-top-96"
        } h-[50px] transition-all duration-500`}
      >
        <form className="w-full h-full relative" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
            className="border w-full h-full px-4 outline-none"
          />
          <RxCross1
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={handleSearchClose}
          />
        </form>
      </div>
    </div>
  );
};

export default Header;
