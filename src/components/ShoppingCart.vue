<template>
  <div class = "container mt-4">
  <h1 class = "text-center mb-4">Shopping Cart</h1>

    <h2>Add Product</h2>
    <div>
      <input type="text" placeholder="Product Name">
      <input type="text" placeholder="Price">
      <input type="text" placeholder="Quantity">
      <button>Add Product</button>
    </div>
    <h2>Cart Items</h2>
    <div>
      v-for="item in cartItems"
    </div>
    <button>Remove</button>
    <br>
    <p>3x Apple @ 0.80€</p>
    <button>Remove</button>
    <br>
    <p>4x Pear @ 1.20€</p>
    <button>Remove</button>
    <div>

    </div>

    <div class = "d-flex justify-content-between mt-4">
      <h4>Total:</h4>
      <h4>€{{cartTotal.toFixed(2)}}</h4>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data:() => ({
    apibase: "http://localhost:9001/api/cart",   // port ei tohi frondis ja backis olla sama, kui on sama, siis backis saab application.properties uues porti määrata
    cartTotal: 0
  }),
  mounted() {
    axios
        .get(`${this.apibase}/cart-total`)
        .then((res) => (this.cartTotal = res.data))
        .catch(console.error)

    axios
        .get(`${this.apibase}/get-items`)
        .then((res) => (this.cartItems = res.data))
        .catch(console.error)
  }
};

</script>

<!--<style>-->
<!--</style>-->