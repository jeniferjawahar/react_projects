import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Home />
      <Footer />
    </ThemeProvider>
  );
}

export default App;