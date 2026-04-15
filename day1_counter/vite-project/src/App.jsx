import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [step,setStep]=useState(1);
  const[history,setHistory]=useState([]);

  const handleIncrease=()=>{

    let newValue=count+step;
    if(newValue>100){
     newValue=100;
    }
     setCount(newValue);
      setHistory(prev=>[...prev,newValue]);
  }

  const handleDecrease=()=>{
   let newValue=count-step;
   if(newValue<0){
    newValue=0;
   }
   setCount(newValue);
   setHistory(prev=>[...prev,newValue]);

  }

  const handleReset=()=>{
    let newValue=0;
    setCount(newValue);
    setHistory(prev=>[...prev,newValue]);
  }

  const handleClear=()=>{
    setHistory([])
  }

  return (
    <>
    <p>count: {count}</p>
    <input type="number" value={step} onChange={(e)=>setStep(Number(e.target.value))}/>
      <button onClick={handleIncrease} disabled={count >= 100}>+</button>
      <button onClick={handleDecrease} disabled={count <= 0}>-</button>
      <button onClick={handleReset}>Reset</button>
     
     <h2>History</h2>
     {
      history.length==0 ? (<p>No History yet</p>) : 
     (
     <ul>
      {
        history.map((h,index)=><li key={index} style={{
          fontWeight:h===count?'bold':'normal'
        }}>{h}</li>)
      }
     </ul>)

    }
 
 <button onClick={handleClear}>Clear History</button>
  </>
  )
}

export default App;
