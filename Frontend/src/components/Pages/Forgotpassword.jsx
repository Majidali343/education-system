import Nav from "../Nav";
import Footer from "../Footer";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forgotpassword = () => {

  const [email, setEmail] = useState('');
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user/forgotemail", {
        method: "POST",
        body: JSON.stringify({email}),
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
          <h2 className="mb-4 text-2xl">Forgot password</h2>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="email"
              className="block w-full p-2 mt-1 border-2 form-input rounded-xl"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="px-4 py-2 mt-3 font-bold text-white bg-[#00967C] rounded hover:bg-green-700">
              Submit
            </button>
          </form>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Forgotpassword;
