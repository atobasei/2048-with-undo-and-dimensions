// src/enginge/types.ts
//file defines 

//defining direction for use of both awsd and arrows

export type Direction = "up" | "down" | "left" | "right"

//0 means empty tile
export type TileValue = number;

export interface GameState {
    //grind size nxn
    size: number;
    //array of grid values
    board: TileValue[]
    //current score
    score: number;
    over: boolean;

   //array of previous gamestates
    history: Array<{
        board: TileValue[];
        score: number;
        over: boolean;
      }>;

} 
//for the UI
export interface ApplyMoveResult{
    state: GameState;
    //if a move occured theres a spawn
    moved: boolean;
}

export interface SpawnResult {
    board: TileValue[];
    spawned: boolean; 
  }
