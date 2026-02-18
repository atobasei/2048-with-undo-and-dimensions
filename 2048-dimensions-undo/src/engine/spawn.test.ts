import { describe, it, expect } from "vitest";
import { applyMove } from "./move";

describe("applyMove", () => {
  it("slides tiles left", () => {
    const board = [
      0, 2, 0, 4,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
    ];

    const res = applyMove(board, 4, "left");

    expect(res.board.slice(0, 4)).toEqual([2, 4, 0, 0]);
    expect(res.moved).toBe(true);
    expect(res.gained).toBe(0);
  });

  it("merges once per pair", () => {
    const board = [
      2, 2, 2, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
    ];

    const res = applyMove(board, 4, "left");

    expect(res.board.slice(0, 4)).toEqual([4, 2, 0, 0]);
    expect(res.gained).toBe(4);
  });
});
