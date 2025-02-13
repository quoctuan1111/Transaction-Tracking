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

// Mock data for different cryptocurrencies
const mockDataByCrypto = {
    'BITCOIN': {
        blocks: [
            { 
                number: 824968, 
                timestamp: "2024-02-13 14:23:15", 
                transactions: 2453, 
                size: 1789.4, 
                miner: "F2Pool",
                hash: "000000000000000000024c5d4d04c9d65163b5a1f3634f3ee897c34343d304c2"
            },
            { 
                number: 824967, 
                timestamp: "2024-02-13 14:12:31", 
                transactions: 1987, 
                size: 1654.2, 
                miner: "Foundry USA",
                hash: "000000000000000000024c5d4d04c9d65163b5a1f3634f3ee897c34343d304c1"
            },
            { 
                number: 824966, 
                timestamp: "2024-02-13 14:01:45", 
                transactions: 2198, 
                size: 1823.7, 
                miner: "AntPool",
                hash: "000000000000000000024c5d4d04c9d65163b5a1f3634f3ee897c34343d304c0"
            }
        ],
        transactions: [
            {
                hash: "0x7d91c6f27c8e38c7b4c8ebef8c78f9dd7d898c89",
                from: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
                to: "12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX",
                value: "0.4521",
                fee: "0.00045",
                timestamp: "2024-02-13 14:23:10"
            },
            {
                hash: "0x9e82d5f16b4c7a3e2d1f9c8b7a6d5e4",
                from: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
                to: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
                value: "1.2845",
                fee: "0.00078",
                timestamp: "2024-02-13 14:22:45"
            },
            {
                hash: "0x5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d",
                from: "12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX",
                to: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
                value: "0.8932",
                fee: "0.00062",
                timestamp: "2024-02-13 14:22:15"
            }
        ]
    },
    'ETHEREUM': {
        blocks: [
            { 
                number: 19425871, 
                timestamp: "2024-02-13 14:23:15", 
                transactions: 156, 
                size: 85.4, 
                miner: "Ethermine",
                hash: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
            },
            { 
                number: 19425870, 
                timestamp: "2024-02-13 14:22:31", 
                transactions: 142, 
                size: 76.2, 
                miner: "SparkPool",
                hash: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae"
            },
            { 
                number: 19425869, 
                timestamp: "2024-02-13 14:21:45", 
                transactions: 168, 
                size: 92.7, 
                miner: "Nanopool",
                hash: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"
            }
        ],
        transactions: [
            {
                hash: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                from: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
                to: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326",
                value: "2.45",
                fee: "0.0021",
                timestamp: "2024-02-13 14:23:10"
            },
            {
                hash: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326",
                from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                to: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
                value: "1.78",
                fee: "0.0018",
                timestamp: "2024-02-13 14:22:45"
            },
            {
                hash: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
                from: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326",
                to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                value: "3.21",
                fee: "0.0024",
                timestamp: "2024-02-13 14:22:15"
            }
        ]
    },
    'LLITECOIN': {
        blocks: [
            { 
                number: 19425871, 
                timestamp: "2024-02-13 14:23:15", 
                transactions: 156, 
                size: 85.4, 
                miner: "Ethermine",
                hash: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
            },
            { 
                number: 19425870, 
                timestamp: "2024-02-13 14:22:31", 
                transactions: 142, 
                size: 76.2, 
                miner: "SparkPool",
                hash: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae"
            },
            { 
                number: 19425869, 
                timestamp: "2024-02-13 14:21:45", 
                transactions: 168, 
                size: 92.7, 
                miner: "Nanopool",
                hash: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"
            }
        ],
        transactions: [
            {
                hash: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                from: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
                to: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326",
                value: "2.45",
                fee: "0.0021",
                timestamp: "2024-02-13 14:23:10"
            },
            {
                hash: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326",
                from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                to: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
                value: "1.78",
                fee: "0.0018",
                timestamp: "2024-02-13 14:22:45"
            },
            {
                hash: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
                from: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326",
                to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                value: "3.21",
                fee: "0.0024",
                timestamp: "2024-02-13 14:22:15"
            }
        ]
    },
    'DOGECOIN': {
        blocks: [
            { 
                number: 19425872, 
                timestamp: "2024-02-13 14:23:15", 
                transactions: 156, 
                size: 85.4, 
                miner: "Ethermine",
                hash: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
            },
            { 
                number: 19425870, 
                timestamp: "2024-02-13 14:22:31", 
                transactions: 142, 
                size: 76.2, 
                miner: "SparkPool",
                hash: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae"
            },
            { 
                number: 19425869, 
                timestamp: "2024-02-13 14:21:45", 
                transactions: 168, 
                size: 92.7, 
                miner: "Nanopool",
                hash: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"
            }
        ],
        transactions: [
            {
                hash: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                from: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
                to: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326",
                value: "2.45",
                fee: "0.0021",
                timestamp: "2024-02-13 14:23:10"
            },
            {
                hash: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326",
                from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                to: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
                value: "1.78",
                fee: "0.0018",
                timestamp: "2024-02-13 14:22:45"
            },
            {
                hash: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
                from: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326",
                to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                value: "3.21",
                fee: "0.0024",
                timestamp: "2024-02-13 14:22:15"
            }
        ]
    },
    
};

const MainContent = ({ theme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState('BITCOIN');
    const [searchAddress, setSearchAddress] = useState('');
    const [currentBlocks, setCurrentBlocks] = useState([]);
    const [currentTransactions, setCurrentTransactions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Update blocks and transactions when cryptocurrency changes
        const mockData = mockDataByCrypto[selectedCrypto];
        if (mockData) {
            setCurrentBlocks(mockData.blocks);
            setCurrentTransactions(mockData.transactions);
        }
    }, [selectedCrypto]);

    const validateAddress = (addr, crypto) => {
        if (!addr.trim()) return false;
        
        switch (crypto) {
            case 'BITCOIN':
                return /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(addr);
            case 'ETHEREUM':
                return /^0x[a-fA-F0-9]{40}$/.test(addr);
            case 'LITECOIN':
                return /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/.test(addr);
            case 'DOGECOIN':
                return /^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$/.test(addr);
            default:
                return false;
        }
    };

    const handleSearch = () => {
        if (searchAddress.trim() && validateAddress(searchAddress, selectedCrypto)) {
            navigate(`/address/${searchAddress}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const cryptoOptions = [
        { name: 'BITCOIN', iconLight: btc_light, iconDark: btc_dark },
        { name: 'ETHEREUM', iconLight: eth_light, iconDark: eth_dark },
        { name: 'LITECOIN', iconLight: ltc_light, iconDark: ltc_dark },
        { name: 'DOGECOIN', iconLight: doge_light, iconDark: doge_dark }
    ];

    const handleSelect = (option) => {
        setSelectedCrypto(option);
        setIsOpen(false);
        setSearchAddress('');
    };

    const handleAddressClick = (address) => {
        navigate(`/address/${address}`);
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

    const formatHash = (hash) => {
        if (hash.length > 20) {
            return `${hash.substring(0, 6)}...${hash.substring(hash.length - 6)}`;
        }
        return hash;
    };

    return (
        <div className="main-container">
            <div className="search-section">
                <h1>Real-time Tracking with ABCXYZ</h1>
                <EnhancedSearch
                    theme={theme}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    selectedCrypto={selectedCrypto}
                    setSelectedCrypto={setSelectedCrypto}
                    cryptoOptions={cryptoOptions}
                />
            </div>

             {/* Latest Sections */}
             <div className="latest-sections">
                <div className="latest-section">
                    <h2>LATEST {selectedCrypto} BLOCKS</h2>
                    <div className="latest-box">
                        <div className="scrollable-container">
                            {currentBlocks.map((block) => (
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

                <div className="latest-section">
                    <h2>LATEST {selectedCrypto} TRANSACTIONS</h2>
                    <div className="latest-box">
                        <div className="scrollable-container">
                            {currentTransactions.map((transaction) => (
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
                                                {transaction.value} {selectedCrypto}
                                            </span>
                                            <span className="transaction-fee">
                                                Fee: {transaction.fee} {selectedCrypto}
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