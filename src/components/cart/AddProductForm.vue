<template>
  <div class="container mt-4 boho-container">
    <h3 class="text-center mb-4 boho-header">
      Add Product
    </h3>
    <form @submit.prevent="addProduct" class="left row mb-4">
      <input v-model="newProduct.name" placeholder="Product" class="form-control col boho-input" required />
      <input v-model.number="newProduct.quantity" type="number" placeholder="Qty" class="form-control col boho-input" required />
      <input v-model.number="newProduct.price" type="number" step="0.01" placeholder="Price" class="form-control col boho-input" required />
      <button class="btn col custom-btn">Add</button>
    </form>
  </div>
</template>

<script>
import { addProduct } from "@/api/cart";

export default {
  data() {
    return {
      newProduct: { name: "", quantity: 1, price: 0 }
    };
  },
  methods: {
    async addProduct() {
      await addProduct(this.newProduct);  // Call the API to add the product
      this.$emit("update-cart");           // Emit event to parent to update cart
      this.newProduct = { name: "", quantity: 1, price: 0 };  // Reset form fields
    }
  }
};
</script>

<style scoped>
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

.boho-header {
  color: #c27b7d;
  font-weight: bold;
  font-size: 32px;
  letter-spacing: 1.5px;
  margin-bottom: 30px;
}
</style>
