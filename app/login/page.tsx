'use client'

import { Eye, EyeClosed,ClipboardClock,Lock,Zap} from "lucide-react";
import { useState,useEffect,useLayoutEffect,useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import gsap from "gsap";
import axios from "axios";

const LogIn = () => {
    const [signUp,setSignUp]=useState({ email:'',first:'',last:'',dobDay:null as number | null,dobMonth:'',dobYear:null as number | null,gender:'',password:''})
    const [ifLogin,setIfLogin]=useState(false)
    const [showPw,setShowPw]=useState(false)
    const [loaderState, setLoaderState] = useState(false);

    const getStep =(signUp:any)=>{
        if (signUp.email && signUp.first && signUp.last && signUp.password) {
    return 'step3';
      }
      if (signUp.email && signUp.first && signUp.last) {
    return 'step2';
     }
     return 'step1';
};
    

    const step = getStep(signUp);

    const blobRef = useRef(null);
    const blob2Ref = useRef(null);

useLayoutEffect(() => {

    gsap.fromTo(blobRef.current,
      {opacity:0.5, scale:0.8},
      {opacity:1, scale:1, duration:1.5, ease:"sine.inOut", repeat:-1, yoyo:true})
  
      gsap.fromTo(blob2Ref.current,
      {opacity:0.5, scale:0.8},
      {opacity:1, scale:1, duration:1.5, ease:"sine.inOut", repeat:-1, yoyo:true, delay:1});

},[])


const isFormFilled =(signUp:any)=>{
  return (
    signUp.email.trim() !== '' &&
    signUp.first.trim() !== '' &&
    signUp.last.trim() !== '' &&
    signUp.password.trim() !== '' &&
    signUp.gender.trim() !== '' &&
    signUp.dobDay !== null &&
    signUp.dobMonth !== '' &&
    signUp.dobYear !== null
  );
}

const getEmailRequirement = (email:any) => {
  if (!email) return '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? 'Valid email ✓' : 'Invalid email format';
}

const emailRequirement = getEmailRequirement(signUp.email);

const getPasswordRequirement = (password:any) => {
  if (!password) return '';
  if (password.length < 8) return 'At least 8 characters';
  if (!/[A-Z]/.test(password) || !/\d/.test(password)) {
    return 'At least one uppercase letter and one number';
  }
  return 'Strong password ✓';
};

const requirementMet = getPasswordRequirement(signUp.password);


const canSubmitSignup = (signUp:any) => {
  if (!isFormFilled(signUp)) return false;
  if (getEmailRequirement(signUp.email) !== 'Valid email ✓') return false;
  if (getPasswordRequirement(signUp.password) !== 'Strong password ✓') return false;
  return true;
}


const submitToDatabase = async (signUp: any) => {
  setLoaderState(true);
 
  try {
    const res = await axios.post(
      'http://localhost:3002/inventory',
      signUp
    );

      setSignUp(prev => ({
      ...prev,
      id: res.data.id,
    }));
   
  setTimeout(() => {
      setLoaderState(false);
    }, 3000);   
   
    console.log('Submitted successfully:', res.data);
  } catch (error) {
    console.error('Error submitting to database:', error);
  }
};
const handleSubmit = (e:any) => {
  e.preventDefault();

  if (ifLogin) {
    handleLogIn();
    return;
  }

  if (!canSubmitSignup(signUp)) return;

  submitToDatabase(signUp);

  setSignUp({  email:'',first:'',last:'',dobDay:null,dobMonth:'',dobYear:null,gender:'',password:''});
};


const handleLogIn = async () => {
  console.log('Attempting login payload:', { email: signUp.email, password: signUp.password });
  try {
    const res = await axios.post('http://localhost:3002/inventory/login', {
      email: signUp.email,
      password: signUp.password,
    });
    console.log('Logging in:', res.data);
  } catch (error: any) {
    console.error('Login failed - axios error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response body:', error.response.data);
    } else {
      console.error('No response (network/CORS):', error);
    }
  }
};
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);


const changeForm =() =>{
  setIfLogin(v=>!v)
  setSignUp({  email:'',first:'',last:'',dobDay:null,dobMonth:'',dobYear:null,gender:'',password:''});
  setShowPw(false)
}


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
 <AnimatePresence mode="wait">
   {ifLogin ?  
  <motion.div
  key={String(ifLogin)}
  initial={{opacity:0,y:30}}
  animate={{opacity:1,y:0}}
  exit={{opacity:0,y:30}}
  transition={{ duration: 0.5 }}
  className="flex flex-col gap-6">
    

    <h3 className="text-xl w-2/4 font-semibold">
      Log in to access your appointments, medical records, and personalized care.
    </h3>

    <ul className="flex flex-col gap-4 text-sm">
      <li className="flex text-[15px] text-[#fbfbfb]/70 font-medium items-center gap-3">
       <ClipboardClock color="#fbfbfb"/> View upcoming appointments
      </li>
      <li className="flex text-[15px] text-[#fbfbfb]/70 font-medium items-center gap-3">
        <Lock color="#fbfbfb"/> Secure & private health data
      </li>
      <li className="flex text-[15px] text-[#fbfbfb]/70 font-medium items-center gap-3">
        <Zap color="#fbfbfb"/> Fast access to your dashboard
      </li>
    </ul>
  </motion.div>
   :<motion.div
  key={String(ifLogin)}
   initial={{opacity:0,y:30}}
  animate={{opacity:1,y:0}}
  exit={{opacity:0,y:30}}
  transition={{ duration: 0.5 }}
   className="flex items-start gap-6">
    <div className="w-1 h-full bg-[#137a78]">
      <span className={`w-1 transition-all duration-500 block ${step === 'step1' ? 'h-1/3' : step === 'step2' ? 'h-2/3' : 'h-full'} bg-[#eff1f1]/70`}></span>
    </div>
    <div className="flex flex-col gap-6 mt-0">
    <div className={`transition-all duration-500 feature-item ${step === 'step1' ? 'opacity-100' : 'opacity-50'}`} id="feature1">
      <h3 className="text-lg font-semibold">Enter Your Email</h3>
      <p className="text-[14px] opacity-80">Start by providing your email address.</p>
    </div>
    <div className={`transition-all duration-500 feature-item ${step === 'step1' ? 'opacity-50' : step === 'step2' ? 'opacity-100' : 'opacity-50'}`} id="feature2">
      <h3 className="text-lg font-semibold">Complete Your Profile</h3>
      <p className="text-[14px] opacity-80">Add your personal details and information.</p>
    </div>
    <div className={`transition-all duration-500 feature-item ${step === 'step3' ? 'opacity-100' : 'opacity-50'}`} id="feature3">
      <h3 className="text-lg font-semibold">Set Your Password</h3>
      <p className="text-[14px] opacity-80">Create a strong password to secure your account.</p>
    </div>
  </div>
  </motion.div>}
  
 </AnimatePresence>

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
  <div className="flex-1 flex items-center justify-center p-[20px]">
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

      <form onSubmit={(e) => handleSubmit(e)} className=" flex flex-col gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
          <input value={signUp.email} onChange={(e) => setSignUp(p => ({ ...p, email: e.target.value }))} type="email" placeholder="Email" className="p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1aa6a4] w-full" />
          
               <h1  className={`text-xs mt-1.5 font-medium ${emailRequirement === 'Valid email ✓' ? 'text-green-500' : 'text-red-500'}`}>{emailRequirement}</h1>
        </div>
       {ifLogin ?   
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                  <div tabIndex={0} className="flex items-center p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1aa6a4] w-full">
  <input value={signUp.password} onChange={(e)=>setSignUp(p=>({...p , password:e.target.value}))} type={showPw ? "text" : "password"} placeholder="Password" className="focus:outline-none w-full" />
  {showPw ? <Eye size={20} className="cursor-pointer text-gray-400" onClick={()=>setShowPw(false)}/> : <EyeClosed size={20} className="cursor-pointer text-gray-400" onClick={()=>setShowPw(true)}/>}
</div>
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
            <select
  value={signUp.dobDay ?? ''}
  onChange={(e) =>
    setSignUp(p => ({ ...p, dobDay: e.target.value ? Number(e.target.value) : null }))
  }
  className="p-2.5 rounded-lg border focus:border-[#137a78] focus:outline-0"
>
  <option value="">Day</option>
  {days.map(day => (
    <option key={day} value={day}>{day}</option>
  ))}
</select>

<select
  value={signUp.dobMonth ?? ''}
  onChange={(e) =>
    setSignUp(p => ({ ...p, dobMonth: e.target.value }))
  }
  className="p-2.5 rounded-lg border focus:border-[#137a78] focus:outline-0"
>
  <option value="">Month</option>
  {months.map((month, idx) => (
    <option key={month} value={String(idx + 1)}>{month}</option>
  ))}
</select>

<select
  value={signUp.dobYear ?? ''}
  onChange={(e) =>
    setSignUp(p => ({ ...p, dobYear: e.target.value ? Number(e.target.value) : null }))
  }
  className="p-2.5 rounded-lg border focus:border-[#137a78] focus:outline-0"
>
  <option value="">Year</option>
  {years.map(year => (
    <option key={year} value={year}>{year}</option>
  ))}
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
<div tabIndex={0} className="flex items-center p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1aa6a4] w-full">
  <input value={signUp.password} onChange={(e)=>setSignUp(p=>({...p , password:e.target.value}))} type={showPw ? "text" : "password"} placeholder="Password" className="focus:outline-none w-full" />
  {showPw ? <Eye size={20} className="cursor-pointer text-gray-400" onClick={()=>setShowPw(false)}/> : <EyeClosed size={20} className="cursor-pointer text-gray-400" onClick={()=>setShowPw(true)}/>}
</div>        
</div>:''}
          {ifLogin ? '' : <h1 className={`text-xs font-medium ${requirementMet.startsWith('At least 8') ? 'text-red-500': requirementMet.startsWith('At least one') ? 'text-yellow-500':'text-green-500'}  `}>{requirementMet}</h1>}
        <button   type="submit" className="bg-[#1aa6a4] text-white py-3 rounded-lg mt-0 hover:bg-[#137a78] transition"> {loaderState ? <span className="loader"></span> : ifLogin ? 'Log In' : 'Sign Up'} </button>
      </form>

      <p className="text-xs text-center mt-4 text-gray-400">
        {ifLogin ? "Don't have an account?" : 'Already have an account?'}
        <span onClick={changeForm} className="text-[#1aa6a4] cursor-pointer ml-1 font-semibold">
          {ifLogin ? 'Sign Up' : 'Log In'}
        </span>
      </p>
    </motion.div>
      </AnimatePresence>
  </div>
</section>

  )
};






export default LogIn;
