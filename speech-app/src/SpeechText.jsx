import { useState, useRef } from "react";

const SpeechText = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // ✅ Feature detection
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const isSpeechSupported = !!SpeechRecognition;

  const handleMic = () => {
    if (!isSpeechSupported) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    // Prevent multiple instances
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US"; // change to "es-ES" for Spanish
    recognition.continuous = false; // stops after one sentence
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;

      setText((prev) =>
        prev ? prev + " " + spokenText : spokenText
      );
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
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

      {isSpeechSupported ? (
        <button onClick={handleMic}>
          {isListening ? "🛑 Stop" : "🎤 Speak"}
        </button>
      ) : (
        <p>Speech Recognition is not supported in this browser</p>
      )}
    </div>
  );
};

export default SpeechText;