// src/components/ModoOscuro.jsx
import { useState, useEffect } from "react";

function ModoOscuro() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
    document.body.classList.toggle("dark-mode", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("darkMode", newTheme);
    document.body.classList.toggle("dark-mode", newTheme);
  };

  return (
    <button className="btn btn-powerpuff mb-3" onClick={toggleTheme}>
      {darkMode ? "Modo Claro" : "Modo Oscuro"}
    </button>
  );
}

export default ModoOscuro;