import { Card, CardActionArea, CardContent, CardMedia, Grid, Modal, Typography, Container, Divider, Rating} from '@mui/material'
import React, {useState, useEffect} from 'react'
import StarIcon from '@mui/icons-material/Star';

export default function MovieCard(props) {

  const {image, name, release_date, genres_ids, movie} = props
  let initialized = false

  const [genres, setGenres] = useState([])
  const [open, setOpen] = useState(false)

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
                    return genreName + " "
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
      <Modal disableEnforceFocus style={{display:'flex',alignItems:'center',justifyContent:'center'}} open={open} onClose={() => setOpen(false)}>
          <Container>
          <Grid container justifyContent="center" spacing={2} sx={{backgroundColor: '#272727', borderRadius: "10px", minHeight:"500px"}}>
            <Grid item xs={3}>
              <img style={{"marginBottom":"10px"}} width="210px" height="280px" src={image} alt='moviePoster'/>
              <Typography id="modal-modal-title" variant="h6" component="h2">{name}</Typography>
              <Typography noWrap color="text.secondary" variant='subtitle1'>{release_date}</Typography>
              <Typography color="text.secondary" variant='subtitle2'>
                  {genres.map(genreName=>{
                    return genreName + " "
                  })}
              </Typography>
              <Rating value={movie.vote_average/2} precision={0.1} readOnly size='large' />

            </Grid>
            <Grid item xs={8}>
              <Grid container justifyContent="flex-start" direction="row" alignItems="center">
                <Grid item xs={12}>
                  <Typography id="modal-modal-title" variant="h4" component="h2">Overview</Typography>
                  <Divider light/>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{mt:1}}>{movie.overview}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          
        </Container>
      </Modal>
    </Grid>
    
  )
}
