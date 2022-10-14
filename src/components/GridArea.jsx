import { Grid, LinearProgress } from '@mui/material'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import React, {useState, useEffect, useRef, useCallback} from 'react'
import MovieCard from './MovieCard'


export default function GridArea(props) {

  const {query} = props
  const [page, setPageNum] = useState(1)
  const loader = useRef(null);
  let isInitialized = useRef(false);
  const { loading, error, movies } = useInfiniteScroll(query,page, isInitialized);

  

  useEffect(() => {
    setPageNum(1)
  }, [query])


  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && isInitialized.current) {
      setPageNum(prev => prev+1);
    }
    isInitialized.current = true;
  }, []);
  
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer.observe(loader.current);
    } 
      
  }, [handleObserver]);

  //Get the first 20 movies from the API
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
              return <MovieCard key={movie.id} image={"https://image.tmdb.org/t/p/w500/"+movie.poster_path} name={movie.title} release_date={movie.release_date}
                genres_ids={movie.genre_ids} movie={movie} size={2} />
            })
          }
          {loading && <LinearProgress color='inherit'/>}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        
        {error && <p>Error!</p>}
        <div ref={loader}></div>
      </Grid>
    </Grid>
    </>
  )
}



