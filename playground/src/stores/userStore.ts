import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  username: string;
  password: string;
  updateUsername: (username: string) => void;
  updatePassword: (password: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: "",
      password: "",
      updateUsername: (newUsername) => {
        set(() => {
          return { username: newUsername };
        });
      },
      updatePassword: (newPassword) =>
        set(() => {
          return { password: newPassword };
        })
    }),
    { name: "user" }
  )
);
