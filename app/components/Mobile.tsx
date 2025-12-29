'use client'
import { motion } from "motion/react";
import { Star } from "lucide-react";
const Mobile = () => {



    return ( 
        <section className="flex flex-col-reverse md:flex-row items-center justify-between w-full px-8 sm:px-16">
        <motion.div
        initial={{opacity:0,y:0}}
        whileInView={{opacity:1,y:0,transition:{duration:0.3,delay:0}}}
        viewport={{once:true,amount:0.3}}
        className="flex flex-col items-start gap-6">
            <motion.h2 
            initial={{opacity:0,y:0}}
            whileInView={{opacity:1,y:0,transition:{duration:0.3,delay:0.1}}}
            viewport={{once:true,amount:0.3}}
            className="text-2xl font-semibold text-[#232929]">Millions of people use the Doctolib app</motion.h2>
            <motion.p 
            initial={{opacity:0,y:0}}
            whileInView={{opacity:1,y:0,transition:{duration:0.3,delay:0.2}}}
            viewport={{once:true,amount:0.3}}
            className="text-md font-light text-[#5e6e6d] w-full md:w-2/4">Doctolib makes accessing healthcare fast and easy. That's why 26 million people worldwide are using it each month to get healthier (data collected in May 2025).</motion.p>
           <motion.div 
           initial={{opacity:0,y:0}}
           whileInView={{opacity:1,y:0,transition:{duration:0.3,delay:0.3}}}
           viewport={{once:true,amount:0.3}}
           className="flex items-center gap-1 text-yellow-300">
             ⭐⭐⭐⭐⭐⭐
             <span className="text-xs sm:text-sm font-medium text-[#232929]">4.8 rating on the App Store</span>
           </motion.div>
           <motion.div 
           initial={{opacity:0,y:0}}
           whileInView={{opacity:1,y:0,transition:{duration:0.3,delay:0.4}}}
           viewport={{once:true,amount:0.3}}
           className="flex items-center gap-1 h-fit">
            <img src="https://www.doctolib.fr/webpack/fb1a5edb01a13f9cd007.png" className="w-28 h-fit object-contain" alt="" />
            <img src="https://www.doctolib.fr/webpack/6a80b8c10b3bad0a3a16.png" className="w-28 h-fit object-contain" alt="" />
           </motion.div>
        </motion.div>
         <motion.div
         initial={{opacity:0,y:-15}}
         whileInView={{opacity:1,y:0,transition:{duration:0.3,delay:0.3}}}
        viewport={{once:true,amount:0.3}}
         className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px]">
          <div className="blob2 absolute inset-4 sm:inset-0 rounded-full"></div>

          {/* the two-people image */}
          <img 
            src="/undrawmobile.svg" 
            alt="People talking" 
            className="absolute inset-0 rotate-[15deg] m-auto w-[60%] sm:w-[70%] h-auto object-contain" 
          />
        </motion.div>
        </section>
     );
}
 
export default Mobile;