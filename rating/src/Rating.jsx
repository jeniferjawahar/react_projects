
import { startTransition, useState } from "react";
const Rating=()=>{

    const[rating,setRating]=useState(0);
    const[hover,setHover]=useState(0);

    let messages=["","Terrible","Bad","Okay","Good","Excellent"];
    return <div>
        <h2>Rating Component</h2>
        {
            [1,2,3,4,5].map((item)=><span key={item} onClick={()=>setRating(item) }
             onMouseEnter={()=>setHover(item)}
             onMouseLeave={()=>setHover(0)}
            style={{
                cursor:"pointer",
                fontSize:"30px",
                color: item<=(hover||rating)?"orange":"gray"
            }}>★</span>)
        }

  <p>
  {rating > 0
    ? `${messages[rating]} (${rating}/5)`
    : "No rating selected"}
</p>
    </div>

}

export default Rating;
