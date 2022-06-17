import { useState } from "react";
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

export default function App() {
  const [isMentor, setIsMentor] = useState(false);
  const [isSiswa, setIsSiswa] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RoutesOutlet isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} isMentor={isMentor} isSiswa={isSiswa} />
        }
      >
        <Route index element={<Homepage />} />
        <Route path="tentang" element={<About />} />
        <Route
          path="masuk"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setIsMentor={setIsMentor}
              setIsSiswa={setIsSiswa}
              setIsAdmin={setIsAdmin}
            />
          }
        />
        <Route path="mendaftar" element={<SignUp />} />
        {isMentor ? (
          <>
            <Route path="dashboard" element={<Mentor />} />
            <Route path="sunting-akun" element={<SuntingAkunMentor />} />
          </>
        ) : null}
        {isSiswa ? (
          <>
            <Route path="dashboard" element={<Siswa />} />
            <Route path="mentor/:name" element={<DetailMentor />} />
            <Route path="sunting-akun" element={<SuntingAkunSiswa />} />
          </>
        ) : null}
        {isAdmin ? <Route path="dashboard" element={<Admin />} /> : null}
        <Route path="acara" element={<Event />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
