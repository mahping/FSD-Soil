import React, { useState } from 'react';
import Navbar from "./fragments/Navbar.js";
import Footer from "./fragments/Footer.js";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home.js';
import SignUp from './pages/SignUpPage.js';
import Login from './pages/LoginPage.js';
import SpecialsDeals from './pages/SpecialsDeals.js';
// import GardenTips from './pages/GardenTips.js';
import ShoppingCart from './pages/ShoppingCart.js';
import { CartProvider } from './fragments/CartContext.js';
import CheckoutPage from './pages/CheckoutPage.js';
import SummaryPage from './pages/SummaryPage.js';
import { AuthProvider } from './fragments/AuthContext.js';
import Profile from './pages/ProfilePage.js';
import { getUser, removeUser } from "./data/repository";
import Reviews from './pages/Reviews.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPage from './pages/AdminPage.js';

function App() {
  const [user, setUser] = useState(getUser());

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    removeUser();
    setUser(null);
  };


  return (
    <>
      <CartProvider>
        <AuthProvider>
          <Router>
            <Navbar user={user} logoutUser={logoutUser} />
            <Routes>
              <Route path='/' exact element={<Home user={user} />} />
              <Route path='/admin' exact Component={AdminPage}/>
              <Route path='/signup' exact element={<SignUp loginUser={loginUser} />} /> 
              <Route path='/login' exact element={<Login loginUser={loginUser}/>} />
              <Route path='/specialdeals' exact element={<SpecialsDeals />} />
              {/* <Route path='/homegarden' exact element={<GardenTips />} /> */}
              <Route path='/cart' exact element={<ShoppingCart />} />
              <Route path='/checkout' exact element={<CheckoutPage />} />
              <Route path='/purchasesummary' element={<SummaryPage />} />
              <Route path='/profile' element={<Profile user={user} logoutUser={logoutUser}/>} />
              <Route path='/reviews' element={<Reviews />} />
            </Routes>
            <Footer />
          </Router>
        </AuthProvider>
      </CartProvider>
    </>
  );
}

export default App;