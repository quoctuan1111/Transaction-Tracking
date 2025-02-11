import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import MainContent from "./components/MainContent";
import AddressDetail from "./components/AddressDetail";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className={`container ${theme}`}>
        <NavBar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<MainContent theme={theme} />} />
          <Route path="/address/:address" element={<AddressDetail theme={theme} />} />
        </Routes>
        <Footer />
      </div>
    
    </Router>
  );
}

export default App;