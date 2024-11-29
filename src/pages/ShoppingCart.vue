<template>
  <div class="container mt-4 boho-container">
    <h1 class="text-center mb-4 boho-header">
      Shopping Cart
    </h1>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <AddProductForm @update-cart="fetchCart" />
    <CartTable :cartItems="cartItems" @update-cart="fetchCart" />
    <CartSummary :cartTotal="cartTotal" />

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
  </div>
</template>

<script>
import { fetchCartItems, fetchCartTotal, applyDiscount } from "@/api/cart";
import AddProductForm from "@/components/cart/AddProductForm.vue";
import CartTable from "@/components/cart/CartTable.vue";
import CartSummary from "@/components/cart/CartSummary.vue";

export default {
  components: {
    AddProductForm,
    CartTable,
    CartSummary
  },
  data() {
    return {
      cartItems: [],
      cartTotal: 0,
      hasMembership: false
    };
  },
  methods: {
    async fetchCart() {
      this.cartItems = await fetchCartItems();
      this.cartTotal = await fetchCartTotal();
    },
    async applyDiscount() {
      this.cartTotal = await applyDiscount(this.hasMembership);
    }
  },
  mounted() {
    this.fetchCart();
  }
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
.btn-warning:hover {
  transform: translateY(-3px);
  box-shadow: 4px 6px 12px rgba(0, 0, 0, 0.2); }
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
  right: -20px;
}

.boho-container::after {
  bottom: -20px;
  left: -20px;
}

/* Header */
.boho-header {
  color: #c27b7d;
  font-weight: bold;
  font-size: 32px;
  letter-spacing: 1.5px;
  margin-bottom: 30px;
}
</style>
