'use client'
import { useState } from "react";
import { motion,AnimatePresence } from "motion/react";
import { Plus,Dot } from "lucide-react";
const FAQ = () => {


    const [showFAQ, setShowFAQ] = useState<number | string>("");

const faq =[
    {id:1,title:'How do I book an appointment?',response:'You can book an appointment in just a few simple steps. Simply navigate to the doctor’s profile, select your preferred date and time, and confirm your booking.'},
    {id:2,title:'How do I find a doctor?',response:'Browse our directory of verified doctors by specialty, location, or reviews to find the right healthcare provider for you.'},
    {id:3,title:'What if I need to cancel my appointment?',response:'You can cancel your appointment up to 24 hours before the scheduled time without any fees.'},
    {id:4,title:'Can I get a prescription refill?',response:'Yes, you can request a prescription refill through our secure online portal or by contacting your doctor directly.'},
    {id:5,title:'How do I access my medical records?',response:'You can view and download your medical records through your patient portal or by requesting them from your healthcare provider.'}
]

    return ( 
        <>
        <section className="flex flex-col items-center w-full gap-2">
              <span className="rounded-full p-2 flex items-center gap-4 bg-[#0169e8] ">
        <Dot color="#e9f3ff" />
        <p className="text-md text-[#e9f3ff] font-normal">Get your Answer</p>
        <Dot color="#e9f3ff" />
      </span>
      <h1 className="font-semibold text-4xl mb-8 mt-8 text-center">Frequently Asked Questions</h1>
      {faq.map((faq, index) => (
        <motion.div
          layout
          onClick={() =>
            setShowFAQ(showFAQ === faq.id ? "" : faq.id)
          }
          key={index}
          className="p-3  rounded-2xl w-[320px] sm:w-[400px] md:w-[600px]  text-black cursor-pointer "
         
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-md sm:text-lg font-medium">
              
              {faq.title}
            </div>
            <motion.div
              animate={{ rotate: showFAQ === faq.id ? 140 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Plus size={20} color={showFAQ === faq.id ? "#0169e8" : "#000000"}/>
            </motion.div>
          </div>

          <AnimatePresence initial={false}>
            {showFAQ === faq.id && (
              <motion.div
                key="content"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 50, y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden text-sm text-gray-600 mt-2"
              >
                {faq.response}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </section>
        </>
     );
}
 
export default FAQ;