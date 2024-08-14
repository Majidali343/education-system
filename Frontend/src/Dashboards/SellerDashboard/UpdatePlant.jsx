
import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

import {  useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useFormik } from 'formik';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


import Sidebar from "./Sidebar";


const UpdatePlant = () => {

  const param = useParams();

  const id = param.id;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [imagesold, setImagesold] = useState('');

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };


  const formik = useFormik({
    initialValues: {
      seller_id: localStorage.getItem('user_id') || '',
      name: '',
      price: '',
      stock: '',
      category: '',
      inoutdoor: '',
      sensitivity: '',
      size: '',

    },
    onSubmit: (values) => {
      // Here, you handle your form submImagesoldission
      const formData = new FormData();


      images.forEach(image => {
        formData.append('images', image);
      });

      formData.append('imagesold', imagesold);

      // Append other form data
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });

      // Append the content (description)
      formData.append('description', content);

      const backendEndpoint = `http://localhost:5000/plant/updatepalnt/${id}`;

      console.log(formData)

      // Use fetch or Axios to send formData
      fetch(backendEndpoint, {
        method: 'PUT',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          toast.success(data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          console.error('Error:', error);
          toast.warning("Please fill all fields", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  });


  const [fetchData, setfetchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/plant/getplant/${id}`);
        const data = await response.json();

        // Assuming your response data structure is like { name, price, stock, category, description }
        formik.setValues({
          seller_id: localStorage.getItem('user_id') || '',
          name: data.rows[0]?.name || '',
          price: data.rows[0].price || '',
          stock: data.rows[0].stock || '',
          category: data.rows[0].category || '',
          inoutdoor: data.rows[0].inoutdoor || '',
          sensitivity: data.rows[0].sensitivity || '',
          size: data.rows[0].size || '',
          // Add other fields as needed
        });
        console.log(data.rows[0].images)
        setImagesold(data.rows[0].images)
        setContent(data.rows[0].description)
        setfetchData(data.rows[0]);

      } catch (error) {
        console.error('Error fetching plant data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteImage = (imageName) => {

    // Trim the imageName to handle potential leading or trailing spaces
    const trimmedImageName = imageName.trim();

    // Filter out the image from the imagesold array
    const updatedImages = imagesold
      .split(', ')
      .filter(image => {
        const trimmedImage = image.trim();

        return trimmedImage !== trimmedImageName;
      })
      .join(', ');



    setImagesold(updatedImages);
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
          <h2 className='order-first text-2xl font-semibold tracking-tight text-center text-gray-900 sm:text-2xl md:pt-4 '>Update Your Plant</h2>
        </div>

        <div className='content-center md:p-3 mt-7' >

          <form onSubmit={formik.handleSubmit}>

            <h1 className='pt-3 text-xl md:p-2'>Enter Name</h1>
            <input className='inline p-2 border-2 rounded-xl w-[100%]' type="text" placeholder='Product name' name='name' onChange={formik.handleChange} value={formik.values.name}
            />

            <h1 className='pt-3 text-xl md:p-2'>Enter Price</h1>
            <input className='inline p-2 border-2 rounded-xl w-[100%]' type="text" placeholder='Product price' name='price' onChange={formik.handleChange} value={formik.values.price} />

            <h1 className='pt-3 text-xl md:p-2'>Enter Stock</h1>
            <input
              className='inline p-2 border-2 rounded-xl w-[100%]'
              type="number"
              placeholder='Total inventory of this product'
              name='stock'
              onChange={(e) => {
                const newValue = Math.max(0, parseInt(e.target.value, 10));
                formik.handleChange(e);
                formik.setFieldValue('stock', newValue);
              }}
              value={formik.values.stock}
            />

            <h1 className='pt-3 text-xl md:p-2'>Choose category</h1>
            <select className='inline p-2 border-2 rounded-xl w-[100%]'
              name='category' onChange={formik.handleChange} value={formik.values.category}>
              <option value="someOption" default >select</option>
              <option value="seeds">seeds</option>
              <option value="plants">plants</option>
              <option value="flowers">flowers</option>
            </select>
            
            <h1 className='pt-3 text-lg md:p-2'>In door / Out door Plant</h1>
            <select className='inline p-2 border-2 rounded-xl w-[100%]'
              name='inoutdoor' onChange={formik.handleChange} value={formik.values.inoutdoor} required>
              <option value="someOption" default >select</option>
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
              <option value="both">Both</option>
            </select>

            <h1 className='pt-3 text-lg md:p-2'>Please specify size</h1>
            <select className='inline p-2 border-2 rounded-xl w-[100%]'
              name='size' onChange={formik.handleChange} value={formik.values.size} required>
              <option value="someOption" default >select</option>
              <option  value="small">Small plant</option>
              <option value="medium">Medium size palnt</option>
              <option value="big">Big Plant</option>
            </select>

            <h1 className='pt-3 text-lg md:p-2'>Please specify Sensitivity</h1>
            <select className='inline p-2 border-2 rounded-xl w-[100%]'
              name='sensitivity' onChange={formik.handleChange} value={formik.values.sensitivity} required>
              <option value="someOption" default >select</option>
              <option  value="high">Plats need a lot of care</option>
              <option value="medium">Plats need some care</option>
              <option value="low">Plats need little care</option>
            </select>


            <h1 className='pt-3 text-xl md:p-2'>Product Description</h1>
            <ReactQuill theme="snow"
              value={content}
              onChange={handleEditorChange}
            />

            {/* https://github.com/zenoamaro/react-quill  // how to use see here */}


            <div className='flex flex-row p-2'>
              {imagesold && imagesold.split(',').map((image, index) => (
                <div key={index} >

                  <img className='w-40 h-40 m-1 rounded'
                    src={`http://localhost:5000/uploads/${image.trim()}`} alt={"not fouud"} />
                  <button type='button' onClick={() => handleDeleteImage(image)}>Delete</button>
                </div>
              ))}

            </div>



            <h1 className='pt-3 text-xl md:p-4'>Update your gallery</h1>
            <input
              type="file"
              multiple
              // defaultValue={fetchData.images}
              accept=".png, .jpg, .jpeg"
              name="images"
              onChange={handleImageChange}
              className="p-2 mb-2 border border-gray-300 rounded-md"
            />
            <br />

            <button type='submit' class="bg-green-500 hover:bg-green-700 md:mt-7  text-white font-bold py-2 px-4 rounded">
              Save Plant
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

export default UpdatePlant;
