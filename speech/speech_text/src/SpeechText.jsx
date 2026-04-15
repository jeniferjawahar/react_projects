import { useState } from "react";
import { startSpeechToText } from "./assets/utilits/speechToText";

const SpeechText = () => {
  const [text, setText] = useState("");

  const handleStart = () => {
    startSpeechToText((spokenText) => {
      setText((prev) => prev + " " + spokenText);
    });
  };

  return (
    <div>
      <h3>Speech to Text</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleStart}>🎤 Speak</button>
    </div>
  );
};

export default SpeechText;