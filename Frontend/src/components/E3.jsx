import React from 'react'
import img2 from'../images/img2.jpg'
import img12 from'../images/img12.jpg'
import img15 from'../images/img15.png'
import img16 from'../images/img16.png'

export default function E3() {
  return (
    <div>
      <section className="text-gray-600 body-font">
  <div className="container flex flex-wrap px-5 py-24 mx-auto">
    <div className="mx-auto lg:w-2/3">
      <div className="relative flex flex-wrap w-full px-10 py-32 mb-4 bg-gray-100">
        <img className="absolute inset-0 block object-center h-full opacity-25 w-50 pr-50" src={img15} alt="image" />
        <div className="relative z-10 w-full text-center">
          <h2 className="mb-2 text-2xl font-medium text-gray-900 title-font">Vegetables</h2>
          <p className="leading-relaxed">Grow your own veggies! Find a variety of high-quality vegetable seeds on our site. Start your tasty garden adventure today!</p>
          <a className="mt-3 text-[#00967C] inline-flex items-center">Learn More
            <svg fill="none" stroke="currentColor" stroklinecap="round" strokeLinejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <span d="M5 12h14M12 5l7 7-7 7"></span>
            </svg>
          </a>
        </div>
      </div>
      <div className="flex flex-wrap -mx-2 ">
        <div className="w-1/2 px-2">
          <div className="relative flex flex-wrap w-full px-6 py-16 bg-gray-100 sm:py-24 sm:px-10">
            <img className="absolute inset-0 block object-center w-full pt-12 opacity-25 h-50" src={img16} alt="image" />
            <div className="relative z-10 w-full text-center">
              <h2 className="mb-2 text-xl font-medium text-gray-900 title-font">Seeds</h2>
              <p className="leading-relaxed">Seed the future of your meals! Explore our range of vegetable seeds and embark on a delicious adventure of homegrown goodness.</p>
              <a className="mt-3 text-[#00967C] inline-flex items-center">Learn More
                <svg fill="none" stroke="currentColor" stroklinecap="round" strokeLinejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <span d="M5 12h14M12 5l7 7-7 7"></span>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="w-1/2 px-2">
          <div className="relative flex flex-wrap w-full px-6 py-16 bg-gray-100 sm:py-24 sm:px-10">
            <img alt="image" className="absolute inset-0 block object-cover object-center w-full opacity-25 h-50" src={img12}/>
            <div className="relative z-10 w-full text-center">
              <h2 className="mb-2 text-xl font-medium text-gray-900 title-font">Fruits</h2>
              <p className="leading-relaxed">Experience the freshest flavors delivered to your door! Explore our online fruit market and savor the natural goodness of premium fruits. Your delicious journey begins here.</p>
              <a className="mt-3 text-[#00967C] inline-flex items-center">Learn More
                <svg fill="none" stroke="currentColor" stroklinecap="round" strokeLinejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <span d="M5 12h14M12 5l7 7-7 7"></span>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
