/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Img from "./LazyLoadImg";
import dayjs from "dayjs";

import Placeholder from "../assets/images/placeholder.jpg";

const MediaCard = ({ data, baseUrl, size, genres }) => {
  const navigate = useNavigate();

  const handleNavigation = (media) => {
    navigate(`/details/${media.media_type}/${media.id}`);
  };

  const mediaImage = baseUrl + size + data.poster_path;

  return (
    <div
      className="cursor-pointer hover:scale-105 transition-all"
      onClick={() => handleNavigation(data)}
    >
      {data?.poster_path ? (
        <Img
          src={mediaImage}
          className={"w-[300px] h-[450px] object-cover rounded-xl"}
        />
      ) : (
        <Img
          src={Placeholder}
          className={"w-[300px] h-[450px] object-cover rounded-xl"}
        />
      )}
      <div className="mt-2 max-w-[300px]">
        {data.media_type === "movie" ? (
          <h3 className="text-white text-2xl">{data.title}</h3>
        ) : (
          <h3 className="text-white text-2xl">{data.name}</h3>
        )}
        <h3 className="text-gray-400">
          {dayjs(data.release_date).format("MMMM DD, YYYY")}
        </h3>
      </div>
    </div>
  );
};

export default MediaCard;
