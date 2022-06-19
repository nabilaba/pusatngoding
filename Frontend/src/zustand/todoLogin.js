import create from "zustand";
import { devtools } from "zustand/middleware";

const useLoginState = create(
  devtools((set, get) => ({
    isLoggedIn: false,
    loggedAs: "",
    setIsLoggedIn: () => set({ isLoggedIn: true }),
    setIsLoggedOut: () => set({ isLoggedIn: false }),
    setLoggedAs: (user) => set({ loggedAs: user }),
  }))
);

export default useLoginState;