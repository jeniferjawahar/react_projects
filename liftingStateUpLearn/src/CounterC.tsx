import React from 'react';

type CounterProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

function CounterC({ count, setCount }: CounterProps) {
  return (
    <div>
      <h2>Counter {count}</h2>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment C
      </button>
         <button onClick={() => setCount(prev => prev - 1)}>
        Decrement C
      </button>
    </div>
  );
}

export default CounterC;