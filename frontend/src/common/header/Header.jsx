import React from 'react'
import "./Header.css"
import Head from './Head'
import Search from './Search'
import Navbar from './Navbar'

const Header = () => {
  return (
    <>
        <Head/>
        <Search/>
        <Navbar/>
    </>
  )
}

export default Header
