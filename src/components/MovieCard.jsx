import { Card, CardActionArea, CardContent, CardMedia, Grid, Modal, Typography, Container, Divider, Rating, Dialog, DialogTitle, DialogContent, DialogContentText} from '@mui/material'
import React, {useState, useEffect} from 'react'
import StarIcon from '@mui/icons-material/Star';
import MovieDetails from './MovieDetailsArea';

export default function MovieCard(props) {

  const {image, name, release_date, genres_ids, movie} = props
  let initialized = false

  const [genres, setGenres] = useState([])
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = React.useState('paper');

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US')
    .then(response => response.json())
    .then(data => {
      if(!initialized){
        data.genres.map(genre =>{
          if(genres_ids.includes(genre.id) && !genres.includes(genre.name )){
            setGenres(genres => [...genres, genre.name])
          }
        })
      }
      initialized = true;
    })
  }, [])

  return (
    <Grid item xs={2}>
      <Card onClick={()=>setOpen(true)} sx={{m:1}}>
        <CardActionArea>
          <CardMedia component="img" image={image}>
          </CardMedia>
          <CardContent>
            <Typography noWrap variant='h5'>{name}</Typography>
            <Typography noWrap color="text.secondary" variant='subtitle1'>{release_date}</Typography>
            <Grid container>
              <Grid item xs={9}>
                <Typography noWrap color="text.secondary" variant='subtitle2'>
                  {genres.map(genreName=>{
                    return genreName===genres.at(-1)? " "+genreName : " "+genreName+","
                  })}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={{ display:'flex', justifyContent: "flex-end"}} color="text.secondary" variant='subtitle2'>{movie.vote_average+"/10"}<StarIcon fontSize="small"/></Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
      <Dialog maxWidth="xl" open={open} onClose={() => setOpen(false)}>

        <DialogTitle>
          {name}
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={3}>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={12}>
                    <img style={{"marginBottom":"10px"}} width="300px" height="400px" src={image} alt='moviePoster'/>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography noWrap color="text.secondary" variant='subtitle1'>Release year: {release_date}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="text.secondary" variant='subtitle2'>
                      {genres.length===1?"Genre:":"Genres:"} 
                        {genres.map((genreName, index)=>{
                          return genreName===genres.at(-1)? " "+genreName : " "+genreName+","
                        })}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Rating value={movie.vote_average/2} precision={0.1} readOnly size='large' />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Id: {movie.id}</Typography>
                  </Grid>

                </Grid>
              </Grid>
              <Grid item xs={9}>
                <DialogContent id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                  <MovieDetails movie={movie}/>
                </DialogContent>
              </Grid>
            </Grid>
          
        </DialogContent>

      </Dialog>
    </Grid>
    
  )
}
