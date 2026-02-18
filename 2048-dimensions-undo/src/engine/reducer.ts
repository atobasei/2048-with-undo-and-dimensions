import { Direction, GameState, TileValue } from "./types";
import { applyMove } from "./move";
import { spawnTile } from "./spawn";

// tune as you like
const MAX_HISTORY = 100;

export type Action =
  | { type: "MOVE"; dir: Direction }
  | { type: "UNDO" }
  | { type: "RESET"; size?: number };

function emptyBoard(size: number): TileValue[] {
  return Array(size * size).fill(0);
}

function canMove(board: TileValue[], size: number): boolean {
  // any empty spot -> can move
  if (board.some((v) => v === 0)) return true;

  // any mergeable neighbor -> can move
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const i = r * size + c;
      const v = board[i];
      if (c + 1 < size && board[i + 1] === v) return true;
      if (r + 1 < size && board[i + size] === v) return true;
    }
  }
  return false;
}

function pushHistory(state: GameState): GameState["history"] {
  const nextHistory = state.history.concat([
    { board: state.board, score: state.score, over: state.over },
  ]);

  // cap history length
  if (nextHistory.length > MAX_HISTORY) {
    return nextHistory.slice(nextHistory.length - MAX_HISTORY);
  }
  return nextHistory;
}

export function createInitialState(size: number, rng: () => number = Math.random): GameState {
  // start with empty board and spawn 2 tiles (classic 2048)
  let board = emptyBoard(size);
  board = spawnTile(board, rng).board;
  board = spawnTile(board, rng).board;

  return {
    size,
    board,
    score: 0,
    over: false,
    history: [],
  };
}

export function reducer(state: GameState, action: Action, rng: () => number = Math.random): GameState {
  switch (action.type) {
    case "RESET": {
      const size = action.size ?? state.size;
      return createInitialState(size, rng);
    }

    case "UNDO": {
      if (state.history.length === 0) return state;

      const prev = state.history[state.history.length - 1];
      return {
        ...state,
        board: prev.board,
        score: prev.score,
        over: prev.over,
        history: state.history.slice(0, -1),
      };
    }

    case "MOVE": {
      if (state.over) return state;

      const res = applyMove(state.board, state.size, action.dir);

      // if nothing changed, do nothing (no spawn, no history)
      if (!res.moved) return state;

      // save snapshot BEFORE spawn
      const history = pushHistory(state);

      // spawn new tile after a successful move
      const spawned = spawnTile(res.board, rng).board;

      const score = state.score + res.gained;
      const over = !canMove(spawned, state.size);

      return {
        ...state,
        board: spawned,
        score,
        over,
        history,
      };
    }

    default:
      return state;
  }
}
