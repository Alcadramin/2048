<template>
  <td v-for="x in cellValue" :key="x">
    <div :class="cellColor(x)">
      <div class="cellNumber">
        <span v-if="x === 0" />
        <span v-else>{{ x }}</span>
      </div>
    </div>
  </td>
</template>

<script>
export default {
  props: ["cellValue"],
  setup() {
    const cellColor = (val) => `cell color-${val}`;

    return {
      cellColor,
    };
  },
};
</script>

<style lang="scss" scoped>
.cell {
  min-height: 80px;
  min-width: 80px;
  height: 8vw;
  width: 8vw;
  background-color: #303030;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.color-2 {
  background-color: #50c8ff;
}

.color-4 {
  background-color: #b5bd68;
}

.color-8 {
  background-color: #cc6666;
}

.color-16 {
  background-color: orange;
}

.color-32 {
  background-color: #f0c674;
}

.color-64 {
  background-color: #ff5879;
}

.color-128 {
  background-color: #c2454e;
}

.color-256 {
  background-color: #beb090;
}

.color-512 {
  background-color: #44b5b1;
}

.color-1024 {
  background-color: #7cbf9e;
}

.color-2048 {
  background-color: #61778d;
}

.cellNumber {
  color: #fff;
  font-size: 35px;
}
</style>
