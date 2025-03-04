import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-box">
       <div className='footerbox1'><p>COOKING <br /> MASTER</p></div>
       <div className='footerbox2'>
        <Link className='link' to="/about"><p>About</p></Link>
        <Link className='link' to="/cardPage"><p>Recipes Cart</p></Link>
        <Link className='link'><p>Tips</p></Link>
        <Link className='link'><p>Community Resources</p></Link>
       </div>
       <div className='footerbox3'>
       <p>Sitemap</p>
        <p>Terms of Service</p>
        <p>Privacy Policy</p>
       </div>
    </footer>
  )
}

export default Footer