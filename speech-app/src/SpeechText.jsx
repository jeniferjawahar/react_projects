import { useState } from "react";
import { startSpeechToText } from "./assets/utilits/speechtotext";

const SpeechText = () => {
  const [text, setText] = useState("");

  // ✅ Feature detection
  const isSpeechSupported =
    "SpeechRecognition" in window ||
    "webkitSpeechRecognition" in window;

  // ✅ Optional device detection
  const isIpad =
    /iPad|Macintosh/.test(navigator.userAgent) &&
    "ontouchend" in document;

  const handleMic = () => {
    startSpeechToText((spokenText) => {
      setText((prev) => prev + " " + spokenText);
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Speech to Text</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or speak..."
        style={{ width: "100%", height: 100 }}
      />

      <br />

      {/* ✅ Desktop mic */}
      {isSpeechSupported && (
        <button onClick={handleMic}>🎤 Speak</button>
      )}

      {/* ✅ iPad fallback */}
      {!isSpeechSupported && (
        <p style={{ marginTop: 10 }}>
          🎤 Use your keyboard microphone to speak
          <br />
          🌐 Switch keyboard for Spanish input
        </p>
      )}
    </div>
  );
};

export default SpeechText;