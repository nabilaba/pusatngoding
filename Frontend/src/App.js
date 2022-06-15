import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./routes/homepage/Homepage";
import About from "./routes/about/About";
import Login from "./routes/login/Login";
import SignUp from "./routes/signup/SignUp";
import Mentor from "./routes/dashboard/mentor/Mentor";
import Siswa from "./routes/dashboard/siswa/Siswa";
import NotFound from "./routes/NotFound/NotFound";
import { Flex, Box } from "@chakra-ui/react";
import Event from "./routes/event/Event";
import Roadmap from "./routes/roadmap/Roadmap";
import SuntingAkunMentor from "./routes/dashboard/mentor/SuntingAkunMentor";
import SuntingAkunSiswa from "./routes/dashboard/siswa/SuntingAkunSiswa";
import DetailMentor from "./routes/dashboard/siswa/DetailMentor";

export default function App() {
  const [isMentor, setIsMentor] = useState(false);
  const [isSiswa, setIsSiswa] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Flex minH={"100vh"} justifyContent={"space-between"} direction={"column"}>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Box my={"auto"}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="tentang" element={<About />} />
          <Route
            path="masuk"
            element={
              <Login
                setIsLoggedIn={setIsLoggedIn}
                setIsMentor={setIsMentor}
                setIsSiswa={setIsSiswa}
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
          <Route path="acara" element={<Event />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    </Flex>
  );
}
