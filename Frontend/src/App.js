import { Routes, Route } from "react-router-dom";
import Homepage from "./routes/homepage/Homepage";
import About from "./routes/about/About";
import Login from "./routes/login/Login";
import SignUp from "./routes/signup/SignUp";
import Mentor from "./routes/dashboard/mentor/Mentor";
import Siswa from "./routes/dashboard/siswa/Siswa";
import NotFound from "./routes/NotFound/NotFound";
import Roadmap from "./routes/roadmap/Roadmap";
import AkunMentor from "./routes/dashboard/mentor/AkunMentor";
import EmailPasswordMentor from "./routes/dashboard/mentor/EmailPasswordMentor";
import AkunSiswa from "./routes/dashboard/siswa/AkunSiswa";
import EmailPasswordSiswa from "./routes/dashboard/siswa/EmailPasswordSiswa";
import DetailMentor from "./routes/dashboard/siswa/DetailMentor";
import RoutesOutlet from "./routes/RoutesOutlet";
import Admin from "./routes/dashboard/admin/Admin";
import useLoginState from "./zustand/todoLogin";
import CaraMendaftarMentor from "./routes/caramendaftarmentor/CaraMendaftarMentor";
import { Outlet } from "react-router-dom";
import TambahMentor from "./routes/dashboard/admin/mentor/TambahMentor";
import TambahAdmin from "./routes/dashboard/admin/TambahAdmin";
import TambahKursus from "./routes/dashboard/admin/kursus/TambahKursus";
import InformasiAkunSiswa from "./routes/dashboard/admin/siswa/InformasiAkunSiswa";
import InformasiAkunMentor from "./routes/dashboard/admin/mentor/InformasiAkunMentor";
import InformasiKursus from "./routes/dashboard/admin/kursus/InformasiKursus";
import TransaksiSiswa from "./routes/dashboard/siswa/Transaksi";
import SiswaListTransaksi from "./routes/dashboard/siswa/ListTransaksi";
import AdminListTransaksi from "./routes/dashboard/admin/transaksi/ListTransaksi";
import MentorListTransaksi from "./routes/dashboard/mentor/ListTransaksi";
import TransaksiMentor from "./routes/dashboard/mentor/Transaksi";
import TransaksiAdmin from "./routes/dashboard/admin/transaksi/Transaksi";
import GantiFotoProfil from "./routes/dashboard/GantiFotoProfil";
import HubungiKami from "./routes/hubungi/HubungiKami";
import Informasi from "./routes/informasi/Informasi";

export default function App() {
  const { loggedAs } = useLoginState();
  return (
    <Routes>
      <Route path="/" element={<RoutesOutlet />}>
        <Route index element={<Homepage />} />
        <Route path="tentang" element={<About />} />
        <Route path="masuk" element={<Login />} />
        <Route path="mendaftar" element={<SignUp />} />
        <Route path="cara_mendaftar_mentor" element={<CaraMendaftarMentor />} />
        {loggedAs === "mentor" ? (
          <Route path="dashboard" element={<Outlet />}>
            <Route index element={<Mentor />} />
            <Route path="transaksi" element={<Outlet />} >
              <Route index element={<MentorListTransaksi />} />
              <Route path=":transaksiId" element={<TransaksiMentor />} />
            </Route>
            <Route path="akun" element={<Outlet />}>
              <Route index element={<AkunMentor />} />
              <Route path="email-password" element={<EmailPasswordMentor />} />
              <Route path="foto-profil" element={<GantiFotoProfil />} />
            </Route>
          </Route>
        ) : null}
        {loggedAs === "siswa" ? (
          <Route path="dashboard" element={<Outlet />}>
            <Route index element={<Siswa />} />
            <Route path={":mentorId-:kursusId"} element={<DetailMentor />} />
            <Route path="transaksi" element={<Outlet />} >
              <Route index element={<SiswaListTransaksi />} />
              <Route path=":transaksiId" element={<TransaksiSiswa />} />
            </Route>
            <Route path="akun" element={<Outlet />}>
              <Route index element={<AkunSiswa />} />
              <Route path="email-password" element={<EmailPasswordSiswa />} />
              <Route path="foto-profil" element={<GantiFotoProfil />} />
            </Route>
          </Route>
        ) : null}
        {loggedAs === "admin" ? (
          <Route path="dashboard" element={<Outlet />}>
            <Route index element={<Admin />} />
            <Route path="tambah-mentor" element={<TambahMentor />} />
            <Route path="tambah-kursus" element={<TambahKursus />} />
            <Route path="tambah-admin" element={<TambahAdmin />} />
            <Route path="siswa/:id" element={<InformasiAkunSiswa />} />
            <Route path="mentor/:id" element={<InformasiAkunMentor />} />
            <Route path="kursus/:id" element={<InformasiKursus />} />
            <Route path="transaksi" element={<Outlet />} >
              <Route index element={<AdminListTransaksi />} />
              <Route path=":transaksiId" element={<TransaksiAdmin />} />
            </Route>
          </Route>
        ) : null}
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="hubungi" element={<HubungiKami />} />
        <Route path="informasi" element={<Informasi />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
