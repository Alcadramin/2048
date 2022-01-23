<template>
  <tr v-for="x in row" :key="x">
    <Cell :cell-value="x" />
  </tr>
</template>

<script>
import Cell from "./Cell.vue";

export default {
  components: {
    Cell,
  },
  props: ["row"],
};
</script>

<style lang="scss" scoped></style>
