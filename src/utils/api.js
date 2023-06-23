/* eslint-disable no-unused-vars */
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

export const fetchFromApi = async (url) => {
  const { data } = await axios.get(
    `${BASE_URL}/${url}api_key=337cbb7e93728d9edd0549ef3e6aa22c`
  );
  return data;
};
