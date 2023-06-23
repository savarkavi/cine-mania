/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFromApi } from "../utils/api";
import Img from "./LazyLoadImg";

const HeroBanner = ({ baseUrl, size }) => {
  const [backgroundImg, setBackgroundImg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  useEffect(() => {
    fetchFromApi(`movie/upcoming?`).then((data) => {
      const filePath =
        data.results[Math.floor(Math.random() * 20)].backdrop_path;

      setBackgroundImg(baseUrl + size + filePath);
    });
  }, [baseUrl, size]);

  return (
    //Banner-container
    <div className="w-full relative -mt-[72px]">
      {/* Banner-image */}
      <div className="w-full relative opacity-40">
        <Img
          src={backgroundImg}
          className={` w-screen h-[400px] md:h-[600px] 2xl:h-[700px]  object-cover  `}
        />
      </div>
      <div className="absolute w-full h-[300px] bottom-0 left-0 bg-gradient-to-t from-indigo-950"></div>

      {/* Banner-text-input */}
      <div className="absolute top-2/3 md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-12">
        <div className="w-[80vw]">
          <h2 className="text-white font-bold text-5xl sm:text-6xl lg:text-7xl 2xl:text-8xl tracking-wide text-center mb-4">
            Welcome to CineMania
          </h2>
          <p className="text-white text-center text-xl ">
            Discover and explore millions of Movies and TV shows
          </p>
        </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className="relative max-w-[600px] mx-auto"
          >
            <input
              type="text"
              placeholder="search..."
              value={searchTerm}
              onChange={handleChange}
              className="outline-none py-3 px-6 rounded-full w-full"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#36D1DC] to-[#5B86E5] p-3 rounded-r-full w-[100px] text-white">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
