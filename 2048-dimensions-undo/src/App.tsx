//App.tsx
import { useMemo, useReducer } from "react";
import "./App.css";

import { Board } from "./ui/Board";
import { useKeyboard } from "./input/keyboard";

import { createInitialState, reducer, type Action } from "./engine/reducer";
import type { GameState } from "./engine/types";

const MIN_SIZE = 2;
const MAX_SIZE = 5;

function clampSize(n: number) {
  return Math.max(MIN_SIZE, Math.min(MAX_SIZE, n));
}

export default function App() {
  const initialSize = 4;

  const [state, dispatch] = useReducer(
    (s: GameState, a: Action) => reducer(s, a),
    initialSize,
    (size) => createInitialState(clampSize(size))
  );

  useKeyboard(dispatch);

  const best = useMemo(() => Math.max(...state.board), [state.board]);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <h1 style={{ margin: 0 }}>2048</h1>

      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginTop: 10 }}>
        <div style={{ fontWeight: 700 }}>Score: {state.score}</div>
        <div style={{ fontWeight: 700 }}>Best tile: {best}</div>

        <button
          onClick={() => dispatch({ type: "UNDO" })}
          disabled={state.history.length === 0}
        >
          Undo (Z)
        </button>

        <button onClick={() => dispatch({ type: "RESET" })}>Reset (R)</button>

        <label style={{ marginLeft: 8 }}>
          Size:
          <select
            value={state.size}
            onChange={(e) => dispatch({ type: "RESET", size: clampSize(Number(e.target.value)) })}
            style={{ marginLeft: 8 }}
          >
            {Array.from({ length: MAX_SIZE - MIN_SIZE + 1 }, (_, i) => MIN_SIZE + i).map((n) => (
              <option key={n} value={n}>
                {n}×{n}
              </option>
            ))}
          </select>
        </label>

        {state.over && (
          <div style={{ marginLeft: 8, fontWeight: 800 }}>
            Game Over
          </div>
        )}
      </div>

      <div style={{ marginTop: 8, opacity: 0.75 }}>
        Use Arrow Keys / WASD to move. Z or Backspace to undo, Have fun!!
      </div>

      <Board board={state.board} size={state.size} />
    </div>
  );
}
