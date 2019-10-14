import React from 'react';
import axios from 'axios';
import sinon from 'sinon';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';

configure({ adapter: new Adapter() });

describe('App', () => {
  const API_KEY = 'mPlbr5GXMVkagVgzwT7T2V5X'
  const API = `https://api.bestbuy.com/v1/products(search=oven&search=stainless&search=steel)?format=json&show=all&apiKey=${API_KEY}`;
  const mockResult = {
    data: {
      products: [
        {
          image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5771/5771224_sa.jpg',
          name: 'Bosch - 30\" Storage Drawer for Most Bosch Speed, Steam and Wall Ovens - Stainless steel',
          longDescription:'Keep your cooking essentials close at hand with this Bosch HSD5051UC 30" storage drawer, which features a spacious 2.4 cu.ft.capacity that provides space for racks, meat probes, utensils and more.The included mat helps protect the drawer\'s bottom.',
          regularPrice: 584.99,
          salePrice: 584.99
        }
      ]
    }
  };
  const promise = Promise.resolve(mockResult);

  beforeEach(() => {
    sinon.stub(axios, 'get')
      .withArgs(API)
      .returns(promise)
  });

  afterEach(() => {
    axios.get.restore();
  });

  test('renders product data if fetched successfully', (done) => {
    expect.assertions(1);

    const wrapper = mount(<App />);

    promise.then(() => {
      wrapper.update();
      expect(wrapper.state().products).toEqual(mockResult.data.products);
      done();
    });
  });
});