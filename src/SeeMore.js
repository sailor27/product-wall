import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#282c34',
    minHeight: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  text: {
    color: 'white'
  },
  button: {
    margin: 10,
    color: 'white',
    backgroundColor: 'palevioletred'
  }

});

const SeeMore = ({length, onRequestMoreProducts}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h6" component="h6">
      Showing {length} products that match your search...
      </Typography>
      <Button className={classes.button} onClick={onRequestMoreProducts}>
        See more
      </Button>
    </div>
  );
}

SeeMore.propTypes = {
  length: PropTypes.number,
  onRequestMoreProducts: PropTypes.func
}
export default SeeMore;