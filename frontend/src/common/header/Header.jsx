import React from 'react'
import "./Header.css"
import Head from './Head'
import Search from './Search'
import Navbar from './Navbar'

const Header = () => {
  return (
    <>
    <div className='top-head'>Evaluate Your Routine with Best Products</div>
        <Head/>
      
        <Navbar/>
    </>
  )
}

export default Header
