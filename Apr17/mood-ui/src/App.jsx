import { useState } from "react";
import { moodThemes } from "./assets/utils/moodThemes";

function App() {

  const [mood,setMood]=useState("happy");

  const theme=moodThemes[mood];

  return <div style={{backgroundColor:theme.background,color:theme.text,
    height:"100vh",display:"flex",flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    fontSize:"2rem",
    transistion:"all 0.5s ease"
  }}>
<h1>{theme.emoji} I feel {mood}</h1>

<select onChange={(e)=>setMood(e.target.value)}>
  <option value="happy">Happy</option>
   <option value="sad">Sad</option>
   <option value="calm">Calm</option>
   <option value="angry">Angry</option>
   <option value="confused">Confused</option>
</select>


  </div>
}

export default App;