import React, { Component } from 'react';
import {
  LinearProgress,
} from '@material-ui/core';
import axios from 'axios';
import FlexGrid from './FlexGrid';
import SeeMore from './SeeMore';

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
        });
      window.requestOffset += window.requestOffset;
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
        <SeeMore
          length={products.length}
          onRequestMoreProducts={this.onRequestMoreProducts}
        />
        <FlexGrid
          products={products}
        />
      </div>
    );
  }
}

export default App;
