import React from 'react';
import Moment from 'react-moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Result = ({ article }) => {
   return(
     <a href={article.web_url}>
     <Card sx={{ maxWidth: 450 }}>
      <LazyLoadImage 
         src={article.multimedia[3] ? `https://static01.nyt.com/${article.multimedia[3].url}` : ""} 
         alt= {article.headline.main}
         width="100%"
         effect="blur"
     />
     <CardContent>
       <Typography gutterBottom variant="h5" component="div">
       {article.headline.main}
       </Typography>
       <Typography variant="body2" color="text.secondary">
       {article.lead_paragraph}
       </Typography>
     </CardContent>
     <CardActions>
       <Button size="small">Category: {article.section_name ? article.section_name: "unknown"}</Button>
       <Button size="small">   Published on: 
            <Moment format="YYYY/MM/DD">
            { article['pub_date'] }
            </Moment></Button>
     </CardActions>
   </Card>
   </a>
    );
}

export default Result;