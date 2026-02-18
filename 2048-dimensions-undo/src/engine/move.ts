//src/engine/move.ts

import { Direction, TileValue } from "./types"; 

export interface MoveResult{
    //should have the grid, points to add, and wether anything changed
    board: TileValue[];
    gained: number;
    moved : boolean;

}


//takes a line or column and slides and merges as needed given a move.
function slideAndMerge(line: TileValue[]): { line: TileValue[]; gained: number } {
  const size = line.length;
  let gained = 0;

  const compressed: TileValue[] = [];
  for (let i = 0; i < size; i++) {
    if (line[i] !== 0) compressed.push(line[i]);
  }
  while (compressed.length < size) compressed.push(0);

  for (let i = 0; i < size - 1; i++) {
    if (compressed[i] !== 0 && compressed[i] === compressed[i + 1]) {
      compressed[i] = compressed[i] * 2;
      gained += compressed[i];
      compressed[i + 1] = 0;
      i++;
    }
  }

  const finalLine: TileValue[] = [];
  for (let i = 0; i < size; i++) {
    if (compressed[i] !== 0) finalLine.push(compressed[i]); 
  }
  while (finalLine.length < size) finalLine.push(0);

  return { line: finalLine, gained }; 
}

  function getRow(board: TileValue[], size: number, r: number): TileValue[] {
    const start = r * size;
    return board.slice(start, start + size);
  }
  
  function getColumn(board: TileValue[], size: number, c: number): TileValue[] {
    const col: TileValue[] = [];
    for (let r = 0; r < size; r++) {
      col.push(board[r * size + c]);
    }
    return col;
  }

  function setRow(board: TileValue[], size: number, r: number, row: TileValue[]): void {
    const start = r * size;
    for (let c = 0; c < size; c++) {
      board[start + c] = row[c];
    }
  }
  
  function setColumn(board: TileValue[], size: number, c: number, col: TileValue[]): void {
    for (let r = 0; r < size; r++) {
      board[r * size + c] = col[r];
    }
  }

  //decide wether rows or columns based on direction
    //for each row, extract line, reverse if needed, merge line and write it back
    //keep track of score ansd wether anything changed per line
    //return the moveresult

    //also to track moved we just wanna compare the initial grid with the grid after the loop
    //upon the first differing entry we can set moved to true, we could also maybe keep track of this
    //in the helper functions
  export function applyMove(board: TileValue[], size: number, dir: Direction): MoveResult {
    const next = board.slice(); // don't mutate input
    let gained = 0;
    let moved = false;
    const reverse = dir === "right" || dir === "down";

  const processLine = (line: TileValue[]) => {
    const working = reverse ? line.slice().reverse() : line.slice();
    const res = slideAndMerge(working);
    const finalLine = reverse ? res.line.slice().reverse() : res.line;
    return { finalLine, gained: res.gained };
  };
    
  if (dir === "left" || dir === "right") {
    // operate on rows
    for (let r = 0; r < size; r++) {
      const oldRow = getRow(next, size, r);
      const { finalLine, gained: g } = processLine(oldRow);

      if (!moved && finalLine.some((v, i) => v !== oldRow[i])) moved = true;
      gained += g;

      setRow(next, size, r, finalLine);
    }
  } else {
    // operate on columns
    for (let c = 0; c < size; c++) {
      const oldCol = getColumn(next, size, c);
      const { finalLine, gained: g } = processLine(oldCol);

      if (!moved && finalLine.some((v, i) => v !== oldCol[i])) moved = true;
      gained += g;

      setColumn(next, size, c, finalLine);
    }
  }

    return {
        board: next,
        gained,
        moved,
      };
    }

