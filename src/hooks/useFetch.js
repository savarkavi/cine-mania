/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { fetchFromApi } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("Loading...");
    setError(null);
    setData(null);

    fetchFromApi(url)
      .then((res) => {
        setData(res);
        setLoading(null);
      })
      .catch((err) => {
        setError(`something went wrong, ${err}`);
        setLoading(null);
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
