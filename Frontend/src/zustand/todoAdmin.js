import create from "zustand"
import { devtools } from "zustand/middleware"
import axios from "axios"

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
        }
    }))
);

export default useAdmin;