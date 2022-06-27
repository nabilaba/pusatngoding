import create from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

const useAdmin = create(
  devtools((set) => ({
    admin: [],
    siswa: [],
    mentor: [],
    kursus: [],
    setAdmin: async (api) => {
      const res = await axios.get(api, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenId"),
        },
      });
      set({ admin: res.data });
    },
    setSiswa: async (api) => {
      const res = await axios.get(api, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenId"),
        },
      });
      set({ siswa: res.data });
    },
    setMentor: async (api) => {
      const res = await axios.get(api, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenId"),
        },
      });
      set({ mentor: res.data });
    },
    setKursus: async (api) => {
      const res = await axios.get(api, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenId"),
        },
      });
      set({ kursus: res.data });
    },
    remove: async (api, id) => {
      await axios
        .delete(`${api}/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tokenId"),
          },
        })
        .then((res) => {
          set((state) => ({
            admin: state.admin.filter((item) => item.id !== id),
            siswa: state.siswa.filter((item) => item.id !== id),
            mentor: state.mentor.filter((item) => item.id !== id),
            kursus: state.kursus.filter((item) => item.id !== id),
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }))
);

export default useAdmin;
