/** 9x9 sudoku puzzle validity checker
 *
 * https://leetcode.com/problems/valid-sudoku/
 *
 * Initial solution idea --
 *      return false if any row/col invalid (optimize: check only the diagonal elements row/cols )
 *          let M be an n*n sudoku puzzle
 *          diagonal elements are M[i,i] where i in {0,1,2,...,n}
 *          walk the diagonal and check each of the diagonal element's row/col for validity
 *
 *      return false if any subboxes invalid
 *        extract board partitions
 *        extract board partition subboxes
 *        use a basic map to check for dupes
 *
 *      return true
 *
 * TODO:
 *   This solution passes, but I believe it is poorly optimized
 *      * determine current solution complexity
 *      * explore what the best solution complexity is
 *      * implement the optimizations
 *
 */

const SUDOKU_BOARD_SIZE = 9;
/**
 * @param {character[][]} board 9x9 sudoku puzzle
 * @return {boolean} validity of puzzle
 */
var isValidSudoku = function(board) {
  let puzzleDiagonalsValid = board.every((_, diagonalIdx) =>
    isDiagonalValid(board, diagonalIdx)
  );

  let puzzleSubboxesValid = listSubboxElements(board).every(subboxElements =>
    areSubboxElementsValid(subboxElements)
  );

  return puzzleDiagonalsValid && puzzleSubboxesValid;
};

const createMap = function() {
  return {
    add: function(val) {
      if (val !== ".") this[val] = 1;
    }
  };
};

/**
 *
 * @param {number} diagonalIdx diagonal element index from the sudoku board (ex: M[1,1], M[4,4], etc)
 * @param {character[][]} board 9x9 sudoku puzzle
 * @return {boolean} validity of M[i, i]'s row and column where M = board & i = diagonalIdx in range [0, 9]
 */
function isDiagonalValid(board, diagonalIdx) {
  let [rowMap, colMap] = [createMap(), createMap()];

  for (let i = 0; i < SUDOKU_BOARD_SIZE; i++) {
    let [rowElement, colElement] = [
      board[diagonalIdx][i],
      board[i][diagonalIdx]
    ];

    if (!!rowMap[rowElement] || !!colMap[colElement]) return false;

    rowMap.add(rowElement);
    colMap.add(colElement);
  }

  return true;
}

/**
 * @param {character[]} box array of elements within a subbox of M
 * @return {boolean} validity of the subbox
 */
function areSubboxElementsValid(box) {
  for (let i = 0, map = createMap(); i < box.length; i++) {
    if (!!map[box[i]]) return false;

    map.add(box[i]);
  }

  return true;
}

/**
 *
 * @param {character[][]} board 9x9 sudoku puzzle
 * @return {character[][]} list of arrays containing elements to subboxes of board
 */
function listSubboxElements(board) {
  let boardPartitions = board.reduce(
    (boxRowPartition, boardRow) => {
      let partitionBound = Math.sqrt(SUDOKU_BOARD_SIZE);
      for (let i = 0; i < SUDOKU_BOARD_SIZE; i++) {
        let boxPartitionIdx = Math.floor(i / partitionBound);
        boxRowPartition[boxPartitionIdx].push(boardRow[i]);
      }
      return boxRowPartition;
    },
    [[], [], []]
  );

  let boardSubboxes = boardPartitions.reduce((subboxes, boardPartition) => {
    const numBoxesInPartition = Math.sqrt(SUDOKU_BOARD_SIZE);
    const subboxSize = boardPartition.length / numBoxesInPartition;

    for (let i = 0; i < numBoxesInPartition; i++) {
      let box = [];
      for (let j = subboxSize * i; j < subboxSize * (i + 1); j++) {
        box.push(boardPartition[j]);
      }
      subboxes.push(box);
    }

    return subboxes;
  }, []);

  return boardSubboxes;
}

/**
 ****************************************************************
 *                  TEST DRIVER CODE BELOW
 ****************************************************************
 */

var assert = require("assert");

const BOARD1 = {
  board: [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
  ],
  valid: true
};

const BOARD2 = {
  board: [
    ["8", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
  ],
  valid: false,
  reason: "Subbox 1 has two '8'"
};

const BOARD3 = {
  board: [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["5", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
  ],
  valid: false,
  reason: "Col 1 has two '5's"
};

const TEST_BOARDS = [BOARD1, BOARD2, BOARD3];

let testBoard1Diagonals = () => {
  BOARD1.board.forEach((row, idx) => {
    assert(
      isDiagonalValid(BOARD1.board, idx) === BOARD1.valid,
      `Diagonal for ${idx} was deemed invalid`
    );
    console.log(`BOARD1: diagonal position (${idx}, ${idx}) valid`);
  });
};

let testBoard2Diagonals = () => {
  let b2DiagonalValidities = BOARD2.board.map((row, idx) => {
    let valid = isDiagonalValid(BOARD2.board, idx);
    console.log(
      `BOARD2: diagonal position (${idx}, ${idx}) ${
        valid ? "valid" : "INVALID"
      }`
    );
    return valid;
  });

  assert(
    b2DiagonalValidities.some(v => v === false) === true,
    `BOARD2: invalid did not have return invalid for any diagonals`
  );
};

let testAllBoardsValidity = () => {
  console.log(
    `\n=> Running tests (n=${TEST_BOARDS.length}) for isValidSudoku(board)`
  );
  TEST_BOARDS.forEach((test, idx) => {
    let boardValid = isValidSudoku(test.board);
    let testPassed = boardValid === test.valid;
    assert(
      testPassed,
      `BOARD${idx} did not return expected val of ${test.valid}`
    );
    if (testPassed)
      console.log(
        `\t PASS:\t BOARD${idx} ${boardValid ? "is" : "is not"} valid`
      );
  });
};

let testSubboxValidation = () => {
  TEST_BOARDS.filter(testBoard => testBoard.valid)
    .reduce((validSubboxesElements, testBoard) => {
      validSubboxesElements.push(listSubboxElements(testBoard.board));
      return validSubboxesElements;
    }, [])
    .forEach(validSubBoxElements =>
      assert(areSubboxElementsValid(validSubBoxElements))
    );
};

let runTests = (...tests) => {
  tests.forEach(test => test());
};

runTests(
  testBoard1Diagonals,
  testBoard2Diagonals,
  testSubboxValidation,
  testAllBoardsValidity
);
