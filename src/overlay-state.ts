export type OverlayCommand = { type: "play"; name: string };

export type OverlayState = { playing: string | null };

export function createState(): OverlayState {
  return { playing: null };
}

export function applyCommand(state: OverlayState, command: OverlayCommand): OverlayState {
  if (command.name === "objective") {
    if (state.playing === "objective") {
      return state;
    }

    return { playing: "objective" };
  }

  return state;
}
