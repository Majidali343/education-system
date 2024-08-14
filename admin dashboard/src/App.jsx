
import { Link, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import { PrimeReactProvider } from 'primereact/api';
import Login from "./AdminDashboard/Login";
import Allusers from "./AdminDashboard/Allusers";
import Admindashboard from "./AdminDashboard/Admindashboard";
import Profileverify from "./AdminDashboard/ProfileVerify";
import Orders from "./AdminDashboard/Orders";
import Returns from "./AdminDashboard/Returns";



function App() {
  return (
    <>
     <ToastContainer />
      <PrimeReactProvider>

        <Routes>

        <Route path="/" element={<Login/>}></Route> 
        <Route path="/Profileverify" element={<Profileverify />}></Route>
        <Route path="/Allusers" element={<Allusers/>}></Route>
        <Route path="/Admindashboard" element={<Admindashboard/>}></Route>
        <Route path="/myorders" element={<Orders />}></Route>
        <Route path="/returns" element={<Returns />}></Route>

        </Routes>

      </PrimeReactProvider>
    </>

  );
}

export default App;
