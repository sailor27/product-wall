import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    width: 660,
    height: 400,
    margin: 10
  },
  cardAction: {
    height: '100%'
  },
  media: {
    height: 170,
    width: 250,
  }
});

const MediaCard = ({name, image, longDescription, regularPrice, salePrice }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardAction} >
        <Grid container alignItems="center">
          <Grid item xs={5}>
            {image ?
            <CardMedia
              className={classes.media}
              image={image}
              title={name}
            /> :
            <Typography gutterBottom variant="h6" component="h6" align="center">
               Image not available
            </Typography>
          }
          </Grid>
          <Grid item xs={7}>
            <CardContent className={classes.content}>
              <Typography gutterBottom variant="h6" component="h6">
                {name}
              </Typography>
              <Typography variant="h5" component="h2" style={{ textDecoration: regularPrice > salePrice ? 'line-through' : 'none'}}>
                ${regularPrice}
              </Typography>
              {regularPrice > salePrice &&
                <Typography variant="h5" component="h2">
                  ${salePrice}
                </Typography>
              }
              <Typography variant="body2" color="textSecondary" component="p" align="left">
                {longDescription}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

MediaCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  longDescription: PropTypes.string.isRequired,
  regularPrice: PropTypes.number.isRequired,
  salePrice: PropTypes.number.isRequired
}

export default MediaCard
