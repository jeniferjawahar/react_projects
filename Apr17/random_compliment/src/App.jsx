import { useState, useEffect } from "react";
import { compliments } from "./data/compliments";

function App() {
  const [category, setCategory] = useState("general");
  const [compliment, setCompliment] = useState("");
  const [used, setUsed] = useState([]);

  // Load saved compliment
  useEffect(() => {
    const saved = localStorage.getItem("compliment");
    if (saved) setCompliment(saved);
  }, []);

  // Save compliment
  useEffect(() => {
    localStorage.setItem("compliment", compliment);
  }, [compliment]);

  // Reset used when category changes
  useEffect(() => {
    setUsed([]);
  }, [category]);

  const generateCompliment = () => {
    const list = compliments[category];

    // Filter unused compliments
    const unused = list.filter(item => !used.includes(item));

    // Reset if all used
    if (unused.length === 0) {
      setUsed([]);
      return;
    }

    // Pick random
    const random =
      unused[Math.floor(Math.random() * unused.length)];

    setCompliment(random);
    setUsed(prev => [...prev, random]);
  };

  const copyToClipboard = () => {
    if (!compliment) return;
    navigator.clipboard.writeText(compliment);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>💬 Random Compliment Generator</h1>

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="general">General</option>
        <option value="work">Work</option>
        <option value="personality">Personality</option>
      </select>

      <br /><br />

      {/* Generate */}
      <button onClick={generateCompliment}>
        Generate Compliment
      </button>

      {/* Output */}
      <h2 style={{ marginTop: "20px" }}>
        {compliment || "Click to get a compliment"}
      </h2>

      {/* Copy */}
      <button onClick={copyToClipboard}>
        Copy
      </button>
    </div>
  );
}

export default App;