import React from "react"
import "./NavBar.css"
import logo_light from "../assets/logo-black.png"
import logo_dark from "../assets/logo-white.png"
import search_icon_light from "../assets/search-w.png"
import search_icon_dark from "../assets/search-b.png"
import toggle_light from "../assets/night.png"
import toggle_dark from "../assets/day.png"
const NavBar = ({theme, setTheme}) =>{

    const toggle_mode = ()=>{
        theme == 'light' ? setTheme('dark'):setTheme('light');
    }

    return(
        <div className="navbar">
        <img src={theme=='light' ? logo_light : logo_dark} alt="" className="logo" />
        <h1> Transaction Tracking</h1>
        <div className="search-box">
            <input type="text" placeholder="Search"/>
            <img src={theme == 'light' ? search_icon_light: search_icon_dark} alt="" />
        </div>

        <img onClick={()=>{toggle_mode()}} src={theme == 'light' ? toggle_light : toggle_dark} alt="" className="toggle-icon"/>
        </div>
    )
}


export default NavBar