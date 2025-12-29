'use client'

import { Info,Facebook,Chromium,ChevronRight } from "lucide-react";
import { useState,useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
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
    

return (
    <section className="relative h-full bg-[#eff1f1] overflow-hidden p-5 sm:p-10 md:p-14 rounded-lg border border-[#dde2e1]">

      {/* LEFT PANEL */}
       <div className="absolute inset-6 pl-6 py-4 animated-bg rounded-2xl">
    <div className="h-full ss max-w-[60%] hidden md:flex flex-col justify-between rounded-xl p-10 text-white">

      {/* Top bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-wide">
          Doctorlib
        </h1>

        <Link
          href="/"
          className="text-md flex items-center cursor-pointer gap-1 px-3 z-100 py-1.5 rounded-lg
          bg-white/10 hover:bg-white/20 transition backdrop-blur"
        >
          Back to website
          <ChevronRight size={16} />
        </Link>
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={steps}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-xl font-medium max-w-md"
          >
            {steps === 'step1'
              ? 'Create your account to get started'
              : steps === 'step2'
              ? 'Verify your details and secure access'
              : 'Explore doctors and manage appointments'}
          </motion.h2>
        </AnimatePresence>

        {/* Step indicators */}
        <div className="flex items-center gap-3">
          {['step1', 'step2', 'step3'].map(step => (
            <span
              key={step}
              className={`h-1 w-14 rounded-full transition-all duration-300
                ${steps === step ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile steps (kept, slightly refined) */}
      <div className="flex md:hidden flex-col gap-3 max-w-sm">
        {[
          'Sign up your account',
          'Verify your information',
          'Start using the platform',
        ].map((label, i) => (
          <div
            key={label}
            className="bg-white/20 p-4 rounded-lg backdrop-blur border border-white/30"
          >
            <h2 className="text-lg font-medium">{label}</h2>
          </div>
        ))}
      </div>
    </div>
  </div>

      {/* RIGHT SIDE CONTAINER */}
      <div className="relative z-10 h-full w-full flex items-center justify-center sm:justify-end">

        {/* LOGIN CONTENT (STATIC, BEHIND) */}
        

        {/* SIGNUP FORM (MOVING) */}
     


        <motion.div
           
          className="relative w-full sm:w-[400px] md:w-[480px] "
        >
            <motion.form 
             initial={false}
      animate={{
        opacity: ifLogin ? 0 : 1,
        scale: ifLogin ? 0.94 : 1,
        y: ifLogin ? 20 : 0,
        pointerEvents: ifLogin ? 'none' : 'auto',
      }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
            className={`bg-[#fbfbfb]  transition-all duration-300 p-8 rounded-xl `}>
            <h1 className="text-xl sm:text-2xl font-semibold mb-3">Sign Up</h1>
            <p className="text-xs sm:text-sm text-[#5e6e6d] mb-6">
              Enter your personal data to create your account
            </p>

            <div className="flex flex-col gap-4">
              <input
              type="email"
              placeholder="Email"
              value={signUp.email}
              onChange={e =>
                setSignUp(p => ({ ...p, email: e.target.value }))
              }
              className="p-3 rounded-lg border focus:border-[#1aa6a4] focus:outline-0"
              />

              <div className="flex gap-3">
              <input
                placeholder="First name"
                value={signUp.first}
                onChange={e =>
                setSignUp(p => ({ ...p, first: e.target.value }))
                }
                className="p-3 rounded-lg border w-full focus:border-[#137a78] focus:outline-0"
              />
              <input
                placeholder="Last name"
                value={signUp.last}
                onChange={e =>
                setSignUp(p => ({ ...p, last: e.target.value }))
                }
                className="p-3 rounded-lg border w-full"
              />
              </div>

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

              <input
              type="password"
              placeholder="Password"
              className="p-3 rounded-lg border focus:border-[#137a78] focus:outline-0"
              />
            </div>

            <button className="w-full mt-6 bg-[#1aa6a4] text-white py-3 rounded-lg">
              Create Account
            </button>

            <p className="mt-4 text-xs sm:text-sm text-center">
              Already have an account?{' '}
              <b
              onClick={() => setIfLogin(v => !v)}
              className="cursor-pointer"
              >
              Log in
              </b>
            </p>
            
            </motion.form>

            <motion.div
            initial={false}
            animate={{
              opacity: ifLogin ? 1 : 0,
              scale: ifLogin ? 1 : 0.94,
              y: ifLogin ? 0 : 20,
              pointerEvents: ifLogin ? 'auto' : 'none',
            }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="absolute inset-0 bg-[#fbfbfb]  rounded-xl flex items-center justify-center" 
            >
            <LoginReveal  email={signUp.email} setSignUp={setSignUp} setIfLogin={setIfLogin}/>
            </motion.div>
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
