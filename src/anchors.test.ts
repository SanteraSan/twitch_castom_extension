import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { covers, readAnchors } from "./anchors";

const anchorsPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../.cursor/skills/overlay-layout/references/anchors.md",
);
const anchorsText = readFileSync(anchorsPath, "utf8");

describe("readAnchors", () => {
  it("рамка миникарты берёт прямоугольник из якорей", () => {
    const input = [
      "| Миникарта, x | 1504 |",
      "| Миникарта, y | 772 |",
      "| Миникарта, ширина | 416 |",
      "| Миникарта, высота | 276 |",
    ].join("\n");

    expect(anchorsText).toContain(input);
    expect(readAnchors(anchorsText).minimap).toEqual({
      x: 1504,
      y: 772,
      width: 416,
      height: 276,
    });
  });

  it("рамка панели героя берёт прямоугольник из якорей", () => {
    const input = [
      "| Панель героя, x | 4 |",
      "| Панель героя, y | 840 |",
      "| Панель героя, ширина | 1234 |",
      "| Панель героя, высота | 236 |",
    ].join("\n");

    expect(anchorsText).toContain(input);
    expect(readAnchors(anchorsText).hero).toEqual({
      x: 4,
      y: 840,
      width: 1234,
      height: 236,
    });
  });

  it("центр кадра не попадает в рамки", () => {
    const input = ["| Холст, ширина | 1920 |", "| Холст, высота | 1080 |"].join("\n");
    const anchors = readAnchors(anchorsText);

    expect(anchorsText).toContain(input);
    expect(covers(anchors.minimap, 960, 540)).toBe(false);
    expect(covers(anchors.hero, 960, 540)).toBe(false);
  });
});
