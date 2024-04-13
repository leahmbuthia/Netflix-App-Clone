import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from 'movie-trailer'

const baseURL = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] =useState("");


  const axiosinstance = axios.create({
    baseURL:"https://api.themoviedb.org/3",
});
  useEffect(() => {
    
    async function fetchData() {
      const request = await axiosinstance
      .get(fetchUrl);
      setMovies(request.data.results);
    
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  console.table(movies);

  const opts={
    height: "390",
    width:"100%",
    playerVars:{
      autoplay:1,
    },
  }
  const handleClick = (movie) =>{
    if(trailerUrl){
      setTrailerUrl('')
    }else{
      movieTrailer(movie?.name ||"")
      .then(url =>{
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl (urlParams.get('v'));
      })
      .catch((error) => console.log(error));
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {/* several rows to map through */}
        {movies.map((movie) => (
          <img
          key={movie.id} onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${baseURL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/> } 
    </div>
  );
}

export default Row;
