'use client'
import { CircleQuestionMark,ChevronDown,Facebook,Twitter,MessageCircleMore ,Headset } from "lucide-react";
import { Dispatch, SetStateAction, useState,useContext } from "react";
import { motion,AnimatePresence } from "motion/react";
import { LanguageContext } from "../context/LanguageContext"; 
import { usePathname } from "next/navigation";
const Footer = () => {



 const userContext = useContext(LanguageContext);

  if (!userContext) throw new Error("useContext must be used within a UserProvider");

  const { user, setUser } = userContext;

  const {clicked}=userContext

  const path = usePathname()

  const remove = path

  console.log("footer user:",user);

  console.log('clikced footer',clicked)

  const content = [
    {id:1,base:'Documentation',info:['Medical','Operation','Laboratory','ICU']},
    {id:2,base:'Treatments',info:['Neurology','Cardiology','Dentist','Urology']},
    {id:3,base:'Specialities',info:['Neurology','Cardiology','Dentist','Urology']},
    {id:4,base:'Utilities',info:['Medical','Operation','Laboratory','ICU']},
  ]

    return ( 
        <footer className={` ${remove === '/login' ? 'hidden' :'flex'} px-12 flex flex-col items-start gap-6 py-6 bg-[#e9f3ff] border border-t-[#dde2e1] w-full`}>
        <div className="flex flex-col items-center justify-center rounded-lg p-10 -mt-10 w-full bg-gradient-to-r from-[#0169e8] to-[#00a8e8] text-[#e9f3ff]">
     
     <div className="contact rounded-lg p-2 flex flex-col md:flex-row items-center justify-between w-full">
      <h1 className="text-2xl sm:text-3xl font-semibold text-start">Working for Your Better Health</h1>
      <div className="flex flex-col md:flex-row items-start mt-8 sm:mt-0 sm:items-center gap-8">
        <div className="contact-1 flex items-center gap-4">
          <span className="icon rounded-full p-2 bg-[#e9f3ff]">
            <Headset color="#0169e8"/>
          </span>
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-md font-semibold">Costumer Support</h2>
            <p>+383 44 256 853</p>
          </div>
        </div>
        <div className="contact-2 flex items-center gap-4">
          <span className="icon rounded-full p-2 bg-[#e9f3ff]">
            <MessageCircleMore color="#0169e8"/>
          </span>
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-md font-semibold">Drop Us an Email</h2>
            <p>enis_zekiqi@hotmail.com</p>
          </div>
        </div>
      </div>
     </div>
    </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full items-center mt-8 justify-center justify-items-start">
          {content.map((item) => (
            <div key={item.id} className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold">{item.base}</h2>
              <ul className="flex flex-col gap-2">
                {item.info.map((info, index) => (
                  <li key={index} className="text-sm text-gray-600 hover:text-[#1aa6a4] cursor-pointer">
                    {info}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between w-full mt-8">
          <FooterSelect user={user} setUser={setUser} />
          <div className="flex items-center gap-4">
            <Facebook size={20} className="text-[#5e6e6d] hover:text-[#1aa6a4] cursor-pointer"/>
            <Twitter size={20} className="text-[#5e6e6d] hover:text-[#1aa6a4] cursor-pointer"/>
          </div>
        </div>
        <div className="h-10"></div>
        </footer>
     );
}
 
type FooterSelectProps = {
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
};

const FooterSelect = ({ user, setUser }: FooterSelectProps) => {
  const [open, setOpen] = useState(false);

  const options = [
    "English",
    "Deutsch",
    "Français",
    "Italiano",
    "Español",
  ];

  return (
    <div className="relative w-48">
      {/* SELECT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all"
      >
        <span className="text-gray-700">{user}</span>

        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown className="text-[#1aa6a4]" size={18} />
        </motion.div>
      </button>

      {/* OPTIONS */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: "spring", damping: 12, stiffness: 120 }
            }}
            exit={{
              opacity: 0,
              y: -6,
              scale: 0.97,
              transition: { duration: 0.15 }
            }}
            className="absolute left-0 -top-55 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 overflow-hidden z-20"
          >
            {options.map((opt) => (
              <li
                key={opt}
                className="px-3 py-2 text-gray-700 hover:bg-[#e8f9f9] cursor-pointer transition"
                onClick={() => {
                  setUser(opt);   // <-- FIX HERE
                  setOpen(false);
                }}
              >
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Footer;