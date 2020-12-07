import React, { Component } from "react";
import Cart from "./components/Cart"
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

//feature-1
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: data.products,
      cartItems: [],
      size: "",
      sort: "",
    };
  }
  removeFromCart = (product) =>{
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter(x => x._id !== product._id),
    })
    
  }
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    console.log(cartItems);
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({cartItems});
  };
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
              <Products
                products={this.state.product}
                addToCart={this.addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} />
            </div>
          </div>
        </main>
        <footer>All right resreved</footer>
      </div>
    );
  }
}

export default App;
