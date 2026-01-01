'use client'
import { CircleQuestionMark,User,ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = () => {

    const path = usePathname()

    const connect=path;

    return ( 
        <>
        <nav className={` ${connect === '/login' ? 'hidden' : 'flex'} items-center justify-between z-[1000] p-3 sm:p-4 w-full bg-[#1aa6a4] text-[#fbfbfb]`}>
        {path.startsWith('/search') ? <Link href="/" className="block md:hidden"><ChevronLeft size={20}/></Link> : <span className="block md:hidden"><CircleQuestionMark size={20}/></span>}
            <h1 className="text-2xl font-medium italic w-full text-center md:text-start md:w-[50%]">Doctorlib</h1>
           {connect === '/login' ? 
            <Link className="block md:hidden rounded-lg text-xs font-medium p-2 bg-[#fbfbfb] text-[#232929]" href="/login">
             Professional?
            </Link>
           : connect === '/' &&
           <Link className="block md:hidden rounded-lg text-xs font-medium p-2 bg-[#fbfbfb] text-[#232929]" href="/login">
            Connect
            </Link>}
            <div className=" hidden md:flex items-center gap-2 w-[50%] justify-end gap-6">
                <button className="bg-[#fbfbfb] text-[#232929] hover:text-[#5e6e6d] text-[14px] font-medium p-1.5 transition-all duration-300 rounded-xl">Are you a health professional?</button>
                <button className="p-1.5 flex items-center font-light gap-0.5 hover:text-[#d6dcdc] transition-all duration-300"><CircleQuestionMark size={20}/>Help Center</button>
                <Link href={`/login`} className="flex items-center hover:bg-[#c9f6f6]/40 transition-all duration-300 rounded-xl p-1">
                    <User  />
                <div className="flex flex-col items-start ">
                <h2 className="text-[14px] text-[#fbfbfb] font-semibold">Log In</h2>
                <p className="text-[12px] text-[#d6dcdc]">My appointments</p>
                 </div>
                    </Link>
            </div>
        </nav>
        </>
     );
}
 
export default Navbar;