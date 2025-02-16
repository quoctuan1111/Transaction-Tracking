import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MainContent.css";
import "./BlockchainComponents.css";
import btc_dark from "../assets/btc-black.png";
import eth_dark from "../assets/eth-black.png";
import ltc_dark from "../assets/ltc-black.png";
import doge_dark from "../assets/doge-black.png";
import btc_light from "../assets/btc.png";
import eth_light from "../assets/eth.png";
import ltc_light from "../assets/ltc.png";
import doge_light from "../assets/doge.png";
import EnhancedSearch from './EhancedSearch';
import { getDashboardData, CURRENCIES } from './MockData';

const MainContent = ({ theme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState('BITCOIN');
    const [dashboardData, setDashboardData] = useState(null);
    const navigate = useNavigate();

    // Load dashboard data when cryptocurrency changes
    useEffect(() => {
        setDashboardData(getDashboardData(selectedCrypto));
    }, [selectedCrypto]);

    const cryptoOptions = [
        { name: 'BITCOIN', iconLight: btc_light, iconDark: btc_dark },
        { name: 'ETHEREUM', iconLight: eth_light, iconDark: eth_dark },
        { name: 'LITECOIN', iconLight: ltc_light, iconDark: ltc_dark },
        { name: 'DOGECOIN', iconLight: doge_light, iconDark: doge_dark }
    ];

    const handleAddressClick = (address) => {
        navigate(`/address/${address}`);
    };

    const formatHash = (hash) => {
        if (hash.length > 20) {
            return `${hash.substring(0, 6)}...${hash.substring(hash.length - 6)}`;
        }
        return hash;
    };

    if (!dashboardData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main-container">
            <div className="search-section">
                <h1>Real-time Tracking with CryptoMetrics</h1>
                <EnhancedSearch
                    theme={theme}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    selectedCrypto={selectedCrypto}
                    setSelectedCrypto={setSelectedCrypto}
                    cryptoOptions={cryptoOptions}
                />
            </div>

            <div className="latest-sections">
                {/* Latest Blocks Section */}
                <div className="latest-section">
                    <h2>LATEST {selectedCrypto} BLOCKS</h2>
                    <div className="latest-box">
                        <div className="scrollable-container">
                            {dashboardData.blocks.map((block) => (
                                <div key={block.hash} className="block-item">
                                    <div className="block-content">
                                        <div>
                                            <span className="block-number">#{block.number}</span>
                                            <div className="block-timestamp">{block.timestamp}</div>
                                        </div>
                                        <div className="block-stats">
                                            <div className="block-transactions">{block.transactions} txns</div>
                                            <div className="block-size">{block.size} KB</div>
                                        </div>
                                        <div className="block-miner">{block.miner}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Latest Transactions Section */}
                <div className="latest-section">
                    <h2>LATEST {selectedCrypto} TRANSACTIONS</h2>
                    <div className="latest-box">
                        <div className="scrollable-container">
                            {dashboardData.transactions.map((transaction) => (
                                <div key={transaction.hash} className="transaction-item">
                                    <div className="transaction-content">
                                        <div className="transaction-hash" 
                                             onClick={() => handleAddressClick(transaction.hash)}>
                                            {formatHash(transaction.hash)}
                                        </div>
                                        <div className="transaction-addresses">
                                            <div className="address-container">
                                                <div className="address-label">From</div>
                                                <div className="address" 
                                                     onClick={() => handleAddressClick(transaction.from)}>
                                                    {formatHash(transaction.from)}
                                                </div>
                                            </div>
                                            <div className="address-container">
                                                <div className="address-label">To</div>
                                                <div className="address" 
                                                     onClick={() => handleAddressClick(transaction.to)}>
                                                    {formatHash(transaction.to)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="transaction-details">
                                            <span className="transaction-value">
                                                {transaction.value} {CURRENCIES[selectedCrypto].symbol}
                                            </span>
                                            <span className="transaction-fee">
                                                Fee: {transaction.fee} {CURRENCIES[selectedCrypto].symbol}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;