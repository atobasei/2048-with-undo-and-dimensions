//src/ui/Board.tsx
import type { CSSProperties } from "react";
import type { TileValue } from "../engine/types";

const TILE_COLORS: Record<number, { bg: string; color: string }> = {
  2:    { bg: "#eee4da", color: "#776e65" },
  4:    { bg: "#ede0c8", color: "#776e65" },
  8:    { bg: "#f2b179", color: "#f9f6f2" },
  16:   { bg: "#f59563", color: "#f9f6f2" },
  32:   { bg: "#f67c5f", color: "#f9f6f2" },
  64:   { bg: "#f65e3b", color: "#f9f6f2" },
  128:  { bg: "#edcf72", color: "#f9f6f2" },
  256:  { bg: "#edcc61", color: "#f9f6f2" },
  512:  { bg: "#edc850", color: "#f9f6f2" },
  1024: { bg: "#edc53f", color: "#f9f6f2" },
  2048: { bg: "#edc22e", color: "#f9f6f2" },
};

function tileStyle(v: TileValue): CSSProperties {
  const tile = TILE_COLORS[v];

  const style: CSSProperties = {
    width: 80,
    height: 80,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    userSelect: "none",

    background: v === 0
      ? "rgba(238,228,218,0.35)"
      : tile?.bg ?? "#3c3a32",

    color: tile?.color ?? "#f9f6f2",

    transition: "transform 1.5s ease",

  };

  // Responsive font scaling
  if (v >= 1024) style.fontSize = 22;
  else if (v >= 128) style.fontSize = 26;
  else style.fontSize = 30;

  return style;
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
