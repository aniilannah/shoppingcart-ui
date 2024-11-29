<template>
  <h3 class="mt-4 boho-total">Total: ${{ cartTotal.toFixed(2) }}</h3>
</template>

<script>
export default {
  props: {
    cartTotal: Number
  }
};
</script>

<style scoped>
.boho-total {
  color: #cf5c5e;
  font-weight: 600;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}
</style>
