import { useState } from 'react'


function App() {
const [city,setCity] = useState('');


const handleSearch= async ()=>{
  if(city==="")return;
  setLoading(true);
 try{}
 catch(err)
 {SpeechSynthesisErrorEvent()}
}

  return (
    <div>
<input type="text" value={city} onChange={(e)=>setCity(e.target.value)}/>
      

      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default App
