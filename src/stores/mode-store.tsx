import { create } from "zustand";

interface ModeState {
  mode: "light" | "dark";
  changeMode: (mode: "light" | "dark") => void;
}

export const useModeStore = create<ModeState>()((set) => ({
  mode: "light",
  changeMode: (mode) => set(() => ({ mode })),
}));
