import React, { useState, useEffect } from 'react'

import { MdSpaceDashboard } from 'react-icons/md';
import { GiPlantRoots } from 'react-icons/gi';

import { FaAccusoft } from 'react-icons/fa';
import { MdOutlinePayments } from 'react-icons/md';
import { BsShopWindow } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineDomainVerification } from 'react-icons/md';
import { TbTruckReturn } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { CiChat1 } from "react-icons/ci";
import logo from '../../images/LOGO.png';

import { loadStripe } from '@stripe/stripe-js';


function Sidebar() {
    const [id, setid] = useState(localStorage.getItem('user_id'));
    const [isverifieddata, setisverifieddata] = useState();
    useEffect(() => {

        setid(localStorage.getItem('user_id'));
    }, [id]);

    const makePayment = async () => {

        const stripe = await loadStripe("pk_test_51OjdVEDLpC8Qo70IVmrn9xp7fa7RdrqIaACe9hBZF7MnFFHPjGE60paFnFR2hmSaEvYu4pnMf5Vvvix3kXtrMbHe00nTi6bTjs");

        const body = {
            amount: 50
        }

        const headers = {
            "Content-Type": "application/json"
        }
        const response = await fetch(`http://localhost:5000/payment/SellerPaymentMethod/${id}`, {
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

    const Userdata = async () => {
        try {
            const response = await fetch(`http://localhost:5000/user/isverified/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const userdata = await response.json();
            console.log(userdata);
            setisverifieddata(userdata.data[0].user_status);
            console.log(userdata.data[0].user_status);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        Userdata();
    }, []);

    const information =() => {
        alert("Yor are not verified please verify your profile by profile verify link");
        
    };

    return (
        <>
            <h1 className='pt-8 text-2xl font-bold text-center '>Seller Dashboard</h1>

            <ol className='pt-5 text-lg cursor-pointer'>
                <Link to="/SellerDashboard">
                    <li className='pt-2 pb-2 pl-6 rounded-md hover:bg-green-500'>< MdSpaceDashboard className="inline text-white" />
                        &nbsp; Dashboard
                    </li>
                </Link>
                
                {isverifieddata == 0 ?
                
                <Link to="/addplant">
                    <li className='pt-2 pb-2 pl-6 rounded-md hover:bg-green-500'>< GiPlantRoots className="inline text-white" />
                        &nbsp; Add plant</li>
                </Link>
                    :
                    <Link to="/addplant">
                    <li className='pt-2 pb-2 pl-6 rounded-md hover:bg-green-500'>< GiPlantRoots className="inline text-white" />
                        &nbsp; Add plant</li>
                </Link>}
               
                <Link to="/Products" >
                    <li className='pt-2 pb-2 pl-6 rounded-md hover:bg-green-500'>< BsShopWindow className="inline text-white" />
                        &nbsp; All Products</li></Link>

                <Link to="/myorders">
                    <li className='pt-2 pb-2 pl-6 rounded-md hover:bg-green-500'>< FaAccusoft className="inline text-white" /> &nbsp;
                        Orders</li></Link>
                <Link to="/paymenthistory">
                    <li className='pt-4 pb-2 pl-6 rounded-md hover:bg-green-500'> < MdOutlinePayments className="inline text-white" /> &nbsp;
                        Payments history</li>
                </Link>
                <Link to="/yournurcery">
                    <li className='pt-4 pb-2 pl-6 rounded-md hover:bg-green-500'>< CgProfile className="inline text-white" /> &nbsp;
                        Your nursery</li></Link>


                <Link to="/Profileverify" ><li className='pt-4 pb-2 pl-6 rounded-md hover:bg-green-500'>< MdOutlineDomainVerification className="inline text-white" /> &nbsp;
                    Verify Profile</li> </Link>
                <Link to="/returns" >
                    <li className='pt-4 pb-2 pl-6 rounded-md hover:bg-green-500'>< TbTruckReturn className="inline text-white" /> &nbsp;
                        Returns</li></Link>
                        
                <Link to="/chatbusiness" >
                    <li className='pt-4 pb-2 pl-6 rounded-md hover:bg-green-500'><CiChat1  className="inline text-white" /> &nbsp;
                        Chat</li></Link>

                        <i class="fa-brands fa-rocketchat"></i>
                <li className='pt-4 pb-2 pl-6 rounded-md hover:bg-green-500'>< MdOutlinePayments className="inline text-white" /> &nbsp;
                    <button onClick={makePayment}>Add Bank</button></li>

                <Link to="/" >
                    <li className='pt-4 pb-2 pl-12 rounded-md hover:bg-green-500'> <img className='fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2" viewBox="0 0 24 24"' src={logo} alt="" /> Rooftop</li>
                </Link>

            </ol>
        </>
    )
}

export default Sidebar