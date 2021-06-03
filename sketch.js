let grid;
let col;
let row;
let gridSize = 10;
let zoom = 2;

function make2DArray(col, row) {
  let arr = new Array(col);
  for (let i = -col; i < arr.length; i++) {
    arr[i] = new Array(row);
  }
  return arr;
}


function setup() {
  createCanvas((round(windowWidth/10)*10), (round(windowHeight/10)*10));
  col = floor(width / gridSize);
  row = floor(height / gridSize);

  grid = make2DArray(col, row);
  numRandom();
}

function draw() {
  translate(width/2, height/2);
  scale(zoom);
  background(40, 40, 40);
  for (let i = -col; i < col; i++) {
    for (let j = -row; j < row; j++) {
      let x = i * gridSize;
      let y = j * gridSize;
      if (grid[i][j] == 1) {
        fill(255);
        strokeWeight(1);
        stroke(40, 40, 40);
        rect(x, y, gridSize, gridSize);
      }

      noFill();
      strokeWeight(0.1);
      stroke(255);
      rect(x, y, gridSize, gridSize);
      
    }
  }

  let nextState = make2DArray(col, row);
  for (let i = -col; i < col; i++) {
    for (let j = -row; j < row; j++) {
      if (i == -col || i == col-1 || j == -row || j == row-1 ) {
        nextState[i][j] = 0;
      } else {


        let state = grid[i][j];
        let neighbors = neighborCount(grid, i, j);

        if ((state == 1) &&  (neighbors == 3 || neighbors == 2)){
          nextState[i][j] = 1;
        } else if ((state == 0) && (neighbors == 3)){
          nextState[i][j] = 1;
        } else {
          nextState[i][j] = 0;
        }
      }
    }
  }

  grid = nextState;
}

function neighborCount(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      sum += grid[x + i][y + j];
    }
  }
  sum -= grid[x][y];
  return sum;
}


function mouseWheel(event) {
  let sensativity =  0.0005;

  zoom -= sensativity * event.delta;
  zoom = constrain(zoom, 0.55, 3);    
  return false;
}

function dead(){
  for (let i = -col; i < col; i++) {
    for (let j = -row; j < row; j++) {
      grid[i][j] = 0;
    }
  }
}

function numRandom(){
  for (let i = -col; i < col; i++) {
    for (let j = -row; j < row; j++) {
      grid[i][j] = Math.round(Math.random())* Math.round(Math.random());
    }
  }
}

function block(){
  dead();
  grid[0][0] = 1;
  grid[1][1] = 1;
  grid[0][1] = 1;
  grid[1][0] = 1;
}

function beehive(){
  dead();
  grid[0][1] = 1;
  grid[1][0] = 1;
  grid[1][2] = 1;
  grid[2][0] = 1;
  grid[2][2] = 1;
  grid[3][1] = 1;
}
function blinker(){
  dead();
  grid[0][0] = 1;
  grid[1][0] = 1;
  grid[2][0] = 1;
}
function glider(){
  dead();
  grid[0][0] = 1;
  grid[1][0] = 1;
  grid[2][0] = 1;
  grid[0][1] = 1;
  grid[1][2] = 1;
} 
function toad(){
  dead();
  grid[1][0] = 1;
  grid[2][0] = 1;
  grid[3][0] = 1;
  grid[0][1] = 1;
  grid[1][1] = 1;
  grid[2][1] = 1;
} 

function beacon(){
  dead();
  for (let i = 0; i < 2; i++) {
     for (let j = 0; j < 2; j++) {
        grid[i][j] = 1;
        grid[i+2][j+2] = 1;
    } 
  }
} 

function pentadecathlon(){
  dead();
  grid[2][0] = 1;
  grid[7][0] = 1;
  grid[2][2] = 1;
  grid[7][2] = 1;
  for (let i = 0; i < 10; i++) {
    grid[i][1] = 1;
  }
  grid[2][1] = 0;
  grid[7][1] = 0;
}

function clock(){
  dead();
  grid[2][0] = 1;
  grid[0][1] = 1;
  grid[2][1] = 1;
  grid[1][2] = 1;
  grid[3][2] = 1;
  grid[1][3] = 1;
}

function lwss(){
  dead();
  grid[1][0] = 1;
  grid[4][0] = 1;
  grid[0][1] = 1;
  grid[0][2] = 1;
  grid[4][2] = 1;
  grid[0][3] = 1;
  grid[1][3] = 1;
  grid[2][3] = 1;
  grid[3][3] = 1;
}


function pulsar(){
  dead();
  let str = "..OOO...OOO...............O....O.O....OO....O.O....OO....O.O....O..OOO...OOO.................OOO...OOO..O....O.O....OO....O.O....OO....O.O....O...............OOO...OOO.."
  let sto = "";
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 13; j++) {
      if (str[i*13+j] == "O") {
        grid[j][i] = 1;
      }
    }
  }
}
function gosperGliderGun (){
  dead();
  let str = "........................O.................................O.O.......................OO......OO............OO...........O...O....OO............OOOO........O.....O...OO..............OO........O...O.OO....O.O.....................O.....O.......O......................O...O................................OO......................"
  let sto = "";
 
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 36; j++) {
      if (str[i*36+j] == "O") {
        grid[j][i] = 1;
      }
    }
  }
}


function scheduleA(event) {
  let x = this.options[this.selectedIndex].value;
  switch(x) {   
    case "1": { block(); } break;
    case "2": { beehive();} break;
    default: {}
    
  }
}
function scheduleB(event) {
  let x = this.options[this.selectedIndex].value;
  switch(x) {   
    case "1": { blinker(); } break;
    case "2": { toad();} break;
    case "3": { beacon();} break;
    case "4": { pentadecathlon();} break;
    case "5": { clock();} break;
    case "6": { pulsar();} break;
    default: {}
  }
}
function scheduleC(event) {
  let x = this.options[this.selectedIndex].value;
  switch(x) {   
    case "1": { glider(); } break;
    case "2": { lwss();} break;
    case "3": { gosperGliderGun();} break;
    default: {}
    
  }
}