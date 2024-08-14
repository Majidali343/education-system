
import { Link, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';


import Sellerdashboard from "./Dashboards/SellerDashboard/Sellerdashboard";
import { PrimeReactProvider } from 'primereact/api';
import Home from "./components/Pages/Home"
import Profileverify from './Dashboards/SellerDashboard/Profileverify';
import Addplant from './Dashboards/SellerDashboard/Addplant';
import Orders from './Dashboards/SellerDashboard/Orders';
import PaymentHistory from './Dashboards/SellerDashboard/PaymentHistory';
import Yournurcery from './Dashboards/SellerDashboard/YourNurcery';
import Returns from './Dashboards/SellerDashboard/Returns';
import AllProducts from './Dashboards/SellerDashboard/AllProducts';
import Checkout from "./components/Pages/Cart";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register"
import Product from "./components/Pages/Product";
import Forgot from "./components/Pages/Forgot";
import Business from "./components/Pages/Business";
import Chat from "./components/Pages/Chat";
import About from "./components/Pages/About";
import Forgotpassword from "./components/Pages/Forgotpassword";
import UpdatePlant from "./Dashboards/SellerDashboard/UpdatePlant";
import ChatBusiness from './Dashboards/SellerDashboard/businesschat';
import My_Orders from "./components/Pages/My_Orders";
import My_Order_Buyer from "./components/Pages/My_Order_Buyer";
import CategoryPlants from "./components/Pages/CategoryPlants"
import Verifyemail from "./components/Pages/Verifyemail";
import socketIO from 'socket.io-client';
import Searchpage from "./components/Pages/Searchpage";
const socket = socketIO.connect('http://localhost:5000');


function App() {
  return (
    <>
     <ToastContainer />
      <PrimeReactProvider>

        <Routes>
         
          <Route path="/Profileverify" element={<Profileverify />}></Route>
          <Route path="/addplant" element={<Addplant />}></Route>
          <Route path="/update/:id" element={<UpdatePlant />}></Route>
          <Route path="/myorders" element={<Orders />}></Route>
          <Route path="/paymenthistory" element={<PaymentHistory />}></Route>
          <Route path="/yournurcery" element={<Yournurcery />}></Route>
          <Route path="/returns" element={<Returns />}></Route>
          <Route path="/Products" element={<AllProducts />}></Route>
          <Route path="/SellerDashboard" element={<Sellerdashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/emailverify" element={<Verifyemail/>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/forgot/:id" element={<Forgot />}></Route>
          <Route path="/forgotpassword" element={<Forgotpassword />}></Route>
          <Route path="/cart" element={<Checkout />}></Route>
          <Route path="/My_Orders" element={<My_Orders/>}></Route>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/business/:id" element={<Business />}></Route>
          <Route path="/categoryPlants/:category" element={<CategoryPlants/>}></Route>
          <Route path="/chatbusiness" element={<ChatBusiness  socket={socket} />}></Route>
          <Route path="/chat/:chatid" element={<Chat socket={socket}/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/search/:product" element={<Searchpage/>}></Route>
       
          <Route path="/My_Orders_Buyer" element={<My_Order_Buyer/>}></Route>
        </Routes>

      </PrimeReactProvider>
    </>

  );
}

export default App;

