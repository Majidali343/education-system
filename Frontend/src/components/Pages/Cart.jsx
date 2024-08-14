import React, { useState, useEffect } from 'react'
import Header from "../Header";
import Nav from "../Nav";
import { useParams } from 'react-router-dom';
import { IoAddCircleOutline } from "react-icons/io5";
import { GrSubtractCircle } from "react-icons/gr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { loadStripe } from '@stripe/stripe-js';

function Checkout() {
  const param = useParams();

  const [id, setid] = useState(localStorage.getItem('user_id'));
  useEffect(() => {

    setid(localStorage.getItem('user_id'));
  }, [id]);

  const [address , setaddress] =useState();
  const [cartData, setCartData] = useState([]);
  const [carttotal, setcarttotal] = useState()

  const handleDelete = async (cartId) => {
    try {
      const isConfirmed = window.confirm('Are you sure you want to delete this product?');

      if (!isConfirmed) {
        // If the user cancels the deletion, do nothing
        return;
      }
      // Make an API call to delete the plant with the given plantId

      const response = await fetch(`http://localhost:5000/cart/deletecartitem/${cartId}`, {
        method: 'DELETE',
        // You may need to include headers or credentials based on your API setup
      });

      if (response.ok) {
        // If the API call is successful, update the state to remove the deleted plant

        toast.success("Successfully deleted a cart item", {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchData();
        cartTotal();
      } else {
        console.error('Failed to delete cart item');
      }
    } catch (error) {
      console.error('Error deleting cartitem:', error);
    }
  };

  const getaddress = async () => {
    try {
      const response = await fetch(`http://localhost:5000/user/getaddress/${id}`);
      const data = await response.json();
      setaddress(data.address[0].delievery_address);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const saveaddress = async () =>{
    if (!address) {
      toast.warning("Please enter delivery address", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (address.length < 18 || address.length > 100) {
      toast.error("Please give detailed address", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (/^\d+$/.test(address)) {
      toast.warning("Address cannot contain only numbers", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } 
    else if (/[^a-zA-Z0-9\s]/.test(address)) {
      toast.error("Address cannot contain special characters", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }else{
      
      try {
        const response = await fetch(`http://localhost:5000/user/saveaddress/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ address }),
        });
  
        makePayment();
      } catch (error) {
        console.error('Error updating stock:', error);
      }
    }
  }

  // Define the updateStock function
  const updateStock = async (productId) => {
    try {
      const response = await fetch('http://localhost:5000/cart/updateStock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      const result = await response.json();
      console.log(result); // You can handle the result as needed

      // After updating stock, trigger re-fetch of cart data
      fetchData();
      cartTotal();
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };
  const downgradeStock = async (productId) => {
    try {
      const response = await fetch('http://localhost:5000/cart/Downgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      const result = await response.json();
      console.log(result); // You can handle the result as needed

      // After updating stock, trigger re-fetch of cart data
      fetchData();
      cartTotal();
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };


  const cartTotal = async () => {
    try {
      const response = await fetch(`http://localhost:5000/cart/carttotal/${id}`);
      const data = await response.json();
      setcarttotal(data.row[0].total_amount);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/cart/CartItems/${id}`);
      const data = await response.json();
      setCartData(data.rows);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  // Fetch cart data useEffect
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();  // Call fetchData immediately after defining it
    cartTotal();
    getaddress();
  }, [id]); // Include id in the dependency array


  // payment integration
  const makePayment = async () => {

    const stripe = await loadStripe("pk_test_51OjdVEDLpC8Qo70IVmrn9xp7fa7RdrqIaACe9hBZF7MnFFHPjGE60paFnFR2hmSaEvYu4pnMf5Vvvix3kXtrMbHe00nTi6bTjs");

    const body = {
      products: cartData
    }

    const headers = {
      "Content-Type": "application/json"
    }
    const response = await fetch(`http://localhost:5000/payment/Makepayment/${id}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      console.log(result.error);
    }
  }



  return (
    <>

      <Header />
      <Nav />


      <div className="container p-8 mx-auto mt-12">
        <div className="w-full overflow-x-auto">
          <div className="my-2">
            <h3 className="text-xl font-bold tracking-wider">Shopping Cart items</h3>
          </div>
          <table className="w-full shadow-inner">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 font-bold whitespace-nowrap">Image</th>
                <th className="px-6 py-3 font-bold whitespace-nowrap">Product</th>
                <th className="px-6 py-3 font-bold whitespace-nowrap">Qty</th>
                <th className="px-6 py-3 font-bold whitespace-nowrap">Price</th>
                <th className="px-6 py-3 font-bold whitespace-nowrap">Remove</th>
              </tr>
            </thead>
            <tbody>

              {cartData.map((cart, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex justify-center">
                      <img src={`http://localhost:5000/uploads/${cart.images.split(',')[0]}`} className="object-cover h-28 w-28 rounded-2xl" alt="image" />
                    </div>
                  </td>
                  <td className="p-4 px-6 text-center whitespace-nowrap">
                    <div className="flex flex-col items-center justify-center">
                      <h3>{cart.name}</h3>
                    </div>
                  </td>
                  <td className="p-4 px-6 text-center whitespace-nowrap">
                    <div className="flex flex-row items-center justify-center">
                      <GrSubtractCircle onClick={() => downgradeStock(cart.id)} className='mr-2 text-xl text-red-800' />
                      {cart.stock}
                      <IoAddCircleOutline onClick={() => updateStock(cart.id)} className='ml-2 text-2xl text-green-800 ' />
                    </div>
                  </td>
                  <td className="p-4 px-6 text-center whitespace-nowrap">PKR {cart.price}</td>
                  <td className="p-4 px-6 text-center whitespace-nowrap">
                    < RiDeleteBin6Line onClick={() => handleDelete(cart.id)} className="inline text-xl text-red-600" />
                  </td>
                </tr>

              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <div className="py-4 rounded-md shadow">

              <div className="flex items-center justify-between px-4 py-2 mt-3 border-t-2 ">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold">PKR {carttotal}</span>
              </div>
            </div>
          </div>
         
          <div className="mt-4">
            <h2 className='font-bold'>Delivery address</h2>
            <div className='flex justify-between'>
            <input className='inline p-2 border-2 rounded-xl w-[90%]' type="text" value={address} onChange={(e)=>{setaddress(e.target.value)}} />
              <button className="w-20 py-2 text-center text-white bg-[#00967C] rounded-md shadow hover:bg-[#113630]" onClick={saveaddress}>
                save
              </button>
            </div>
           
            </div>

            {address ?
            <div className="mt-4">
              <button className="w-full py-2 text-center text-white bg-[#00967C] rounded-md shadow hover:bg-[#113630]"
              //  onClick={() => {makePayment();saveaddress(); }}
              onClick={saveaddress}
                >
                Proceed to Checkout
              </button>
            </div>
             :
            <div className="mt-4">
            <button className="w-full py-2 text-center text-white bg-[#00967C] rounded-md shadow hover:bg-[#113630]" >
              Enter address to checkout
            </button>
          </div> }
            
         
        </div>
      </div>
    </>
  )
}

export default Checkout