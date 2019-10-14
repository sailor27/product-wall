import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './App.css';

// I would put the API key in a .env in a production app.
const API_KEY ='6cvpy87wue568w6cpzjy4dhk'
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
      <div className="App">
        {products.map((product, i)=> (
          <Fragment key={i}>
            <div>
              <img src={product.image} aria-hidden alt={`Image of ${product.name}`}/>
            </div>
            <div>{product.name}</div>
            <div>{product.regularPrice}</div>
            <div>{product.longDescription}</div>
          </Fragment>
        ))}
      </div>
    );
  }
}

export default App;
