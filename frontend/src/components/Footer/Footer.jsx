import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi ipsa ipsum possimus quam molestiae tempora praesentium repellat ea, ipsam aliquid inventore magnam expedita veniam placeat? Dicta illo unde soluta omnis.</p>
            <div className="footer-social-icon">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-435-643-125</li>
                <li>contact@foodii.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copyright">Copyright: all right reserved </p>
    </div>
  )
}

export default Footer
