'use client'
import { CircleQuestionMark,ChevronDown,Facebook,Twitter,Linkedin ,Youtube } from "lucide-react";
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

    return ( 
        <footer className={` ${remove === '/login' ? 'hidden' :'flex'} flex flex-col items-start gap-6 py-6 bg-[#fbfbfb] border border-t-[#dde2e1] w-full`}>
        
        <div className="flex flex-col md:flex-row items-center justify-between w-full px-8 sm:px-16 mt-12">
            <div className="flex flex-col md:flex-row items-center gap-1.5">
                <h1 className="text-2xl font-medium italic">MyDoc</h1>
                
            </div>
            
        </div>
        <div className="flex items-center justify-between w-full px-16">
           <div className="flex flex-col md:flex-row items-start md:items-center gap-1.5">
             <h1 className="text-[#232929] text-lg md:text-xl font-semibold">Have questions?</h1>
             <p className="text-xs sm:text-sm font-normal text-[#5e6e6d]">Get help online or contact us</p>
           </div>
       <button className="rounded-xl bg-[#1aa6a4] cursor-pointer text-[#c9f6f6] text-[12px] sm:text-[14px] font-medium p-1.5 sm:p-3 transition-all duration-300 flex items-center gap-1">
        <CircleQuestionMark size={16}/>
        Help Center
       </button>
        </div>
       
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-between w-full mt-12 px-16">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-1  ">
            <h2 className="text-lg md:text-xl text-[#232929]">Language</h2>
           <FooterSelect user={user} setUser={setUser}/>
        </div>
        <div className="flex items-center gap-1">
        <span className="bg-[#1aa6a4] rounded-lg p-1"><Facebook color="#c9f6f6"/></span>
        <span className="bg-[#1aa6a4] rounded-lg p-1"><Twitter color="#c9f6f6"/></span>
        <span className="bg-[#1aa6a4] rounded-lg p-1"><Linkedin color="#c9f6f6"/></span>
        <span className="bg-[#1aa6a4] rounded-lg p-1"><Youtube color="#c9f6f6"/></span>
        </div>
        </div>
        <div className="h-20"></div>
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
            className="absolute left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 overflow-hidden z-20"
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