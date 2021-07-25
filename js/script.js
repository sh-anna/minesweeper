var matrix = null;
var running = null;

var width = document.getElementById('width');
var height = document.getElementById('height');
var skills = document.getElementsByName('difficulty');

var columns = width.value;
var rows = height.value;
var mines = Math.round((width.value * height.value) / 15);

width.onchange = function () {
  columns = width.value;
};

height.onchange = function () {
  rows = height.value;
};

for (var i = 0; i < skills.length; i++) {
  skills[i].onchange = minesNum;
}

function minesNum() {
  mines = Math.round(((columns * rows) / 10) * this.value);
}

init(columns, rows, mines);

document
  .querySelector('.restart')
  // .querySelector('.smile')
  .addEventListener('click', () => init(columns, rows, mines));

function init(columns, rows, mines) {
  matrix = getMatrix(columns, rows);
  running = true;

  for (var i = 0; i < mines; i++) {
    setRandomMine(matrix);
  }

  update();
}

var closeWin = document.querySelector('.close.youwin');
var win = document.querySelector('.win');

closeWin.addEventListener('click', function (evt) {
  evt.preventDefault();
  win.classList.toggle('appear');
});

var closeOver = document.querySelector('.close.over');
var gameover = document.querySelector('.gameover');

closeOver.addEventListener('click', function (evt) {
  evt.preventDefault();
  gameover.classList.toggle('appear');
});

function update() {
  if (!running) {
    return;
  }

  const gameElement = matrixToHtml(matrix);

  const appElement = document.querySelector('#app');
  appElement.innerHTML = '';
  appElement.append(gameElement);

  appElement.querySelectorAll('img').forEach((imgElement) => {
    imgElement.addEventListener('mousedown', mousedownHandler);
    imgElement.addEventListener('mouseup', mouseupHandler);
    imgElement.addEventListener('mouseleave', mouseleaveHandler);
  });

  if (isLoose(matrix)) {
    var gameover = document.querySelector('.gameover');
    gameover.classList.add('appear');
    running = false;
  } else if (isWin(matrix)) {
    var win = document.querySelector('.win');
    win.classList.add('appear');
    running = false;
  }
}

function mousedownHandler(event) {
  const { cell, left, right } = getInfo(event);

  if (left) {
    cell.left = true;
  }

  if (right) {
    cell.right = true;
  }

  if (cell.left && cell.right) {
    bothHandler(cell);
  }

  update();
}

function mouseupHandler(event) {
  const { left, right, cell } = getInfo(event);

  const both = cell.right && cell.left && (left || right);
  const leftMouse = !both && cell.left && left;
  const rightMouse = !both && cell.right && right;

  if (both) {
    forEach(matrix, (x) => (x.potencial = false));
  }

  if (left) {
    cell.left = false;
  }

  if (right) {
    cell.right = false;
  }

  if (leftMouse) {
    leftHandler(cell);
  } else if (rightMouse) {
    rightHandler(cell);
  }

  update();
}

function mouseleaveHandler(event) {
  const info = getInfo(event);

  info.cell.left = false;
  info.cell.right = false;

  update();
}

function getInfo(event) {
  const element = event.target;
  const cellId = parseInt(element.getAttribute('data-cell-id'));

  return {
    left: event.which === 1,
    right: event.which === 3,
    cell: getCellById(matrix, cellId),
  };
}

function leftHandler(cell) {
  if (cell.show || cell.flag) {
    return;
  }
  cell.show = true;

  openSpace(matrix, cell.x, cell.y);
}

function rightHandler(cell) {
  if (!cell.show) {
    cell.flag = !cell.flag;
  }
}

function bothHandler(cell) {
  if (!cell.show || !cell.number) {
    return;
  }

  const cells = getAroundCells(matrix, cell.x, cell.y);
  const flags = cells.filter((x) => x.flag).length;

  if (flags === cell.number) {
    cells
      .filter((x) => !x.flag && !x.show)
      .forEach((cell) => {
        cell.show = true;
        openSpace(matrix, cell.x, cell.y);
      });
  } else {
    cells
      .filter((x) => !x.flag && !x.show)
      .forEach((cell) => (cell.potencial = true));
  }
}
