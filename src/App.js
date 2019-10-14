import React, { Component } from 'react';
import {
  Typography,
  LinearProgress,
  Button
} from '@material-ui/core';
import axios from 'axios';
import FlexGrid from './FlexGrid';
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
    this.onRequestMoreProducts = this.onRequestMoreProducts.bind(this)
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    axios.get(API)
      .then(result => {
        const { data: { products } } = result;
        this.setState({
          products,
          isLoading: false
        });
        // In lieu of state management, store page counter on window
        window.requestOffset = 2;
      }).catch(error => this.setState({
        error,
        isLoading:false
      }));
  }

  onRequestMoreProducts() {
    axios.get(`https://api.bestbuy.com/v1/products(search=oven&search=stainless&search=steel)?format=json&show=all&page=${window.requestOffset}&apiKey=${API_KEY}`)
    .then(result => {
        const { data: { products } } = result;
        this.setState({
          products,
          isLoading: false
        })
      }).catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  render() {
    const { products, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <LinearProgress/>
    }

    return (
      <div>
        <Typography color="textSecondary" variant="h6" component="h6">
          Showing {products.length} products that match your search
        </Typography>
        <Button onClick={this.onRequestMoreProducts}>See more</Button>
        <FlexGrid
          products={products}
        />
      </div>
    );
  }
}

export default App;
