import { useMemo, useState } from 'react'


function App() {

const [number,setNumber]=useState(0)
const[counter,setCounter]=useState(0)

const factorial=useMemo(()=>{
  console.log("Calculating factorial")
  let result=1
  for(let i=1;i<=number;i++){
    result=result*i
  }
  return result;
},[number])


  return (
    <div>
<input type="text" value={number} onChange={(e)=>{setNumber(Number(e.target.value))}}/>

<h1>{factorial}</h1>
<button onClick={()=>setCounter(counter+1)}>Counter: {counter}</button>
    
    </div>
  )
 
}

export default App
