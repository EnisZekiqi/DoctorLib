'use client'
import {ClipboardClock,Users,Hospital,HeartPulse, Pill,HandHeart } from 'lucide-react'
const ToDo = () => {
    
    const tasks = [
        {id:1,name:'Book Appointment',icon:<ClipboardClock color='#0169e8'/>},
        {id:2,name:'Talk to Doctors',icon:<Users color='#1e83fe'/>},
        {id:3,name:'Hospital & Clinics',icon:<Hospital color='#1e83fe'/>},
        {id:4,name:'Healthcare',icon:<HeartPulse color='#1e83fe'/>},
        {id:5,name:'Medicine & Supplies',icon:<Pill color='#1e83fe'/>},
        {id:6,name:'Lab Testing',icon:<HandHeart color='#1e83fe' />},
    ];

    return ( 

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
            {tasks.map((task) => (
                <div key={task.id} className="bg-[#fbfbfb] hover:bg-[#e0e0e0] transition-all duration-200 p-4 rounded-lg shadow">
                    <div className="flex items-center mb-2">
                        <span className="mr-2">{task.icon}</span>
                        <h3 className="text-lg font-semibold">{task.name}</h3>
                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default ToDo;