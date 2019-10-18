import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  LinearProgress,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#282c34',
    minHeight: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 2
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

const Header = ({error, isLoading, length, onRequestMoreProducts}) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root} id="header">
        <Typography variant="h6" component="h6">
        Showing {length} products that match your search...
        </Typography>
        <Button className={classes.button} onClick={onRequestMoreProducts}>
          See more
        </Button>
      </div>
      {isLoading && <LinearProgress/>}
      {error &&
         <Typography variant="h6" component="h6">
        Showing {length} products that match your search...
        </Typography>
      }
    </>
  );
}

Header.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  length: PropTypes.number,
  onRequestMoreProducts: PropTypes.func
}
export default Header;
