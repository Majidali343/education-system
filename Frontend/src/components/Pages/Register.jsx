import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Register() {


  const [userData, setUserData] = useState({
    First_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    user_type: '',
    city: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  const submit = () => {

    if (userData.password === userData.confirm_password) {

      if (userData.First_name &&
        userData.last_name &&
        userData.email &&
        userData.password &&
        userData.confirm_password &&
        userData.user_type &&
        userData.city &&
        userData.phone) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(userData.email)) {

          if (userData.phone.length == 11) {

            if(userData.password.length > 7){

              const containsNumbers = /\d/;

              if (containsNumbers.test(userData.First_name) || containsNumbers.test(userData.last_name) ) {
                toast.warning("Name should contain only alphabets", {
                  position: toast.POSITION.TOP_RIGHT,
                });
              } else {
                const backendEndpoint = 'http://localhost:5000/user/signup';

                fetch(backendEndpoint, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(userData),
                })
                  .then(response => response.json())
                  .then(data => {
                    console.log('Success:', data);
                    toast.success(data.message, {
                      position: toast.POSITION.TOP_RIGHT,
                    });
                    if(data.status == true){
                      localStorage.setItem('register_email',data.email);
                      navigate('/emailverify');
                    }
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                    toast.warning("Please fill all fields", {
                      position: toast.POSITION.TOP_RIGHT,
                    });
    
                  });
  
              }
              
                
            }else{
              toast.warning("password must contain 8 digits", {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
           

          } else {
            toast.warning("please input a valid 11 digit phone number", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }


        } else {
          toast.warning("Please input valid email", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }






      } else {
        toast.warning("missing input fields", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }


    } else {

      toast.warning("Password and confirm password are not same !", {
        position: toast.POSITION.TOP_RIGHT,
      });

    }


  }

  return (
    <div>
      <section class="text-gray-600 focus:border-[#00967C] dark:focus:ring-[#00967C] body-font">
        <div class="container px-5 py-20 mx-auto flex flex-wrap items-center">
          <div class="lg:w-96 md:w-96 md:pr-16 lg:pr-0 pr-0">
            <h1 class="title-font font-medium text-3xl text-gray-900">Welcome!</h1>
            <p class="leading-relaxed mt-4">We source the healthiest and most beautiful plants to bring nature's finest to your home. We provide expert care advice to ensure your plants thrive.</p>
          </div>
          <div class="lg:w-1/2 md:w-3/6 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 class="text-gray-900 text-xl font-medium text-center title-font mb-5">Sign Up</h2>
            <div class=" grid grid-cols-2 gap-2 relative mb-4">
              <input required type="text" name='First_name' placeholder='First Name' class="w-full bg-white rounded border border-gray-300 focus:border-[#00967C] focus:ring-2 focus:ring-green-200  outline-none text-gray-700 py-1 px-3 leading-8 transition-colors text-sm duration-200 ease-in-out" value={userData.First_name} onChange={handleChange} />

              <input required placeholder='Last Name' name="last_name" class=" w-full bg-white rounded border border-gray-300 focus:border-[#00967C] focus:ring-2 focus:ring-green-200  outline-none text-gray-700 py-1 px-3 leading-8 transition-colors text-sm duration-200 ease-in-out" type="text" value={userData.last_name} onChange={handleChange} />
            </div>
            <div class=" grid grid-cols-2 gap-2 relative mb-4">
              <input required id="email" name="email" placeholder='xyz@email.com' class="w-full bg-white rounded border border-gray-300 focus:border-[#00967C] focus:ring-2 focus:ring-green-200  outline-none text-gray-700 py-1 px-3 leading-8 transition-colors text-sm duration-200 ease-in-out" type="email" value={userData.email} onChange={handleChange} />
              <input required id="tel" name="phone" placeholder='+92-3000000000' class=" w-full bg-white rounded border border-gray-300 focus:border-[#00967C] focus:ring-2 focus:ring-green-200  outline-none text-gray-700 py-1 px-3 leading-8 transition-colors text-sm duration-200 ease-in-out" type="phone" value={userData.phone} onChange={handleChange} />
            </div>
            <div class=" grid grid-cols-2 gap-2 relative mb-4">
              <input required id="password" name="password" placeholder='Enter Password' class="w-full bg-white rounded border border-gray-300 focus:border-[#00967C] focus:ring-2 focus:ring-green-200  outline-none text-gray-700 py-1 px-3 leading-8 transition-colors text-sm duration-200 ease-in-out" type="password" value={userData.password} onChange={handleChange} />
              <input required id="conform_password" name="confirm_password" placeholder='Confirm Password' class="w-full bg-white rounded border border-gray-300 focus:border-[#00967C] focus:ring-2 focus:ring-green-200  outline-none text-gray-700 py-1 px-3 leading-8 transition-colors text-sm duration-200 ease-in-out" type="password" value={userData.confirm_password} onChange={handleChange} />
            </div>
            <select required
              className="cursor-pointer text-sm block w-full p-2.5 bg-white rounded border border-gray-300 focus:border-[#00967C] focus:ring-2 focus:ring-green-200 outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              name='city'
              value={userData.city}
              onChange={handleChange}
            >
              <option value="" default disabled>Choose City</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Lahore">Lahore</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Multan">Multan</option>
              <option value="Karachi">Karachi</option>
            </select>

            <div className="mb-4">
              <br />

              <div className='flex justify-evenly'>
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    value="0"
                    name="user_type"
                    checked={userData.user_type === '0'}
                    onChange={handleChange}
                    className="text-indigo-600 form-radio focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm">Buyer</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="1"
                    name="user_type"
                    checked={userData.user_type === '1'}
                    onChange={handleChange}
                    className="text-indigo-600 form-radio focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm">Seller</span>
                </label>
              </div>
            </div>
            <br />
            <div className='w-full px-8 py-2 text-center outline-none'>
              <button onClick={submit} type='submit' class="text-white w-full bg-[#00967C] border-0 py-2 px-8 focus:outline-none hover:bg-[#1B4636] rounded text-m">Sign Up</button>
              <br />
              <Link to="/Login">
                <button class="text-xs hover:underline text-gray-500 mt-3">Sign In</button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
