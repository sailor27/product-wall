import React, { Component } from 'react';
import axios from 'axios';
import FlexGrid from './FlexGrid';
import Header from './Header';

// I would put the API key in a .env in a production app.
const API_KEY ='mPlbr5GXMVkagVgzwT7T2V5X'
const API = `https://api.bestbuy.com/v1/products(search=oven&search=stainless&search=steel)?format=json&show=all&apiKey=${API_KEY}`;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: '',
      products: [],
    }
    this.onScroll = this.onScroll.bind(this);
    this.isBottom = this.isBottom.bind(this);
    this.onRequestMoreProducts = this.onRequestMoreProducts.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
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

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  onRequestMoreProducts() {
    this.setState({
      isLoading: true
    });
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

  onScroll() {
    const wrapper = document.getElementById('wrapper');

    if (this.isBottom(wrapper)) {
      this.onRequestMoreProducts();
    }
  }

  render() {
    const { products, isLoading, error } = this.state;

    return (
      <div id="wrapper">
        <Header
          isLoading={isLoading}
          error={error}
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
