

import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

import Sidebar from './Sidebar';



const Allusers = () => {


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const [usersData, setusersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/admin/get/users`);

        const data = await response.json();

        setusersData(data.rows);


      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };

    fetchData();
  }, []);


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

        <div className='w-full bg-green-100  rounded-2xl h-[5%] md:p-5 p-7 sm:pb-8 md:h-[35%] shadow-md'>
          <h2 className='order-first text-2xl font-semibold tracking-tight text-center text-gray-900 sm:text-2xl md:pt-4 '>All User Details</h2>
        </div>




        <div class="relative overflow-x-auto shadow-md sm:rounded-lg md:mt-8">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  User name
                </th>
                <th scope="col" class="px-6 py-3">
                  User Email
                </th>
                <th scope="col" class="px-6 py-3">
                  City
                </th>
                <th scope="col" class="px-6 py-3">
                  Phone
                </th>
                <th scope="col" class="px-6 py-3">
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => (
                <tr key={index} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.First_name} {user.last_name}
                  </th>
                  <td class="px-6 py-4">
                    {user.email}
                  </td>
                  <td class="px-6 py-4">
                    {user.city}
                  </td>
                  <td class="px-6 py-4">
                    {user.phone}
                  </td>
                  <td class="px-6 py-4">
                    {
                      user.user_type == 1 ?
                        <div>Seller</div>
                        :
                        <div >

                          buyer

                        </div>

                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


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

export default Allusers;
