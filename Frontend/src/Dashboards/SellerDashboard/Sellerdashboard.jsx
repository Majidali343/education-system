import { FaBars } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import Sidebar from './Sidebar';

const Sellerdashboard = () => {
  const [user, setUser] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user_id, setUser_id] = useState(localStorage.getItem('user_id'));
  const [dashboardData, setDashboardData] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setUser_id(localStorage.getItem('user_id'));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/dashboard/dashboardDetails/${user_id}`);
        const data = await response.json();
        setDashboardData(data);
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, [user_id]);

  const chartConfig = dashboardData ? {
    type: 'donut',
    width: 1000,
    height: 380,
    series: [dashboardData.orders, dashboardData.returns],
    options: {
      labels: ['Total Orders', 'Total Returns'],
      chart: {
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
              },
            },
          },
        },
      },
      title: {
        text: 'Orders vs Returns ',
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#00897b', '#ff1f23', '#ff1f23'], 
      legend: {
        show: true,
      },
    },
  } : null;

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`pt-[30px] w-[243px] rounded lg:pt-0 bg-green-600 text-white h-screen fixed top-0 left-0 overflow-y-auto transition-transform transform ${isSidebarOpen ? 'w-[300px]' : '-translate-x-full '
          } lg:translate-x-0`}
      >
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className={`md:p-4 lg:ml-64 lg:md-64 lg:pl-0 w-65 sm:w-[100vw] mt-10 lg:mt-0 lg:w-[calc(100vw-243px)] m-auto`}>
        <div className='w-full bg-slate-200 rounded-2xl h-[5%] md:p-5 p-7 sm:pb-8 md:h-[35%] shadow-md'>
          <h2 className='order-first text-2xl font-semibold tracking-tight text-center text-gray-900 sm:text-2xl md:pt-8 '>Welcome to Seller center</h2>
        </div>

        <h1 className='p-4 m-4 text-2xl font-semibold text-gray-900 '>Welcome {user.First_name + " " + user.last_name} </h1>

        <div className="py-5 bg-white md:py-10 md:mt-3">
          <div className="px-6 sm-auto max-w-7xl lg:px-8">
            <dl className="grid grid-cols-1 text-center gap-x-4 gap-y-4 md:grid-cols-3 lg:grid-cols-3">
              <div className="mx-auto flex flex-col gap-y-4 border-2 md:p-10 py-3 rounded-2xl bg-slate-200 w-[235px] md:w-[245px]">
                <dt className="text-xl leading-7 text-gray-600">{dashboardData?.total_amount} pkr</dt>
                <dd className="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl">Total sales</dd>
              </div>
              <div className="mx-auto flex flex-col gap-y-4 border-2 md:p-10 py-3 rounded-2xl bg-slate-200 px-10 w-[235px] md:w-[245px]">
                <dt className="text-xl leading-7 text-gray-600">{dashboardData?.orders}</dt>
                <dd className="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl">Total Orders</dd>
              </div>
              <div className="mx-auto flex flex-col gap-y-4 border-2 md:p-10 py-3 rounded-2xl bg-slate-200 px-10 w-[235px] md:w-[245px]">
                <dt className="text-xl leading-7 text-gray-600">{dashboardData?.returns}</dt>
                <dd className="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl">Total Returns</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Chart */}
        {chartConfig ? (
          <div className="py-5 bg-white md:py-10 md:mt-3">
            <Chart
              className="p-5"
              type={chartConfig.type}
              series={chartConfig.series}
              options={chartConfig.options}
              width={chartConfig.width}
              height={chartConfig.height}
            />
          </div>
        ) : null}
      </div>

      {/* Toggle Button (Visible only on small screens) */}
      <button
        className="fixed p-2 bg-green-500 rounded lg:hidden top-4 left-4"
        onClick={toggleSidebar}
      >
        <FaBars className="text-white" />
      </button>
    </div>
  );
};

export default Sellerdashboard;
