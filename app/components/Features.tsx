'use client'
import {ShieldCheck,ClipboardClock,Star} from 'lucide-react'
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
        {id:1,title:'Verified Professionals',describe:'All doctors on DoctorLib are fully verified and approved, ensuring accurate information and quality care.',icon:<ShieldCheck size={35} color='#c9f6f6'/>},
        {id:2,title:'Simple Online Appointment',describe:'Book appointments in seconds with our intuitive scheduling system — no calls, no waiting.',icon:<ClipboardClock size={35} color='#c9f6f6'/>},
        {id:3,title:'Trusted Patient Reviews',describe:'Read real reviews from patients and make informed decisions before booking.',icon:<Star size={35} color='#c9f6f6'/>},
    ]

    return ( 
        <motion.section 
            className="flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-center w-full"
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{once:true,amount:0.2}}
        >
        {cards.map((items)=>(
            <motion.div 
                className='flex flex-col items-center gap-4' 
                key={items.id}
                variants={itemVariants}
            >
                <div className="relative z-[100] mb-2 mt-1">
                    {items.icon}
                </div>
                <span className='absolute -mt-5 z-10'>
                    <img src="/blob2.svg" className='w-32 rotate-90' alt="" />
                </span>
                <h2 className='text-[#232929] font-medium text-lg'>{items.title}</h2>
                <p className='text-[#5e6e6d] text-medium font-normal text-center w-3/4'>{items.describe}</p>
            </motion.div>
        ))}
        </motion.section>
     );
}
 
export default Features;