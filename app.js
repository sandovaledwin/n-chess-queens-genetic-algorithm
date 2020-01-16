const BOARD_ROWS = 8;
const BOARD_COLS = 8;
const MAX_ITERATIONS = 10000;
const MUTATION_CHANCE = 0.5;
const POPULATION_SIZE = 30;

function changePositionInitial(chromosome) {
  const initialPosition = generateInitialPosition();
  const col = convertToBinaryString(initialPosition[0]);
  const row = convertToBinaryString(initialPosition[1]);
  let newPosition = [...col, ...row];
  return [...newPosition, ...chromosome.slice(6)];
}

function convertToBinaryString(num) {
  if (num == 0) return [0, 0, 0];
  if (num == 1) return [0, 0, 1];
  if (num == 2) return [0, 1, 0];
  if (num == 3) return [0, 1, 1];
  if (num == 4) return [1, 0, 0];
  if (num == 5) return [1, 0, 1];
  if (num == 6) return [1, 1, 0];
  return [1, 1, 1];
}

function convertBinaryStringToDecimal(str) {
  if (str == "000") return 0;
  if (str == "001") return 1;
  if (str == "010") return 2;
  if (str == "011") return 3;
  if (str == "100") return 4;
  if (str == "101") return 5;
  if (str == "110") return 6;
  return 7;
}

function crossover(chromosome1, chromosome2) {
  const pivot = Math.round(chromosome1.length / 2) - 1;
  const child1 = [...chromosome1.slice(0, pivot), ...chromosome2.slice(pivot)];
  const child2 = [...chromosome2.slice(0, pivot), ...chromosome1.slice(pivot)];
  return [child1, child2];
}

function fitness(chromosome, geneRepair = false) {
  let binaryPosition = "";
  let board = initBoard();
  let col = 0;
  let isValidMove = false;
  let row = 0;
  let validQueenMoves = [];
  let wrongMove = false;
  while (!wrongMove && col < BOARD_COLS) {
    binaryPosition = chromosome.slice(col * 3, col * 3 + 3).join("");
    row = convertBinaryStringToDecimal(binaryPosition);
    isValidMove = doWeHaveValidMove(board, col, row);
    if (isValidMove) board = makeMove(board, col, row);
    if (!isValidMove && geneRepair) {
      wrongMove = true;
      validQueenMoves = tryValidMove(board, col, row);
      if (validQueenMoves.length > 0) {
        board = makeMove(board, validQueenMoves[0].col, validQueenMoves[0].row);
        wrongMove = false;
      }
    }
    if (!wrongMove) col++;
  }
  let queensInRightPosition = col;
  let score = getScore(queensInRightPosition);
  return {
    board: board,
    chromosome: chromosome,
    score: score
  }
}

function generateInitialPosition() {
  let row = Math.ceil(Math.random() * (BOARD_ROWS - 1));
  let column = Math.ceil(Math.random() * (BOARD_COLS - 1));
  if (row >= BOARD_ROWS) row = 0;
  if (column >= BOARD_COLS) column = 0;
  return [row, column];
}

function generateMutation(population) {
  let populationAfterMutate = [];
  let chromosome = [];
  for (i = 0; i < population.length; i++) {
    chromosome = mutate(population[i].chromosome);
    populationAfterMutate.push(fitness(chromosome));
  }
  populationAfterMutate.sort(sortByScore);
  return populationAfterMutate;
}

function generateRandomPosition() {
  const max = BOARD_ROWS;
  const min = 0;
  const row = Math.floor(Math.random() * (max - min)) + min;
  return row;
}

function generatePopulation() {
  let population = [];
  let chromosome = [];
  for (i = 0; i < POPULATION_SIZE; i++) {
    chromosome = initChromosome();
    population.push(fitness(chromosome));
  }
  population.sort(sortByScore);
  return population;
}

function generateRandomQueens() {
  let queenPositions = [];
  let randomPosition = 0;
  let randomQueenPosition = [];
  for (let i=1; i<BOARD_COLS; i++) {
    randomPosition = generateRandomPosition();
    randomQueenPosition = convertToBinaryString(randomPosition);
    queenPositions = [...queenPositions, ...randomQueenPosition];
  }
  return queenPositions;
}

function geneRepair(population) {
  let child = {};
  const repairActivated = true;
  for (let i = 0; i < population.length; i++) {
    child = fitness(population[i].chromosome, repairActivated);
    population.splice(i, 1, child);
  }
  population.sort(sortByScore);
  return population;
}

function getScore(queensInRightPosition) {
  const numberOfQueens = BOARD_ROWS;
  return (100 / numberOfQueens) * queensInRightPosition;
}

function initBoard() {
  const board = [];
  for (let i = 0; i < BOARD_ROWS; i++) {
    board.push(Array(BOARD_COLS).fill("-"));
  }
  return board;
}

function initChromosome() {
  const initialPosition = generateRandomPosition();
  const row = convertToBinaryString(initialPosition);
  let chromosome = [...row];
  const randomQueens = generateRandomQueens();
  chromosome = [...chromosome, ...randomQueens];
  return chromosome;
}

function doWeHaveValidMove(board, col, row) {
  let isAGoodMove = true;
  let cols = 0;
  let rows = 0;
  let x = 0;
  let y = 0;
  let i = 0;
  while ( isAGoodMove && i < BOARD_COLS ) {
    if (board[col][i] === 'Q') isAGoodMove = false; // rows
    if (board[i][row] === 'Q') isAGoodMove = false; // cols
    x = col - i;
    y = row - i;
    if(x >= 0 && x < BOARD_COLS && y >= 0 && y < BOARD_ROWS)
      if (board[x][y] === 'Q') isAGoodMove = false; // diagonal
    x = col + i;
    y = row + i;
    if(x >= 0 && x < BOARD_COLS && y >= 0 && y < BOARD_ROWS)
      if (board[x][y] === 'Q') isAGoodMove = false; // diagonal
    x = col + i;
    y = row - i;
    if(x >= 0 && x < BOARD_COLS && y >= 0 && y < BOARD_ROWS)
      if (board[x][y] === 'Q') isAGoodMove = false; // diagonal
    x = col - i;
    y = row + i;
    if(x >= 0 && x < BOARD_COLS && y >= 0 && y < BOARD_ROWS)
      if (board[x][y] === 'Q') isAGoodMove = false; // diagonal
    i++;
  }
  return isAGoodMove;
}

function makeMove(board, col, row) {
  board[col][row] = "Q"
  return board;
}

function mutate(chromosome) {
  if (Math.random() > MUTATION_CHANCE) return chromosome;
  const index = Math.floor(Math.random() * chromosome.length);
  const upOrDown = Math.random() <= 0.5 ? 0 : 1;
  if (index <= 5) chromosome = changePositionInitial(chromosome);
  if (index > 5) chromosome[index] = upOrDown;
  return chromosome;
}

function printPopulation(population) {
  for (let i = 0; i < population.length; i++) {
    console.log(population[i].score);
    console.log(population[i].board);
  }
}

function printProgramName() {
  console.log("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *");
  console.log("*                N CHESS QUEENS PUZZLE                    *");
  console.log("*                                                         *");
  console.log("*  by: Carlos Edwin Sandoval Diaz                         *");
  console.log("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *");
  console.log("");
}

function run() {
  const hrstart = process.hrtime();
  let bestScore = 0;
  let bestBoard = {};
  let iteration = 0;
  let population = generatePopulation();
  while (iteration < MAX_ITERATIONS && bestScore < 100) {
    population = selectAndInsertTheTwoFitness(population);
    population = generateMutation(population);
    population = geneRepair(population);
    console.log("Iteration: ", iteration + 1);
    printPopulation(population);
    if (bestScore < population[0].score) {
      bestScore = population[0].score;
      bestBoard = population[0].board;
    }
    iteration++;
  }
  console.log("Best Score: ", bestScore);
  console.log("Best Board: ");
  console.log(bestBoard);
  const hrend = process.hrtime(hrstart);
  console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
}

function selectAndInsertTheTwoFitness(population) {
  const children = crossover(population[0].chromosome, population[1].chromosome);
  const child_1 = fitness(children[0]);
  const child_2 = fitness(children[1]);
  population.splice(population.length - 2, 2, child_1, child_2);
  population.sort(sortByScore);
  return population;
}

function sortByScore(a, b) {
  return b.score - a.score;
}

function tryValidMove(board, col, row) {
  let queensMoves = [];
  for (let i=0; i<BOARD_COLS; i++){
    if (doWeHaveValidMove(board, col, i))
      queensMoves.push({ col: col, row: i });
  }
  return queensMoves;
}

printProgramName();

run();