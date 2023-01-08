import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchparams, setsearchparams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchparams.get("query") || "";

  useEffect(() => {
    const getData = setTimeout(async () => {
      try {
        let res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=5b2334617cd63be51871f0ff36fb3b3c&query=${query}`
        );
        let { results } = await res.json();
        console.log(results);
        setMovies(results);
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    return () => clearTimeout(getData);
  }, [searchparams]);

  const handleChange = (e) => {
    let value = e.target.value;
    setsearchparams({ query: value });
  };
  return (
    <div>
      <h1>Search</h1>
      <input type="text" value={query} onChange={handleChange} />
      <div>
        {movies?.map((e, i) => {
          let url;
          if (e.backdrop_path)
            url = `https://image.tmdb.org/t/p/w1280${e.backdrop_path}`;
          else if (e.poster_path)
            url = `https://image.tmdb.org/t/p/w1280${e.poster_path}`;
          return (
            <div key={i}>
              <h1>{e.title}</h1>
              <img src={url} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
