import React, { useState } from "react";
import "./MainContent.css";
import "./BlockchainComponents.css";
import search_icon_light from "../assets/search-w.png";
import search_icon_dark from "../assets/search-b.png";
import btc_dark from "../assets/btc-black.png";
import eth_dark from "../assets/eth-black.png";
import ltc_dark from "../assets/ltc-black.png";
import doge_dark from "../assets/doge-black.png";
import btc_light from "../assets/btc.png";
import eth_light from "../assets/eth.png";
import ltc_light from "../assets/ltc.png";
import doge_light from "../assets/doge.png";

const Block = ({ number, timestamp, transactions, size, miner }) => (
    <div className="block-item">
        <div className="block-content">
            <div>
                <span className="block-number">#{number}</span>
                <div className="block-timestamp">{timestamp}</div>
            </div>
            <div className="block-stats">
                <div className="block-transactions">{transactions} txns</div>
                <div className="block-size">{size} KB</div>
            </div>
            <div className="block-miner">
                {miner}
            </div>
        </div>
    </div>
);

const Transaction = ({ hash, from, to, value, fee }) => (
    <div className="transaction-item">
        <div className="transaction-content">
            <div className="transaction-hash">{hash}</div>
            <div className="transaction-addresses">
                <div className="address-container">
                    <div className="address-label">From</div>
                    <div className="address">{from}</div>
                </div>
                <div className="address-container">
                    <div className="address-label">To</div>
                    <div className="address">{to}</div>
                </div>
            </div>
            <div className="transaction-details">
                <span className="transaction-value">{value} BTC</span>
                <span className="transaction-fee">{fee} BTC</span>
            </div>
        </div>
    </div>
);

const MainContent = ({ theme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState('BITCOIN');

    // Sample data for blocks
    const blocks = [
        { number: 824968, timestamp: "2024-02-11 14:23:15", transactions: 2453, size: 1789.4, miner: "F2Pool" },
        { number: 824967, timestamp: "2024-02-11 14:12:31", transactions: 1987, size: 1654.2, miner: "Foundry USA" },
        { number: 824966, timestamp: "2024-02-11 14:01:45", transactions: 2198, size: 1823.7, miner: "AntPool" },
    ];

    // Sample data for transactions
    const transactions = [
        {
            hash: "0x7d91c6f27c8e38c7b4c8ebef8c78f9dd7d898c89",
            from: "0x3d2e397f94e415d7773e72e44d5b5338",
            to: "0x8f5b4c2e1d6e3a9c8b7a6d5e4f3c2b1",
            value: "0.4521",
            fee: "0.00045"
        },
        {
            hash: "0x9e82d5f16b4c7a3e2d1f9c8b7a6d5e4",
            from: "0x2c1b4e5d6f7a8c9b0d1e2f3a4b5c6d7",
            to: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o",
            value: "1.2845",
            fee: "0.00078"
        },
        {
            hash: "0x5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d",
            from: "0x7a8b9c0d1e2f3g4h5i6j7k8l9m0n1",
            to: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8",
            value: "0.8932",
            fee: "0.00062"
        }
    ];

    const cryptoOptions = [
        { name: 'BITCOIN', iconLight: btc_light, iconDark: btc_dark },
        { name: 'ETHEREUM', iconLight: eth_light, iconDark: eth_dark },
        { name: 'LITECOIN', iconLight: ltc_light, iconDark: ltc_dark },
        { name: 'DOGECOIN', iconLight: doge_light, iconDark: doge_dark }
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
        <div className="main-container">
            <div className="search-section">
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

            <div className="latest-sections">
                <div className="latest-section">
                    <h2>LATEST {selectedCrypto} BLOCKS</h2>
                    <div className="latest-box">
                        <div className="scrollable-container">
                            {blocks.map((block) => (
                                <Block key={block.number} {...block} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="latest-section">
                    <h2>LATEST {selectedCrypto} TRANSACTIONS</h2>
                    <div className="latest-box">
                        <div className="scrollable-container">
                            {transactions.map((transaction) => (
                                <Transaction key={transaction.hash} {...transaction} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;