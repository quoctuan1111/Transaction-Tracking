import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import MainContent from "./components/MainContent"

const App = () => {
  
  const current_theme = localStorage.getItem('current_theme')
  const [theme, setTheme] = useState(current_theme ? current_theme: 'light');

  useEffect(() =>{
    localStorage.setItem('current_theme', theme)
  },[theme])

  return (
    <div className={`container ${theme}`}>
      <NavBar theme={theme} setTheme={setTheme} />
      <MainContent theme={theme} setTheme={setTheme}/>
    </div>


  )
}

export default App