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

    //compresses line by moving zeroes to right
    const compressed: TileValue[] = [];
  for (let i = 0; i < size; i++) {
    if (line[i] !== 0) compressed.push(line[i]);
  }
  while (compressed.length < size) compressed.push(0);


    // 2. Merge adjacent equal values (once per tile)
    // 3. Track score gained from merges
    for(let i =0; i < size-1; i++){
        if (compressed[i] !== 0 && compressed[i] === compressed[i + 1]) {
            compressed[i]= (compressed[i])*2;
            gained += compressed[i];
            compressed[i+1] =0;
            //skip tile if merge to not allow double merge
            i++
        }
    }
    
    const finalLine: TileValue[] = [];
  for (let i = 0; i < size; i++) {
    if (merged[i] !== 0) finalLine.push(merged[i]);
  }
  while (finalLine.length < size) finalLine.push(0);
  
    return {
      line,
      gained: 0,
    };
  }

  function getRow(board: TileValue[], size: number, r: number): TileValue[] {
//return n elements starting at r* size

  }

  function getColumn(board: TileValue[], size: number, r: number): TileValue[]{
//return n elements each one having an offset of n from one another starting at r
  }

function setRow(){}

function setColumn(){}

function ApplyMove(){
    //decide wether rows or columns based on direction
    //for each row, extract line, reverse if needed, merge line and write it back
    //keep track of score ansd wether anything changed per line
    //return the moveresult

    //also to track moved we just wanna compare the initial grid with the grid after the loop
    //upon the first differing entry we can set moved to true, we could also maybe keep track of this
    //in the helper functions
    return {
        board,
        gained: 0,
        moved: false,
      };
    }

