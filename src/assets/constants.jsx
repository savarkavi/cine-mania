/* eslint-disable no-unused-vars */
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

export const headerLinks = [
  { name: "Movies", value: "movies" },
  { name: "TV Shows", value: "tvshows" },
];

export const footerLinks = [
  { name: "Terms of use", value: "terms" },
  { name: "Privacy policy", value: "privacy" },
  { name: "About", value: "about" },
  { name: "Blog", value: "blog" },
];

export const sorting = [
  { name: `Popularity `, id: "popularity.desc", icon: <AiOutlineArrowDown /> },
  { name: "Popularity ", id: "popularity.asc", icon: <AiOutlineArrowUp /> },
  { name: "Rating ", id: "vote_average.desc", icon: <AiOutlineArrowDown /> },
  { name: "Rating ", id: "vote_average.asc", icon: <AiOutlineArrowUp /> },
  {
    name: "Release Date ",
    id: "primary_release_date.desc",
    icon: <AiOutlineArrowDown />,
  },
  {
    name: "Release Date ",
    id: "primary_release_date.asc",
    icon: <AiOutlineArrowUp />,
  },
  { name: "Title(A-Z)", id: "title" },
];
