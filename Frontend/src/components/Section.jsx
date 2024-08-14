import React from 'react'

import img15 from'../images/img15.png';


const Section=()=>{
  return (
    <div>
      <section class="text-gray-600 body-font">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-12 items-center text-center mx-20">
      <div className='mb-4 text-3xl font-medium text-gray-900 title-font sm:text-4xl'>Life is short
      <br />
      <div class="hidden lg:inline-block">Buy the plants</div>
      </div>
      <p class="mb-8 leading-relaxed">Discover joy in plants! Our site sells happy greens – colorful flowers, cute succulents, and more. Each plant is cared for with love. Bring nature home! Shop now for your new green friend.</p>
      <div class="flex justify-center">
        
      
        <button onClick={()=> window.scrollTo(0, 900)} class="inline-flex text-white bg-[#00967C] border-0 py-2 px-7 focus:outline-none
         hover:bg-[#1B4636] rounded text-lg"> Categories </button>
        <button onClick={()=> window.scrollTo(0, 1300)} class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">New Arrivals</button>
      </div>
    </div>
    <div className='w-5/6 mx-20 lg:max-w-s lg:w-s md:w-1/2'>
        <img className='' src={img15} alt="" />
    </div>
       


  </div>


  
</section>

    </div>
  )
}

export default Section;