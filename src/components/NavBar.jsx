import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo_light from "../assets/logo-black.png";
import logo_dark from "../assets/logo-white.png";
import search_icon_light from "../assets/search-w.png";
import search_icon_dark from "../assets/search-b.png";
import toggle_light from "../assets/night.png";
import toggle_dark from "../assets/day.png";
import MainContent from "./MainContent";
import { AlertCircle } from "lucide-react"; // Import AlertCircle from lucide-react

const NavBar = ({ theme, setTheme }) => {
 
  const [searchAddress, setSearchAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggle_mode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogoClick = () => {
    navigate("/");
  };


  const validateAddress = (addr) => {
    if (!addr.trim()) return false;
 
    return /^0x[a-fA-F0-9]{40}$/.test(addr);
  };


  const handleSearch = () => {
    if (!searchAddress.trim()) {
      setError("Please enter a wallet address");
      return;
    }

    if (!validateAddress(searchAddress)) {
      setError("Invalid Ethereum address format");
      return;
    }

    setError("");
   
    navigate(`/address/${searchAddress}`);
  };

 
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img
          src={theme === "light" ? logo_light : logo_dark}
          alt="Logo"
          className="logo"
          onClick={() => handleLogoClick(MainContent)}
        />
        <h1 className="nav-title">Transaction Tracking</h1>
      </div>

      <div className="nav-right">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search address"
            value={searchAddress}
            onChange={(e) => {
              setSearchAddress(e.target.value);
              setError("");
            }}
            onKeyPress={handleKeyPress}
          />
          <img
            src={theme === "light" ? search_icon_light : search_icon_dark}
            alt="Search"
            className="search-icon"
            onClick={handleSearch}
          />
        </div>
        <img
          onClick={toggle_mode}
          src={theme === "light" ? toggle_light : toggle_dark}
          alt="Toggle theme"
          className="toggle-icon"
        />
      </div>
      
      {/* Error message display */}
      {error && (
        <div className="navbar-error-message">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </nav>
  );
};

export default NavBar;