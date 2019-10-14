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
    height: 320
  },
  media: {
    height: 280,
    objectFit: 'contain'
  }
});

const MediaCard = ({name, image, longDescription, regularPrice, salePrice }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <Grid container >
          <Grid item xs={5}>
            <CardMedia
              className={classes.media}
              image={image || 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5771/5771224_sa.jpg'}
              title={name}
            />
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
