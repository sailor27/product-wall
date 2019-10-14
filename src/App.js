import React, { Component } from 'react';
import {Grid, Typography} from '@material-ui/core';
import axios from 'axios';
import MediaCard from './MediaCard';
import './App.css';

// I would put the API key in a .env in a production app.
const API_KEY ='mPlbr5GXMVkagVgzwT7T2V5X'
const API = `https://api.bestbuy.com/v1/products(search=oven&search=stainless&search=steel)?format=json&show=all&apiKey=${API_KEY}`;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      products: [],
    }
  }

  componentDidMount() {
    this.setState({isLoading: true});

    axios.get(API)
      .then(result => {
        const { data: { products } } = result;

        this.setState({
          products,
          isLoading: false
        })
      }).catch(error => this.setState({
        error,
        isLoading:false
      }));
  }

  render() {
    const { products, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <>
        <Typography color="textSecondary" variant="h6" component="h6">
          {products.length} Products Match Your Search
        </Typography>

        <Grid className="App" container>
          {products.map((product, i)=> (
            <Grid  item xs={12} key={i}>
              <MediaCard
                name={product.name}
                image={product.image}
                regularPrice={product.regularPrice}
                longDescription={product.longDescription}
                salePrice={product.salePrice}
              />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
}

export default App;
