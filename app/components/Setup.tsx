'use client'

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Setup = () => {
  const sectionRef = useRef(null);
  const rotaterRef = useRef(null);

  useLayoutEffect(() => {

    

    gsap.fromTo('.rotater',{
    rotation:0,
    },{
 rotation:-360,
      
      repeat:-1,
      duration:3,
      ease: "linear",
    })

    gsap.from(".setup", {
  y: 100,
  opacity: 0,
  scrollTrigger: {
    trigger: ".setup",
    start: "top 80%",
    end: "bottom 20%",
    scrub: true,
  }
})


    gsap.fromTo('.bar', { width: '0%'}, {
      width: '74%',
      delay:1 ,duration:2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: ".setup",
        start: "top 80%",
        end: "bottom 20%",
      }
    });

    gsap.fromTo('.bar2', { width: '0%'}, {
      width: '91%',
      delay:1,duration:2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: ".setup",
        start: "top 80%",
        end: "bottom 20%",
      }
    });

  }, []);

  return (
    <section
      ref={sectionRef}
      className="setup relative w-full min-h-full flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-16 md:py-24 bg-[#f5f5f5] overflow-hidden"
    >
      {/* Left text column */}
      <div className="flex flex-col items-start gap-6 max-w-lg">
        <h1 className="text-2xl md:text-4xl font-semibold">What to Expect!</h1>
        <p className="text-sm md:text-base text-[#555]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet quod, velit adipisci esse
          aliquam, iste qui ullam fugiat alias, harum sequi numquam ratione inventore illum autem
          voluptate minima iure? Minus! Sequi minima obcaecati eveniet similique? Aliquam quisquam
          dolor dolores in maiores eum optio totam officiis alias est. Quae voluptate odit hic,
          eligendi labore, molestias unde, accusamus necessitatibus illo et dolores?
        </p>
      </div>

      {/* Rotating image */}
      <div
        ref={rotaterRef}
        className="rotater w-40 h-40 md:w-60  md:h-60 absolute top-1/2 right-10 transform -translate-y-1/2"
      >
        <img src="/rotate.svg" alt="Rotate" className="w-full h-full object-contain" />
      </div>

      {/* Optional placeholder / extra content */}
      <div className="hidden md:flex flex-col gap-6 bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-xl z-[20]  max-w-md">
        {/* Example content */}
        <div className="flex items-center gap-4">
          <img src="/real.svg" alt="Icon" className="w-10 h-10" />
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">Verified Doctors</h2>
            <p className="text-sm text-gray-700">Compare fees & book appointments easily</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <img src="/undraw_agreement_ftet.svg" alt="Icon" className="w-10 h-10" />
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">Quick Booking</h2>
            <p className="text-sm text-gray-700">Book appointments in seconds</p>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          Access verified clinics and doctors easily with real-time availability and reviews.
        </p>

        {/* Rounded progress bars */}
        <div className="flex justify-between gap-4 mt-4">
          <div className=" w-1/2 bg-gray-300 rounded-full h-3 overflow-hidden">
            <div
              
              className="bar h-3 bg-[#1aa6a4] rounded-full w-0"
            ></div>
          </div>
          <div className="w-1/2 bg-gray-300 rounded-full h-3 overflow-hidden">
            <div
              
              className="bar2 h-3 bg-[#5e6e6d] rounded-full w-0"
            ></div>
          </div>
        </div>
        </div>
    </section>
  );
};

export default Setup;
