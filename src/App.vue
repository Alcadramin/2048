<template>
  <main>
    <div v-if="!message">
      <Header :score="score" />
    </div>
    <div class="d-flex-center" v-else>
      <div
        class="animate__animated animate__fadeInUp message glow"
        @click.stop="initBoard()"
      >
        {{ message }}
      </div>
    </div>
    <div class="score"><strong>Skor: </strong>{{ score }}</div>
    <GameButtons :move="move" />
    <div v-if="board">
      <table>
        <tbody>
          <Row :row="board" />
        </tbody>
      </table>
    </div>
    <Footer />
  </main>
</template>

<script>
import { ref, onMounted } from "vue";
import Row from "./components/Row.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import GameButtons from "./components/GameButtons.vue";

export default {
  name: "App",
  components: { Row, Header, Footer, GameButtons },
  setup() {
    const board = ref([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    const score = ref(0);
    const gameOver = ref(false);
    const message = ref("");

    // Helpers
    const checkBoard = (original, update) =>
      JSON.stringify(update) !== JSON.stringify(original) ? true : false;

    const getBlankCells = (boardInput) => {
      const blankCells = [];

      for (let i = 0; i < boardInput.length; i++) {
        for (let j = 0; j < boardInput[i].length; j++) {
          if (boardInput[i][j] === 0) {
            blankCells.push([i, j]);
          }
        }
      }

      return blankCells;
    };

    const startRandomNumbers = (start) =>
      start[Math.floor(Math.random() * start.length)];

    const placeRandomNumbers = (boardInput) => {
      let boardParsed = boardInput;

      if (typeof boardInput === "object") {
        boardParsed = JSON.parse(JSON.stringify(boardInput));
      }

      const blankCells = getBlankCells(boardParsed);
      const randomCell =
        blankCells[Math.floor(Math.random() * blankCells.length)];
      const randomNumber = startRandomNumbers([2, 4]);
      boardParsed[randomCell[0]][randomCell[1]] = randomNumber;

      return boardParsed;
    };

    // Moves
    const rotateRight = (input) => {
      const result = [];

      for (let c = 0; c < input.length; c++) {
        const row = [];
        for (let r = input.length - 1; r >= 0; r--) {
          row.push(input[r][c]);
        }
        result.push(row);
      }

      return result;
    };

    const rotateLeft = (input) => {
      const result = [];

      for (let c = input.length - 1; c >= 0; c--) {
        const row = [];
        for (let r = input.length - 1; r >= 0; r--) {
          row.unshift(input[r][c]);
        }
        result.push(row);
      }

      return result;
    };

    const moveUp = (boardInput) => {
      const rotatedRight = rotateRight(boardInput);
      let movedBoard = [];
      let score = 0;

      // Shift all numbers to the right
      for (let i = 0; i < rotatedRight.length; i++) {
        const row = [];
        for (let j = 0; j < rotatedRight[i].length; j++) {
          const current = rotatedRight[i][j];
          current === 0 ? row.unshift(current) : row.push(current);
        }
        movedBoard.push(row);
      }

      // Combine numbers and shift to right
      for (let i = 0; i < movedBoard.length; i++) {
        for (let j = movedBoard[i].length - 1; j >= 0; j--) {
          if (
            movedBoard[i][j] > 0 &&
            movedBoard[i][j] === movedBoard[i][j - 1]
          ) {
            movedBoard[i][j] = movedBoard[i][j] * 2;
            movedBoard[i][j - 1] = 0;
            score += movedBoard[i][j];
          } else if (movedBoard[i][j] === 0 && movedBoard[i][j - 1] > 0) {
            movedBoard[i][j] = movedBoard[i][j - 1];
            movedBoard[i][j - 1] = 0;
          }
        }
      }

      // Rotate board back upright
      movedBoard = rotateLeft(movedBoard);

      return { movedBoard, score };
    };

    const moveRight = (boardInput) => {
      const movedBoard = [];
      let score = 0;

      // Shift all numbers to the right
      for (let i = 0; i < boardInput.length; i++) {
        const row = [];
        for (let j = 0; j < boardInput[i].length; j++) {
          const current = boardInput[i][j];
          current === 0 ? row.unshift(current) : row.push(current);
        }
        movedBoard.push(row);
      }

      // Combine numbers and shift to right
      for (let i = 0; i < movedBoard.length; i++) {
        for (let j = movedBoard[i].length - 1; j >= 0; j--) {
          if (
            movedBoard[i][j] > 0 &&
            movedBoard[i][j] === movedBoard[i][j - 1]
          ) {
            movedBoard[i][j] = movedBoard[i][j] * 2;
            movedBoard[i][j - 1] = 0;
            score += movedBoard[i][j];
          } else if (movedBoard[i][j] === 0 && movedBoard[i][j - 1] > 0) {
            movedBoard[i][j] = movedBoard[i][j - 1];
            movedBoard[i][j - 1] = 0;
          }
        }
      }

      return { movedBoard, score };
    };

    const moveDown = (boardInput) => {
      const rotatedRight = rotateRight(boardInput);
      let movedBoard = [];
      let score = 0;

      // Shift all numbers to the left
      for (let i = 0; i < rotatedRight.length; i++) {
        const row = [];
        for (let j = rotatedRight[i].length - 1; j >= 0; j--) {
          let current = rotatedRight[i][j];
          current === 0 ? row.push(current) : row.unshift(current);
        }
        movedBoard.push(row);
      }

      // Combine numbers and shift to left
      for (let i = 0; i < movedBoard.length; i++) {
        for (let j = 0; j < movedBoard.length; j++) {
          if (
            movedBoard[i][j] > 0 &&
            movedBoard[i][j] === movedBoard[i][j + 1]
          ) {
            movedBoard[i][j] = movedBoard[i][j] * 2;
            movedBoard[i][j + 1] = 0;
            score += movedBoard[i][j];
          } else if (movedBoard[i][j] === 0 && movedBoard[i][j + 1] > 0) {
            movedBoard[i][j] = movedBoard[i][j + 1];
            movedBoard[i][j + 1] = 0;
          }
        }
      }

      // Rotate movedBoard back upright
      movedBoard = rotateLeft(movedBoard);

      return { movedBoard, score };
    };

    const moveLeft = (boardInput) => {
      const movedBoard = [];
      let score = 0;

      // Shift all numbers to the left
      for (let i = 0; i < boardInput.length; i++) {
        const row = [];
        for (let j = boardInput[i].length - 1; j >= 0; j--) {
          const current = boardInput[i][j];
          current === 0 ? row.push(current) : row.unshift(current);
        }
        movedBoard.push(row);
      }

      // Combine numbers and shift to left
      for (let i = 0; i < movedBoard.length; i++) {
        for (let j = 0; j < movedBoard.length; j++) {
          if (
            movedBoard[i][j] > 0 &&
            movedBoard[i][j] === movedBoard[i][j + 1]
          ) {
            movedBoard[i][j] = movedBoard[i][j] * 2;
            movedBoard[i][j + 1] = 0;
            score += movedBoard[i][j];
          } else if (movedBoard[i][j] === 0 && movedBoard[i][j + 1] > 0) {
            movedBoard[i][j] = movedBoard[i][j + 1];
            movedBoard[i][j + 1] = 0;
          }
        }
      }

      return { movedBoard, score };
    };

    const checkGameOver = (boardInput) => {
      const moves = [
        checkBoard(boardInput, moveUp(boardInput).movedBoard),
        checkBoard(boardInput, moveRight(boardInput).movedBoard),
        checkBoard(boardInput, moveDown(boardInput).movedBoard),
        checkBoard(boardInput, moveLeft(boardInput).movedBoard),
      ];

      return moves.includes(true) ? false : true;
    };

    const move = (direction) => {
      if (!gameOver.value) {
        switch (direction) {
          case "up": {
            const movedUp = moveUp(board.value);

            if (checkBoard(board.value, movedUp.movedBoard)) {
              const upWithRandom = placeRandomNumbers(movedUp.movedBoard);

              if (checkGameOver(upWithRandom)) {
                board.value = upWithRandom;
                gameOver.value = true;
                message.value = "Game Over! 🤷🏻";
              } else {
                board.value = upWithRandom;
                score.value = score.value + movedUp.score;
              }
            }

            break;
          }
          case "right": {
            const movedRight = moveRight(board.value);

            if (checkBoard(board.value, movedRight.movedBoard)) {
              const rightWithRandom = placeRandomNumbers(movedRight.movedBoard);

              if (checkGameOver(rightWithRandom)) {
                board.value = rightWithRandom;
                gameOver.value = true;
                message.value = "Game Over! 🤷🏻";
              } else {
                board.value = rightWithRandom;
                score.value = score.value + movedRight.score;
              }
            }

            break;
          }
          case "down": {
            const movedDown = moveDown(board.value);

            if (checkBoard(board.value, movedDown.movedBoard)) {
              const downWithRandom = placeRandomNumbers(movedDown.movedBoard);

              if (checkGameOver(downWithRandom)) {
                board.value = downWithRandom;
                gameOver.value = true;
                message.value = "Game Over! 🤷🏻";
              } else {
                board.value = downWithRandom;
                score.value = score.value + movedDown.score;
              }
            }

            break;
          }
          case "left": {
            const movedLeft = moveLeft(board.value);

            if (checkBoard(board.value, movedLeft.movedBoard)) {
              const leftWithRandom = placeRandomNumbers(movedLeft.movedBoard);

              if (checkGameOver(leftWithRandom)) {
                board.value = leftWithRandom;
                gameOver.value = true;
                message.value = "Game Over! 🤷🏻";
              } else {
                board.value = leftWithRandom;
                score.value = score.value + movedLeft.score;
              }
            }

            break;
          }
          default:
            break;
        }
      }
    };

    // Init Game
    const initBoard = () => {
      board.value = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      const newBoard = placeRandomNumbers(placeRandomNumbers(board.value));
      board.value = newBoard;
      score.value = 0;
      gameOver.value = false;
      message.value = "";
    };

    const handleKeyDown = (e) => {
      e.preventDefault();

      const up = [87, 38];
      const right = [68, 39];
      const down = [83, 40];
      const left = [65, 37];
      const newGame = 78;

      if (up.includes(e.keyCode)) {
        move("up");
      } else if (right.includes(e.keyCode)) {
        move("right");
      } else if (down.includes(e.keyCode)) {
        move("down");
      } else if (left.includes(e.keyCode)) {
        move("left");
      } else if (e.keyCode === newGame) {
        initBoard();
      }
    };

    onMounted(() => {
      initBoard();
      const body = document.querySelector("body");
      body.addEventListener("keydown", handleKeyDown);
    });

    return {
      board,
      score,
      message,
      initBoard,
      move,
    };
  },
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";

.score {
  text-align: center;
  margin: 1rem 0.2rem;
}

.message {
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  margin: 2rem 0.2rem;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
}

.glow {
  text-transform: uppercase;
  padding: 0.5rem;
  border: none;
  outline: none;
  color: #fff;
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
}

.glow:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.glow:active {
  color: #000;
}

.glow:active:after {
  background: transparent;
}

.glow:hover:before {
  opacity: 1;
}

.glow:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #111;
  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
