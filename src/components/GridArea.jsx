import { Grid } from '@mui/material'
import React, {useState, useEffect} from 'react'
import MovieCard from './MovieCard'


export default function GridArea() {

  const [movies, setMovies] = useState([])


  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US')
    .then(response => response.json())
    .then(data => {
      setMovies(data.results)
    })
  }, [])

  return (
    <Grid sx={{overflow:"hidden", display: "flex"}} justifyContent="flex-start" container spacing={2}>
      {
        movies.map((movie,index) => {
           return <MovieCard key={movie.id} image={"https://image.tmdb.org/t/p/w500/"+movie.poster_path} name={movie.title} release_date={movie.release_date.substring(0,4)}
            genres_ids={movie.genre_ids} movie={movie} ></MovieCard>
        })
      }
    </Grid>
  )
}
