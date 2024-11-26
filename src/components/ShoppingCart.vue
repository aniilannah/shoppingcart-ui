<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Shopping Cart</h1>

    <form @submit.prevent="addProduct" class="row mb-3">
      <input v-model="newProduct.name" placeholder="Product" class="form-control col" required />
      <input v-model.number="newProduct.quantity"  type="number" placeholder="Qty" class="form-control col" required />
      <input v-model.number="newProduct.price" type="number" step="0.01" placeholder="Price" class="form-control col" required />
      <button class="btn btn-success col">Add</button>
    </form>

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
        <td>{{ item.name }}</td>
        <td>{{ item.quantity }}</td>
        <td>${{ item.price }}</td>

        <td>
          <button @click="removeProduct(item.name)" class="btn btn-danger btn-sm">Remove</button>
        </td>


      </tr>
      </tbody>
    </table>

    <h3 class="mt-4">Total: ${{ cartTotal.toFixed(2) }}</h3>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    api: "http://localhost:9001/api/cart",
    newProduct: { name: "", quantity: 1, price: 0, },
    cartItems: [],
    cartTotal: 0,
  }),
  methods: {
    fetchCart() {
      axios.all([
        axios.get(`${this.api}/get-items`).then(res => (this.cartItems = res.data)),
        axios.get(`${this.api}/cart-total`).then(res => (this.cartTotal = res.data)),
      ]);
    },

    removeProduct(name) {
      axios.delete(`${this.api}/remove-product/${name}`).then(this.fetchCart);
    },

    addProduct() {
      axios.post(`${this.api}/add-product`, this.newProduct).then(this.fetchCart);
      this.newProduct={name: "", quantity: 1, price:0};
    }
  },
  mounted() {
    this.fetchCart();
  },
};
</script>


<!--<style>-->
<!--</style>-->