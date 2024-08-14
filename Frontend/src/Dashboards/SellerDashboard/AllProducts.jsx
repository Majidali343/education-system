

import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';


import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from './Sidebar';

const AllProducts = () => {


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [user_id, setUser_id] = useState(localStorage.getItem('user_id'));
  useEffect(() => {

    setUser_id(localStorage.getItem('user_id'));

  }, []);


  const [plantData, setPlantData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/plant/get/${user_id}`);

        const data = await response.json();

        setPlantData(data.rows);

      } catch (error) {
        console.error('Error fetching plant data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render



  const handleDelete = async (plantId) => {
    try {
      const isConfirmed = window.confirm('Are you sure you want to delete this product?');

      if (!isConfirmed) {
        // If the user cancels the deletion, do nothing
        return;
      }
      // Make an API call to delete the plant with the given plantId

      const response = await fetch(`http://localhost:5000/plant/deleteby/${plantId}`, {
        method: 'DELETE',
        // You may need to include headers or credentials based on your API setup
      });

      if (response.ok) {
        // If the API call is successful, update the state to remove the deleted plant
        setPlantData((plantData) =>
          plantData.filter((plant) => plant.id !== plantId)
        );
        toast.success("Successfully deleted a plant", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        console.error('Failed to delete plant');
      }
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

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
          <h2 className='order-first text-2xl font-semibold tracking-tight text-center text-gray-900 sm:text-2xl md:pt-4 '>All Products</h2>
        </div>




        <div class="relative overflow-x-auto shadow-md sm:rounded-lg md:mt-7">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
              
                <th scope="col" class="px-6 py-3">
                  Product name
                </th>
                <th scope="col" class="px-6 py-3">
                  Product Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Category
                </th>
                <th scope="col" class="px-6 py-3">
                 Stock
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
            {plantData.map((plant, index) => (

              <tr key={index} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {plant.name}
                </th>
                <td class="px-6 py-4">
                {plant.price}
                </td>
                <td class="px-6 py-4">
                {plant.category}
                </td>
                <td class="px-6 py-4">
                {plant.stock}
                </td>
                <td class="px-6 py-4">
                < RiDeleteBin6Line onClick={() => handleDelete(plant.id)} className="inline text-xl text-red-600" /> &nbsp;
                  <Link to={`/update/${plant.id}`} >< FaRegEdit className="inline text-xl text-blue-800" /></Link>
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

export default AllProducts;
