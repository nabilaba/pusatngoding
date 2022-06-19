import { Routes, Route } from "react-router-dom";
import Homepage from "./routes/homepage/Homepage";
import About from "./routes/about/About";
import Login from "./routes/login/Login";
import SignUp from "./routes/signup/SignUp";
import Mentor from "./routes/dashboard/mentor/Mentor";
import Siswa from "./routes/dashboard/siswa/Siswa";
import NotFound from "./routes/NotFound/NotFound";
import Event from "./routes/event/Event";
import Roadmap from "./routes/roadmap/Roadmap";
import SuntingAkunMentor from "./routes/dashboard/mentor/SuntingAkunMentor";
import SuntingAkunSiswa from "./routes/dashboard/siswa/SuntingAkunSiswa";
import DetailMentor from "./routes/dashboard/siswa/DetailMentor";
import RoutesOutlet from "./routes/RoutesOutlet";
import Admin from "./routes/dashboard/admin/Admin";
import useLoginState from "./zustand/todoLogin";

export default function App() {
  const { loggedAs } = useLoginState();

  return (
    <Routes>
      <Route path="/" element={<RoutesOutlet />}>
        <Route index element={<Homepage />} />
        <Route path="tentang" element={<About />} />
        <Route path="masuk" element={<Login />} />
        <Route path="mendaftar" element={<SignUp />} />
        {loggedAs === "mentor" ? (
          <>
            <Route path="dashboard" element={<Mentor />} />
            <Route path="sunting-akun" element={<SuntingAkunMentor />} />
          </>
        ) : null}
        {loggedAs === "siswa" ? (
          <>
            <Route path="dashboard" element={<Siswa />} />
            <Route path="mentor/:nama" element={<DetailMentor />} />
            <Route path="sunting-akun" element={<SuntingAkunSiswa />} />
          </>
        ) : null}
        {loggedAs === "admin" ? (
          <Route path="dashboard" element={<Admin />} />
        ) : null}
        <Route path="acara" element={<Event />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
