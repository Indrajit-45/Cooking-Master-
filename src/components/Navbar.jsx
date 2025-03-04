import React from "react";
import { Link } from "react-router-dom"; 
import "./Navbar.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {

  const [navBarFullHeightCondition, setNavBarFullHeightCondition] = useState(false);
  const navBarMenuIconClackFun = () =>{
    setNavBarFullHeightCondition(!navBarFullHeightCondition);
  }
 
  return (
    <nav className={navBarFullHeightCondition?"fullHeight":""}>
      <div className="logo-box">
        <p>COOKING <br /> MASTER</p>
      </div>
      <div className="menu-items-box">
        <div className="menu-logo-box" onClick={navBarMenuIconClackFun}>
          <p>Menu</p>
          {!navBarFullHeightCondition ? <img src="https://cookingmatters.org/wp-content/themes/vue-js/assets/images/global/nav/menu.svg" alt="" /> : <div className="Xmark-icon-for-navbar"><FontAwesomeIcon icon={faXmark}/></div>}
        </div>
        <div className={`main-menu-items-box ${navBarFullHeightCondition ? "main-menu-items-box-visibility":""}`}>
          <Link to="/about" className="menu-items" onClick={()=>setNavBarFullHeightCondition(false)}>About<div className="underline"></div></Link>
          <Link to="/cardPage" className="menu-items" onClick={()=>setNavBarFullHeightCondition(false)}>Recipes Cart<div className="underline"></div></Link>
          <Link to="/" className="menu-items" onClick={()=>setNavBarFullHeightCondition(false)}>Home<div className="underline"></div></Link>
          <div className="menu-items" onClick={()=>setNavBarFullHeightCondition(false)}>
            Community Resources
            <div className="underline last-underline"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
