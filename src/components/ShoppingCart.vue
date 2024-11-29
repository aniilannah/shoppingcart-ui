<template>
  <div class="container mt-4 boho-container">
    <h1 class="text-center mb-4 boho-header">
      Shopping Cart
      <i class="fa fa-shopping-cart" style="font-size:36px;color:#c27b7d"></i>
    </h1>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <div class="section-header">Add Products</div>
    <form @submit.prevent="addProduct" class="row mb-4">
      <input v-model="newProduct.name" placeholder="Product" class="form-control col boho-input" required />
      <input v-model.number="newProduct.quantity" type="number" placeholder="Qty" class="form-control col boho-input" required />
      <input v-model.number="newProduct.price" type="number" step="0.01" placeholder="Price" class="form-control col boho-input" required />
      <button class="btn col custom-btn">Add</button>
    </form>

    <div class="section-header">Items</div>
    <table class="table boho-table">
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

    <form @submit.prevent="applyDiscount" class="row mb-3">
      <div class="col">
        <input
            v-model="hasMembership"
            type="checkbox"
            id="membership"
            class="form-check-input"
        />
        <label for="membership" class="form-check-label ms-2">
          Apply Membership Discount
        </label>
      </div>
      <div class="col">
        <button class="btn btn-warning btn-sm">Apply Discount</button>
      </div>
    </form>

    <h3 class="mt-4 boho-total">Total: ${{ cartTotal.toFixed(2) }}</h3>
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
    hasMembership: false,
    discount: 0,
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
      this.newProduct = {name: "", quantity: 1, price: 0};
    },
    applyDiscount() {
      axios
          .post(`${this.api}/apply-discount`, null, {
            params: { hasMembership: this.hasMembership }
          })
          .then(res => {
            this.cartTotal = res.data;
          })
          .catch(error => {
            console.error("Error applying discount:", error);
          });
    },
  },
  mounted() {
    this.fetchCart();
  },
};
</script>

<style scoped>
/* General Page Styling */
body {
  font-family: "Poppins", sans-serif;
  background: linear-gradient(120deg, #fefaf8, #fcf8f5), url("https://www.transparenttextures.com/patterns/soft-floral.png");
  background-size: cover, 600px;
  background-repeat: no-repeat, repeat;
  color: #4d3b3b;
  position: relative;
}

/* Floral Frame for Decoration */
.boho-container {
  border: 2px solid #ecc6ba;
  border-radius: 12px;
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.9); /* Light white overlay */
  box-shadow: 2px 6px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.boho-container::before,
.boho-container::after {
  content: "";
  position: absolute;
  width: 100px;
  height: 100px;
  background: url("https://www.transparenttextures.com/patterns/flowery.png");
  background-size: contain;
  background-repeat: no-repeat;
  z-index: -1;
}

.boho-container::before {
  top: -20px;
  left: -20px;
}

.boho-container::after {
  bottom: -20px;
  right: -20px;
}

/* Headers */
.boho-header {
  color: #d49286;
  font-weight: 700;
  text-shadow: 1px 1px 2px #efdad4;
}

.section-header {
  font-size: 18px;
  color: #6c4a4a;
  font-weight: bold;
  margin-top: 32px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

/* Input Styling */
.boho-input {
  background: #fefaf8;
  border: 1px solid #ecc6ba;
  color: #6c4a4a;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  margin-right: 8px;
  transition: all 0.3s ease-in-out;
}

.boho-input:focus {
  outline: none;
  border-color: #d49286;
  box-shadow: 0 0 10px rgba(212, 146, 134, 0.5);
}

/* Table Styling */
.boho-table {
  background-color: #fefaf8;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
}

.boho-table th {
  background: linear-gradient(120deg, #fae1df, #fbd9d7);
  color: #5d4343;
  font-weight: bold;
  border-bottom: 2px solid #f3d2cf;
}

.boho-table tr:nth-child(even) {
  background: #fcecec;
}

.boho-table td {
  color: #6c4a4a;
  font-size: 14px;
}

/* Buttons */
.custom-btn {
  background: linear-gradient(120deg, #d49286, #c27b7d);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
}

.custom-btn:hover {
  transform: translateY(-3px);
  box-shadow: 4px 6px 12px rgba(0, 0, 0, 0.2);
}

.btn-danger {
  background: #e27d7f;
  color: white;
  border: none;
  border-radius: 8px;
}

.btn-warning {
  background: #c6af7f;
  color: white;
  border: none;
  border-radius: 8px;
}

.boho-total {
  color: #cf5c5e;
  font-weight: 600;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

/* Checkbox Styling */
input[type="checkbox"] {
  accent-color: #d49286;
  width: 20px;
  height: 20px;
  transform: scale(1.2);
}
</style>
