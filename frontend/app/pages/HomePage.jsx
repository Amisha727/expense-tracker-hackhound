import About from '../_components/About';
import HeroSection from "../_components/HeroSection";
import Navbar from "../_components/Navbar";
export default function HomePage(){
  return (
    <div>
        <Navbar />
        <HeroSection />
        <About />
    </div>
    )
}