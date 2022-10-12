import { Avatar, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Rating } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ReviewBox(props) {

  const {review} = props
  return (
    <Grid item xs={12}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={1} direction="row" alignItems="center">
            <Grid item xs={1}>
              <Avatar alt='avatarImage' src={review.author_details.avatar_path}></Avatar>
            </Grid>
            <Grid item xs={11}>
              <Typography>{review.author}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>{review.content}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Rating value={review.author_details.rating/2} precision={0.1} readOnly size='medium'></Rating>
            </Grid>

          </Grid>
        </AccordionDetails>
      </Accordion>
      
    </Grid>
  )
}
