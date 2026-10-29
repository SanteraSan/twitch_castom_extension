export type Rect = { x: number; y: number; width: number; height: number };

export type Anchors = {
  canvas: { width: number; height: number };
  minimap: Rect;
  hero: Rect;
};

export function readAnchors(text: string): Anchors {
  const value = (label: string) => {
    const line = text.split("\n").find((row) => row.includes(`| ${label} |`));
    const cell = line?.split("|")[2]?.trim();
    const number = Number(cell);
    if (!line || Number.isNaN(number)) {
      throw new Error(`missing ${label}`);
    }
    return number;
  };

  return {
    canvas: {
      width: value("Холст, ширина"),
      height: value("Холст, высота"),
    },
    minimap: {
      x: value("Миникарта, x"),
      y: value("Миникарта, y"),
      width: value("Миникарта, ширина"),
      height: value("Миникарта, высота"),
    },
    hero: {
      x: value("Панель героя, x"),
      y: value("Панель героя, y"),
      width: value("Панель героя, ширина"),
      height: value("Панель героя, высота"),
    },
  };
}

export function covers(rect: Rect, x: number, y: number): boolean {
  return x >= rect.x && x < rect.x + rect.width && y >= rect.y && y < rect.y + rect.height;
}
