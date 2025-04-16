import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import About from "../components/About";
export default function HomePage(){
  return (
    <div>
        <Navbar />
        <HeroSection />
        <About />
    </div>
    )
}