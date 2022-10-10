import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'

export default function MovieCard(props) {

  const {image, name, release_date, genres_ids} = props

  const [genres, setGenres] = useState([])

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US')
    .then(response => response.json())
    .then(data => {
      data.genres.map(genre =>{
        genres_ids.map(id => {
          if(id===genre.id && genre.id!= id){
            //NEEDS FIXING
            setGenres(genres => [...genres, genre.name])
          }
        })
      })
    })
  }, [])

  return (
    <Grid item xs={2}>
      <Card sx={{m:1}}>
        <CardMedia 
        component="img"
        image={image}
        >

        </CardMedia>
        <CardContent>
          <Typography>{name}</Typography>
          <Typography>{release_date}</Typography>
          <Typography>{genres}</Typography>
          {console.log(genres)}
        </CardContent>
      </Card>

    </Grid>
    
  )
}
