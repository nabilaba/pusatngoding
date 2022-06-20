import create from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

const useSiswa = create(
  devtools((set) => ({
    mentor: [],
    setMentor: async (api) => {
      await axios
        .get(api)
        .then((res) => {
          const mentorRequests = res.data.map((todo) =>
            axios
              .get(`${api}/${todo.id}/kursus`)
              .then((response) => ({ ...todo, kursus: response.data }))
          );

          return Promise.all(mentorRequests);
        })
        .then((res) => set({ mentor: res }));
    },
  }))
);

export default useSiswa;
