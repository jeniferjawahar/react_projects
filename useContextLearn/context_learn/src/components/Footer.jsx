import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        padding: "20px",
        background: theme === "dark" ? "#222" : "#eee",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      Footer - Theme: {theme}
    </div>
  );
}

export default Footer;