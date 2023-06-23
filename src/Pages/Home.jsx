/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { ColorRing } from "react-loader-spinner";
import HeroBanner from "../Components/HeroBanner";
import TrendingMovies from "../Components/TrendingMovies";
import TrendingTvShows from "../Components/TrendingTvShows";
import TopRatedMovies from "../Components/TopRatedMovies";
import TopRatedShows from "../Components/TopRatedShows";

const Home = ({ baseUrl, size, genres }) => {
  return (
    <div className="bg-indigo-950 min-h-screen ">
      <HeroBanner baseUrl={baseUrl} size={size} />
      {genres?.length > 0 ? (
        <div className="pb-12 md:pb-20">
          <TrendingMovies baseUrl={baseUrl} size={size} genres={genres} />
          <TrendingTvShows baseUrl={baseUrl} size={size} genres={genres} />
          <TopRatedMovies baseUrl={baseUrl} size={size} genres={genres} />
          <TopRatedShows baseUrl={baseUrl} size={size} genres={genres} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Home;
