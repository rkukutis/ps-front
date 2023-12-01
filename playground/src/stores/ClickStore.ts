import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ClickState {
  clicks: number;
  increaseClicks: () => void;
  decreaseClicks: () => void;
}

export const useClickStore = create<ClickState>()(
  persist(
    (set) => ({
      clicks: 0,
      increaseClicks: () => {
        set((state) => {
          return { clicks: state.clicks + 1 };
        });
      },
      decreaseClicks: () =>
        set((state) => {
          return { clicks: state.clicks - 1 };
        })
    }),
    { name: "clicks" }
  )
);
