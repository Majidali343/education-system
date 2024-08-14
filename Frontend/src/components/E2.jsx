import React ,{useEffect,useState } from 'react'

import { Link } from 'react-router-dom'

import img12 from '../images/img12.jpg'

export default function E2() {

  const [plantData, setPlantData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/plant/get`);

        const data = await response.json();
        
        setPlantData(data.rows);

      } catch (error) {
        console.error('Error fetching plant data:', error);
      }
    };
    window.scrollTo(0, 0);
    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render




  return (
    <div className='ml-5'>
      <div className='pl-12 ml-10 text-xl font-bold'>New Arrivals</div>
      <section className="text-gray-600 body-font">
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

                  <Link to= {`/product/${plant.id}`}>
                    <button onClick={()=> window.scrollTo(0, 0) } className="inline-flex items-center text-white bg-[#00967C] border-0 py-1 px-24 focus:outline-none hover:bg-[#1B4636] rounded text-base mt-4 md:mt-0">Buy
                    </button></Link>
                </div>
              </div>

            ))}


          </div>
        </div>

      </section>
    </div>
  )
}
