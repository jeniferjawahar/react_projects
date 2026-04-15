import { useState } from "react";

const SmartCounter=()=>{

    const [count,setCount]=useState(0)


    const handleDecrement=()=>{
setCount(prev=>prev-1);
    }

    const handleIncrement=()=>{
setCount(prev=>prev+1);
    }

    return <div>
        {count}
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
    </div>

}

export default SmartCounter;