/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { sorting } from "../assets/constants";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";
import { fetchFromApi } from "../utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import MediaCard from "../Components/MediaCard";

const Explore = ({ baseUrl, size, genres }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [sortingMethod, setSortingMethod] = useState("");
  const [genreMenu, setGenreMenu] = useState(false);
  const [sortMenu, setSortMenu] = useState(false);

  const { mediaType } = useParams();

  const fetchInitialData = () => {
    const genreString = selectedGenre.map((id) => id.toString()).join(",");
    fetchFromApi(
      `discover/${mediaType}?sort_by=${
        sortingMethod || "popularity.desc"
      }&with_genres=${genreString}&`
    ).then((res) => {
      setData([...res.results]);
      setPage((prevState) => prevState + 1);
    });
  };

  const fetchNextData = () => {
    const genreString = selectedGenre.map((id) => id.toString()).join(",");

    fetchFromApi(
      `discover/${mediaType}?sort_by=${
        sortingMethod || "popularity.desc"
      }&with_genres=${genreString}&page=${page}&`
    ).then((res) => {
      setData([...data, ...res.results]);
      setPage((prevState) => prevState + 1);
    });
  };

  const dataWithMediaType = data.map((media) => ({
    ...media,
    media_type: `${mediaType}`,
  }));

  console.log(dataWithMediaType);

  useEffect(() => {
    fetchInitialData();
    setPage(1);
  }, [mediaType, sortingMethod, selectedGenre]);

  const handleSelectionGenre = (genreId) => {
    if (selectedGenre.includes(genreId)) {
      const updatedGenre = selectedGenre.filter((genre) => genre !== genreId);
      setSelectedGenre(updatedGenre);
    } else {
      const updatedGenre = [genreId, ...selectedGenre];
      setSelectedGenre(updatedGenre);
    }
  };

  const handleSelectionSort = (sortId) => {
    setSortingMethod(sortId);
  };

  const handleMenuClick = (e) => {
    if (e.currentTarget.className.includes("genres")) {
      setGenreMenu((prev) => !prev);
    }

    if (e.currentTarget.className.includes("sorting")) {
      setSortMenu((prev) => !prev);
    }
  };

  const renderedGenreOptions = genres?.map((genre) => {
    return (
      <div
        key={genre?.id}
        className="w-full cursor-pointer hover:bg-gray-200 p-2"
        onClick={() => handleSelectionGenre(genre.id)}
      >
        {selectedGenre.includes(genre.id) ? (
          <div className="flex items-center gap-2">
            {genre?.name}
            <BsCheckLg className="text-green-600" />
          </div>
        ) : (
          <div>{genre?.name}</div>
        )}
      </div>
    );
  });

  const renderedSortOptions = sorting.map((sort) => {
    return (
      <div
        key={sort.id}
        className="w-full cursor-pointer hover:bg-gray-200 p-2 "
        onClick={() => handleSelectionSort(sort.id)}
      >
        {sortingMethod === sort.id ? (
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              {sort.name} <span>{sort.icon}</span>
            </div>
            <BsCheckLg className="text-green-600" />
          </div>
        ) : (
          <div className="flex items-center gap-1">
            {sort.name} <span>{sort.icon}</span>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="bg-indigo-950 min-h-screen -mt-[72px]">
      <div className="pt-28 px-4 max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <h3 className="text-white text-2xl lg:text-3xl">
            {mediaType === "movie" ? "Explore Movies" : "Explore TV Shows"}
          </h3>
          <div className="flex flex-col gap-4 md:gap-8 md:flex-row">
            <div className=" relative">
              <div className="bg-gradient-to-r from-[#36D1DC] to-[#5B86E5] w-[200px] h-[40px] rounded-full flex items-center justify-between  p-3">
                <h3 className="">Select Genres</h3>
                <div className="genres" onClick={handleMenuClick}>
                  <AiOutlineDown className="cursor-pointer" />
                </div>
              </div>
              {genreMenu && (
                <div className="bg-white h-[500px] overflow-y-auto py-2 flex flex-col rounded-xl absolute top-11 w-full z-[99]">
                  {renderedGenreOptions}
                </div>
              )}
            </div>
            <div className=" relative ">
              <div className="bg-gradient-to-r from-[#36D1DC] to-[#5B86E5] w-[200px] h-[40px] rounded-full flex items-center justify-between  p-3">
                <h3 className="">Sort By</h3>
                <div className="sorting" onClick={handleMenuClick}>
                  <AiOutlineDown className="  cursor-pointer" />
                </div>
              </div>
              {sortMenu && (
                <div className="bg-white py-2 flex flex-col gap-3 rounded-xl absolute top-11 w-full z-[99]">
                  {renderedSortOptions}
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <InfiniteScroll
            dataLength={dataWithMediaType.length}
            next={fetchNextData}
            hasMore={true}
          >
            <div className="flex flex-wrap justify-center gap-12 py-8">
              {dataWithMediaType.map((media, idx) => {
                return (
                  <MediaCard
                    key={idx}
                    data={media}
                    baseUrl={baseUrl}
                    size={size}
                    genres={genres}
                  />
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Explore;
