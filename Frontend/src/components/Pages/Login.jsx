import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useDispatch } from 'react-redux';
// import { setUser } from "../../store/userSlice";

function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  // const dispatch = useDispatch(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const submit = async () => {
    if (userData.email !== '' && userData.password !== '') {
      const backendEndpoint = 'http://localhost:5000/user/login';
  
      try {
        const response = await fetch(backendEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        if(data.status == true){
          
          localStorage.setItem('user_id', data.user_id);
          localStorage.setItem('user_type', data.user_type);
          localStorage.setItem('user_name', data.user_name);
    
          toast.success('Successfully Logged in', {
            position: toast.POSITION.TOP_RIGHT,
          });
    
          navigate('/');
        }else{
          toast.warning(data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          localStorage.setItem('register_email',data.email);
          navigate('/emailverify');
        }
        
        
        // Use dispatch here with the action
        // dispatch(setUser({ user_type: data.user_type, user_id: data.user_id }));
  
       
      } catch (error) {
        console.error('Error:', error);
        toast.warning('Incorrect email or password', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.warning('Missing input fields', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  




  return (
    <div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-16 mx-auto flex flex-wrap items-center">
          <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 class="title-font font-medium text-3xl text-gray-900">Welcome Back!</h1>
            <p class="leading-relaxed mt-4">We source the healthiest and most beautiful plants to bring nature's finest to your home. We provide expert care advice to ensure your plants thrive.</p>
          </div>
          <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 class="text-gray-900 text-xl font-medium text-center title-font mb-5">Sign In</h2>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
              <input id="email" name="email" placeholder='Enter Email' class="w-full bg-white rounded border border-gray-300 focus:border-[#00967C] focus:ring-2 focus:ring-green-200  outline-none text-gray-700 py-1 px-3 leading-8 transition-colors text-sm duration-200 ease-in-out" type="text" value={userData.email} onChange={handleChange} />
            </div>
            <div class="relative mb-4">
              <label for="password" class="leading-7  text-sm text-gray-600">Password</label>
              <input id="password" name="password" placeholder='Enter Password' class="w-full bg-white rounded border border-gray-300 focus:border-[#00967C] focus:ring-2 focus:ring-green-200  outline-none text-gray-700 py-1 px-3 leading-8 transition-colors text-sm duration-200 ease-in-out" type="password" value={userData.password} onChange={handleChange} />
            </div>
            <br />
            <div className='w-full px-8 py-2 text-center outline-none'></div>
            <button type='submit' onClick={submit} class="text-white bg-[#00967C] border-0 py-2 px-8 focus:outline-none hover:bg-[#1B4636] rounded text-m">Sign In</button>
            <br />
            <div className='w-full px-8 py-2 text-center outline-none'>
              <Link to="/forgotpassword">
                <button class="text-xs hover:underline text-gray-500 mb-3">Forgot Password</button></Link>
              <Link to="/Register">
                <button class="text-center py-0 px-0 w-full outline-none text-xs hover:underline text-gray-500 mt-3">Sign Up</button></Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
