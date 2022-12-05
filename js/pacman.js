"use strict";

var PACMAN = '<img src="img/pacman.gif">';
var gPacman;

function createPacman(board) {
  // DONE: initialize gPacman...
  gPacman = {
    location: {
      i: 2,
      j: 2,
    },
    isSuper: false,
  };
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
  if (!gGame.isOn) return;
  // DONE: use getNextLocation(), nextCell
  const nextLocation = getNextLocation(ev.key);
  const nextCell = gBoard[nextLocation.i][nextLocation.j];

  // DONE: return if cannot move
  if (nextCell === WALL) return;

  // DONE: hitting a ghost? call gameOver
  if (nextCell === GHOST && !gPacman.isSuper) {
    gameOver();
    return;
  }

  if (nextCell === FOOD) {
    updateScore(1);
  }

  if (nextCell === CHERRY) {
    updateScore(10);
  }

  if (nextCell === SUPER_FOOD) {
    gPacman.isSuper = true;
    var superTime = setTimeout(() => {
      gPacman.isSuper = false;
    }, 5000);
  }

  if (gPacman.isSuper && nextCell === GHOST) {
    killGhost(nextLocation);
  }
  // DONE: moving from current location:
  // DONE: update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // DONE: update the DOM
  renderCell(gPacman.location, EMPTY);

  // DONE: Move the pacman to new location:
  // DONE: update the model
  gBoard[nextLocation.i][nextLocation.j] = PACMAN;
  gPacman.location = nextLocation;
  // DONE: update the DOM
  renderCell(nextLocation, PACMAN);
  if (checkFood()) checkVictory();
}

function getNextLocation(eventKeyboard) {
  // console.log(eventKeyboard)
  const nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  // DONE: figure out nextLocation
  var degrees;
  switch (eventKeyboard) {
    case "ArrowUp":
      degrees = "-0.25turn";
      nextLocation.i--;
      break;
    case "ArrowRight":
      degrees = "0";
      nextLocation.j++;
      break;
    case "ArrowDown":
      degrees = "90deg";
      nextLocation.i++;
      break;
    case "ArrowLeft":
      degrees = "3.142rad";
      nextLocation.j--;
      break;
  }
  PACMAN = `<img style="transform: rotate(${degrees})" src="img/pacman.gif">`;
  return nextLocation;
}
