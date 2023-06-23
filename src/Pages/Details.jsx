/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { fetchFromApi } from "../utils/api";
import { useParams } from "react-router-dom";
import Img from "../Components/LazyLoadImg";
import { FiPlay } from "react-icons/fi";
import CircleRating from "../Components/CircularRating";
import dayjs from "dayjs";
import CastCarousel from "../Components/CastCarousel";
import Carousel from "../Components/Carousel";
import ReactPlayer from "react-player";

const Details = ({ baseUrl, size, genres }) => {
  const [mediaDetail, setMediaDetail] = useState(null);
  const [imgUrlBackground, setImgUrlBackground] = useState("");
  const [imgUrlPoster, setImgUrlPoster] = useState("");
  const [mediaCredits, setMediaCredits] = useState(null);
  const [similarMedia, setSimilarMedia] = useState(null);
  const [recommendedMedia, setRecommendedMedia] = useState(null);
  const { mediaType, id } = useParams();

  useEffect(() => {
    fetchFromApi(`${mediaType}/${id}?`).then((data) => {
      setMediaDetail(data);
      setImgUrlBackground(baseUrl + size + data.backdrop_path);
      setImgUrlPoster(baseUrl + size + data.poster_path);
    });

    fetchFromApi(`${mediaType}/${id}/credits?`).then((data) => {
      setMediaCredits(data);
    });

    fetchFromApi(`${mediaType}/${id}/similar?`).then((data) => {
      const similarMediaTypes = data.results.map((media) => ({
        ...media,
        media_type: `${mediaType}`,
      }));
      setSimilarMedia(similarMediaTypes);
    });

    fetchFromApi(`${mediaType}/${id}/recommendations?`).then((data) => {
      setRecommendedMedia(data.results);
    });
  }, [mediaType, id, baseUrl, size]);
  console.log(similarMedia);

  const director = mediaCredits?.crew.filter((person) => {
    return person.job === "Director";
  });

  const writer = mediaCredits?.crew.filter((person) => {
    return person.job === "Writer";
  });

  if (mediaDetail === null) {
    return <div></div>;
  }

  if (mediaCredits === null) {
    return <div></div>;
  }

  if (similarMedia === null) {
    return <div></div>;
  }

  if (recommendedMedia === null) {
    return <div></div>;
  }

  const renderedGenres = mediaDetail.genres.map((genre) => {
    return (
      <div key={genre.id}>
        <div
          className={
            "bg-gradient-to-r from-[#36D1DC] to-[#5B86E5] text-xs p-2 text-white rounded-lg"
          }
        >
          {genre?.name}
        </div>
      </div>
    );
  });

  return (
    <div className="bg-indigo-950 min-h-[2700px] sm:min-h-[3000px] md:min-h-[2200px] -mt-[72px]  ">
      <div className="relative md:flex md:flex-col md:items-center md:justify-center w-screen">
        <div className="opacity-20 ">
          <Img
            src={imgUrlBackground}
            className={"h-[700px] w-screen object-cover"}
          />
          <div className="absolute w-full h-[300px] bottom-0 left-0 bg-gradient-to-t from-indigo-950"></div>
        </div>
        <div className="absolute top-[100px] w-screen">
          <div className="md:mt-8 md:flex md:justify-center md:gap-12 max-w-[1400px] mx-auto p-4">
            <div>
              <Img
                src={imgUrlPoster}
                className={"rounded-2xl md:max-w-[400px]   "}
              />
            </div>
            <div className="mt-6 md:mt-0 flex flex-col gap-4 justify-center md:max-w-[500px] xl:max-w-[700px]">
              <h3 className="text-white text-3xl lg:text-4xl">
                {mediaDetail.title || mediaDetail.name}
              </h3>
              <div className="flex gap-2 flex-wrap">{renderedGenres}</div>
              <div className="flex gap-8 mt-4 items-center">
                <CircleRating
                  rating={mediaDetail.vote_average.toFixed(1)}
                  className={"w-16 "}
                />
                <div className="flex items-center gap-4 cursor-pointer group">
                  <div className="bg-indigo-950 w-16 h-16 rounded-full border-2 flex justify-center items-center text-white text-xl group-hover:border-sky-500 group-hover:text-sky-500 transition-all">
                    <FiPlay />
                  </div>
                  <span className="text-white text-xl group-hover:text-sky-500 transition-all">
                    Watch Trailer
                  </span>
                </div>
              </div>
              <div className="text-white flex flex-col gap-4 mt-4">
                <h3 className="text-2xl font-bold">Overview</h3>
                <p className="text-white">{mediaDetail.overview}</p>
              </div>
              <div>
                <div className="flex text-white justify-between mt-4">
                  <div className="flex flex-col sm:flex-row sm:gap-2 md:flex-col md:gap-0">
                    <h3>Status:</h3>
                    <div className="text-gray-400 text-[16px]">
                      {mediaDetail.status}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2 md:flex-col md:gap-0">
                    <h3>Release Date:</h3>
                    <div className="text-gray-400 text-[16px]">
                      {dayjs(mediaDetail.release_date).format("MMMM D, YYYY")}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2 md:flex-col md:gap-0">
                    <h3>Runtime:</h3>
                    <div className="text-gray-400 text-[16px]">{`${mediaDetail.runtime} min`}</div>
                  </div>
                </div>
                <div>
                  <div className="mt-4 border-t border-t-gray-400 py-2 h-[60px] flex items-center">
                    <h3 className="text-white">
                      Director:{" "}
                      <span className="text-gray-400 text-[16px]">
                        {director.map((person) => {
                          return (
                            <span key={person.credit_id} className="ml-4">
                              {person.name}
                            </span>
                          );
                        })}
                      </span>
                    </h3>
                  </div>
                  <div className=" border-y border-t-gray-400 py-2 h-[60px] flex items-center">
                    <h3 className="text-white">
                      Writer:{" "}
                      <span className="text-gray-400 text-[16px]">
                        {writer.map((person) => {
                          return (
                            <span key={person.credit_id} className="ml-4">
                              {person.name}
                            </span>
                          );
                        })}
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[1440px] mx-auto mt-12">
            <div className="md:p-4">
              <CastCarousel
                mediaCredits={mediaCredits}
                baseUrl={baseUrl}
                size={size}
              />
            </div>
            <div className="mt-8 md:p-4">
              <h3 className="text-white text-3xl ml-4 md:ml-0 mb-8">
                {mediaType === "movie" ? `Similar Movies` : `Similar Shows`}
              </h3>
              <Carousel
                data={similarMedia}
                baseUrl={baseUrl}
                size={size}
                genres={genres}
              />
            </div>
            <div className="mt-8 md:p-4">
              <h3 className="text-white text-3xl ml-4 md:ml-0 mb-8">
                {mediaType === "movie"
                  ? `Recommended Movies`
                  : `Recommended Shows`}
              </h3>
              <Carousel
                data={recommendedMedia}
                baseUrl={baseUrl}
                size={size}
                genres={genres}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
