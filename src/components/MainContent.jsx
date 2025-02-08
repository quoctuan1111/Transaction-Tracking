import React, { useState } from "react";
import "./MainContent.css";
import search_icon_light from "../assets/search-w.png";
import search_icon_dark from "../assets/search-b.png";


const MainContent = ({theme}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState('BITCOIN');
    
    const cryptoOptions = ['BITCOIN', 'ETHEREUM', 'LITECOIN', 'RIPPLE', 'DOGECOIN'];

    const handleSelect = (option) => {
        setSelectedCrypto(option);
        setIsOpen(false);
    };

    return(
        <div className="content">
            <h1>Real-time Tracking with ABCXYZ</h1>

            <div className="search-trans">
                <div className="dropdown">
                    <button 
                        className="dropdown-toggle" 
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {selectedCrypto}
                        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
                    </button>
                    {isOpen && (
                        <ul className="dropdown-menu">
                            {cryptoOptions.map((option) => (
                                <li 
                                    key={option}
                                    onClick={() => handleSelect(option)}
                                    className={selectedCrypto === option ? 'selected' : ''}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="search-divider"></div>
                <input type="text" placeholder="Search Transactions"/>
                <img 
                    src={theme === 'light' ? search_icon_light : search_icon_dark} 
                    alt="Search" 
                    className="search-icon"
                />
            </div>     
        </div>
    );
};

export default MainContent;