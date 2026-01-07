'use client'
import {ShieldCheck,ClipboardClock,Star,Dot} from 'lucide-react'
import { motion } from 'framer-motion'

const Features = () => {

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

    const itemVariants={
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

    const cards=[
        {id:1,title:'Verified Professionals',describe:'All doctors on DoctorLib are fully verified and approved, ensuring accurate information and quality care.',icon:<ShieldCheck size={35} color='#e9f3ff'/>},
        {id:2,title:'Simple Online Appointment',describe:'Book appointments in seconds with our intuitive scheduling system — no calls, no waiting.',icon:<ClipboardClock size={35} color='#e9f3ff'/>},
        {id:3,title:'Trusted Patient Reviews',describe:'Read real reviews from patients and make informed decisions before booking.',icon:<Star size={35} color='#e9f3ff'/>},
    ]

    return ( 
       <section className="flex flex-col items-center justify-center  py-16 px-4 md:px-8 ">
        <span className="rounded-full p-2 flex items-center gap-4 bg-[#0169e8] ">
        <Dot color="#e9f3ff" />
        <p className="text-md text-[#e9f3ff] font-normal"> Reasons to Choose Us</p>
        <Dot color="#e9f3ff" />
      </span>
         <motion.section 
            className=" grid grid-cols-1 md:grid-cols-3
    gap-8
    w-full mx-auto
    mt-8
    px-4 items-center justify-center justify-items-center"
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{once:true,amount:0.2}}
        >
        {cards.map((items)=>(
           <motion.div
  key={items.id}
  variants={itemVariants}
  whileHover={{ y: -6 }}
  className="
    group
    flex flex-col items-center text-center
    px-6 py-8
    max-w-sm
    h-[250px]
    rounded-2xl
    border border-[#e6eeee]
    bg-[#fbfbfb]/80 backdrop-blur
    shadow-sm
    transition-all duration-300
    hover:shadow-lg hover:border-[#c9f6f6]
  "
>
  {/* Icon */}
  <div className="
    mb-4
    flex items-center justify-center
    w-14 h-14
    rounded-full
    bg-gradient-to-r from-[#0169e8] to-[#00a8e8]
    shadow-md
    group-hover:scale-105
    transition-transform
  ">
    {items.icon}
  </div>

  {/* Title */}
  <h2 className="text-[#232929] font-semibold text-lg mb-2">
    {items.title}
  </h2>

  {/* Description */}
  <p className="text-[#5e6e6d] text-sm leading-relaxed">
    {items.describe}
  </p>
</motion.div>
        ))}
        </motion.section>
       </section>
     );
}
 
export default Features;