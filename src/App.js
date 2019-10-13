import React, { Component, Fragment } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      products: [],
    }
  }

  componentDidMount() {
    this.setState({isLoading: true})
    fetch(`https://api.bestbuy.com/v1/products(search=oven&search=stainless&search=steel)?format=json&show=all&apiKey=6cvpy87wue568w6cpzjy4dhk`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => this.setState({
        products: data.products,
        isLoading: false
      }))
      .catch(error => this.setState({ error, isLoading: false }));
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

