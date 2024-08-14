
import React, { useEffect, useState ,useRef } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBars } from 'react-icons/fa';

import Sidebar from "./Sidebar";

const Profileverify = () => {
  const [user_id, setUser_id] = useState(localStorage.getItem('user_id'));
  const formData = new FormData();
  
  useEffect(() => {

    setUser_id(localStorage.getItem('user_id'));

  }, [user_id]);

  const [images, setImages] = useState({ idDocument: null, addressProof: null });
  const idDocumentInputRef = useRef(null);
  const addressProofInputRef = useRef(null);
  
  const handleImageChange = (e, imageName) => {
    setImages({ ...images, [imageName]: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('idDocument', images.idDocument);
    formData.append('addressProof', images.addressProof);
   
    if(!images.idDocument || !images.addressProof || !user_id){
      toast.warning("Please fill all fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }else{
    
    try {
      const response = await fetch('http://localhost:5000/user/verifyprofile', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload images');
      }
      toast.success("Documents Uploaded sucessfully admin will review them", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setImages({ idDocument: null, addressProof: null });
      idDocumentInputRef.current.value = '';
      addressProofInputRef.current.value = '';
      
    } catch (error) {
      console.error('Error uploading images:', error.message);
      // Handle error
    }
  }
  };


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`pt-[30px] w-[243px] rounded lg:pt-0 bg-green-600 text-white h-screen fixed top-0 left-0 overflow-y-auto transition-transform transform ${isSidebarOpen ? 'w-[300px]' : '-translate-x-full '
          } lg:translate-x-0`}
      >
        <Sidebar />
      </aside>

      {/*Routing*/}
      <div className={`md:p-4 lg:ml-64 lg:md-64 lg:pl-0 w-65 sm:w-[100vw] mt-10 lg:mt-0 lg:w-[cal(100vw-243px)] m-auto `}>

        <div className='w-full bg-green-100  rounded-2xl h-[5%] md:p-5 p-5 sm:pb-8 md:h-[35%] shadow-md'>
          <h2 className='order-first text-2xl font-semibold tracking-tight text-center text-gray-900 sm:text-2xl md:pt-4 '>Please verify your profile</h2>
        </div>

        <p className='w-full mt-3 text-red-600 md:text-xl rounded-2xl md:p-5 p-7 sm:pb-8'>Upload Your documents so that admin can verify you .When Admin verifies ,You will get verfied badge</p>


        <div className='flex flex-row justify-around w-full p-8 m-auto mt-8'>
          <div>
            <span className="p-10 text-lg">Upload your Id document</span>
            <input type="file"
            id="idDocument"
            ref={idDocumentInputRef}
            accept=".png, .jpg, .jpeg"
            onChange={(e) => handleImageChange(e, 'idDocument')}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-green-700 hover:file:bg-violet-100 " />
          </div>
          <div className="">
            <span className="p-10 text-lg bg-"  >Upload your Address prove</span>
            <input type="file"
              id="addressProof"
              accept=".png, .jpg, .jpeg"
              ref={addressProofInputRef}
              onChange={(e) => handleImageChange(e, 'addressProof')}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-green-700 hover:file:bg-violet-100 " />
          </div>
        </div>

        <button onClick={handleSubmit} class="ml-5 bg-green-500 hover:bg-green-700 md:mt-7  text-white font-bold py-4 px-4 rounded text-lg">
          Send verify request
        </button>



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

export default Profileverify;
