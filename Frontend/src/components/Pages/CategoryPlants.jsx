import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../Nav';
import { Link } from 'react-router-dom';

export default function CategoryPlants() {
  const { category } = useParams();
  const [plantData, setPlantData] = useState([]);
  const [filters, setFilters] = useState({
    inoutdoor: '',
    size: '',
    sensitivity: '',
    minPrice: 500,
    maxPrice: 3000
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/plant/categoryplants/${category}`);
        const data = await response.json();
        setPlantData(data.rows);
        console.log(data.rows)
      } catch (error) {
        console.error('Error fetching plant data:', error);
      }
    };
    window.scrollTo(0, 0);
    fetchData();
  }, [category]);

  
  // Apply filters to the plant data
  const filteredPlantData = plantData.filter(plant => {
    return (
      (filters.inoutdoor === '' || plant.inoutdoor === filters.inoutdoor ) &&
      (filters.size === '' || plant.size === filters.size) &&
      (filters.sensitivity === '' || plant.sensitivity === filters.sensitivity) &&
      plant.price >= filters.minPrice &&
      plant.price <= filters.maxPrice
    );
  });

  // Function to handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  return (
    <>
      <Nav />
      <div className='mt-12 ml-5'>
        <div className='pl-12 ml-10 text-xl font-bold'>{category}</div>

        {/* Filter section */}
        <div className="flex justify-around mt-5 ">
          <select className='inline p-2 border-2 rounded-xl w-[14%]'
            onChange={e => handleFilterChange('inoutdoor', e.target.value)} value={filters.inoutdoor}>
             <option value="both" default >select</option>
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
              <option value="both">Both</option>
          </select>

          <select className='inline p-2 border-2 rounded-xl w-[14%]'
            onChange={e => handleFilterChange('size', e.target.value)} value={filters.size}>
              <option value="medium" default >Size</option>
              <option  value="small">Small plant</option>
              <option value="medium">Medium size palnt</option>
              <option value="big">Big Plant</option>
          </select>

          <select className='inline p-2 border-2 rounded-xl w-[14%]'
            onChange={e => handleFilterChange('sensitivity', e.target.value)} value={filters.sensitivity}>
             <option value="medium" default >Sensitivity</option>
              <option  value="high">Plats need a lot of care</option>
              <option value="medium">Plats need some care</option>
              <option value="low">Plats need little care</option>
          </select>

          <div className="inline p-2  w-[44%]">
          Price Range:
          {[500, 1000, 1500, 2000, 2500, 3000].map((price, index) => (
            <label key={index} className="ml-2">
              <input type="radio" name="price" value={price} onChange={e => handleFilterChange('minPrice', parseInt(e.target.value))} checked={filters.minPrice === price} />
              {price}
            </label>
          ))}
          <label className="ml-2">
            <input type="radio" name="price" value="3000+" onChange={e => handleFilterChange('minPrice', 3000)} checked={filters.minPrice === 3000} />
            3000+
          </label>
        </div>
        </div>

        {/* Price range filter */}
       

        {/* Product list */}
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-12 mx-auto">
            <div className="flex flex-wrap -m-4">
              {filteredPlantData.map((plant, index) => (
                <div className="w-full p-4 lg:w-1/4 md:w-1/2" key={index}>
                  <span className='relative block h-48 overflow-hidden rounded w-[235px]'>
                    <img className='block object-cover object-center w-full h-full' src={`http://localhost:5000/uploads/${plant.images.split(',')[0]}`} alt="" />
                  </span>
                  <div className="mt-4">
                    <h3 className="mb-1 text-xs tracking-widest text-gray-500 title-font">{plant.category}</h3>
                    <h2 className="text-lg font-medium text-gray-900 title-font">{plant.name}</h2>
                    <p className="mt-1">Rs. {plant.price}</p>
                    <Link to={`/product/${plant.id}`}>
                      <button onClick={() => window.scrollTo(0, 0)} className="inline-flex items-center text-white bg-[#00967C] border-0 py-1 px-24 focus:outline-none hover:bg-[#1B4636] rounded text-base mt-4 md:mt-0">Buy</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
