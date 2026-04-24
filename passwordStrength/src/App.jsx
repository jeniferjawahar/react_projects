import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");

  const getStrength = (password) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
};

const strength = getStrength(password);

const getStrengthLabel = () => {
  if (strength <= 2) return "Weak";
  if (strength === 3 || strength === 4) return "Medium";
  return "Strong";
};


  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>Password Strength Visualizer</h2>

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginTop: "10px",
        }}
      />

      <p>Strength: {getStrengthLabel()}</p>
      <div
  style={{
    height: "10px",
    width: "300px",
    background: "#eee",
    marginTop: "10px",
  }}
>
  <div
    style={{
      height: "100%",
      width: `${(strength / 5) * 100}%`,
      background:
        strength <= 2 ? "red" : strength <= 4 ? "orange" : "green",
      transition: "0.3s",
    }}
  />
</div>
    </div>
  );
}

export default App;