import { useState } from 'react'
import CounterA from './CounterA'
import CounterB from './CounterB'
import CounterC from './CounterC'

function App() {
  const [count, setCount] = useState(0)
 

 return ( <div>
 <CounterA count={count} setCount={setCount}/>
  <CounterB count={count} setCount={setCount}/> 
    <CounterC count={count} setCount={setCount}/> 
 </div>)
}

export default App
