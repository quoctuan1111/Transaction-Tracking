import React from "react";
import "./MainContent.css";
import search_icon_light from "../assets/search-w.png";
import search_icon_dark from "../assets/search-b.png";

const MainContent = ({theme, setTheme}) =>{
    const toggle_mode = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return(
        <div className="content">
            <h1>Real-time Tracking with ABCXYZ</h1>

            <div className="search-trans">
                <input type="text" placeholder="Search Transactions"/>
                <img 
                    src={theme === 'light' ? search_icon_light : search_icon_dark} 
                    alt="Search" 
                    className="search-icon"
                />
            </div>     
        </div>

        
      
    )
}

export default MainContent;