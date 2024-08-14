import Nav from "../Nav";
import Footer from "../Footer";
import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verifyemail = () => {
  const [otp, setOTP] = useState('');
  const [registeremail, setRegisterEmail] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
      const emailFromLocalStorage = localStorage.getItem("register_email");
      setRegisterEmail(emailFromLocalStorage);
  }, []);
  
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/verify-otp", {
        method: "POST",
        body: JSON.stringify({ otp, registeremail }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }
  
      const data = await response.json();
      if(data.status == false){
        toast.warning(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }else{
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        localStorage.clear();
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  return (
    <>
      <Nav />
      <div className="container mx-auto mt-8 h-[50vh]">
        <div className="m-auto mt-24 w-80 ">
          <h2 className="mb-4 text-2xl">Verify OTP</h2>
          
            <div className="mb-4">
              <input
                type="text"
                className="block w-full p-2 mt-1 border-2 form-input rounded-xl"
                placeholder="Enter otp"
                value={otp}
                onChange={(e)=>setOTP(e.target.value)}
                maxLength={6} 
                required
              />
            </div>
            <button  onClick={handleSubmit} className="px-4 py-2 font-bold text-white bg-[#00967C] rounded hover:bg-green-700">
              Verify
            </button>
         
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Verifyemail;
