//src/ui/Board.tsx
import type { CSSProperties } from "react";
import type { TileValue } from "../engine/types";

function tileStyle(v: TileValue): CSSProperties {
  const base: CSSProperties = {
    width: 80,
    height: 80,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 26,
    fontWeight: 800,
    userSelect: "none",
    background: v === 0 ? "rgba(109, 106, 103, 0.35)" : "#eee4da",
  };

  if (v >= 128) base.fontSize = 22;
  if (v >= 1024) base.fontSize = 18;

  return base;
}

export function Board({ board, size }: { board: TileValue[]; size: number }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 80px)`,
        gap: 10,
        background: "#bbada0",
        padding: 10,
        borderRadius: 10,
        width: "fit-content",
        marginTop: 18,
      }}
    >
      {board.map((v, i) => (
        <div key={i} style={tileStyle(v)}>
          {v === 0 ? "" : v}
        </div>
      ))}
    </div>
  );
}
