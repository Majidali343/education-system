
import React from 'react';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaAccusoft } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineDomainVerification } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { TbTruckReturn } from 'react-icons/tb';

function Sidebar() {
    return (
        <>
            <h1 className='pt-8 text-2xl font-bold text-center '>Admin Dashboard</h1>

            <ol className='pt-5 text-lg cursor-pointer'>
                <Link to="/Admindashboard">
                    <li className='pt-2 pb-2 pl-6 rounded-md hover:bg-green-500'>< MdSpaceDashboard className="inline text-white" />
                        &nbsp; Dashboard
                    </li>
                </Link>
                <Link to="/Allusers">
                    <li className='pt-2 pb-2 pl-6 rounded-md hover:bg-green-500'>< CgProfile className="inline text-white" />
                        &nbsp; All Users</li>
                </Link>
                <Link to="/Profileverify" ><li className='pt-4 pb-2 pl-6 rounded-md hover:bg-green-500'>< MdOutlineDomainVerification className="inline text-white" /> &nbsp;
                    Verify Profile</li>
                     </Link>
                <Link to="/myorders">
            <li className='pt-2 pb-2 pl-6 rounded-md hover:bg-green-500'>< FaAccusoft className="inline text-white" /> &nbsp;
                Orders</li></Link>
                <Link to="/returns" >
                    <li className='pt-4 pb-2 pl-6 rounded-md hover:bg-green-500'>< TbTruckReturn className="inline text-white" /> &nbsp;
                        Returns</li></Link>

            </ol>
        </>
    )
}

export default Sidebar