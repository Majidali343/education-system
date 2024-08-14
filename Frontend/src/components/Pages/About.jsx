import React from 'react'
import Header from "../Header";
import Nav from "../Nav";
import Footer from "../Footer";
import Aboutus from '../Pages/images2/Aboutus.webp';
import Akash from '../Pages/images2/Akash2.jpg';
import Ashba from '../Pages/images2/Ashba.jpg';
import Majid from '../Pages/images2/Majid.jpg';

import video1 from '../../../src/videos/video1.mp4';
import video2 from '../../../src/videos/video2.mp4';
import video3 from '../../../src/videos/video3.mp4';

function About() {
  return (
    <>

    <Header />
    <Nav />
  
    <div>
        <div class="container mx-auto py-10 px-20">
        <div class="md:flex md:items-center md:justify-between my-10 gap-5">
            <div class="md:w-1/2 md:pr-12">
                <h1 class="text-4xl font-bold mb-10 mt-20">About Our Company</h1>
                <p class="text-gray-700 leading-relaxed mb-4">
                  Welcome to our Rooftop Cultivation company dedicated to empowering individuals with the knowledge and resources to cultivate plants, enhance their surroundings, and contribute to a cleaner environment. At our core, we specialize in providing guidance on plant care, propagation techniques, and innovative methods for selling plants to generate income sustainably.
                </p>
                <p class="text-gray-700 leading-relaxed mb-4">
                    We are dedicated to providing innovative solutions and excellent service to our customers.
                </p>
                <div></div>
            </div>
            <div class="md:w-1/2">
                <img src={Aboutus} alt="Team" class="rounded-lg shadow-md"/>
            </div>
        </div>
        
        <div class="m-2 my-20">
          <h2 class="text-2xl text-center font-bold mb-10 mt-32">Services</h2>
          <p class="text-gray-700 leading-relaxed text-center">
            At our Rooftop Cultivation, we provide a range of essential services to support individuals in their journey towards cultivating green spaces and contributing to a cleaner environment. Our offerings include expert plant care guidance and propagation techniques, ensuring that every plant thrives in its unique environment. Additionally, we offer educational resources aimed at empowering individuals to create green oases within their homes, even in limited spaces like rooftops. Our focus on sustainable income generation encourages learning innovative methods to sell plants responsibly, generating income while positively impacting the environment. We pride ourselves on our seamless delivery system, ensuring that plants reach customers' doorsteps safely and promptly. Moreover, our commitment to environmental stewardship is reflected in our sustainable packaging and delivery practices, minimizing our ecological footprint. Join us in this journey towards transforming spaces, promoting green living, and fostering a deeper connection with nature. Together, let's sow the seeds of a greener, more vibrant future.
          </p>
      </div>
      <div class="m-2 my-20">
        <h2 class="text-2xl text-center font-bold mb-10 mt-32">Target Market</h2>
        <p class="text-gray-700 leading-relaxed text-center my-14">
          Rooftop Cultivation company is tailored to serve a diverse and environmentally-conscious target market. We cater to individuals who are passionate about cultivating green spaces, whether they are seasoned gardeners or beginners seeking guidance. Our services are ideal for homeowners, renters, and urban dwellers looking to incorporate more greenery into their living environments, including those with limited space such as rooftops or indoor areas.
        </p>
        <p class="text-gray-700 leading-relaxed text-center my-14">
          Our educational resources are particularly valuable for individuals interested in sustainable living and those seeking to learn how to create and maintain green oases within their homes. We aim to empower our customers with the knowledge and tools necessary to care for plants effectively and contribute positively to the environment.
        </p>
        <p class="text-gray-700 leading-relaxed text-center my-14">
          Furthermore, our focus on sustainable income generation attracts entrepreneurs and individuals interested in exploring innovative ways to generate income through responsible plant selling practices. Whether someone is looking to start a side business or incorporate green initiatives into an existing venture, our services offer valuable insights and strategies.
        </p>
        <p class="text-gray-700 leading-relaxed text-center my-14">
          Our seamless delivery system appeals to busy professionals and individuals who appreciate convenience and reliability. By ensuring plants reach our customers' doorsteps safely and promptly, we strive to provide an exceptional experience from start to finish.
        </p>
        <p class="text-gray-700 leading-relaxed text-center my-14 mb-32">
          Ultimately, our target market consists of environmentally-conscious individuals and businesses who share our vision of transforming spaces, promoting green living, and fostering a deeper connection with nature. We invite anyone passionate about sustainability and plant cultivation to join us in sowing the seeds of a greener, more vibrant future.
        </p>
    </div>

        <div>
          <h1 class="text-2xl text-center font-bold mb-10">Developer Team</h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg px-10 py-3">
                <div class="p-4 flex items-center">
 
                    <img src= {Akash} alt="Team Member" class="w-16 h-16 rounded-full border-4 border-gradient-to-br from-green-400 to-blue-500"/>

          
                    <div class="ml-4">
                        <h3 class="text-base font-bold mb-2">Akash Haider</h3>
                        <p class="text-gray-700 text-sm">Frontend Developer</p>
                    </div>
                </div>
            </div>
            

            <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg px-10 py-3">
                <div class="p-4 flex items-center">
           
                    <img src={Majid} alt="Team Member" class="w-16 h-16 rounded-full border-4 border-gradient-to-br from-green-400 to-blue-500"/>

              
                    <div class="ml-4">
                        <h3 class="text-base font-bold mb-2">Majid Ali</h3>
                        <p class="text-gray-700 text-sm">Backend Developer</p>
                    </div>
                </div>
            </div>

            <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg px-10 py-3">
                <div class="p-4 flex items-center">
                
                    <img src={Ashba} alt="Team Member" class="w-16 h-16 rounded-full border-4 border-gradient-to-br from-green-400 to-blue-500"/>

                  
                    <div class="ml-4">
                        <h3 class="text-base font-bold mb-2">M. Ashba</h3>
                        <p class="text-gray-700 text-sm">Backend Developer</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="m-12 my-20">
            <h2 class="text-2xl text-center font-bold mt-32 mb-10">Our Mission</h2>
            <p class="text-gray-700 leading-relaxed text-center mb-10">
              Our mission goes beyond mere plant sales. We aim to educate and inspire individuals on the benefits of nurturing greenery, even in limited spaces like rooftops and indoors. We provide comprehensive advice on maximizing space efficiency and creating thriving green environments indoors and outdoors.
            </p>
        </div>
    </div>

    </div>
    <div class="max-w-[1200px] mx-auto py-2">
    <h1 class="text-2xl text-center font-bold ">Video Guidance</h1>
      </div>
      <div class="max-w-[1100px] mx-auto grid lg:grid-cols-3 sm:grid-cols-2 gap-5 py-20 pt-30 ">


        <video controls w-400 h-200 class="rounded-lg" src={video1} >unavailble</video>

        <video controls w-400 h-200 class="rounded-lg" src={video2}>unavailble</video>

        <video controls w-400 h-200 class="rounded-lg" src={video3}>unavailble</video>

       
      </div>
    <Footer/>
    </>
  )
}

export default About
