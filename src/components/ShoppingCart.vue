<template>
  <div class = "container mt-4">
    <h1 class = "text-center mb-4">Shopping Cart</h1>

   <table class="table">
    <thead>
    <tr>
      <th>Product</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in cartItems" :key="item">
            <td>{{item.name}}</td>
            <td>{{item.quantity}}</td>
            <td>{{item.price}}</td>
          <td>
          <button @click="removeProduct(item.name)" class="btn btn-danger btn-sm">Remove</button>
          </td>
      </tr>
    </tbody>
   </table>

    <h3 class="mt-4">Total: €{{cartTotal.toFixed(2)}}</h3>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
      api: "http://localhost:9001/api/cart",
      // newProduct: { name: "", price: 0, quantity: 1 },
      cartTotal: 0,
      cartItems: [],
    }),

  methods: {
    fetchCart() {
      axios.all([
          axios.get(`${this.api}/cart-total`).then(res => (this.cartTotal = res.data)),
          axios.get(`${this.api}/get-items`).then(res => (this.cartItems = res.data)),
          ]);
      },
    },

  mounted(){
     this.fetchCart();
  },
};
</script>


<!--<style>-->
<!--</style>-->