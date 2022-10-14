import { Avatar, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Rating, Divider } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;

  return [year, month, day].join('-');
}

export default function ReviewBox(props) {

  const {review} = props
  return (
    <Grid item xs={12}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={1} direction="row" alignItems="center">
            <Grid item xs={1}>
              <Avatar alt='avatarImage' src={"https://www.gravatar.com/avatar/"+review.author_details.avatar_path}></Avatar>
            </Grid>
            <Grid item xs={11}>
              <Typography>{review.author}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12}>
              <Divider sx={{my:1}} light/>
              <Typography>{review.content}</Typography>
              <Divider sx={{my:1}} light/>
            </Grid>
            <Grid item display="flex" justifyContent="flex-start" xs={10}>
              <Typography color="text.secondary" variant='subtitle2'>Last update: {formatDate(review.updated_at)}</Typography>
            </Grid>
            {review.author_details.rating !== null &&
              <Grid item display="flex" justifyContent="flex-end" xs={2}>
                <Rating value={review.author_details.rating/2} precision={0.1} readOnly size='medium'></Rating>
              </Grid>
            }

          </Grid>
        </AccordionDetails>
      </Accordion>
      
    </Grid>
  )
}
