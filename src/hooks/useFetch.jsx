import React from 'react'
import { useState, useEffect, useCallback } from 'react'

export default function useFetch(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      // const res = await axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US&page="+page);
      // await setMovies((prev) => [...prev, ...res.data.results])
      fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US&page="+page)
      .then(response => response.json())
      .then(data => {
        console.log("loading page: "+page)
        setMovies((prev) => [...prev,  ...data.results])
      })
      setLoading(false);


    } catch (err) {
      setError(err);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery]);

  return { loading, error, movies: movies };

}
