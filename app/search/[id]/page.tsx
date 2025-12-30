'use client'

import { useParams } from "next/navigation";
import data from '@/db.json';
import { motion } from "motion/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ChartNoAxesGantt, DollarSign, MapPin, Clock, CreditCard, Pipette, UserRoundX, User } from 'lucide-react';
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother);

const tabs = [
  { id: 1, text: 'Overview', href: '#overview' },
  { id: 2, text: 'Map', href: '#map' },
  { id: 3, text: 'Profile', href: '#profile' },
  { id: 4, text: 'Work Hours', href: '#workhours' },
  { id: 5, text: 'Fees', href: '#fees' }
];

type Tab = {
  id: number;
  text: string;
  href: string;
};

const DetailsDoctor = () => {
  const params = useParams();
  const id = params.id;
  const smootherRef = useRef<ScrollSmoother | null>(null);

  const doctorDetails = data.doctors.find(
    (doctor) => typeof id === "string" && doctor.id === parseInt(id)
  );

  const [selected, setSelected] = useState(tabs[0]);

  // GSAP Smooth Scroll setup
  useEffect(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#wrapper",
      content: "#content",
      smooth: 1.2,
      effects: true
    });

    return () => smootherRef.current?.kill();
  }, []);

  // Smooth scroll to section
const scrollToId = (href: string) => {
  const id = href.replace("#", "");

  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;

    smootherRef.current?.scrollTo(el, true, "top top");
  }, 150);
};


  if (!doctorDetails) return (
    <div className="p-8 flex flex-col gap-4 items-center justify-center w-full h-screen">
      <span className="p-2 rounded-lg bg-[#d6dcdc] border border-[#232929]"><UserRoundX color="#232929" /></span>
      <h1 className="text-2xl font-semibold text-[#232929]">Doctor not found</h1>
      <p className="text-[#5e6e6d] w-[350px] text-center">
        You haven't searched the right way. Try again by looking for a <b className="text-[#1aa6a4] font-medium">City</b> or <b className="text-[#1aa6a4] font-medium">Services</b>
      </p>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg bg-[#1aa6a4] text-[#c9f6f6]">Back to Home Page</button>
        <button className="p-2 rounded-lg bg-[#c9f6f6] text-[#1aa6a4] border border-[#1aa6a4]">Try Again</button>
      </div>
    </div>
  );

  return (
    <div id="wrapper">
      <div id="content" className="px-8 sm:px-12 md:px-24 py-8 flex flex-col items-start justify-center w-full gap-6">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-0 items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <img src={doctorDetails.image} alt={doctorDetails.name} className="w-18 sm:w-24 h-18 sm:h-24 rounded-full object-cover" />
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-xl sm:text-2xl font-semibold text-[#232929]">{doctorDetails.name}</h1>
              <p className="text-sm sm:text-md" style={{ color: '#5e6e6d' }}>{doctorDetails.specialties.join(", ")}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-start bg-transparent sm:bg-[#fbfbfb] w-[300px] border border-[#dde2e1] rounded-lg p-2">
            <h2 className="hidden sm:block text-lg text-[#232929] font-semibold pb-2 border-b border-[#dde2e1]">Summary</h2>
            <p className="hidden sm:flex text-sm font-medium text-[#5e6e6d] items-center gap-1"><User size={14} /> Accepts new patients on Doctorlib</p>
            <button className="text-[#fbfbfb] bg-[#1aa6a4] cursor-pointer hover:bg-[#1aa6a4]/80 rounded-lg p-2 w-full text-center transition-all duration-300">Book an Appointment</button>
          </div>
        </div>

        <ChipTabs selected={selected} setSelected={setSelected} scrollToId={scrollToId} />

        <div className="sr-only" />

        <div className="grid grid-cols-1 sm:grid-cols-2 justify-center w-full gap-6">
          {/** Sections **/}
          <Section id="overview" selected={selected} tabHref="#overview">
            <h2 className="text-lg font-semibold text-[#232929] mb-3">Clinic Information</h2>
            <p style={{ color: '#5e6e6d' }}>{doctorDetails.clinic.name}</p>
            <p style={{ color: '#5e6e6d' }} className="mt-1">{doctorDetails.clinic.address}, {doctorDetails.clinic.city}</p>
          </Section>

          <Section id="profile" selected={selected} tabHref="#profile">
            <h2 className="text-lg font-semibold text-[#232929] mb-3 flex items-center gap-1"><Pipette size={18} color="#1aa6a4" /> Specialities, procedures and treatments</h2>
            <div className="flex items-center gap-4">
              <span className="bg-[#c9f6f6] text-[#1aa6a4] px-3 py-1 rounded-lg">{doctorDetails.specialties}</span>
            </div>
          </Section>

          <Section id="map" selected={selected} tabHref="#map">
            <h2 className="text-lg font-semibold text-[#232929] mb-3 flex items-center gap-1"><MapPin size={18} color="#1aa6a4" /> Map and access information</h2>
            <p className="font-medium flex flex-col gap-2 mb-3">
              <span>{doctorDetails.clinic.name}</span>
              <span style={{ color: '#5e6e6d' }}>{doctorDetails.clinic.address}, {doctorDetails.clinic.city}</span>
            </p>
          </Section>

          <Section id="workhours" selected={selected} tabHref="#workhours">
            <h2 className="text-lg font-semibold text-[#232929] mb-4 flex items-center gap-1"> <Clock size={18} color="#1aa6a4" /> Opening Hours</h2>
            <p style={{ color: '#5e6e6d' }}>Monday: <b>{doctorDetails.openingHours.monday}</b></p>
            <p style={{ color: '#5e6e6d' }}>Tuesday: <b>{doctorDetails.openingHours.tuesday}</b></p>
          </Section>

          <Section id="fees" selected={selected} tabHref="#fees">
            <h2 className="text-lg font-semibold text-[#232929] flex items-center gap-1 mb-3"><DollarSign size={18} color="#1aa6a4" /> Fees</h2>
            <p style={{ color: '#5e6e6d' }}>Consult for adults: <b>{doctorDetails.fees.consultation_adulte}</b></p>
            <p style={{ color: '#5e6e6d' }} className="mt-2">Consult for pediatre: <b>{doctorDetails.fees.consultation_pediatrie}</b></p>
          </Section>

        </div>
      </div>
    </div>
  );
};

const Section = ({ id, selected, tabHref, children }: { id: string, selected: Tab, tabHref: string, children: React.ReactNode }) => (
  <div
    id={id}
    className={`mt-4 bg-[#fbfbfb] border ${selected.href === tabHref ? 'border-[#1aa6a4]' : 'border-[#dde2e1]'} p-4 transition-all delay-500 duration-300 rounded-lg w-[330px] md:w-md md:w-xl`}
  >
    {children}
  </div>
);

const ChipTabs = ({ selected, setSelected, scrollToId }: { selected: Tab, setSelected: Dispatch<SetStateAction<Tab>>, scrollToId: (href: string) => void }) => (
  <div className="sticky border-b bg-[#fbfbfb] w-full border-[#9facac] top-0 px-4 py-6 hidden sm:flex items-center flex-wrap gap-2 z-10">
    {tabs.map(tab => (
      <Chip key={tab.id} tab={tab} selected={selected} setSelected={setSelected} scrollToId={scrollToId} />
    ))}
  </div>
);

const Chip = ({ tab, selected, setSelected, scrollToId }: { tab: Tab, selected: Tab, setSelected: Dispatch<SetStateAction<Tab>>, scrollToId: (href: string) => void }) => (
  <a
    href={tab.href}
    onClick={(e) => {
      e.preventDefault();
      setSelected(tab);
      scrollToId(tab.href);
    }}
    className={`${selected === tab ? 'text-[#232929]' : 'text-[#fbfbfb] hover:text-[#fbfbfb] hover:bg-[#1aa6a4]'} text-sm transition-colors px-3 py-1 rounded-md relative`}
  >
    <span className={`relative z-10 ${selected === tab ? 'text-[#fbfbfb]' : 'text-[#232929]'}`}>{tab.text}</span>
    {selected === tab && (
      <motion.span layoutId="pill-tab" transition={{ type: 'spring', duration: 0.5 }} className="absolute inset-0 z-0 bg-[#1aa6a4] rounded-md" />
    )}
  </a>
);

export default DetailsDoctor;
