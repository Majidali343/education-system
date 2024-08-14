
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/LOGO.png';
import { useNavigate } from 'react-router-dom';





const Nav = () => {

  const navigae = useNavigate();
  const [user_id, setUser_id] = useState(localStorage.getItem('user_id'));
  const [user_type, setUser_type] = useState(localStorage.getItem('user_type'));
  const [user_name, setuser_name] = useState(localStorage.getItem('user_name'));
  const [buyerStats, setBuyerStats] = useState({
    total_cart: '',
    total_order_count: ''
  });

  const [products, setproducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/plant/get`);

        const data = await response.json();

        setproducts(data.rows);

      } catch (error) {
        console.error('Error fetching plant data:', error);
      }
    };

    fetchData();
  }, []);


  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on search query
  const filteredProducts = searchQuery ?
    products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];


  const logout = () => {
    localStorage.clear();
    setUser_id(null);
    setUser_type(null);
    navigae('/');
  };

  const searchdata = () => {
    console.log(searchQuery)
    if (searchQuery) {
      navigae(`/search/${searchQuery}`)
     }
  }
  useEffect(() => {

    setUser_id(localStorage.getItem('user_id'));
    setUser_type(localStorage.getItem('user_type'));
  }, [user_id, user_type]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/order/buyerstatics/${user_id}`);
        const data = await response.json();

        // Update the state variable with the fetched data
        setBuyerStats(data);
      } catch (error) {
        console.error('Error fetching buyer statistics:', error);
      }
    };

    fetchData();
  }, [user_id]);

  return (
    <header class="text-gray-700 body-font">
      <div class="container cursor-pointer mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to="/">
          <span class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img className='fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2" viewBox="0 0 24 24"' src={logo} alt="" />
            <span d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></span>
            <span class="ml-3 cursor-pointer text-xl">RoofTop Cultivation</span>
          </span>
        </Link>


        <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-black	flex flex-wrap items-center text-base gap-8 ">
          {
            user_type == 1 ?
              <div></div>
              :
              <div className='flex justify-between gap-6 ml-20'>
                <Link to="/My_Orders">
                  <div>
                    {!user_id ?
                      <></>
                      :
                      <div className="relative inline-block">
                        <div className="absolute flex items-center justify-center w-5 h-5 text-white bg-red-500 rounded-full -top-1 -right-1">
                          <span>{buyerStats.total_order_count}</span>
                        </div>
                      </div>}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="hover:animate-ping duration-1000 w-6 h-6">
                      <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                    </svg>

                  </div>

                </Link>
                <Link to={`/cart`}>
                  <div>
                    {!user_id ?
                      <></>
                      :
                      <div className="relative inline-block">
                        <div className="absolute flex items-center justify-center w-5 h-5 text-white bg-red-500 rounded-full -top-1 -right-1">
                          <span>{buyerStats.total_cart}</span>
                        </div>
                      </div>
                    }


                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="hover:animate-ping duration-1000 w-6 h-6">
                      <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clip-rule="evenodd" />
                    </svg>

                  </div>
                </Link>
                
                {!user_id ?
                      <Link to={'/About'} >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="hover:animate-ping duration-1000 w-6 h-6 ">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                      </svg></Link>
                      :
                      <Link to={'/About'} className='pt-[25px]'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="hover:animate-ping duration-1000 w-6 h-6 ">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                      </svg></Link>
                    }
               

              </div>

          }


          <div>

            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative w-[300px]">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input value={searchQuery}
                onChange={handleSearchInputChange}
                type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search plants, flowers..." required />
              <button type="button" onClick={searchdata} class="text-white absolute end-2.5 bottom-2.5 bg-[#00967C] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300  rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Search</button>
            </div>


          </div>




          {user_id ?
            (
              user_type == 1 ?
                (
                  <div className='flex justify-between gap-2 ml-64'>

                    <button className="inline-flex items-center text-white bg-[#00967C] border-0 py-1 px-4 focus:outline-none hover:bg-[#1B4636] rounded text-base mt-4 md:mt-0" onClick={logout} >Logout
                    </button>
                    <Link to="SellerDashboard">
                      <button className="inline-flex items-center text-white bg-[#00967C] border-0 py-1 px-4 focus:outline-none hover:bg-[#1B4636] rounded text-base mt-4 md:mt-0"  >Seller dashboard
                      </button>
                    </Link>

                  </div>
                ) :
                (
                  <div className='flex justify-between gap-2 ml-20'>

                    <button className="inline-flex items-center text-white bg-[#00967C] border-0 py-1 px-4 focus:outline-none hover:bg-[#1B4636] rounded text-base mt-4 md:mt-0" onClick={logout} >Logout
                    </button>

                    <button className="inline-flex items-center text-white bg-[#00967C] border-0 py-1 px-4 focus:outline-none hover:bg-[#1B4636] rounded text-base mt-4 md:mt-0"  >{user_name}
                    </button>


                  </div>
                )


            )
            :
            (<div className='flex justify-between gap-4 ml-20'>
              <Link to="/Login">
                <button className="rounded-full shadow-lg inline-flex items-center text-white bg-[#00967C] border-0 py-1 px-4 focus:outline-none hover:bg-[#1B4636] rounded text-base mt-4 md:mt-0">Sign In
                </button></Link>
              <Link to="/Register">
                <button className="rounded-full shadow-lg inline-flex items-center text-white bg-[#00967C] border-0 py-1 px-3 focus:outline-none hover:bg-[#1B4636] rounded text-base mt-4 md:mt-0">Sign Up
                </button></Link>
            </div>)
          }

        </nav>

      </div>

      {searchQuery && (
        <div className='absolute w-6/12 m-auto mt-2 bg-white rounded-lg shadow-lg left-1/4 max-h-[339px] overflow-y-scroll z-10 ' style={scrollbarStyle}>
          {filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.map(product => (
                <Link to={`/product/${product.id}`}>
                  <li className='p-3 font-medium border-b rounded-md cursor-pointer hover:bg-slate-300' key={product.id}>
                    <div className='flex '>
                      <img className='block object-cover object-center w-12 h-10' src={`http://localhost:5000/uploads/${product.images.split(',')[0]}`} alt="" />
                      <p className='ml-8'>{product.name}</p>
                    </div>

                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p className='p-4'>No products found.</p>
          )}
        </div>
      )}
    </header>
  )
}

const scrollbarStyle = {
  /* For WebKit (Chrome, Safari, etc.) */
  scrollbarWidth: 'thin',
  scrollbarColor: '#888 #f1f1f1',
};

export default Nav;
