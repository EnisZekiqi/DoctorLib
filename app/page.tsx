import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Status from "./components/Status";
import Mobile from "./components/Mobile";
import Professional from "./components/Professional";
import Footer from "./components/Footer";
import Setup from "./components/Setup";
export default function Home() {
  return (
    <div className="flex flex-col h-full bg-[#eff1f1]">
    <div className="scroll-wrapper">
        <HeroSection />
        <div className="h-20"></div>
        <Features />
      </div>
     <div className="h-20"></div>
     <Status/>
     <div className="h-20"></div>
     <Setup/>
     <div className="h-20"></div>
     <Professional/>
      <div className="h-40"></div>
      
    </div>
  );
}
