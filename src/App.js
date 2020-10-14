import React, { Component } from 'react';
import Products from './components/Products';
import data from "./data.json";

// feature 1

class App extends Component {
  state = {
    products: data.products,
    size: "",
    sort: ""
  };
  render() {
    return (
      <div className="grid-container" >
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">
              cart items
            </div>
          </div>
        </main>
        <footer>
          All rights reserved &reg; copyright &copy; 2020.
      </footer>
      </div>
    );
  }
}

export default App;
