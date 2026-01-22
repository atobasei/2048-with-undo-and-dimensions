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
//figure out direcrion

//move left
//start with leftmost tile in (1,1) we wont use 2d array but for visualization rn 
//if value is 0, ie it is empty check the next one over if its empty check the next
//since our size will be variable we may want a while loop or something here
//if its not move the value from that tile to the leftmost tile, this is essentially the same as moving the tile
//if the value of a tile is the same as the spot to its left make the one on the left double
//and the other one to zero
//go until you've hit rightmost tile
//do this for each row

