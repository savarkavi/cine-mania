/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { fetchFromApi } from "../utils/api";
import Carousel from "./Carousel";

const TopRatedShows = ({ baseUrl, size, genres }) => {
  const [topRatedShows, setTopRatedShows] = useState([]);

  useEffect(() => {
    const data = async () => {
      const { results } = await fetchFromApi(`tv/top_rated?language=en-US&`);
      const showsWithMediaTypes = results.map((show) => ({
        ...show,
        media_type: "tv",
      }));
      setTopRatedShows(showsWithMediaTypes);
    };
    data();
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto p-4 mt-8 md:mt-20  flex flex-col gap-6 items-center ">
      <div className="flex  items-center  justify-between w-full">
        <h3 className="text-white text-xl sm:text-2xl">Top Rated Shows</h3>
      </div>
      <div className=" w-screen md:w-full">
        <Carousel
          data={topRatedShows}
          baseUrl={baseUrl}
          size={size}
          genres={genres}
        />
      </div>
    </div>
  );
};

export default TopRatedShows;
