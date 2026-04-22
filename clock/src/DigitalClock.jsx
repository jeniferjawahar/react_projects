import React, { useState, useEffect } from "react";

function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Styles based on theme
  const containerStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkMode ? "#111" : "#f5f5f5",
    color: darkMode ? "#fff" : "#111",
    transition: "all 0.3s ease",
  };

  const clockStyle = {
    fontSize: "60px",
    fontWeight: "bold",
    letterSpacing: "2px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={clockStyle}>{time.toLocaleTimeString()}</h1>

      <button onClick={() => setDarkMode(!darkMode)}>
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}

export default DigitalClock;