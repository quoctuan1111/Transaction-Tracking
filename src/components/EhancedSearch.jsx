import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader, History, X } from "lucide-react";
import "./EnhancedSearch.css";
import search_icon_light from "../assets/search-w.png";
import search_icon_dark from "../assets/search-b.png";

const EnhancedSearch = ({ 
  theme, 
  isOpen, 
  setIsOpen, 
  selectedCrypto, 
  setSelectedCrypto,
  cryptoOptions 
}) => {
  const [searchAddress, setSearchAddress] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

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

  const addToHistory = (address, crypto) => {
    const newEntry = {
      address,
      crypto,
      timestamp: new Date().toISOString()
    };
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.address !== address);
      return [newEntry, ...filtered].slice(0, 5);
    });
  };

  const handleSearch = async () => {
    if (!searchAddress.trim()) {
      setError("Please enter a wallet address");
      return;
    }

    if (!validateAddress(searchAddress, selectedCrypto)) {
      setError(`Invalid ${selectedCrypto.toLowerCase()} address format`);
      return;
    }

    setError("");
    setIsLoading(true);
    
    try {
      // Simulate API validation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      addToHistory(searchAddress, selectedCrypto);
      setShowHistory(false);
      navigate(`/address/${searchAddress}`);
    } catch (err) {
      setError("Failed to validate address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSelect = (option) => {
    setSelectedCrypto(option);
    setIsOpen(false);
    setError("");
    setSearchAddress("");
    setSuggestions([]);
  };

  const handleHistorySelect = (historyItem) => {
    setSearchAddress(historyItem.address);
    setSelectedCrypto(historyItem.crypto);
    setShowHistory(false);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const removeHistoryItem = (address, e) => {
    e.stopPropagation();
    setSearchHistory(prev => prev.filter(item => item.address !== address));
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

  return (
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
      <div className="search-input-container">
        <input 
          type="text" 
          placeholder={`Search ${selectedCrypto.toLowerCase()} address`}
          value={searchAddress}
          onChange={(e) => {
            setSearchAddress(e.target.value);
            setError("");
          }}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowHistory(true)}
        />
        {searchHistory.length > 0 && (
          <button 
            className="history-button"
            onClick={() => setShowHistory(!showHistory)}
          >
            <History className="h-4 w-4" />
          </button>
        )}
      </div>
      <button 
        className="search-button"
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <img 
            src={theme === 'light' ? search_icon_light : search_icon_dark} 
            alt="Search" 
            className="search-icon"
          />
        )}
      </button>

      {error && (
        <div className="error-message">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {showHistory && searchHistory.length > 0 && (
        <div className="search-history">
          <div className="history-header">
            <span>Recent Searches</span>
            <button onClick={clearHistory} className="clear-history">
              Clear All
            </button>
          </div>
          <ul className="history-list">
            {searchHistory.map((item, index) => (
              <li 
                key={index} 
                onClick={() => handleHistorySelect(item)}
                className="history-item"
              >
                <div className="history-item-content">
                  <img
                    src={theme === 'light' 
                      ? cryptoOptions.find(opt => opt.name === item.crypto)?.iconLight 
                      : cryptoOptions.find(opt => opt.name === item.crypto)?.iconDark
                    }
                    alt={item.crypto}
                    className="crypto-icon-small"
                  />
                  <span className="history-address">{item.address}</span>
                </div>
                <button 
                  onClick={(e) => removeHistoryItem(item.address, e)}
                  className="remove-history"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearch;