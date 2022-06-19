import create from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

const useAdmin = create(
  devtools((set) => ({
    admin: [],
    siswa: [],
    mentor: [],
    setAdmin: async (api) => {
      const res = await axios.get(api);
      set({ admin: res.data });
    },
    setSiswa: async (api) => {
      const res = await axios.get(api);
      set({ siswa: res.data });
    },
    setMentor: async (api) => {
      const res = await axios.get(api);
      set({ mentor: res.data });
    },
    remove: async (api, id) => {
      await axios
        .delete(`${api}/${id}`)
        .then((res) => {
          set((state) => ({
            admin: state.admin.filter((admin) => admin.id !== id),
            siswa: state.siswa.filter((siswa) => siswa.id !== id),
            mentor: state.mentor.filter((mentor) => mentor.id !== id),
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }))
);

export default useAdmin;
