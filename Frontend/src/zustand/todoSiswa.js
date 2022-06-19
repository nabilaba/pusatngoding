import create from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

const useSiswa = create(
  devtools((set) => ({
    mentor: [],
    setMentor: async (api) => {
      const res = await axios.get(api);
      set({ mentor: res.data });
    },
  }))
);

export default useSiswa;