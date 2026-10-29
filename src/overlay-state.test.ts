import { describe, expect, it } from "vitest";
import { applyCommand, createState } from "./overlay-state";

describe("applyCommand", () => {
  it("проигрывает известную анимацию один раз", () => {
    const state = applyCommand(createState(), { type: "play", name: "objective" });
    expect(state.playing).toBe("objective");
  });

  it("игнорирует повтор, пока анимация не кончилась", () => {
    const started = applyCommand(createState(), { type: "play", name: "objective" });
    const repeated = applyCommand(started, { type: "play", name: "objective" });
    expect(repeated).toBe(started);
  });

  it("пустое имя возвращает прежнее состояние", () => {
    const state = createState();
    expect(applyCommand(state, { type: "play", name: "" })).toBe(state);
  });

  it("неизвестное имя возвращает прежнее состояние", () => {
    const state = applyCommand(createState(), { type: "play", name: "objective" });
    expect(applyCommand(state, { type: "play", name: "unknown" })).toBe(state);
  });
});
