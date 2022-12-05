"use strict";
var gBoard;
const WALL = '<img src="img/wall.png">';
const FOOD = '<img class="food" src="img/candy.png">';
const EMPTY = " ";
const SUPER_FOOD = '<img src="img/cookie.gif">';
const CHERRY = "🍒";
var gCherryInterval;

const gGame = {
  score: 0,
  isOn: false,
};

onInit();

function onInit() {
  gGhosts = [];
  gDeadGhosts = [];
  gGame.isOn = true;
  gGame.score = 0;
  document.querySelector("button").style.display = "none";
  gBoard = buildBoard();
  clearInterval(gIntervalGhosts);
  clearInterval(gCherryInterval);
  createGhosts(gBoard);
  createPacman(gBoard);
  renderBoard(gBoard, ".board-container");
  gCherryInterval = setInterval(addCherry, 15000);
}

function buildBoard() {
  const size = 10;
  const board = [];

  for (var i = 0; i < size; i++) {
    board.push([]);
    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD;
      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL;
      }
      if (
        (i === 1 && j === 1) ||
        (i === 8 && j === 8) ||
        (i === 1 && j === 8) ||
        (i === 8 && j === 1)
      ) {
        board[i][j] = SUPER_FOOD;
      }
    }
  }
  return board;
}

function updateScore(diff) {
  // TODO: update model and dom
  // Model

  gGame.score += diff;

  // DOM
  document.querySelector("h2 span").innerText = gGame.score;
}

function addCherry() {
  var emptyPos = getEmptyPos();
  console.log(emptyPos, "emptyPos");
  if (!emptyPos) return;
  gBoard[emptyPos.i][emptyPos.j] = CHERRY;
  renderCell(emptyPos, CHERRY);
}

function gameOver() {
  document.querySelector("button").style.display = "Inline";
  // TODO
  clearInterval(gCherryInterval);
  clearInterval(gIntervalGhosts);
  gGame.isOn = false;
  renderCell(gPacman.location, "🪦");
  alert("Game Over");
}

function checkVictory() {
  // console.log("sfs");
  clearInterval(gCherryInterval);

  document.querySelector("button").style.display = "Inline";
  alert("Well Done!");
  clearInterval(gIntervalGhosts);
  gGame.isOn = false;
}

function checkFood() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === FOOD) return false;
    }
  }
  return true;
}
