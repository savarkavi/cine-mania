/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { fetchFromApi } from "../utils/api";
import Tabs from "./Tabs";
import Carousel from "./Carousel";

const TrendingMovies = ({ baseUrl, size, genres }) => {
  const [timeWindow, setTimeWindow] = useState("day");
  const [trendingMovies, setTrendingMovies] = useState([]);

  const handleTimeWindow = (time) => {
    setTimeWindow(time);
  };

  useEffect(() => {
    const data = async () => {
      const { results } = await fetchFromApi(`trending/movie/${timeWindow}?`);
      setTrendingMovies(results);
    };
    data();
  }, [timeWindow]);

  return (
    <div className="max-w-[1400px] mx-auto p-4 mt-20 md:mt-4 flex flex-col gap-6 items-center ">
      <div className="flex  items-center  justify-between w-full">
        <h3 className="text-white text-xl sm:text-2xl">Trending Movies</h3>
        <Tabs
          data={[
            { time: "Day", value: "day" },
            { time: "Week", value: "week" },
          ]}
          handleTimeWindow={handleTimeWindow}
        />
      </div>
      <div className=" w-screen md:w-full">
        <Carousel
          data={trendingMovies}
          baseUrl={baseUrl}
          size={size}
          genres={genres}
        />
      </div>
    </div>
  );
};

export default TrendingMovies;
