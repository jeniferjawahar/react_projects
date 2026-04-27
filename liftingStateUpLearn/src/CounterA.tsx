import React from "react";

type CounterProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

function CounterA({ count, setCount }: CounterProps) {
  return (
    <div>
      <h2>Counter A: {count}</h2>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment A
      </button>
         <button onClick={() => setCount(prev => prev - 1)}>
        Decrement A
      </button>
    </div>
  );
}

export default CounterA;