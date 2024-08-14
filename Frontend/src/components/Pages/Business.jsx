import React, { useEffect, useState } from 'react'
import Nav from '../Nav';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom'
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhoneInTalk } from "react-icons/md";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import '../../App.css'

// import required modules
import { Navigation } from 'swiper/modules';

function Business() {

    const navigation= useNavigate();

    const [user_type, setUser_type] = useState(localStorage.getItem('user_type'));
    const [user_id, setUser_id] = useState(localStorage.getItem('user_id'));
    
    const param = useParams();
    const nurseryid = param.id;

    const [fetchnurseryData, setfetchnurseryData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/nursery/get/nursery/${nurseryid}`);
                const data = await response.json();
                console.log(data.rows[0])
                setfetchnurseryData(data.rows[0]);

            } catch (error) {
                console.error('Error fetching plant data:', error);
            }
        };

        fetchData();
    }, []);

   const savechat = async () => { 
    const response = await fetch('http://localhost:5000/chat/savechat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id ,nurseryid }),
      });

      const result = await response.json();
      const chatid =result.chatid;
      navigation(`/chat/${chatid}`);
   }


    
    return (
        <div>
            <Nav />

            <Swiper navigation={true} modules={[Navigation]} className=" mySwiper"
                style={{ height: "500px" }}
            >

                {fetchnurseryData.gallery && fetchnurseryData.gallery.split(',').map((image, index) => (
                    <SwiperSlide key={index} >

                        <img className='w-40 m-1 rounded'
                            src={`http://localhost:5000/uploads/${image.trim()}`} alt={"not fouud"} />

                    </SwiperSlide>
                ))}

            </Swiper>


            <div className='flex justify-between w-full px-24 mt-16'>
                <div className='flex justify-center text-center'>
                    <img
                        className='w-20 h-20 mx-auto rounded-full'
                        src={`http://localhost:5000/uploads/${fetchnurseryData && fetchnurseryData.gallery ? fetchnurseryData.gallery.split(',')[0] : ''}`}
                        alt=""
                    />
                    <h1 className='items-center pt-6 pl-3 text-xl font-bold' >{fetchnurseryData.business_name}</h1>
                </div>

            </div>

            <div className='block px-24 mt-4'>
                <h1 className='items-center pt-6 text-xl font-bold' ><IoLocationOutline className='inline text-2xl' /> Business Location   <span className='ml-2'> ( <MdOutlinePhoneInTalk className='inline text-xl' />  {fetchnurseryData.phone}</span> ) </h1>
                <h2 className='items-center justify-center px-4 text-lg ' ></h2>

                <h2 className='px-1 mt-2 text-xl'>{fetchnurseryData.business_location}</h2>

            </div>

            <div className='px-24 mt-6 mb-32 text-lg'>
                <p class="leading-relaxed" dangerouslySetInnerHTML={{ __html: fetchnurseryData.description }} ></p>
            </div>
            {user_type == 1 ? 
            <></>
            :
            <div  style={{ zIndex: 100 }} onClick={savechat}>
           
                
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[50px] h-[50px] scroll-to-top fixed bottom-10 right-6 text-[#00967C] hover:text-[#1B4636] cursor-pointer duration-300 animate-bounce">
                    <path fill-rule="evenodd" d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clip-rule="evenodd" />
                </svg>

             </div>
            }
            
        </div>
    )
}

export default Business