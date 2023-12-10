import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <div className='flex justify-evenly sm:max-w-5xl mx-auto my-10 bg-slate-600 rounded-md text-white font-light py-4'>
            {/* <p>Contact Us</p> */}
            <Link to={"/contact"}>Contact Us</Link>
            <Link to={"/about"}>About Us</Link>
            <Link to={"/faq"}>FAQ</Link>
        </div>
    </div>
  )
}

export default Footer