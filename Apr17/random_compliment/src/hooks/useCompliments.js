import { useState } from "react";
import { compliments } from "../data/compliments";

export const useCompliments=()=>{
    const[category,setCategory]=useState("general");
    const[compliment,setCompliment]=useState("");
    const[used,setUsed]=useState([]);


    function generateCompliment(){
        const list=compliments[category]||[];

    const unused=list.filter(item=>!used.includes(item));

    if(unused.length===0){
        setUsed([]);
        return;
    }

    const random=Math.floor(Math.random()*unused.length);
    setCompliment(unused[random]);
    setUsed(prev=>[...prev,unused[random]]);

}


    return {
        category,
        setCategory,
        compliment,
        used,
        generateCompliment
    }
}
