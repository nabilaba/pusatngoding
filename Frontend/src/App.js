import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from "./routes/homepage/Homepage";
import About from "./routes/about/About";
import Login from "./routes/login/Login";
import SignUp from "./routes/signup/SignUp";
import Mentor from "./routes/dashboard/mentor/Mentor";
import Siswa from "./routes/dashboard/siswa/Siswa";
import NotFound from "./routes/NotFound/NotFound";

export default function App() {
  const [isMentor, setIsMentor] = useState(true);

  return (
    <div>
      <Navbar />
      <Link to="/"> Pusat Ngoding </Link>
      <Link to="/tentang"> Tentang </Link>
      <Link to="/masuk"> Masuk </Link>
      <Link to="/mendaftar"> Daftar Sekarang </Link>
      <Link to="/acara"> Acara </Link>
      <br />
      <br />

      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/tentang" element={<About />} />
        <Route path="/masuk" element={<Login />} />
        <Route path="/mendaftar" element={<SignUp />} />
        {isMentor ? (
          <Route path="/dashboard" element={<Mentor />} />
        ) : (
          <Route path="/dashboard" element={<Siswa />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}