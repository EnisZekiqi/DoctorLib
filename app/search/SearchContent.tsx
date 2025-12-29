'use client'
import { useSearchParams } from "next/navigation";
import data from '@/db.json'
import { Search,MapPin,ChevronRight,ChevronDown  } from "lucide-react";
import { motion,AnimatePresence } from "motion/react"
import { useState,useMemo,Activity,useTransition,useEffect } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDebounce } from "../hook/useDebonce";
type Doctor ={
    id:number,
    name:string,
    sector:string,
    image:string
    specialties:string[],
    clinic:{
        name:string,
        city:string,
        address:string,
    }
    openingHours:{
        monday?:string,
        tuesday?:string,
        wednesday?:string,
        thursday?:string,
        friday?:string,
        saturday?:string,
        sunday?:string,
    },
}

const SearchResults = () => {

const searchParams = useSearchParams();
const router = useRouter();

const name = searchParams.get("name") || "";
const city = searchParams.get("city") || "";

const [forName, setForName] = useState<string>(name);
const [searchTerm, setSearchTerm] = useState<string>(city);

// Keep local inputs in sync if URL params change externally
useEffect(() => {
  if (name !== forName) setForName(name);
  if (city !== searchTerm) setSearchTerm(city);
}, [name, city]);
  
     const allCities = useMemo(() => {
      const setOfCities = new Set(
        data.doctors.map((doctor) => doctor.clinic.city)
      );
      return Array.from(setOfCities);
    }, []);
  
    // Filtered city list
    const filteredCities = useMemo(() => {
      if (!searchTerm.trim()) return [];
      return allCities.filter((city) =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [searchTerm, allCities]);
  
  
    const [showAlert, setShowAlert] = useState<boolean>(false);
  

// Debounced values (based on local input state)
const debouncedName = useDebounce(forName, 400);
const debouncedCity = useDebounce(searchTerm, 400);

useEffect(() => {
  const params = new URLSearchParams();

  if (debouncedName.trim()) params.set("name", debouncedName.trim());
  if (debouncedCity.trim()) params.set("city", debouncedCity.trim());

  router.replace(`/search?${params.toString()}`, { scroll: false });
}, [debouncedName, debouncedCity]);

const [sectorValue,setSectorValue]=useState<string>('');/// filter for sector state
 
  const sector = [
    {id:1,title:'Sector 1'},
    {id:2,title:'Sector 2'},
    {id:3,title:'Sector 3'}
  ]



const filteredDoctors = useMemo(() => {
  return data.doctors.filter((doctor) => {
    const matchesName = debouncedName
      ? doctor.specialties.some((s) =>
          s.toLowerCase().includes(debouncedName.toLowerCase())
        )
      : true;

    const matchesCity = debouncedCity
      ? doctor.clinic.city.toLowerCase().includes(debouncedCity.toLowerCase())
      : true;

      const matchedSector = sectorValue
      ? doctor.sector.toLowerCase().includes(sectorValue.toLowerCase())
      : true;

    return matchesName && matchesCity && matchedSector;
  });
}, [debouncedName, debouncedCity, sectorValue]);




  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  


    return ( 
        <>
        <div className="hidden sm:flex flex-col items-center bg-[#1aa6a4] pb-6 gap-6">
            
            <motion.form
          initial={{opacity:0,y:-15}}
          animate={{opacity:1,y:0,transition:{duration:0.3,delay:0.3}}}
          onSubmit={(e) => {
            e.preventDefault();
            const params = new URLSearchParams();
            if (forName.trim()) params.set('name', forName.trim());
            if (searchTerm.trim()) params.set('city', searchTerm.trim());
            router.push(`/search?${params.toString()}`);
          }}
          className="flex items-center w-[80%] gap-2 border border-[#1aa6a4] bg-white rounded-2xl p-1 sm:p-2 shadow-xl shadow-black/10 backdrop-blur-md">
            <div className="flex items-center gap-2.5 w-[43.5%]">
            
             <Search  size={18} color="#5e6e6d"/>
             <input value={forName} 
             onChange={(e)=>setForName(e.target.value)} 
             type="text"  
             className="focus:outline-0 w-[100%]" 
             placeholder="Name,specialty,practice"/>
           </div>          
             <span className="h-8 w-px bg-[#849595]"></span>
           <div className="flex relative items-center gap-2.5 w-[43%]">
            <MapPin  size={18} color="#5e6e6d"/>
             <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="focus:outline-0 w-[90%]"
                  placeholder="Where"
                />
           </div>
           <AnimatePresence>
                <Activity mode={filteredCities.length > 0 ? "visible" : "hidden"}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.25, ease: "easeOut" },
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      transition: { duration: 0.35 },
                    }}
                    className="absolute top-[19%] left-[55%] w-[350px] bg-white rounded-lg shadow-lg border border-gray-200 z-20"
                  >
                    {filteredCities.map((city) => (
                      <div
                        key={city}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setSearchTerm(city)}
                      >
                        {city}
                      </div>
                    ))}
                  </motion.div>
                </Activity>
              </AnimatePresence>
<button
  type="submit"
  className="bg-[#1aa6a4] hover:bg-[#168c8a] transition-all
  text-white rounded-xl px-4 py-3 font-medium shadow-md"
>
  Search doctors
</button>         
</motion.form>
        </div>
        {/* FILTER BAR */}
        <div className="sticky border-b border-[#9facac] top-0 flex items-center justify-center sm:justify-start bg-[#eff1f1] w-full gap-3 px-4 sm:px-8 sm:px-16 py-4 z-20">
  {[
    { label: "Availability", key: "availability" },
    { label: "Sector", key: "sector" },
    { label: "Language", key: "language" },
  ].map((filter) => (
    <div key={filter.key} className="relative">
      <motion.button
        onClick={() =>
          setActiveFilter(activeFilter === filter.key ? null : filter.key)
        }
        className="px-2 py-1 sm:px-4 sm:py-2 bg-white border border-gray-300 rounded-full text-[13px] sm:text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 shadow-sm"
        whileTap={{ scale: 0.97 }}
      >
        {filter.label}
        <ChevronDown size={16} />
      </motion.button>

      <AnimatePresence>
        {activeFilter === filter.key && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              y: -10,
              transition: { duration: 0.3 },
            }}
            className="absolute left-0 mt-2 w-30 sm:w-60 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-30"
          >
            {/* Customize filter options here */}
            {filter.key === "sector" && (
              <select value={sectorValue} name="" id="" onChange={(e) => {
                setSectorValue(e.target.value);
                setActiveFilter(null);
              }}>
                <option className="text-xs" value="">Select</option>
                {sector.map((item)=>(
                  <option 
                  key={item.id}
                  value={item.title}
                  className="text-xs"
                  >
                  {item.title}
                  </option>
                ))}
              </select>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ))}
</div>

         <div className="flex flex-col gap-6 items-start px-8 sm:px-16 py-8">

            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-start gap-0">
                <h1 className="text-xl font-semibold text-[#232929] mt-8"> Results: {filteredDoctors.length}</h1>
                <p className="text-[#5e6e6d] text-xs sm:text-md font-normal">Book an appointment online with a General medicine or practitioners offering General medicine services in France or in the surrounding area</p>
            </div>
            </div>
            {filteredDoctors.map((items: Doctor) =>(
               <Link
  href={`/search/${items.id}`}
  key={items.id}
  className="border border-[#dde2e1] bg-white hover:border-[#1aa6a4] hover:shadow-md transition-all duration-300 w-full max-w-[1000px] flex flex-col gap-4 p-5 rounded-xl"
>
  <div className="grid grid-cols-[auto,1fr,auto] gap-6 items-start">

    {/* LEFT: Avatar + name */}
    <div className="flex flex-col sm:flex-row items-start justify-between w-full">
      <div className="flex items-center gap-4">
      <img
        src={items.image}
        alt={items.name}
        className="w-16 h-16 rounded-full object-cover"
      />

      <div className="flex flex-col">
        <h2 className="text-md sm:text-lg font-semibold text-[#232929]">{items.name}</h2>
        <p className="text-gray-600 text-[13px] sm:text-sm">{items.specialties.join(", ")}</p>
      </div>
    </div>
<div className="flex justify-end items-end gap-1 text-xs sm:text-sm mt-4 sm:mt-0 text-gray-600">
      <p className="flex items-center gap-1 ">
        {items.clinic.name} <ChevronRight size={16} />
      </p>
      <p className="flex items-center gap-1">
        {items.clinic.address} <ChevronRight size={16} />
      </p>
      <p className="hidden sm:flex items-center gap-1">
        {items.clinic.city}
      </p>
    </div>
    </div>
    {/* MIDDLE: Weekly schedule */}
{/* Mobile summary */}
<div className="sm:hidden flex items-center justify-between gap-4 text-sm">
  <div>
    <p className="font-medium">Today</p>
    <p className="text-gray-500 truncate">12:00-14:00</p>
  </div>
  <div>
    <p className="font-medium">Next available</p>
    <p className="text-gray-500">12-10-2025</p>
  </div>
</div>

{/* Desktop full week */}



    <div className="hidden sm:grid grid-cols-7 gap-3 text-sm text-gray-700">
      {[
        { label: "Mon", value: items.openingHours.monday },
        { label: "Tue", value: items.openingHours.tuesday },
        { label: "Wed", value: items.openingHours.wednesday },
        { label: "Thu", value: items.openingHours.thursday },
        { label: "Fri", value: items.openingHours.friday },
        { label: "Sat", value: items.openingHours?.saturday },
        { label: "Sun", value: items.openingHours?.sunday },
      ].map((day) => (
        <div key={day.label} className="flex flex-col text-center">
          <span className="font-medium text-gray-800">{day.label}</span>
          <span className={`text-xs ${day.value === 'Closed'? 'text-[#a61a1a]':'text-gray-500'} `}>{day.value}</span>
        </div>
      ))}
    </div> 
  </div>
</Link>

            ))}
    </div>
        </>
     );
}
 
export default SearchResults;