import { Grid, Typography, Divider} from '@mui/material'
import React, {useState, useEffect} from 'react'
import ReviewBox from './ReviewBox'

export default function MovieDetails(props) {

  const {movie} = props

  const [trailers, settrailers] = useState([])
  const [reviews, setreviews] = useState([])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US`)
    .then(response => response.json())
    .then(data => {
      settrailers([])
      data.results.map(trailer => {
        if(trailer.type === "Trailer"){
          settrailers(trailers => [...trailers, trailer])
        }
      })
    })

    fetch(`https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US`)
    .then(response => response.json())
    .then(data => {
      setreviews([])
      data.results.map(review => {
        setreviews(reviews => [...reviews, review])
      })
    })
  }, [movie.id])

  useEffect(() => {
    console.log(reviews)
  }, [reviews])

  return (
    <Grid container justifyContent="center" direction="row" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4" component="h2">Overview</Typography>
        <Divider light/>
      </Grid>
      <Grid item xs={12} sx={{mt:2}}>
        <Typography>{movie.overview}</Typography>
      </Grid>
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

      
    </Grid>
  )
}
