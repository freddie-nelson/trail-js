const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const SIZE = 10;
const CELL_SIZE = canvas.width / SIZE;

let grid = [];
const initGrid = () => {
  grid = [];

  for (let i = 0; i < SIZE; i++) {
    let arr = [];
    
    for (let j = 0; j < SIZE; j++) {
      arr.push(0);
    }

    grid.push(arr);
  }
}
initGrid();

const explorer = {
  x: Math.floor((SIZE - 1) / 2),
  y: Math.floor((SIZE - 1) / 2),
  direction: "UP",
  instructions: "FLFRFFL",
  currInstruction: 0
}

const instructionToXY = (instruction, start) => {
  const end = {...start};

  switch (instruction) {
    case "L":
      switch (explorer.direction) {
        case "UP":
          explorer.direction = "LEFT";
          break;
        case "DOWN":
          explorer.direction = "RIGHT";
          break;
        case "RIGHT":
          explorer.direction = "UP";
          break;
        case "LEFT":
          explorer.direction = "DOWN";
          break;
        default:
          break;
      }
      break;
    case "R":
      switch (explorer.direction) {
        case "UP":
          explorer.direction = "RIGHT";
          break;
        case "DOWN":
          explorer.direction = "LEFT";
          break;
        case "RIGHT":
          explorer.direction = "DOWN";
          break;
        case "LEFT":
          explorer.direction = "UP";
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }

  switch (explorer.direction) {
    case "UP":
      end.y--;
      break;
    case "DOWN":
      end.y++;
      break;
    case "RIGHT":
      end.x++;
      break;
    case "LEFT":
      end.x--;
      break;
    default:
      break;
  }

  return end;
}

const moveExplorer = () => {
  let desiredInstruction = explorer.instructions[explorer.currInstruction];
  let desiredPos;
  let checked = 0;

  do {
     desiredPos = instructionToXY(desiredInstruction, {x: explorer.x, y: explorer.y})
    desiredInstruction = "R"
    checked++;
    if (checked === 4) return;
  } while (desiredPos.x < 0 || desiredPos.x >= SIZE || desiredPos.y < 0 || desiredPos.y >= SIZE || grid[desiredPos.y][desiredPos.x] !== 0)
  
  grid[explorer.y][explorer.x]++;
  explorer.x = desiredPos.x;
  explorer.y = desiredPos.y;
  
  explorer.currInstruction++;
  if (explorer.currInstruction === explorer.instructions.length) explorer.currInstruction = 0;
}

const tick = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw explorer
  ctx.fillStyle = "blue";
  ctx.fillRect(explorer.x * CELL_SIZE, explorer.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (grid[i][j] !== 0) {
        ctx.fillStyle = `rgba(0, 255, 0, ${1 / grid[i][j]}`;
        ctx.fillRect(j*CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        grid[i][j]++;
        if (grid[i][j] === 9) grid[i][j] = 0;
      }
    }
  }

  moveExplorer();
}

setInterval(tick, 50);