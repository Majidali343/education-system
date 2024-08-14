
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Sidebar from "./Sidebar";


const Yournurcery = () => {


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };
 
  const formik = useFormik({
    initialValues: {
      seller_id: localStorage.getItem('user_id'),
      business_name: '',
      address: '',
    },
    onSubmit: (values) => {
      // Here, you handle your form submission
      const formData = new FormData();

      images.forEach(image => {
        formData.append('images', image);
      });

      // Append other form data
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });

      // Append the content (description)
      formData.append('description', content);

      const backendEndpoint = 'http://localhost:5000/nursery/post/nursery';

      // Use fetch or Axios to send formData
      fetch(backendEndpoint, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())   
        .then(data => {
          console.log('Success:', data);
          toast.success("Successfully added Your details", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          console.error('Error:', error);
          toast.warning("Please fill all fields", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    },
  });

  const [user_id, setUser_id] = useState(localStorage.getItem('user_id'));
  useEffect(() => {

    setUser_id(localStorage.getItem('user_id'));

  }, []);

  const [fetchData, setfetchData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/nursery/get/nursery/${user_id}`);
        const data = await response.json();


        formik.setValues({
          seller_id: localStorage.getItem('user_id') || '',
          business_name: data.rows[0].business_name,
          address: data.rows[0].business_location,
          // Add other fields as needed
        });
        setImages(data.rows[0].gallery)
        setContent(data.rows[0].description)
        setfetchData(data.rows[0]);

      } catch (error) {
        console.error('Error fetching plant data:', error);
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
          <h2 className='order-first text-2xl font-semibold tracking-tight text-center text-gray-900 sm:text-2xl md:pt-4 '>Add Your Business Detail</h2>
        </div>

        <div className='content-center md:p-3 mt-7' >

          <form onSubmit={formik.handleSubmit}>

            <h1 className='pt-3 text-xl md:p-2'>Business Name</h1>
            <input className='inline p-2 border-2 rounded-xl w-[100%]' type="text" placeholder='Enter Business name' name='business_name' onChange={formik.handleChange} value={formik.values.business_name} required
            />

            <h1 className='pt-3 text-xl md:p-2'>Business Address</h1>
            <input className='inline p-2 border-2 rounded-xl w-[100%]' type="text" placeholder='Provide your address' name='address' onChange={formik.handleChange} value={formik.values.address}  required/>


            <h1 className='pt-3 text-xl md:p-2'>Business Details</h1>
            <ReactQuill theme="snow"
              value={content}
              onChange={handleEditorChange}
              required
            />


            {/* <div className='flex flex-row p-2'>
              {images && images.split('').map((image, index) => (
                <div key={index} >

                  <img className='w-40 h-40 m-1 rounded'
                    src={`http://localhost:5000/uploads/${image.trim()}`} alt={"not fouud"} />

                </div>
              ))}
            </div> */}

            {images ?
              <h1 className='pt-3 text-xl md:p-4'>Update your gallery</h1>
              :
              <h1 className='pt-3 text-xl md:p-4'>Upload your gallery</h1>

            }


            <input
              type="file"
              required
              multiple
              accept=".png, .jpg, .jpeg"
              name="images"
              onChange={handleImageChange}
              className="p-2 mb-2 border border-gray-300 rounded-md"
            />
            <br />

            <button type='submit' class="bg-green-500 hover:bg-green-700 md:mt-7  text-white font-bold py-2 px-4 rounded">
              Save Nurcery
            </button>

          </form>


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

export default Yournurcery;
