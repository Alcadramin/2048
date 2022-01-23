<template>
  <div class="game-buttons">
    <div class="d-flex-center">
      <button class="pulse" @click="move('up')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 9h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5A.5.5 0 0 0 4 11z"
          />
        </svg>
      </button>
    </div>
    <div class="d-flex-center">
      <button class="pulse" @click="move('left')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm10.5 10V4a.5.5 0 0 0-.832-.374l-4.5 4a.5.5 0 0 0 0 .748l4.5 4A.5.5 0 0 0 10.5 12z"
          />
        </svg>
      </button>
      <button class="pulse" @click="move('down')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-caret-down-square-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6H4z"
          />
        </svg>
      </button>
      <button class="pulse" @click="move('right')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.5 10a.5.5 0 0 0 .832.374l4.5-4a.5.5 0 0 0 0-.748l-4.5-4A.5.5 0 0 0 5.5 4v8z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    move: Function,
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
.game-buttons {
  position: relative;
  top: -20px;
  margin: 1rem 0;

  .pulse {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 0.35rem;
    padding: 0.8em 1.5em;
    font-family: $font-primary, $font-system;
    font-size: 16px;
    font-weight: 500;
    outline: 0;
    border: 0;
    background-color: #3a008e;
    border-radius: 4em;
    color: white;
    user-select: none;
    text-align: center;
    text-decoration: none;
    transition-duration: 0.4s;
    -webkit-transition-duration: 0.4s;
    cursor: pointer;
  }

  .pulse:hover {
    transition-duration: 0.1s;
    background-color: #4e00be;
  }

  .pulse:after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 4em;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.5s;
    box-shadow: 0 0 2.5px 10px white;
  }

  .pulse:active:after {
    box-shadow: 0 0 0 0 white;
    position: absolute;
    border-radius: 4em;
    left: 0;
    top: 0;
    opacity: 1;
    transition: 0s;
  }

  .pulse:active {
    top: 1px;
  }
}
</style>
