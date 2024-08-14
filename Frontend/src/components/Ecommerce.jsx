import React from 'react'
import img15 from '../images/img15.png'
import img1 from '../images/img1.jpg'
import img2 from '../images/img2.jpg'
import img3 from '../images/img3.jpg'
import img4 from '../images/img4.jpg'
import img5 from '../images/img5.jpg'
import img6 from '../images/img6.jpg'
import img7 from '../images/img7.jpg'
import img12 from '../images/img12.jpg'
import seed from '../images/seed.png'
import fruit2 from '../images/fruit2.png'
import vegetable from '../images/vegetable.png'
import flower from '../images/flower.png'
import { Link } from 'react-router-dom'

export default function Ecommerce() {
  return (
    <div className='ml-5'>
      <div className='pl-12 ml-10 text-xl font-bold'>Categories</div>
      <section className="text-gray-600 body-font">

        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">

              <div className="w-full p-4 lg:w-1/4 md:w-1/2">
            <Link to={'/categoryPlants/fruits'}>
                <span className='relative block h-48 overflow-hidden rounded'>
                  <img className='block object-cover object-center w-full h-full' src={fruit2} alt="" />
                </span>
                <div className="pl-32 mt-4">
                  <h3 className="mb-1 text-xs tracking-widest text-gray-500 title-font">PLANTS</h3>
                  <h2 className="text-lg font-medium text-gray-900 title-font">Fruits</h2>
                </div>
            </Link>
              </div>

              <div className="w-full p-4 lg:w-1/4 md:w-1/2">
            <Link to={'/categoryPlants/vegetables'}>
                <span className='relative block h-48 overflow-hidden rounded'>
                  <img className='block object-cover object-center w-full h-full' src={img12} alt="" />
                </span>
                <div className="pl-32 mt-4">
                  <h3 className="mb-1 text-xs tracking-widest text-gray-500 title-font">PLANTS</h3>
                  <h2 className="text-lg font-medium text-gray-900 title-font">Vegetables</h2>
                </div>
            </Link>
              </div>
              <div className="w-full p-4 lg:w-1/4 md:w-1/2">
            <Link to={'/categoryPlants/flowers'}>
                <span className='relative block h-48 overflow-hidden rounded'>
                  <img className='block object-cover object-center w-full h-full' src={flower} alt="" />
                </span>
                <div className="pl-32 mt-4">
                  <h3 className="mb-1 text-xs tracking-widest text-gray-500 title-font">PLANTS</h3>
                  <h2 className="text-lg font-medium text-gray-900 title-font">Flowers</h2>
                </div>
            </Link>
              </div>

              <div className="w-full p-4 lg:w-1/4 md:w-1/2">
            <Link to={'/categoryPlants/seeds'}>
                <span className='relative block h-48 overflow-hidden rounded'>
                  <img className='block object-cover object-center w-full h-full' src={seed} alt="" />
                </span>
                <div className="pl-32 mt-4">
                  <h3 className="mb-1 text-xs tracking-widest text-gray-500 title-font">PLANTS</h3>
                  <h2 className="text-lg font-medium text-gray-900 title-font">Seeds</h2>
                </div>
            </Link>
              </div>

          </div>
        </div>
      </section>
    </div>
  )
}
