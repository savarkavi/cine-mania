/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import Placeholder from "../assets/images/placeholder.jpg";
import Img from "./LazyLoadImg";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Carousel = ({ data, baseUrl, size, genres }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleNavigation = (media) => {
    navigate(`/details/${media.media_type}/${media.id}`);
  };

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

  if (data.length === 0) {
    return <div className="text-white text-2xl ml-4">No Movies to show</div>;
  }

  const renderedMedia = data.map((media, idx) => {
    const mediaGenres = media.genre_ids.map((id) => {
      return genres?.filter((genre) => id === genre.id);
    });

    const renderedMediaGenres = mediaGenres.slice(0, 2).map((genre, idx) => {
      if (genre) {
        return (
          <div key={idx}>
            <div
              className={`${
                genre[0]
                  ? "bg-gradient-to-r from-[#36D1DC] to-[#5B86E5] text-sm p-2 rounded-xl"
                  : ""
              }`}
            >
              {genre[0]?.name}
            </div>
          </div>
        );
      }
    });

    const mediaImg = baseUrl + size + media.poster_path;
    return (
      <div
        key={idx}
        className={`inline-block mr-4  rounded-2xl md:flex-shrink-0 md:flex-grow-0 cursor-pointer`}
        onClick={() => handleNavigation(media)}
      >
        <div className="relative group ">
          <div className="group-hover:opacity-30">
            <Img
              src={media.poster_path ? mediaImg : Placeholder}
              className={
                "w-[135px] h-[200px] border-4 rounded-2xl md:w-[202px] md:h-[300px]  hover:border-4 object-cover hover:border-sky-500 transition-all "
              }
            />
          </div>
          <div className=" group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold text-center opacity-0 transition-all duration-500">
            <span>{`${media.vote_average.toFixed(1)}/10`}</span>
            <div className="flex flex-col gap-2 mt-4">
              {renderedMediaGenres}
            </div>
          </div>
        </div>
        <h3 className="text-white font-bold mt-2 md:text-lg md:w-[200px] w-[120px] truncate ...">
          {media.title || media.name}
        </h3>
        <span className="text-gray-400 text-sm">
          {dayjs(media.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    );
  });

  return (
    <div className="relative ">
      <div
        className="overflow-x-auto md:overflow-x-hidden whitespace-nowrap p-4 md:p-0 md:flex gap-4 "
        ref={containerRef}
      >
        {renderedMedia}
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

export default Carousel;
