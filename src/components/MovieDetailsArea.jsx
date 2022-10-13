import { Grid, Typography, Divider, ImageList, ImageListItem} from '@mui/material'
import React, {useState, useEffect} from 'react'
import MovieCard from './MovieCard'
import ReviewBox from './ReviewBox'

export default function MovieDetailsArea(props) {

  const {movie} = props

  const [trailers, setTrailers] = useState([])
  const [reviews, setReviews] = useState([])
  const [similarMovies, setSimilarMovies] = useState([])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US`)
    .then(response => response.json())
    .then(data => {
      setTrailers([])
      data.results.map(trailer => {
        if(trailer.type === "Trailer"){
          setTrailers(trailers => [...trailers, trailer])
        }
      })
    })

    fetch(`https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US`)
    .then(response => response.json())
    .then(data => {
      setReviews([])
      data.results.map(review => {
        setReviews(reviews => [...reviews, review])
      })
    })

    fetch(`https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => {
      setSimilarMovies([])
      data.results.map(similarMovie => {
        setSimilarMovies(similarMovies => [...similarMovies, similarMovie])
      })
    })

  }, [movie.id])

  useEffect(() => {
    console.log(movie)
  }, [movie])

  return (
    <Grid container justifyContent="center" direction="row" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4" component="h2">Overview</Typography>
        <Divider light/>
      </Grid>
      <Grid item xs={12} sx={{mt:2}}>
        <Typography>{movie.overview}</Typography>
      </Grid>
      {trailers.length > 0 &&
        <>
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant="h4" component="h2">Media</Typography>
            <Divider light/>
          </Grid>
          <Grid item xs={12} sx={{mt:2}}>
            <Grid container justifyContent="center" spacing={2}>
              {trailers.map(trailer => {
                  return <Grid item key={trailer.key}><iframe width="560" height="315" src={`https://www.youtube.com/embed/${trailer.key}`} title={trailer.name} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></Grid>
                })}
            </Grid>
          </Grid>
        </>
      }
      {reviews.length>0 &&
        <>
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant="h4" component="h2">Reviews</Typography>
            <Divider light/>
          </Grid>
          <Grid item xs={12} sx={{mt:2}}>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              {reviews.map((review, index) => {
                  if(index < 2){
                    return <ReviewBox key={review.id} review={review}/>
                  }
                })}
            </Grid>
          </Grid>
        </>
      }
      {similarMovies.length>0 &&
        <>
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant="h4" component="h2">Similar Movies</Typography>
            <Divider light/>
          </Grid>
          <Grid item xs={12} sx={{mt:2}}>
            <Grid container justifyContent="center" alignItems="baseline" >
              {similarMovies.map(similarMovie => {
                  return <MovieCard key={similarMovie.id} movie={similarMovie} size={3}/>
              })}
            </Grid>
          </Grid>
        </>
      }


      

      
    </Grid>
  )
}
