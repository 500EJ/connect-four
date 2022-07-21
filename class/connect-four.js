const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {
  constructor() {
    this.playerTurn = "O";

    this.grid = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "]
    ];

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand("t", "test command (remove)", ConnectFour.testCommand);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  static _horizontalWin(grid) {
    for (let i = 0; i < grid.length; i++) {
      let lastChar;
      let count = 1;
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] !== " " && grid[i][j] === lastChar) {
          count++;
        } else {
          lastChar = grid[i][j];
          count = 1;
        }
        if (count === 4) return lastChar;
      }
    }
  }

  static _verticalWin(grid) {
    const flippedGrid = Array.from(new Array(grid[0].length), () => []);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        flippedGrid[j].push(grid[i][j]);
      }
    }
    return ConnectFour._horizontalWin(flippedGrid);
  }

  static _upwardDiagonalWin(grid) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = grid[i].length - 1; j >= 0; j--) {
        let lastChar = grid[i][j];
        let count = 1;
        let [row, col] = [i, j];
        while (row < grid.length && col >= 0) {
          if (grid[row][col] === lastChar && grid[row][col] !== " ") {
            count++;
          } else {
            count = 1;
          }
          row++;
          col--;
        }
        if (count === 4) return lastChar;
      }
    }
  }

  static _downwardDiagonalWin(grid) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        let lastChar = grid[i][j];
        let count = 1;
        let [row, col] = [i, j];
        while (row < grid.length && col < grid[i].length) {
          if (grid[row][col] === lastChar && grid[row][col] !== " ") {
            count++;
          } else {
            count = 1;
          }
          row++;
          col++;
        }
        if (count === 4) return lastChar;
      }
    }
  }

  static _diagonalWin(grid) {
    return (
      ConnectFour._upwardDiagonalWin(grid) ||
      ConnectFour._downwardDiagonalWin(grid)
    );
  }

  static _tie(grid) {
    return grid.every(row => row.every(char => char !== " ")) && "T";
  }

  static checkWin(grid) {
    return (
      ConnectFour._horizontalWin(grid) ||
      ConnectFour._verticalWin(grid) ||
      ConnectFour._diagonalWin(grid) ||
      ConnectFour._tie(grid) ||
      false
    );
  }

  static endGame(winner) {
    if (winner === "O" || winner === "X") {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === "T") {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }
}

module.exports = ConnectFour;
