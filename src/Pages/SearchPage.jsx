/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFromApi } from "../utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import MediaCard from "../Components/MediaCard";

const SearchPage = ({ baseUrl, size, genres }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const { searchTerm } = useParams();

  const fetchInitialData = () => {
    fetchFromApi(`search/multi?query=${searchTerm}&`).then((res) => {
      setData(res.results);
      setPage((prevState) => prevState + 1);
    });
  };

  const fetchNextData = () => {
    fetchFromApi(`search/multi?query=${searchTerm}&page=${page}&`).then(
      (res) => {
        setData([...data, ...res.results]);
        setPage((prevState) => prevState + 1);
      }
    );
  };

  useEffect(() => {
    fetchInitialData();
    setPage(1);
  }, [searchTerm]);

  return (
    <div className="bg-indigo-950 min-h-screen -mt-[72px] p-4">
      <div className="  max-w-[1440px] mx-auto">
        <div className="py-[100px] px-4">
          <h2 className="text-white text-2xl">{`Search results for "${searchTerm}"`}</h2>
        </div>
        <InfiniteScroll
          dataLength={data.length}
          next={fetchNextData}
          hasMore={true}
        >
          <div className="flex flex-wrap justify-center gap-12 py-8">
            {data.map((media, idx) => {
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
  );
};

export default SearchPage;
