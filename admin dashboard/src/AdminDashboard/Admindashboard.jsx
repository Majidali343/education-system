import { FaBars } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';

import Sidebar from './Sidebar';
import ChartAdmin from './ChartAdmin';


const Admindashboard = () => {


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [user_id, setUser_id] = useState(localStorage.getItem('user_id'));
  useEffect(() => {
   
    setUser_id(localStorage.getItem('user_id'));
  
  }, []); 


  const [DashboardData, SetDashboardData] = useState('');

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const response = await fetch(`http://localhost:5000/dashboard/admindashboard`);
       
        const data = await response.json();
        SetDashboardData(data);
        console.log(data);
       
      } catch (error) {
        console.error('Error fetching plant data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render


 
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`pt-[30px] w-[243px] rounded lg:pt-0 bg-green-600 text-white h-screen fixed top-0 left-0 overflow-y-auto transition-transform transform ${isSidebarOpen ? 'w-[300px]' : '-translate-x-full '
          } lg:translate-x-0`}
      >
       
       <Sidebar/>
      </aside>


      {/*Routing*/}
      <div className={`md:p-4 lg:ml-64 lg:md-64 lg:pl-0 w-65 sm:w-[100vw] mt-10 lg:mt-0 lg:w-[cal(100vw-243px)] m-auto `}>
      
    <div className='w-full bg-slate-200  rounded-2xl h-[5%] md:p-5 p-7 sm:pb-8 md:h-[35%] shadow-md'>
     <h2 className='order-first text-2xl font-semibold tracking-tight text-center text-gray-900 sm:text-2xl md:pt-8 '>Welcome to Seller center</h2>
    </div>

     <div class="bg-white py-5 md:py-10 md:mt-3 ">
    
       <div class="sm-auto  max-w-7xl px-6 lg:px-8 ">
         <dl class="grid  gap-x-4 gap-y-4 text-center  grid-cols-1  md:grid-cols-3 lg:grid-cols-3 ">
         
           <div class="mx-auto flex  flex-col gap-y-4 border-2 md:p-10 py-3  rounded-2xl  bg-slate-200  w-[235px] md:w-[245px] " >
             <dt class=" leading-7 text-gray-600 text-xl">{DashboardData.users} </dt>
             <dd class="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl">Total Users</dd>
           </div>
           <div class="mx-auto flex  flex-col gap-y-4 border-2 md:p-10 py-3  rounded-2xl  bg-slate-200 px-10 w-[235px]  md:w-[245px]">
             <dt class=" leading-7 text-gray-600 text-xl">{DashboardData.orders}</dt>
             <dd class="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl">Total Orders</dd>
           </div>
           <div class="mx-auto flex  flex-col gap-y-4 border-2 md:p-10 py-3  rounded-2xl  bg-slate-200 px-10  w-[235px] md:w-[245px]">
             <dt class=" leading-7 text-gray-600 text-xl">{DashboardData.returns}</dt>
             <dd class="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl">Total Returns</dd>
           </div>
         </dl>
       </div>
     </div>

       
       <ChartAdmin data={DashboardData}/>
      </div>

      {/* Toggle Button (Visible only on small screens) */}
      <button
        className="fixed p-2 bg-green-500 rounded lg:hidden top-4 left-4"
        onClick={toggleSidebar}
      >
        <FaBars className="text-white" />

      </button>
    </div>
  );
};

export default Admindashboard;
