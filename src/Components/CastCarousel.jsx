/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Img from "./LazyLoadImg";
import ProfileFallback from "../assets/images/profile-fallback.png";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const CastCarousel = ({ mediaCredits, baseUrl, size }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleScrollLeft = () => {
    containerRef.current.scrollBy({
      left: -700,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    containerRef.current.scrollBy({
      left: 700,
      behavior: "smooth",
    });
  };

  console.log(mediaCredits);

  const renderedCast = mediaCredits.cast.map((person, idx) => {
    const castImg = baseUrl + size + person.profile_path;
    return (
      <div
        key={idx}
        className={`inline-block mr-4 text-center md:flex md:flex-col items-center justify-center rounded-2xl md:flex-shrink-0 md:flex-grow-0`}
      >
        <div className="relative group mt-4 md:mt-8">
          <div className="w-[135px] h-[135px] md:w-[170px] md:h-[170px] rounded-full">
            <Img
              src={person.profile_path ? castImg : ProfileFallback}
              className={
                "w-[135px] h-[135px] md:w-[170px] md:h-[170px] border-4 rounded-full object-cover  hover:border-4"
              }
            />
          </div>
        </div>
        <h3 className="text-white font-bold mt-2 md:text-lg md:w-[200px] w-[120px] truncate ...">
          {person.name}
        </h3>
      </div>
    );
  });

  return (
    <div className="relative">
      <h3 className="text-white text-3xl ml-4">Cast</h3>
      <div
        className="overflow-x-auto md:overflow-x-hidden whitespace-nowrap p-4 md:p-0 md:flex gap-0 "
        ref={containerRef}
      >
        {renderedCast}
      </div>
      <div>
        <div className="md:block absolute left-5 top-[150px] -translate-y-1/2 text-3xl cursor-pointer hidden text-white hover:text-sky-500">
          <BsFillArrowLeftCircleFill onClick={handleScrollLeft} />
        </div>
        <div className="md:block absolute right-10 top-[150px] -translate-y-1/2 text-3xl cursor-pointer hidden text-white hover:text-sky-500">
          <BsFillArrowRightCircleFill onClick={handleScrollRight} />
        </div>
      </div>
    </div>
  );
};

export default CastCarousel;
