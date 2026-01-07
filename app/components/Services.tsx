'use client'

import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";

const Services = () => {
  const [width, setWidth] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const powered = [
    { id: 1, name: 'Hospital Management' },
    { id: 2, name: 'Health Care Services' },
    { id: 3, name: 'Talk to Doctors' },
    { id: 4, name: 'Lab Testing Services' },
    { id: 5, name: 'Home Care Services' },
    { id: 6, name: 'Medicines & Supplies' },
    { id: 7, name: 'Multi Specialty Clinics' },
  ];

  // Get the full scrollWidth for animation
  useEffect(() => {
    if (marqueeRef.current) {
      setWidth(marqueeRef.current.scrollWidth / 2); // divide by 2 because we duplicated
    }
  }, []);

  return (
    <section className="w-full bg-[#07a6db] overflow-hidden">
      <motion.div
        ref={marqueeRef}
        className="flex gap-10 group whitespace-nowrap group-hover:text-[#e9f3ff]/60 items-center text-xl text-[#e9f3ff] p-2"
        initial={{ x: 0 }}
        animate={{ x: [-width, 0] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      >
        {/* duplicate array to make seamless looping */}
        {[...powered, ...powered].map((txt, index) => (
          <div key={index} className="flex flex-row-reverse items-center justify-between gap-2 text-lg font-medium">
            <p className="ml-8 font-medium">{txt.name}</p>
            <div className="w-6 h-[2px] bg-[#e9f3ff]" />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
