import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Article = ({ article }) => {
  
   return(
    <a href={article?.url}>
    <Card sx={{ maxWidth: 450 }}>
     <LazyLoadImage 
        src={article.media[0] ? article.media[0]['media-metadata'][1].url : ""} 
        alt={article.media[0] ? article.media[0].caption : "NewsImage"} 
        width="100%"
        effect="blur"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
       {article.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
      {article.abstract}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Category: {article.section ? article.section: "unknown"}</Button>
      <Button size="small">Published on: { article['published_date'] }</Button>
    </CardActions>
  </Card>
  </a>
       );
}

export default Article;