'use client'

import { Info,Facebook,Chromium,ChevronRight } from "lucide-react";
import { useState,useEffect,useLayoutEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import gsap from "gsap";

const LogIn = () => {

    const [steps,setSteps]=useState('step1')
    const [signUp,setSignUp]=useState({email:'',first:'',last:'',dobDay:'',dobMonth:'',dobYear:'',gender:'',password:''})
    const [ifLogin,setIfLogin]=useState(false)
    useEffect(() => {
        if (signUp.email.trim() !== '' && signUp.first.trim() !== '' && signUp.last.trim() !== '') {
            setSteps('step2');
        }else{
            setSteps('step1');
        }
        
    }, [signUp])
    

useLayoutEffect(() => {
  gsap.fromTo('.login-section',{
    opacity:0,
    y:30
  },{
    opacity:1,
    y:0,
    duration:0.5, 
    stagger:0.1,
    ease:'power2.out'
  })
},[])

return (
   <section className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#e0f7f7] to-[#fbfbfb]">
  {/* LEFT SIDE - Branding / Illustration */}
 <div className="hidden md:flex flex-col justify-between w-1/2 p-10 text-white bg-[#1aa6a4] relative overflow-hidden">
  {/* Branding */}
  <h1 className="text-4xl font-bold mb-4">Doctorlib</h1>

  {/* Headline */}
  <div className="flex flex-col gap-2">
    <h2 className="text-2xl font-semibold leading-snug">Your Health, Our Priority</h2>
    <p className="text-[14px] opacity-90">Manage your medical appointments seamlessly online.</p>
  </div>

  {/* New animated features */}
  <div className="flex flex-col gap-6 mt-8">
    <div className="feature-item" id="feature1">
      <h3 className="text-lg font-semibold">24/7 Online Booking</h3>
      <p className="text-[14px] opacity-80">Book appointments anytime from anywhere.</p>
    </div>
    <div className="feature-item" id="feature2">
      <h3 className="text-lg font-semibold">Medical History Access</h3>
      <p className="text-[14px] opacity-80">View your records securely anytime.</p>
    </div>
    <div className="feature-item" id="feature3">
      <h3 className="text-lg font-semibold">Appointment Reminders</h3>
      <p className="text-[14px] opacity-80">Never miss a checkup again.</p>
    </div>
  </div>

  {/* Optional: subtle background shapes */}
  <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>
  <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-white/20 blur-2xl"></div>
</div>


  {/* RIGHT SIDE - Forms */}
  <div className="flex-1 flex items-center justify-center p-8">
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">{ifLogin ? 'Welcome Back' : 'Create Account'}</h2>
      <p className="text-sm text-gray-500 mb-6">{ifLogin ? 'Log in to continue' : 'Fill in your details to get started'}</p>

      <form className="login-section flex flex-col gap-4">
        <input type="email" placeholder="Email" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1aa6a4]" />
        {!ifLogin && (
          <>
            <input type="text" placeholder="First Name" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1aa6a4]" />
            <input type="text" placeholder="Last Name" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1aa6a4]" />
             <div className="grid grid-cols-3 gap-3">
              <select className="p-3 rounded-lg border focus:border-[#137a78] focus:outline-0">
                <option className="text-xs font-light">Day</option>
              </select>
              <select className="p-3 rounded-lg border focus:border-[#137a78] focus:outline-0">
                <option className="text-xs font-light">Month</option>
              </select>
              <select className="p-3 rounded-lg border focus:border-[#137a78] focus:outline-0">
                <option className="text-xs font-light">Year</option>
              </select>
              </div>

              <select className="p-3 rounded-lg border focus:border-[#137a78] focus:outline-0">
              <option>Gender</option>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
              </select>
            <input type="password" placeholder="Password" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1aa6a4]" />
          </>
        )}
        <button className="bg-[#1aa6a4] text-white py-3 rounded-lg mt-4 hover:bg-[#137a78] transition"> {ifLogin ? 'Log In' : 'Sign Up'} </button>
      </form>

      <p className="text-xs text-center mt-4 text-gray-400">
        {ifLogin ? "Don't have an account?" : 'Already have an account?'}
        <span onClick={() => setIfLogin(v => !v)} className="text-[#1aa6a4] cursor-pointer ml-1 font-semibold">
          {ifLogin ? 'Sign Up' : 'Log In'}
        </span>
      </p>
    </motion.div>
  </div>
</section>

  )
};

type LoginRevealProps = {
  setIfLogin: React.Dispatch<React.SetStateAction<boolean>>;
  email:string,
  setSignUp: React.Dispatch<React.SetStateAction<{
    email: string;
    first: string;
    last: string;
    dobDay: string;
    dobMonth: string;
    dobYear: string
    gender: string;
    password: string;
  }>>;
};

const LoginReveal = ({setIfLogin,email,setSignUp}:LoginRevealProps) => (
  <div className=""
  >

    

    <h2 className="text-2xl font-semibold text-[#232929] text-center">
      Welcome back
    </h2>

    <p className="text-sm text-black text-center mt-2 leading-relaxed">
      Log in to manage your appointments and saved doctors.
    </p>
  <div className="flex flex-col gap-4 mt-6">
              <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e =>
                setSignUp(p => ({ ...p, email: e.target.value }))
              }
              className="p-3 rounded-lg border focus:border-[#1aa6a4] focus:outline-0"
              />
               <input
              type="password"
              placeholder="Password"
              className="p-3 rounded-lg border focus:border-[#137a78] focus:outline-0"
              />
              </div>
    <div className="flex items-center justify-center gap-3 w-full mt-6">
      <hr className="w-[30%] h-0.5 bg-[#dde2e1]/80"/>
      <p className="text-xs text-[#849595]">Or register with</p>
      <hr className="w-[30%] h-0.5 bg-[#dde2e1]/80"/>
    </div>
    <div className="flex items-center justify-center gap-3 mt-6">
      <button
        className="
          flex items-center justify-center gap-2
          border border-[#dde2e1]
          rounded-lg py-2.5 px-2 text-sm
          hover:bg-[#eff1f1] transition
        "
      >
       <img src="/google.svg" className="w-5 h-5" alt="" />
        Continue with Google
      </button>

      <button
        className="
          flex items-center justify-center gap-2
          border border-[#dde2e1]
          rounded-lg py-2.5 px-2 text-sm
          hover:bg-[#eff1f1] transition
        "
      >
        <img src="/facebook.svg" className="w-5 h-5" alt="" />
        Continue with Facebook
      </button>
    </div>
<p className="mt-4 text-sm text-center">
              Don't have an account?{' '}
              <b
              onClick={() => setIfLogin(v => !v)}
              className="cursor-pointer"
              >
              Sign up
              </b>
            </p>
    <p className="text-xs text-center flex h-full items-end justify-center text-[#849595] mt-6">
      Secure login powered by Doctorlib
    </p>
    
  </div>
);




export default LogIn;
