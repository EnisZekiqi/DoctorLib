"use client";

import { useRef, useEffect, useState } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
const Status = () => {
  return (
    <section className="w-full py-16 bg-[#eff1f1] px-6 md:px-16">
      <div className="w-full mx-auto px-4">
        
        {/* Section title */}
        

        {/* Main layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          
          {/* LEFT — Context */}
          <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-4xl font-semibold text-[#232929] mb-4">
              Trusted healthcare, at scale
            </h3>

            <p className="text-[#5e6e6d] max-w-md leading-relaxed">
              MyDoc connects patients and healthcare professionals through a
              secure platform built for everyday medical needs — from discovery
              to appointment management.
            </p>
          </motion.div>

          {/* RIGHT — Stats */}
          <div className="grid grid-cols-2 gap-10">
            
            <StatItem
              value={900000}
              label="people getting better care"
            />

            <StatItem
              value={42000}
              label="health professionals"
            />

            <StatItem
              value={100000}
              label="documents shared monthly"
            />

            {/* Softer supporting stat */}
             <StatItem
              value={6500}
              label="Appointment success rate"
            />

          </div>
        </div>
      </div>
    </section>
  );
};


type StatItemProps = {
  value: number;
  label: string;
};

const StatItem = ({ value, label }: StatItemProps) => {
  return (
    <div className="flex flex-col gap-1">
      <ArrowDownRight className="w-5 h-5 text-[#849595]" />
      <p className="text-2xl sm:text-3xl font-bold text-[#232929]">
        <CountUp from={0} to={value} duration={2} />+
      </p>
      <p className="text-xs text-[#849595]">
        {label}
      </p>
    </div>
  );
};

type CountProps ={
    from:number,
    to:number,
    duration:number
}

const CountUp = ({ from, to, duration = 2 }: CountProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const count = useMotionValue(from);
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    if (isInView) {
      animate(count, to, {
        duration,
        ease: "easeOut",
      });
    }
  }, [isInView]);

  useEffect(() => {
    const unsubscribe = count.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return () => unsubscribe();
  }, []);

  return <span className="text-[30px] sm:text-[34px]" ref={ref}>{displayValue.toLocaleString()}</span>;
};


export default Status;
