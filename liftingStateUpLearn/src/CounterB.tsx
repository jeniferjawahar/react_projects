import React from "react";

type CounterProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

function CounterB({ count, setCount }: CounterProps) {
  return (
    <div>
      <h2>Counter B: {count}</h2>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment B
      </button>
         <button onClick={() => setCount(prev => prev - 1)}>
        Decrement B
      </button>
    </div>
  );
}

export default CounterB;