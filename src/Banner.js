import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovies(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }

    fetchData();
  }, []);
  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* .banner_buttons */}
        <div className=".banner_buttons">
          <button className=" banner_button">play</button>
          <button className=" banner_button">My List</button>
        </div>
        <h1 className="banner_description">
          {" "}
          {truncate(movie?.overview, 150)}
        </h1>
        {/* {truncate(movie?.overview,100)} */}
      </div>

      {/* title */}
      {/* 2 buttons */}
      {/* description */}
      <div className="banner_fadeBottom"></div>
    </header>
  );
}

export default Banner;
