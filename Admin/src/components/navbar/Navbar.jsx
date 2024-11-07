import React from 'react'
import './Navbar.css'
import {assets}  from  '../../assets/assets'


const Navbar = () => {
  return (
    <div className='Navbar'>
        <img  className='logo' src={assets.logo} alt="" />
        <img  className='Profile' src={assets.profile_image} alt="" />
      
    </div>
  )
}

export default Navbar
