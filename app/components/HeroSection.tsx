'use client'

import Navbar from "./Navbar";
import { Search,MapPin,OctagonAlert,Hospital,Stethoscope,IdCard,X } from "lucide-react";
import { motion,AnimatePresence } from "motion/react"
import { useState,useMemo,Activity,useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {ScrollSmoother} from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from '@/db.json'

const HeroSection = () => {


  const [searchTerm, setSearchTerm] = useState<string>("");//// for cities
  
  const [forName,setForName]=useState<string>('')///for specialty ...

  const router=useRouter();
 const [isPending,startTransition]=useTransition();  

   const allCities = useMemo(() => {
    const setOfCities = new Set(
      data.doctors.map((doctor) => doctor.clinic.city)
    );
    return Array.from(setOfCities);
  }, []);

  // Filtered city list
  const filteredCities = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return allCities.filter((city) =>
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allCities]);


  const [showAlert, setShowAlert] = useState<boolean>(false);

const params = new URLSearchParams();

if (forName) params.set("name", forName);
if (searchTerm) params.set("city", searchTerm);

  const handleSearch = () => {
    if (!forName && !searchTerm) {
      setShowAlert(true);
       setTimeout(() => setShowAlert(false), 3000);
       return;
    }
   
     startTransition(()=>{
      router.push(`/search?${params.toString()}`);
    })
  };


  const containerVariants={
    initial:{
        opacity:0,y:-15
    },
    animate:{
        opacity:1,y:0,
        transition:{
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
}

const childrenVariants={
    initial:{
        opacity:0,y:-15
    },
    animate:{
        opacity:1,y:0,
        transition:{
            duration: 0.5
        }
    }
}

 const sectionRef = useRef(null);
  const blobRef = useRef(null);

  useLayoutEffect(() => {
  let ctx: gsap.Context | undefined;

  // wait for layout + framer-motion
  requestAnimationFrame(() => {
    setTimeout(() => {
      const smoother = ScrollSmoother.get();
      if (!smoother || !sectionRef.current || !blobRef.current) return;

      ctx = gsap.context(() => {
        gsap.from(blobRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom 5%",
            scrub: 0.8,
            pin: blobRef.current,
          },
        }).to(blobRef.current, {
          x: 120,
          y: 40,
          opacity: 0,
          scale: 0.8,
          ease: "power2.out",
        });

        ScrollTrigger.refresh();
      }, sectionRef);
    }, 100); // 👈 important delay
  });

  return () => ctx?.revert();
}, []);


console.log('show',blobRef)



const [searchDoc,setSearchDoc]=useState(false)

useEffect(() => {
  document.body.style.overflow = searchDoc ? "hidden" : "auto";
}, [searchDoc]);

  if (isPending) {
    return <>
    <div className="h-screen">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fbfbfb]/70">
        <div className="rounded-full w-12 h-12 border-4 border-[#137a78] border-t-transparent animate-spin" />
      </div>
    </div>
    </>
  }

  


    return ( 
        <section ref={sectionRef} className="section1 bg-[#eff1f1] min-h-[600px] md:h-[600px] w-full overflow-hidden sm:relative flex items-center">
        <div className="h-20"></div>
<div className="  max-w-9xl mx-auto flex flex-col-revers emd:flex-row items-center justify-between px-4 gap-12 ">
        <div className="flex flex-col items-center md:items-start gap-4 pl-0">
         <motion.h1 
         initial={{opacity:0,y:-15}}
         animate={{opacity:1,y:0,transition:{duration:0.3,delay:0}}}
         className="text-3xl
  sm:text-4xl
  lg:text-5xl
  font-semibold
  text-[#232929]">Live a <b className="font-semibold text-[#5e6e6d]">healthier life</b></motion.h1>
          <motion.p
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.15 }}
  className=" text-sm
  sm:text-base
  text-[#849595]/80
  max-w-sm text-center sm:max-w-lg"
>
  Find verified doctors, compare fees, and book appointments in seconds.
</motion.p>

      <motion.div
       initial={{opacity:0,y:-15}}
         animate={{opacity:1,y:0,transition:{duration:0.3,delay:0.2}}}
      className="flex items-center justify-center w-full">
              <button className="p-2 rounded-lg bg-[#fbfbfb] text-[#1aa6a4] border border-[#1aa6a4] flex md:hidden items-center justify-center gap-4 w-full cursor-pointer" onClick={()=>setSearchDoc(true)}><Search size={20}/> Search Doctors</button>
      </motion.div>
         <motion.form
         initial={{opacity:0,y:-15}}
         animate={{opacity:1,y:0,transition:{duration:0.3,delay:0.3}}}
         onSubmit={handleSearch}
         className="hidden md:flex flex-col
    sm:flex-row
    items-stretch
    sm:items-center
    gap-2
    border border-[#1aa6a4]
    bg-white
    rounded-2xl
    p-2
    shadow-xl"
>
            <div className="flex items-center gap-2.5">
            
             <Search  size={18} color="#5e6e6d"/>
             <input value={forName} onChange={(e)=>setForName(e.target.value)} type="text"  className="focus:outline-0 w-full sm:w-auto flex-1" placeholder="Name,specialty,practice"/>
           </div>            <span className="h-8 w-px bg-[#849595]"></span>
           <div className="flex relative items-center gap-2.5">
            <MapPin  size={18} color="#5e6e6d"/>
             <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="focus:outline-0 w-full sm:w-auto flex-1"
                  placeholder="Where"
                />
           </div>
           <AnimatePresence>
                <Activity mode={filteredCities.length > 0 ? "visible" : "hidden"}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.25, ease: "easeOut" },
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      transition: { duration: 0.35 },
                    }}
                    className=" absolute
  top-full
  left-0
  w-full
  sm:w-[240px] bg-white rounded-lg shadow-lg border border-gray-200 z-20"
                  >
                    {filteredCities.map((city) => (
                      <div
                        key={city}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setSearchTerm(city)}
                      >
                        {city}
                      </div>
                    ))}
                  </motion.div>
                </Activity>
              </AnimatePresence>
<button
  type="submit"
  className="bg-[#1aa6a4] hover:bg-[#168c8a] transition-all
  text-white rounded-xl px-6 py-3 font-medium shadow-md"
>
  Search doctors
</button>
         </motion.form>
         <motion.div 
         variants={containerVariants}
         initial="initial"
         animate="animate"
         className=" flex items-center gap-6 mt-6">
  <motion.div
  variants={childrenVariants}
  className="flex items-center gap-2">
    <span className="rounded-full p-2.5 bg-[#1aa6a4]"><Hospital size={20} color="#eff1f1"/></span>
    <div className="flex flex-col items-start">
      <p className="text-lg sm:text-2xl font-semibold text-[#232929]">50+</p>
    <p className="text-xs sm:text-sm text-[#849595]">Clinics</p>
    </div>
  </motion.div>
  <motion.div
  variants={childrenVariants}
  className="flex items-center gap-2">
    <span className="rounded-full p-2.5 bg-[#1aa6a4]"><Stethoscope size={20} color="#eff1f1"/></span>
    <div className="flex flex-col items-start">
      <p className="text-lg sm:text-2xl font-semibold text-[#232929]">2k</p>
    <p className="text-xs sm:text-sm text-[#849595]">Doctors</p>
    </div>
  </motion.div>
  <motion.div
  variants={childrenVariants}
  className="flex items-center gap-2">
    <span className="rounded-full p-2.5 bg-[#1aa6a4]"><IdCard size={20} color="#eff1f1"/></span>
    <div className="flex flex-col items-start">
      <p className="text-lg sm:text-2xl font-semibold text-[#232929]">50k</p>
    <p className="text-xs sm:text-sm text-[#849595]">Patients</p>
    </div>
  </motion.div>
</motion.div>

       </div>
       
        <div className=" hidden md:block relative  w-[750px] h-[650px]">

  {/* Background decorative circles */}
  <div className="absolute inset-0 rounded-full bg-[#1aa6a4]/20 blur-3xl" />
  <div ref={blobRef} className="blobs absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#1aa6a4]/30 z-[1000]" />

  {/* Rotated image container */}
  <motion.div
    initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
    animate={{ opacity: 1, scale: 1, rotate: -10 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="
    
      absolute bottom-[20%] left-[20%] w-full h-full
      bg-[#1aa6a4]
      rounded-[48px]
      overflow-hidden
      z-[1000]
      shadow-2xl
    "
  >
    {/* Image */}
    <motion.img
      src="/doctor.png" // replace with real doctors image later
      alt="Medical team"
      initial={{ scale: 1.05, rotate: 6 }}
      animate={{ scale: 1, rotate: 6 }}
      transition={{ duration: 0.8 }}
      className="
        absolute -bottom-16 right-0
        w-[110%] h-auto rotate-6
        object-cover
      "
    />
  </motion.div>
</div>


      </div>
      <Activity mode={showAlert ? "visible" : "hidden"}>
        <Alert />
      </Activity>
      <AnimatePresence>
  {searchDoc && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-[#fbfbfb] flex flex-col p-4"
    >
      <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium text-[#1aa6a4]">
            Doctorlib
          </h1>
          <button onClick={() => setSearchDoc(false)}>
            <X />
          </button>
        </div>

      <div className=" mt-8 flex flex-col gap-4 justify-between h-full">
        
        {/* Search city */}
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
          <label className="text-sm">Search Doctor</label>
          <div className="flex gap-2 border border-[#1aa6a4] p-1 rounded-sm">
            <MapPin size={18} color="#5e6e6d" />
            <input
              value={forName} onChange={(e)=>setForName(e.target.value)}
              className="w-full focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Search City</label>
          <div className="flex gap-2 border border-[#1aa6a4] p-1 rounded-sm">
            <MapPin size={18} color="#5e6e6d" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full focus:outline-none"
            />
          </div>
        </div>
        </div>

        <AnimatePresence>
          {filteredCities.length > 0 && (
            <motion.div
            initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, }}
              exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-start gap-4 mt-4 h-full">
              <h1 className="text-xl font-medium text-[#1aa6a4]">Results</h1>
            <div className=" w-full"
            >
              {filteredCities.map(city => (
                <div
                  key={city}
                  onClick={() => setSearchTerm(city)}
                  className="px-3 py-4  border-b border-[#343434]/40 cursor-pointer"
                >
                  {city}
                </div>
              ))}
            </div>
            </motion.div>
          )}
        </AnimatePresence>
          <button onClick={handleSearch} className="w-[100%] cursor-pointer  p-1 rounded-lg text-center btn-primary transition-all duration-300">
        Search
      </button>
      </div>
    
    </motion.div>
  )}
</AnimatePresence>

        </section>
     );
}
 
const Alert = () => {
    return ( 
        <AnimatePresence>
        <motion.div
        initial={{opacity:0,y:-20}}
        animate={{opacity:1,y:0,transition:{duration:0.3}}}
        exit={{opacity:0,y:-20,transition:{duration:0.3}}}
        className="fixed flex items-center gap-2 bg-[#137a78] p-1.5 rounded-xl  border border-[#c9f6f6] text-[#c9f6f6] bottom-2 bg right-2 z-[1000] pointer-events-none w-72">
        <OctagonAlert size={20}/> Please fill up the form
        </motion.div>
        </AnimatePresence>
     );
}
 
export default HeroSection;