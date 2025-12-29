'use client';

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Professional = () => {

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".professional-section",
          start: "top 75%",
          end: "bottom 30%",
          scrub: 0.8,
        }
      });

      // section fade
      tl.from(".professional-card", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
      });

      // blob motion
      tl.from(".blob", {
        scale: 0.7,
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      }, 0);

      // image
      tl.from(".professional-image", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      }, 0.1);

      // text stagger
      tl.from(".professional-text > *", {
        y: 20,
        opacity: 0,
        stagger: 0.7,
        duration: 0.6,
        ease: "power2.out",
      }, 0.2);

     
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="professional-section px-8 sm:px-16 py-16">
      <div className="professional-card bg-[#1aa6a4] w-full px-10 flex flex-col md:flex-row items-center justify-between rounded-xl">

        {/* LEFT */}
        <div className="relative w-[330px] h-[330px] sm:w-[380px] sm:h-[380px]">
          <div className="blob absolute inset-14 md:inset-0 rounded-full bg-[#ffffff1a]" />

          <img
            src="/undrawmedicine.svg"
            alt="People talking"
            className="professional-image absolute inset-0 m-auto w-[70%] h-auto object-contain"
          />
        </div>

        {/* RIGHT */}
        <div className="professional-text flex flex-col mt-2 items-start gap-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#fbfbfb]">
            Are you a health professional?
          </h2>

          <ul className="text-[#c9f6f6] text-[15px] sm:text-lg list-disc list-inside flex flex-col gap-2">
            <li>Provide the best care possible</li>
            <li>Have a better working life</li>
            <li>Grow your revenue</li>
            <li>Used by 420,000+ professionals</li>
          </ul>

          <p className="text-base invert sm:text-md font-light text-[#fbfbfb]/80 w-full md:w-2/4">
            Join the professionals using Doctolib to manage appointments and improve patient care.
          </p>

          <button className="button bg-[#fbfbfb] text-[#232929] mb-4 hover:text-[#5e6e6d] text-[14px] opacity-100 w-full md:w-2/4 font-medium p-3 transition-all duration-300 rounded-xl">
            Join Doctolib
          </button>
        </div>
      </div>
    </section>
  );
};

export default Professional;
