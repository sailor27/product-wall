import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MediaCard from './MediaCard';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    width: '100vw',
    justifyContent: 'center'
  },
});

const FlexGrid = ({products}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {products.map((product, i) => (
        <MediaCard
          key={i}
          name={product.name}
          image={product.image}
          regularPrice={product.regularPrice}
          longDescription={product.longDescription}
          salePrice={product.salePrice}
        />
      ))}
    </div>
  );
}

FlexGrid.propTypes = {
 products: PropTypes.array
}

export default FlexGrid
