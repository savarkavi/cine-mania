/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { fetchFromApi } from "../utils/api";
import Carousel from "./Carousel";

const TopRatedMovies = ({ baseUrl, size, genres }) => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const data = async () => {
      const { results } = await fetchFromApi(`movie/top_rated?language=en-US&`);

      const moviesWithMediaTypes = results.map((movie) => ({
        ...movie,
        media_type: "movie",
      }));
      setTopRatedMovies(moviesWithMediaTypes);
    };
    data();
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto p-4 mt-8 md:mt-20 flex flex-col gap-6 items-center ">
      <div className="flex  items-center  justify-between w-full">
        <h3 className="text-white text-xl sm:text-2xl">Top Rated Movies</h3>
      </div>
      <div className=" w-screen md:w-full">
        <Carousel
          data={topRatedMovies}
          baseUrl={baseUrl}
          size={size}
          genres={genres}
        />
      </div>
    </div>
  );
};

export default TopRatedMovies;
