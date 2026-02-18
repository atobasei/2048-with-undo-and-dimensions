import { useEffect, type Dispatch } from "react";
import type { Direction } from "../engine/types";
import type { Action } from "../engine/reducer";

function keyToDir(e: KeyboardEvent): Direction | null {
  if (e.key === "ArrowUp") return "up";
  if (e.key === "ArrowDown") return "down";
  if (e.key === "ArrowLeft") return "left";
  if (e.key === "ArrowRight") return "right";

  const k = e.key.toLowerCase();
  if (k === "w") return "up";
  if (k === "s") return "down";
  if (k === "a") return "left";
  if (k === "d") return "right";

  return null;
}

export function useKeyboard(dispatch: Dispatch<Action>) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.startsWith("Arrow")) e.preventDefault();

      if (e.key.toLowerCase() === "z" || e.key === "Backspace") {
        dispatch({ type: "UNDO" });
        return;
      }

      if (e.key.toLowerCase() === "r") {
        dispatch({ type: "RESET" });
        return;
      }

      const dir = keyToDir(e);
      if (dir) dispatch({ type: "MOVE", dir });
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dispatch]);
}
