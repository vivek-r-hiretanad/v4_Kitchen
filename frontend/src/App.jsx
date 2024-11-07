
import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import PlaceOrder from './pages/PlaceOrder/Place';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import Footer from './components/footer/Footer';
import Loginpopup from './components/loginpopup/Loginpopup';
import Verify from './pages/verify/Verify';
import Myorders from './pages/Myorders/Myorders';



const App = () => {
  const [showLogin, setshowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Loginpopup setshowLogin={setshowLogin} /> : <></>}
      <div className='app'>
        <Navbar setshowLogin={setshowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<Myorders />} />
        
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;


