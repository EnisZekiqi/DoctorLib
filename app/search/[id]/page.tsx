'use client'
import { useParams } from "next/navigation";
import data from '@/db.json'
import { motion } from "motion/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {ChartNoAxesGantt ,DollarSign,MapPin,Clock,CreditCard,Pipette,UserRoundX,User } from 'lucide-react'

const DetailsDoctor = () => {

  const params = useParams();
  const id = params.id;

  const doctorDetails = data.doctors.find(
    (doctor) => typeof id === "string" && doctor.id === parseInt(id)
  );

  const [selected, setSelected] = useState(tabs[0]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const tab = tabs.find((t) => t.href === hash);
      if (tab) {
        setSelected(tab);
      }
    };

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange(); // Check initial hash on mount

  return () => {
    window.removeEventListener('hashchange', handleHashChange);
  };
}, []);

    return ( 
        <>
        {doctorDetails ? (
            <div className=" px-8 sm:px-12 md:px-24 py-8 flex flex-col items-start justify-center w-full gap-6">
                <div className="flex flex-col md:flex-row gap-6 sm:gap-0 items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <img src={doctorDetails.image} alt={doctorDetails.name} className="w-18 sm:w-24 h-18 sm:h-24 rounded-full object-cover"/>
                    <div className="flex flex-col items-start gap-2">
                        <h1 className="text-xl sm:text-2xl font-semibold text-[#232929]">{doctorDetails.name}</h1>
                        <p className="text-sm sm:text-md" style={{color: '#5e6e6d'}}>{doctorDetails.specialties.join(", ")}</p>
                    </div>
                </div>
                  <div className="flex flex-col gap-3 items-start bg-transparent  sm:bg-[#fbfbfb]  w-[300px] border border-[#dde2e1] rounded-lg p-2">
                  <h2 className=" hidden sm:block  text-lg text-[#232929] font-semibold pb-2 border-b border-[#dde2e1]">Summary</h2>
                  <p className=" hidden sm:flex text-sm font-medium text-[#5e6e6d]  items-center gap-1"><User size={14}/> Accepts new patients on Doctorlib</p>
                  <button className="text-[#fbfbfb] bg-[#1aa6a4]  cursor-pointer hover:bg-[#1aa6a4]/80 rounded-lg p-2 w-full text-center transition-all duration-300">Book an Appointment</button>

                </div>
                </div>
                <ChipTabs selected={selected} setSelected={setSelected} />
                <div className="sr-only" />
               <div className="grid grid-cols-1 sm:grid-cols-2 justify-center w-full gap-6">
                 <div  id="overview" className={`mt-4 bg-[#fbfbfb] border ${selected.href === '#overview' ? 'border-[#1aa6a4]':'border-[#dde2e1] '} p-4 transition-all delay-500 duration-300 rounded-lg w-[330px] md:w-md md:w-xl`}>
                    <h2 className="text-lg font-semibold text-[#232929] mb-3">Clinic Information</h2>
                    <p style={{color: '#5e6e6d'}}>{doctorDetails.clinic.name}</p>
                    <p style={{color: '#5e6e6d'}} className="mt-1">{doctorDetails.clinic.address}, {doctorDetails.clinic.city}</p>
                </div>
                <div className="mt-4 flex flex-col md:flex-row items-start justify-between  bg-[#fbfbfb] border p-4 rounded-lg w-[340px] md:w-md md::w-xl border-[#dde2e1]">
                    <div className="flex flex-col gap-3 items-start">
                        <h2 className="text-lg font-semibold text-[#232929]">Fees and reimbursment</h2>
                    <p style={{color: '#5e6e6d'}}>{doctorDetails.sector}</p>
                    <p style={{color: '#5e6e6d'}}>{doctorDetails.carteVitaleAccepted === true ? 'Carte Vitale accepted' : 'Carte Vitale declined'}</p>
                    </div>
                    <div className="flex flex-col items-start gap-3 mt-4">
                        <h2 className="text-lg font-semibold text-[#232929] flex items-center gap-1"><CreditCard size={18} color="#1aa6a4"/> Payment methods</h2>
                    <p style={{color: '#5e6e6d'}}>{doctorDetails.paymentMethods}</p>
                    </div>
                </div>
                <div id="profile" onClick={() => { setSelected(tabs.find(t => t.href === '#profile') || tabs[0]); const el = document.getElementById('profile'); if(el) el.scrollIntoView({behavior: 'smooth'}); }} 
                className={`mt-4 bg-[#fbfbfb] border ${selected.href === '#profile' ? 'border-[#1aa6a4]':'border-[#dde2e1] '} p-4 transition-all delay-500 duration-300 rounded-lg  w-[330px] md:w-md md::w-xl`}>
                    <h2 className="text-lg font-semibold text-[#232929] mb-3 flex items-center gap-1"><Pipette  size={18} color="#1aa6a4"/> Specialities,procedures and treatments</h2>
                    <div className="flex items-center gap-4">
                        <span className="bg-[#c9f6f6] text-[#1aa6a4] px-3 py-1 rounded-lg">{doctorDetails.specialties}</span>
                    </div>
                </div>
                <div id="map" onClick={() => { setSelected(tabs.find(t => t.href === '#map') || tabs[0]); const el = document.getElementById('map'); if(el) el.scrollIntoView({behavior: 'smooth'}); }} 
                className={`mt-4 delay-500 bg-[#fbfbfb] border ${selected.href === '#map' ? 'border-[#1aa6a4]':'border-[#dde2e1] '} p-4 transition-all duration-300 rounded-lg  w-[330px] md:w-md md::w-xl`}>
                    <h2 className="text-lg font-semibold text-[#232929] mb-3 flex items-center gap-1"><MapPin size={18} color="#1aa6a4"/> Map and access information</h2>
                    <p className="font-medium flex flex-col gap-2 mb-3">
                    <span>{doctorDetails.clinic.name}</span>
                    <span style={{color: '#5e6e6d'}}>{doctorDetails.clinic.address}, {doctorDetails.clinic.city}</span>
                    </p>
                    <b className="flex flex-col items-start gap-2 mt-2">Public transport: <p style={{color: '#5e6e6d'}} className="font-normal">{doctorDetails.clinic.transportation}</p></b>
                    <b className="flex flex-col items-start gap-2 mt-3">Additional information: <p style={{color: '#5e6e6d'}} className="font-normal">{doctorDetails.clinic.additionalInfo}</p>
                    </b>
                </div>
                <div className="mt-4 flex flex-col items-start bg-[#fbfbfb] border p-4 rounded-lg w-[340px] md:w-md md::w-xl border-[#dde2e1]">
                    <h2 className="text-lg font-semibold flex items-center gap-1 text-[#232929] mb-3"><ChartNoAxesGantt size={18} color="#1aa6a4"/>Profile</h2>
                    <p style={{color: '#5e6e6d'}}>{doctorDetails.profile.description}</p>
                    <h3 className="text-base font-semibold mt-4 mb-2">Diplomas</h3>
                    {doctorDetails.profile.diplomas.map((diploma, index) => (
                        <li key={index} className="bg-[#c9f6f6] mt-2 w-full text-[#1aa6a4] px-3 py-1 rounded-lg list-disc list-inside">{diploma.title} - {diploma.school} ({diploma.year})</li>
                    ))}
                </div>
                <div id="workhours" 
                onClick={() => { setSelected(tabs.find(t => t.href === '#workhours') || tabs[0]); const el = document.getElementById('workhours'); if(el) el.scrollIntoView({behavior: 'smooth'}); }} 
                className={`mt-4 delay-500 bg-[#fbfbfb] border ${selected.href === '#workhours' ? 'border-[#1aa6a4]':'border-[#dde2e1] '} p-4 transition-all duration-300 rounded-lg w-[330px] md:w-md md::w-xl`}>
                    <h2 className="text-lg font-semibold text-[#232929] mb-4 flex items-center gap-1"> <Clock  size={18} color="#1aa6a4"/>Opening Hours</h2>
                    <div className="flex flex-col gap-2">
                        <p style={{color: '#5e6e6d'}}>Monday: <b>{doctorDetails.openingHours.monday}</b></p>
                        <p style={{color: '#5e6e6d'}}>Tuesday: <b>{doctorDetails.openingHours.tuesday}</b></p>
                        <p style={{color: '#5e6e6d'}}>Wednesday: <b>{doctorDetails.openingHours.wednesday}</b></p>
                        <p style={{color: '#5e6e6d'}}>Thursday: <b>{doctorDetails.openingHours.thursday}</b></p>
                        <p style={{color: '#5e6e6d'}}>Friday: <b>{doctorDetails.openingHours.friday}</b></p>
                        <p style={{color: '#5e6e6d'}}>Saturday: <b>{doctorDetails.openingHours.saturday}</b></p>
                        <p style={{color: '#5e6e6d'}}>Sunday: <b>{doctorDetails.openingHours.sunday}</b></p>
                        <div className="flex flex-col items-start gap-2 mt-4">
                        <h3 className="text-base font-semibold">Contact</h3>
                        <p style={{color: '#5e6e6d'}}>{doctorDetails.contact}</p>
                        </div>
                    </div>
                </div>
                <div id="fees" onClick={() => { setSelected(tabs.find(t => t.href === '#fees') || tabs[0]); const el = document.getElementById('fees'); if(el) el.scrollIntoView({behavior: 'smooth'}); }} 
                className={`mt-4 delay-500 bg-[#fbfbfb] border ${selected.href === '#fees' ? 'border-[#1aa6a4]':'border-[#dde2e1] '} p-4 transition-all duration-300 rounded-lg w-[330px] md:w-md md::w-xl`}>
                    <h2 className="text-lg font-semibold text-[#232929] flex items-center gap-1 mb-3"><DollarSign size={18} color="#1aa6a4"/> Fees</h2>
                    <p style={{color: '#5e6e6d'}}>Consult for adults: <b>{doctorDetails.fees.consultation_adulte}</b></p>
                    <p style={{color: '#5e6e6d'}} className="mt-2">Consult for pediatre: <b>{doctorDetails.fees.consultation_pediatrie}</b></p>
                </div>
               </div>
                
            </div>
        ) : (
            <div className="p-8 flex flex-col gap-4 items-center justify-center w-full h-screen">
              <span className="p-2 rounded-lg bg-[#d6dcdc] border border-[#232929]"><UserRoundX color="#232929"/></span>
                <h1 className="text-2xl font-semibold text-[#232929]">Doctor not found</h1>
                <p className="text-[#5e6e6d] w-[350px] text-center">You haven't searched the right way . Try again by looking for a <b className="text-[#1aa6a4] font-medium">City</b> or <b className="text-[#1aa6a4] font-medium">Services</b></p>
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg bg-[#1aa6a4] text-[#c9f6f6]">Back to Home Page</button>
                <button className="p-2 rounded-lg bg-[#c9f6f6] text-[#1aa6a4] border border-[#1aa6a4]">Try Again</button>
              </div>
            </div>
        )}
        </>
     );
}

const tabs=[
  {id:1,text:'Overview',href:'#overview'},
  {id:2,text:'Map',href:'#map'},
  {id:3,text:'Profile',href:'#profile'},
  {id:4,text:'Work Hours',href:'#workhours'},
  {id:5,text:'Fees',href:'#fees'}]
  ;

const ChipTabs = ({ selected, setSelected }: { selected: Tab; setSelected: Dispatch<SetStateAction<Tab>> }) => {
  return (
    <div className="sticky border-b bg-[#fbfbfb] w-full border-[#9facac] top-0  px-4 py-6  hidden sm:flex items-center flex-wrap gap-2">
      {tabs.map((tab) => (
        <Chip
          tab={tab}
          selected={selected === tab}
          setSelected={setSelected}
          key={tab.id}
        />
      ))}
    </div>
  );
};

type Tab = {
  id: number;
  text: string;
  href: string;
};

const Chip = ({
  tab,
  selected,
  setSelected,
}: {
  tab: Tab;
  selected: boolean;
  setSelected: Dispatch<SetStateAction<Tab>>;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelected(tab);
    const id = tab.href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <a
      href={tab.href}
      onClick={handleClick}
      className={`${
        selected
          ? 'text-[#232929]'
          : 'text-[#fbfbfb] hover:text-[#fbfbfb] hover:bg-[#1aa6a4]'
      } text-sm transition-colors px-3 py-1 rounded-md relative`}
    >
      <span className={`relative z-10 ${selected ?'text-[#fbfbfb]':'text-[#232929]'} `}>{tab.text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: 'spring', duration: 0.5 }}
          className="absolute inset-0 z-0 bg-[#1aa6a4] rounded-md"
        ></motion.span>
      )}
    </a>
  );
};
 
export default DetailsDoctor;