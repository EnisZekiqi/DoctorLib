'use client'
import { CircleQuestionMark,User,ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = () => {

    const path = usePathname()

    const connect=path;
const isSearch = connect.startsWith('/search');

    return ( 
<section
  className={`
    w-full
    ${isSearch ? 'p-1.5' : 'p-1.5 sm:p-6'}
    ${isSearch
      ? 'static bg-[#1aa6a4]'
      : 'absolute top-0 z-1000 bg-[#1aa6a4] sm:bg-transparent'
    }
  `}

>        <nav className={` ${connect === '/login' ? 'hidden' : 'flex'}  ${connect.startsWith('/search') 
      ? 'bg-[#1aa6a4] text-[#fbfbfb]' 
      : 'bg-[#1aa6a4] sm:bg-[#EFF1F1] text-[#fbfbfb] sm:text-black'}   items-center justify-between z-[1000] rounded-2xl p-2 sm:p-4 w-full  text-[#000]`}>
        {path.startsWith('/search') ? <Link href="/" className="block md:hidden"><ChevronLeft size={20}/></Link> : <span className="block md:hidden"><CircleQuestionMark size={20}/></span>}
            <h1 className="text-2xl font-medium italic w-full text-center md:text-start md:w-[50%]">MyDoc</h1>
           {connect === '/login' ? 
            <Link className="block md:hidden rounded-lg text-xs font-medium p-2 bg-[#fbfbfb] text-[#232929]" href="/login">
             Professional?
            </Link>
           : connect === '/' &&
           <Link className="block md:hidden rounded-lg text-xs font-medium p-2 bg-[#fbfbfb] text-[#232929]" href="/login">
            Connect
            </Link>}
            <div className=" hidden md:flex items-center gap-2 w-[50%] justify-end gap-6">
                <button className="bg-[#fbfbfb] text-[#232929] hover:text-[#5e6e6d]  border border-[#1aa6a4] text-[14px] font-medium p-1.5 transition-all duration-300 rounded-xl">Are you a health professional?</button>
                <button className="p-1.5 flex items-center font-light gap-0.5 text-[14px] transition-all duration-300"><CircleQuestionMark size={20}/>Help Center</button>
                <Link href={`/login`} className="flex items-center btn-primary transition-all duration-300 rounded-xl p-1.5">
                    <User  />
                <div className="flex flex-col items-start ">
                <h2 className="text-[14px] text-[#fbfbfb] font-semibold">Log In</h2>
                 </div>
                    </Link>
            </div>
        </nav>
        </section>
     );
}
 
export default Navbar;