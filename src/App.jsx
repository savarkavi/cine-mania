/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";
import { fetchFromApi } from "./utils/api";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Details from "./Pages/Details";
import Explore from "./Pages/Explore";
import SearchPage from "./Pages/SearchPage";

function App() {
  const [baseUrl, setBaseUrl] = useState("");
  const [size, setSize] = useState("");
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    fetchFromApi(`configuration?`).then((data) => {
      setBaseUrl(data.images.base_url);
      setSize(data.images.poster_sizes[6]);
    });

    fetchFromApi("genre/movie/list?").then((data) => {
      setGenres(data.genres);
    });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home baseUrl={baseUrl} size={size} genres={genres} />}
        />
        <Route
          path="/search/:searchTerm"
          element={<SearchPage baseUrl={baseUrl} size={size} genres={genres} />}
        />
        <Route
          path="/explore/:mediaType"
          element={<Explore baseUrl={baseUrl} size={size} genres={genres} />}
        />
        <Route
          path="/details/:mediaType/:id"
          element={<Details baseUrl={baseUrl} size={size} genres={genres} />}
        />
      </Routes>
      {/* {<Footer />} */}
    </BrowserRouter>
  );
}

export default App;
