import React from "react"
import "./NavBar.css"
import logo_light from "../assets/logo-black.png"
import logo_dark from "../assets/logo-white.png"
import search_icon_light from "../assets/search-w.png"
import search_icon_dark from "../assets/search-b.png"
import toggle_light from "../assets/night.png"
import toggle_dark from "../assets/day.png"
import MainContent from "./MainContent"
import { useNavigate } from "react-router-dom";

const NavBar = ({theme, setTheme}) => { 
    const toggle_mode = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    }


    return (
        <nav className="navbar">
            <div className="nav-left">
                <img 
                    src={theme === 'light' ? logo_light : logo_dark} 
                    alt="Logo" 
                    className="logo" 
                    onClick={() => handleLogoClick(MainContent)}
                />
                <h1 className="nav-title">Transaction Tracking</h1>
            </div>

            <div className="nav-right">
                <div className="search-box">
                    <input type="text" placeholder="Search"/>
                    <img 
                        src={theme === 'light' ? search_icon_light : search_icon_dark} 
                        alt="Search" 
                        className="search-icon"
                    />
                </div>
                <img 
                    onClick={toggle_mode} 
                    src={theme === 'light' ? toggle_light : toggle_dark} 
                    alt="Toggle theme" 
                    className="toggle-icon"
                />
            </div>
        </nav>
    )
}

export default NavBar