import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const Home =()=>{

    const {theme}=useContext(ThemeContext);
    return <div style={{padding:'20px',
        background:theme==='light'?'#f0f0f0':'#555',
        color:theme==='light'?'#000':'#fff'
    }}>Home</div>
}

export default Home;