import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import SignUpMentor from "./components/SignUpMentor";
import FAQ from "./components/FAQ";

export default function Homepage() {
  return (
    <div>
      <Hero />
      <Features />
      <SignUpMentor />
      <Testimonials />
      <FAQ />
    </div>
  );
}
