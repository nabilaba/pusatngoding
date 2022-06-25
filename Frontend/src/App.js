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
import InformasiAkunMentor from "./routes/dashboard/mentor/InformasiAkunMentor";
import EmailPasswordMentor from "./routes/dashboard/mentor/EmailPasswordMentor";
import InformasiAkunSiswa from "./routes/dashboard/siswa/InformasiAkunSiswa";
import EmailPasswordSiswa from "./routes/dashboard/siswa/EmailPasswordSiswa";
import Transaksi from "./routes/dashboard/siswa/Transaksi/Transaksi";
import DetailMentor from "./routes/dashboard/siswa/DetailMentor";
import RoutesOutlet from "./routes/RoutesOutlet";
import Admin from "./routes/dashboard/admin/Admin";
import useLoginState from "./zustand/todoLogin";
import SignUpMentor from "./routes/signup/SignUpMentor";
import { Outlet } from "react-router-dom";

export default function App() {
  const { loggedAs } = useLoginState();

  return (
    <Routes>
      <Route path="/" element={<RoutesOutlet />}>
        <Route index element={<Homepage />} />
        <Route path="tentang" element={<About />} />
        <Route path="masuk" element={<Login />} />
        <Route path="mendaftar" element={<SignUp />} />
        <Route path="mendaftar_mentor" element={<SignUpMentor />} />
        {loggedAs === "mentor" ? (
          <Route path="dashboard" element={<Outlet />}>
            <Route index element={<Mentor />} />
            <Route path="akun" element={<Outlet />}>
              <Route index element={<InformasiAkunMentor />} />
              <Route path="email-password" element={<EmailPasswordMentor />} />
            </Route>
          </Route>
        ) : null}
        {loggedAs === "siswa" ? (
          <Route path="dashboard" element={<Outlet />}>
            <Route index element={<Siswa />} />
            <Route path={"kursusId=:mentorId:kursusId"} element={<Outlet />}>
              <Route index element={<DetailMentor />} />
              <Route path=":transaksiId" element={<Transaksi />} />
            </Route>
            <Route path="akun" element={<Outlet />}>
              <Route index element={<InformasiAkunSiswa />} />
              <Route path="email-password" element={<EmailPasswordSiswa />} />
            </Route>
          </Route>
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
