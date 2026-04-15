import { ThemeContext } from "../context/ThemeContext"
import { useContext } from "react"

export const Navbar=()=>{

    const { theme,toggleTheme } = useContext(ThemeContext);
    return <div style={{background:theme==='light'?'#fff':'#333',
    color:theme==='light'?'#000':'#fff',padding:'10px'}}>
        <h1>My App</h1>
        <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
}


export default Navbar;