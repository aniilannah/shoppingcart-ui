<template>
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
    <tr v-for="item in cartItems" :key="item.name">
      <td>{{ item.name }}</td>
      <td>{{ item.quantity }}</td>
      <td>${{ item.price }}</td>
      <td>
        <button @click="removeProduct(item.name)" class="btn btn-danger btn-sm">Remove</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { removeProduct } from "@/api/cart";

export default {
  props: {
    cartItems: Array
  },
  methods: {
    async removeProduct(name) {
      await removeProduct(name);  // Call the API to remove the product
      this.$emit("update-cart");  // Emit event to parent to update cart
    }
  }
};
</script>

<style scoped>
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
</style>
