import React, { useState } from "react";
import "./MainContent.css";
import search_icon_light from "../assets/search-w.png";
import search_icon_dark from "../assets/search-b.png";
import btc_dark from "../assets/btc-black.png";
import eth_dark from "../assets/eth-black.png";
import ltc_dark from "../assets/ltc-black.png";
import doge_dark from "../assets/doge-black.png"
import btc_light from "../assets/btc.png";
import eth_light from "../assets/eth.png";
import ltc_light from "../assets/ltc.png";
import doge_light from "../assets/doge.png"

const MainContent = ({theme}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState('BITCOIN');
    
    const cryptoOptions = [
        { 
            name: 'BITCOIN', 
            iconLight: btc_light,
            iconDark: btc_dark
        },
        { 
            name: 'ETHEREUM', 
            iconLight: eth_light,
            iconDark: eth_dark
        },
        { 
            name: 'LITECOIN', 
            iconLight: ltc_light,
            iconDark: ltc_dark 
        },

        { 
            name: 'DOGECOIN', 
            iconLight: doge_light,
            iconDark: doge_dark
        }
    ];

    const handleSelect = (option) => {
        setSelectedCrypto(option);
        setIsOpen(false);
    };

    const getSelectedIcon = () => {
        const option = cryptoOptions.find(opt => opt.name === selectedCrypto);
        return (
            <img 
                src={theme === 'light' ? option.iconLight : option.iconDark} 
                alt={option.name} 
                className="crypto-icon" 
            />
        );
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
                        <span className="crypto-option">
                            {getSelectedIcon()}
                            {selectedCrypto}
                        </span>
                        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
                    </button>
                    {isOpen && (
                        <ul className="dropdown-menu">
                            {cryptoOptions.map((option) => (
                                <li 
                                    key={option.name}
                                    onClick={() => handleSelect(option.name)}
                                    className={selectedCrypto === option.name ? 'selected' : ''}
                                >
                                    <span className="crypto-option">
                                        <img 
                                            src={theme === 'light' ? option.iconLight : option.iconDark} 
                                            alt={option.name} 
                                            className="crypto-icon" 
                                        />
                                        {option.name}
                                    </span>
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