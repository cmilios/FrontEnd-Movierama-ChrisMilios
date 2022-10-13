import { Grid, LinearProgress, Typography } from '@mui/material'
import React, {useState, useEffect, useRef, useCallback} from 'react'
import useFetch from '../hooks/useFetch'
import MovieCard from './MovieCard'


export default function GridArea() {

  const [page, setPage] = useState(1)
  const { loading, error, movies } = useFetch(page);
  const loader = useRef(null);


  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      // rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current){
      observer.observe(loader.current);
    } 
      
  }, [handleObserver]);

  // useEffect(() => {
  //   fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US&page="+page)
  //   .then(response => response.json())
  //   .then(data => {
  //     setMovies(data.results)
  //   })
  // }, [])

  return (
    <>
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Grid container justifyContent="flex-start" alignItems="baseline" spacing={2}>
          {
            movies.map(movie => {
              return <MovieCard key={movie.id} image={"https://image.tmdb.org/t/p/w500/"+movie.poster_path} name={movie.title} release_date={movie.release_date.substring(0,4)}
                genres_ids={movie.genre_ids} movie={movie} size={2} />
            })
          }
        </Grid>
      </Grid>
    </Grid>
    {loading && <LinearProgress color='inherit'/>}
    {error && <p>Error!</p>}
    <div ref={loader}></div>
    </>
  )
}
