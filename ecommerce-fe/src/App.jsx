import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import DashboardLayout from './components/dashboardcomponents/DashboardLayout';
import DashboardProducts from './pages/DashboardProducts';
import DashboardCategories from './pages/DashboardCategories';
import DashboardUsers from './pages/DashboardUsers';
import 'react-toastify/dist/ReactToastify.css';
import MyOrders from './components/MyOrders';

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        {/* Content above the footer */}
        <div className="flex-grow">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productid" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/myorders" element={<MyOrders />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="products" element={<DashboardProducts />} />
              <Route path="categories" element={<DashboardCategories />} />
              <Route path="users" element={<DashboardUsers />} />
            </Route>
          </Routes>
        </div>
        {/* Sticky Footer */}
        <Footer />
      </div>

      {/* Optional Devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
