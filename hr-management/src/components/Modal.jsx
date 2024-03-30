import React, { useState } from "react";
import { X } from 'lucide-react';
import { useEffect, useRef } from "react";
 function Modal({onClose})
 {
    const[timein,setTimein]= useState(false);
    const [Time,setTime]= useState(new Date())
    const [Add,setAdd]= useState('')
    const ModalRef= useRef();
    const closeModal =(e)=> {
        if(ModalRef.current===e.target)
        {
            onClose();
        }
    }
    const timer =(e)=> {
        if(ModalRef.current===e.target)
        {
            setTimein(Time.toLocaleTimeString());
        }
    }

    useEffect(()=>{
       setInterval(()=>setTime(new Date()),1000)
    },[])
    useEffect(()=>{
       navigator.geolocation.getCurrentPosition(pos=>{
        const {latitude,longitude}=pos.coords;
        console.log(latitude,longitude);
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        fetch(url).then(res=>res.json()).then(data=>setAdd(data.address));
       })
    },[])
    return(
        <div ref={ModalRef} onClick={closeModal} className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
         <div className="mt-10 flex flex-col gap-5 ">
            <button onClick={onClose} className="place-self-end"><X size={30}/></button>
            <div className="bg-green-600 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                <h1 className="text-2xl font-bold"><u>TODAY'S ATTENDANCE</u> </h1>
              <form>
                <div className="mt-2">
                <input
                    type='text'
                    placeholder="Employee Name"
                    required
                    className="w-full px-4 py-3 text-black border-gray-300 rounded-md"
                    />
                    </div>
                    <div className="mt-2">
                     <input
                    type='text'
                    placeholder="Employee ID"
                    required
                    className="w-full px-4 py-3 text-black border-gray-300 rounded-md"
                    />
                    </div>
                    <div className="mt-2">
                     <input
                    type='text'
                    placeholder={Time.toLocaleTimeString()}
                    required
                    className="w-full px-4 py-3 text-black border-gray-300 rounded-md"
                    />
                    </div>
                    <div className="mt-2" >
                     <input 
                    type='text'
                    placeholder={Time.toLocaleTimeString()}
                    required
                    className="w-full px-4 py-3 text-black border-gray-300 rounded-md"
                    />
                    </div>
                    <div className="mt-2">
                <input
                    type='text'
                    placeholder={Add.state} 
                    required
                    className="w-full px-4 py-3 text-black border-gray-300 rounded-md"
                    />
                    </div>
                    <div className="mt-2">
                  <button className="mt-4  w-full flex items-center justify-center gap-2 px-5 py-3 font-medium rounded-md bg-black text-white">Submit</button>
                  </div>
              </form>
            </div>
            </div>
        </div>
    )
 }
 export default Modal;