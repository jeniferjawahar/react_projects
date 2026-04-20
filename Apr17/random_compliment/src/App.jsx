import { useState, useEffect } from "react";
import { compliments } from "./data/compliments";
import { useCompliments } from "./hooks/useCompliments";
import "./App.css";

function App() {

  const {category,setCategory,compliment,generateCompliment,used}=useCompliments();


  const copyCompliment=()=>{
    if(!compliment)return;
    navigator.clipboard.writeText(compliment);
  }

  return (
    <div className="container">
      <h1>Random Compliment Generator</h1>

      <select value={category} onChange={(e)=>setCategory(e.target.value)}>
        <option value="general">General</option>
        <option value="work">Work</option>
        <option value="personality">Personality</option>
      </select>

      <button onClick={generateCompliment}>GenerateCompliment</button>

      <h2>{compliment || "click to generate compliment"}</h2>

      <button disabled={!compliment} onClick={copyCompliment}>Copy to clipboard</button>
    </div>
  )


  }
 
    


export default App;