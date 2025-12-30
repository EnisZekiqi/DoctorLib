"use client";


import { useRef, useEffect, useState } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";


const Status = () => {
  return (
    <section className="w-full py-10 ">
      <div className="max-w-5xl mx-auto text-center">
        
        <h2 className="text-2xl font-semibold text-[#232929] mb-12">
          Doctolib by the numbers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3  gap-10">

          {/* Stat 1 */}
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold text-[#1aa6a4]">
              <CountUp from={0} to={90000000} duration={2} />+
            </p>
            <p className="text-gray-600 mt-2">people getting better care</p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold text-[#1aa6a4]">
              <CountUp from={0} to={420000} duration={2} />+
            </p>
            <p className="text-gray-600 mt-2">health professionals</p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold text-[#1aa6a4]">
              <CountUp  from={0} to={10000000} duration={2} />+
            </p>
            <p className="text-gray-600 mt-2">documents shared every month</p>
          </div>

        </div>
      </div>
    </section>
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
