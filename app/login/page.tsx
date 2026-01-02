'use client'

import { Info,Facebook,Chromium,ChevronRight } from "lucide-react";
import { useState,useEffect,useLayoutEffect,useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import gsap from "gsap";

const LogIn = () => {

    const [steps,setSteps]=useState('step1')
    const [signUp,setSignUp]=useState({email:'',first:'',last:'',dobDay:'',dobMonth:'',dobYear:'',gender:'',password:''})
    const [ifLogin,setIfLogin]=useState(false)
  useEffect(() => {
  if (
    signUp.email.trim() !== '' &&
    signUp.first.trim() !== '' &&
    signUp.last.trim() !== '' &&
    signUp.password.trim() !== ''
  ) {
    setSteps('step3');
  } else if (
    signUp.email.trim() !== '' &&
    signUp.first.trim() !== '' &&
    signUp.last.trim() !== ''
  ) {
    setSteps('step2');
  } else {
    setSteps('step1');
  }
}, [signUp]);

    const blobRef = useRef(null);
    const blob2Ref = useRef(null);
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
    gsap.fromTo(blobRef.current,
      {opacity:0.5, scale:0.8},
      {opacity:1, scale:1, duration:1.5, ease:"sine.inOut", repeat:-1, yoyo:true})
  
      gsap.fromTo(blob2Ref.current,
      {opacity:0.5, scale:0.8},
      {opacity:1, scale:1, duration:1.5, ease:"sine.inOut", repeat:-1, yoyo:true, delay:1});

},[])

const [requirementMet,setRequirementMet]=useState('')



useEffect(() => {
  if (!signUp.password) {
    setRequirementMet('');
  } else if (signUp.password.length < 8) {
    setRequirementMet('At least 8 characters');
  } else if (!/[A-Z]/.test(signUp.password) || !/\d/.test(signUp.password)) {
    setRequirementMet('At least one uppercase letter and one number');
  } else {
    setRequirementMet('Strong password ✓');
  }
}, [signUp.password]);


return (
   <section className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#e0f7f7] to-[#fbfbfb]">
  {/* LEFT SIDE - Branding / Illustration */}
 <div className="hidden md:flex flex-col justify-between w-1/2 p-10 text-white bg-[#1aa6a4] relative overflow-hidden">
  {/* Branding */}
  <h1 className="text-4xl font-bold mb-4">MyDoc</h1>

  {/* Headline */}
  <div className="flex flex-col gap-2">
    <h2 className="text-2xl font-semibold leading-snug">Your Health, Our Priority</h2>
    <p className="text-[14px] opacity-90">Manage your medical appointments seamlessly online.</p>
  </div>

  {/* New animated features */}
  <div className="flex items-start gap-6">
    <div className="w-1 h-full bg-[#137a78]">
      <span className={`w-1 transition-all duration-500 block ${steps === 'step1' ? 'h-1/3' : steps === 'step2' ? 'h-2/3' : 'h-full'} bg-[#eff1f1]/70`}></span>
    </div>
    <div className="flex flex-col gap-6 mt-0">
    <div className={`transition-all duration-500 feature-item ${steps === 'step1' ? 'opacity-100' : 'opacity-50'}`} id="feature1">
      <h3 className="text-lg font-semibold">Enter Your Email</h3>
      <p className="text-[14px] opacity-80">Start by providing your email address.</p>
    </div>
    <div className={`transition-all duration-500 feature-item ${steps === 'step1' ? 'opacity-50' : steps === 'step2' ? 'opacity-100' : 'opacity-50'}`} id="feature2">
      <h3 className="text-lg font-semibold">Complete Your Profile</h3>
      <p className="text-[14px] opacity-80">Add your personal details and information.</p>
    </div>
    <div className={`transition-all duration-500 feature-item ${steps === 'step3' ? 'opacity-100' : 'opacity-50'}`} id="feature3">
      <h3 className="text-lg font-semibold">Set Your Password</h3>
      <p className="text-[14px] opacity-80">Create a strong password to secure your account.</p>
    </div>
  </div>
  </div>

  {/* Optional: subtle background shapes */}
  <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>
  <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-white/20 blur-2xl"></div>
  <div ref={blobRef} className="blobs blur-sm absolute top-25 left-[60%] w-30 h-30 rounded-full bg-[#c9f6f6]/30 z-[2000]" >
    <div className="absolute left-7 top-7 w-16 h-16 rounded-full bg-[#1aa6a4] "></div>
    </div>
     <div ref={blob2Ref} className="blobs blur-sm absolute top-[70%] left-[50%] w-20 h-20 rounded-full bg-[#c9f6f6]/30 z-[2000]" >
    <div className="absolute left-5 top-5 w-10 h-10 rounded-full bg-[#1aa6a4] "></div>
    </div>
</div>


  {/* RIGHT SIDE - Forms */}
  <div className="flex-1 flex items-center justify-center p-8">
    <AnimatePresence mode="wait">
     <motion.div
    key={String(ifLogin)}
      className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{opacity:0,y:0}}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-3">{ifLogin ? 'Welcome Back' : 'Create Account'}</h2>
      <p className="text-sm text-gray-500 mb-6">{ifLogin ? 'Log in to continue' : 'Fill in your details to get started'}</p>

      <form className=" flex flex-col gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
          <input value={signUp.email} onChange={(e) => setSignUp(p => ({ ...p, email: e.target.value }))} type="email" placeholder="Email" className="p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1aa6a4] w-full" />
        </div>
       {ifLogin ?   
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                  <input value={signUp.password} onChange={(e)=>setSignUp(p=>({...p , password:e.target.value}))} type="password" placeholder="Password" className="p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1aa6a4] w-full" />
        </div>
    :''}
        {!ifLogin && (
          <>
        <div className="flex items-center w-fit gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
            <input value={signUp.first} onChange={(e) => setSignUp(p => ({ ...p, first: e.target.value }))} type="text" placeholder="First Name" className="p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1aa6a4] w-full" />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
            <input value={signUp.last} onChange={(e) => setSignUp(p => ({ ...p, last: e.target.value }))} type="text" placeholder="Last Name" className="p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1aa6a4] w-full" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
          <div className="grid grid-cols-3 gap-3">
            <select className="p-2.5 rounded-lg border focus:border-[#137a78] focus:outline-0">
          <option value={''} className="text-xs font-light">Day</option>
            </select>
            <select className="p-2.5 rounded-lg border focus:border-[#137a78] focus:outline-0">
          <option value={''} className="text-xs font-light">Month</option>
            </select>
            <select className="p-2.5 rounded-lg border focus:border-[#137a78] focus:outline-0">
          <option value={''} className="text-xs font-light">Year</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Gender</label>
          <select value={signUp.gender} onChange={(e)=>setSignUp(p=>({...p, gender:e.target.value}))} className="p-2.5 rounded-lg border focus:border-[#137a78] focus:outline-0 w-full">
            <option value={''}>Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>
          </>
        )}

        {!ifLogin ? <div>
          <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="">Password</label>
          <input value={signUp.password} onChange={(e)=>setSignUp(p=>({...p , password:e.target.value}))} type="password" placeholder="Password" className="p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1aa6a4] w-full" />
        </div>:''}
        <h1 className={`text-xs font-medium ${requirementMet.startsWith('At least 8') ? 'text-red-500': requirementMet.startsWith('At least one') ? 'text-yellow-500':'text-green-500'}  `}>{requirementMet}</h1>
        <button className="bg-[#1aa6a4] text-white py-3 rounded-lg mt-0 hover:bg-[#137a78] transition"> {ifLogin ? 'Log In' : 'Sign Up'} </button>
      </form>

      <p className="text-xs text-center mt-4 text-gray-400">
        {ifLogin ? "Don't have an account?" : 'Already have an account?'}
        <span onClick={() => setIfLogin(v => !v)} className="text-[#1aa6a4] cursor-pointer ml-1 font-semibold">
          {ifLogin ? 'Sign Up' : 'Log In'}
        </span>
      </p>
    </motion.div>
      </AnimatePresence>
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
