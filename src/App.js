import React, { Component } from "react";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

//feature-1
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: data.products,
      size: "",
      sort: "",
    };
  }
  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState((state) => ({
      sort: sort,
      product: this.state.product
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price < b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price > b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    }));
  };
  filterProducts = (event) => {
    if (event.target.value === "") {
      this.setState({
        size: event.target.value,
        product: data.products,
      });
    } else {
      this.setState({
        size: event.target.value,
        product: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.product.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products products={this.state.product} />
            </div>
            <div className="sidebar">sidebar</div>
          </div>
        </main>
        <footer>All right resreved</footer>
      </div>
    );
  }
}

export default App;
