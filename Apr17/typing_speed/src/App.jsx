import { useState, useEffect } from "react";

const sampleText =
  "The quick brown fox jumps over the lazy dog. Practice typing to improve your speed and accuracy.";

function App() {
  const [text, setText] = useState(sampleText);
  const [input, setInput] = useState("");
  const [time, setTime] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // ⏱ Timer
  useEffect(() => {
    let interval;

    if (isTyping && !isFinished) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTyping, isFinished]);

  // ✍️ Handle typing
  const handleChange = (e) => {
    const value = e.target.value;

    // Start timer on first input
    if (!isTyping) {
      setIsTyping(true);
    }

    setInput(value);

    // Stop when completed
    if (value === text) {
      setIsFinished(true);
      setIsTyping(false);
    }
  };

  // 🔢 Calculations
  const totalChars = input.length;

  const correctChars = input.split("").filter((char, i) => {
    return char === text[i];
  }).length;

  const minutes = time / 60;

  const wpm = minutes > 0 ? Math.round((correctChars / 5) / minutes) : 0;

  const accuracy =
    totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

  // 🔄 Restart
  const handleRestart = () => {
    setInput("");
    setTime(0);
    setIsTyping(false);
    setIsFinished(false);
  };

  return (
    <div className="container">
      <h1>⌨️ Typing Speed Tester</h1>

      {/* Text */}
      <p className="text">{text}</p>

      {/* Input */}
      <textarea
        value={input}
        onChange={handleChange}
        placeholder="Start typing..."
        disabled={isFinished}
      />

      {/* Timer */}
      <h3>⏱ Time: {time}s</h3>

      {/* Results */}
      {isFinished && (
        <div className="results">
          <p>🔥 WPM: {wpm}</p>
          <p>🎯 Accuracy: {accuracy}%</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;