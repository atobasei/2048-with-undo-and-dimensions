//src/engine/spawn.ts

//responsible for spawning a new block each time a move is successful
/*
my key here was making sure this is non deterministic, when an undo occurs
I should be able to make the same move again and have the random tile possibly spawn
elsewhere.
*/
import { SpawnResult, TileValue } from "./types";

export function spawnTile(board: TileValue[], rng: () => number = Math.random): SpawnResult {
    // find empty indices
    const empties: number[] = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === 0) empties.push(i);
    }
  
    //if no empty spots no spawn
    if (empties.length === 0) {
      return { board, spawned: false };
    }
  
    // pick random empty spot
    const chosenIndex = empties[Math.floor(rng() * empties.length)];
  
    // pick value 2 or 4
    const value: TileValue = rng() < 0.9 ? 2 : 4;
  
    // return new board 
    const next = board.slice();
    next[chosenIndex] = value;
  
    return { board: next, spawned: true };
  }