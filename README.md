# N Chess Queens - Genetic Algorithm
The N queens puzzle is the problem of placing N chess queens on an N×N chessboard so that no two queens threaten each other; thus, a solution requires that no two queens share the same row, column, or diagonal.

This project was developed following some of the main ideas found in the next research about the subject:

* [An Adaptive Genetic Algorithm for Solving NQueens Problem]
(https://arxiv.org/abs/1802.02006).

## Prerequisites

### Install Git
* [Download](https://git-scm.com/downloads).

### Install NodeJS
* [Download](https://nodejs.org/en/download/).

## 1. Clone the project.
After installing the git CLI tool and NodeJS compiler, you'll be ready to start working.

### 1.1 Clone the repository.
  ```
  git clone https://github.com/sandovaledwin/n-chess-queens-genetic-algorithm
  ```

### 1.2 Go into the directory.
  ```
  cd n-chess-queens-genetic-algorithm
  ```

## 2. Running the project.
Now, you're ready for performing the calculation of the first knight tour over a chess board of NxN.

### 3.1 Copy the excel document that contains all the information into the next path.
  ```
  npm run start
  ```

## 3. Results.
After finishing successfully the program, you'll be getting the a n queens over a chess board in the correct order.
  ```
Best Score:  100
Best Board: 
[ [ '-', '-', 'Q', '-', '-', '-', '-', '-' ],
  [ '-', '-', '-', '-', '-', 'Q', '-', '-' ],
  [ '-', '-', '-', '-', '-', '-', '-', 'Q' ],
  [ 'Q', '-', '-', '-', '-', '-', '-', '-' ],
  [ '-', '-', '-', 'Q', '-', '-', '-', '-' ],
  [ '-', '-', '-', '-', '-', '-', 'Q', '-' ],
  [ '-', '-', '-', '-', 'Q', '-', '-', '-' ],
  [ '-', 'Q', '-', '-', '-', '-', '-', '-' ] ]
Execution time (hr): 0s 39.128218ms
  ```

## 4. Extra.
If you want to know more about this problem, you can follow the next references:

* [The 8 Queen Problem - Numberphile - Youtube](https://www.youtube.com/watch?v=jPcBU0Z2Hj8).
* [Wikipedia](https://en.wikipedia.org/wiki/Eight_queens_puzzle).
