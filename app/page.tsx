import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Status from "./components/Status";
import Mobile from "./components/Mobile";
import Professional from "./components/Professional";
import Footer from "./components/Footer";
import Setup from "./components/Setup";
import ProfessionalV2 from "./components/ProfessionalV2";
import ToDo from "./components/ToDo";
import Specialists from "./components/Specialists";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
export default function Home() {
  return (
    <div className="flex flex-col h-full bg-[#eff0f1]">
    <div className="scroll-wrapper">
        <HeroSection />
        <div className="h-30"></div>
        <ToDo />
        <div className="h-30"></div>
        <Specialists/>
        <div className="h-30"></div>
        <Services/>
        <div className="h-30"></div>
        <Features />
        <div className="h-30"></div>
        <FAQ/>
         <div className="h-30"></div>
      </div>
     
      
    </div>
  );
}
