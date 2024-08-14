import Nav from '../Nav'
import Footer from '../Footer'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Searchpage() {
    const param = useParams();
    const serchdata = param.product;

    const [plantData, setPlantData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/plant/search/${serchdata}`);
  
          const data = await response.json();
          console.log(data)
          setPlantData(data.rows);
  
        } catch (error) {
          console.error('Error fetching plant data:', error);
        }
      };
      
      fetchData();
    }, [serchdata]);
    
    return (
        <>
            <Nav />
            <div>
                <div className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4">

                            {plantData.map((plant, index) => (


                                <div className="w-full p-4 lg:w-1/4 md:w-1/2" key={index}>
                                    <span className='relative block h-48 overflow-hidden rounded w-[235px]'>

                                        <img className='block object-cover object-center w-full h-full' src={`http://localhost:5000/uploads/${plant.images.split(',')[0]}`} alt="" />
                                    </span>
                                    <div class="mt-4">
                                        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{plant.category}</h3>
                                        <h2 class="text-gray-900 title-font text-lg font-medium">{plant.name}</h2>
                                        <p class="mt-1">Rs. {plant.price}</p>

                                        <Link to={`/product/${plant.id}`}>
                                            <button className="inline-flex items-center text-white bg-[#00967C] border-0 py-1 px-24 focus:outline-none hover:bg-[#1B4636] rounded text-base mt-4 md:mt-0">Buy
                                            </button></Link>
                                    </div>
                                </div>

                            ))}



                        </div>
                    </div>

                </div>
         
                </div>
            <Footer />
        </>
    )
}

export default Searchpage