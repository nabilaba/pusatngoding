import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const useLoginState = create(
  persist(
    devtools((set, get) => ({
      isLoggedIn: false,
      loggedAs: "",
      setIsLoggedIn: () => set({ isLoggedIn: true }),
      setIsLoggedOut: () => set({ isLoggedIn: false }),
      setLoggedAs: (user) => set({ loggedAs: user }),
    })),
    {
      name: "client",
      getStorage: () => localStorage 
    }
  )
);

export default useLoginState;
