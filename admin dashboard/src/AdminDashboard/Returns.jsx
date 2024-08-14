import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';



import Sidebar from "./Sidebar";

const Returns = () => {


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [user_id, setUser_id] = useState(localStorage.getItem('user_id'));
  useEffect(() => {

    setUser_id(localStorage.getItem('user_id'));

  }, []);

  const [returnData, setreturnData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/order/returns`);

        const data = await response.json();
        setreturnData(data.rows);
        console.log(data.rows);


      } catch (error) {
        console.error('Error fetching return data:', error);
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
          <h2 className='order-first text-2xl font-semibold tracking-tight text-center text-gray-900 sm:text-2xl md:pt-4 '>Your Returns And Cancelled Orders</h2>
        </div>



        <div class="relative overflow-x-auto md:mt-7">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Procuct name
                </th>
                <th scope="col" class="px-6 py-3">
                  Order date
                </th>
                <th scope="col" class="px-6 py-3">
                  Order amount
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>

              {returnData.map((returns, index) => (

                <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {returns.name}
                  </th>
                  <td class="px-6 py-4">
                  {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',

                    }).format(new Date(returns.order_date))}
                  </td>
                  <td class="px-6 py-4">
                    {returns.price}
                  </td>
                  <td class="px-6 py-4">
                    {returns.status}
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

export default Returns;
