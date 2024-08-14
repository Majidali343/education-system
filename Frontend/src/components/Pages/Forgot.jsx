import React, { useState } from 'react'
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Forgot() {
  const [password, setpassword] = useState('');
  const [confirmpassword, confirmsetpassword] = useState('');
  
  const navigate =useNavigate()
  const param = useParams();
  const userid = param.id;
  
  
  const resetpassword = async() => {

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  
    if (password !== confirmpassword || password.length <8 ) // Check if passwords match
     {
      toast.warning("Password does not meet the requirements.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (!passwordRegex.test(password) ) // Check if passwords match
     {
      toast.warning("Password and confirm password dones not match.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    
    try {
      const response = await fetch("http://localhost:5000/user/changepassword", {
        method: "POST",
        body: JSON.stringify({password ,userid}),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
      if(data.status == false){
        toast.warning(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }else{
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate('/login')
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  
  };

  return (
    <div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-11 mx-auto flex flex-wrap items-center">
          <div class="lg:w-1/2 md:w-3/5 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-64 w-full mt-4 md:mt-0">
            <h2 class="text-gray-900 text-lg font-medium text-center title-font mb-5">Reset your password</h2>
            <div class="relative pt-6 mb-4">
              <label for="password" class="leading-7 text-sm text-gray-600">New Password</label>
              <input id="password" value={password} onChange={(e) => setpassword(e.target.value)} class="w-full bg-white rounded border border-gray-300 focus:border-[#00967C] focus:ring-2 focus:ring-green-200  outline-none text-gray-700 py-1 px-3 leading-8 transition-colors text-sm duration-200 ease-in-out" type="password" />
            </div>

            <div className='flex text-xs text-gray-500 '>
              <AiOutlineExclamationCircle className='className="w-6 h-6"' />
              <p> Must be at least 8 characters long </p>
            </div>

            <div className='flex text-xs text-gray-500 '>
              <AiOutlineExclamationCircle className='className="w-6 h-6"' />
              <p> Must contain an uppercase and lowercase letter (A,z) </p>
            </div>

            <div className='flex text-xs text-gray-500 '>
              <AiOutlineExclamationCircle className='className="w-6 h-6"' />
              <p> Must contain a number </p>
            </div>

            <div className='flex text-xs text-gray-500 '>
              <AiOutlineExclamationCircle className='className="w-6 h-6"' />
              <p>Must contain a special character (!, %, @, #, etc.) </p>
            </div>

            <br />

            <div class="relative mb-4">
              <label for="password" class="leading-7  text-sm text-gray-600">Confirm New Password</label>
              <input id="password" onChange={(e) => confirmsetpassword(e.target.value)} value={confirmpassword} class="w-full bg-white rounded border border-gray-300 focus:border-[#00967C] focus:ring-2 focus:ring-green-200  outline-none text-gray-700 py-1 px-3 leading-8 transition-colors text-sm duration-200 ease-in-out" type="password" />
            </div>
            <div className='w-full px-8 py-2 text-center outline-none'></div>
            <button onClick={resetpassword} class="text-white bg-[#00967C] border-0 py-2 px-8 focus:outline-none hover:bg-[#1B4636] rounded text-sm ">Reset Password</button>

            <div className='flex justify-center w-full px-8 py-2 text-xs text-center outline-none'>
              <p>Know your password?</p>
              <Link to="/Login">
                <button className='text-blue-600 hover:underline' >Log In</button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Forgot
