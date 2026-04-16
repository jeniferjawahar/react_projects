import { useState, useRef } from "react";
import { pipeline } from "@xenova/transformers";

export default function App() {
  const [transcriber, setTranscriber] = useState(null);
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("auto");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Load model
  async function loadModel() {
    if (transcriber) return;

    setLoading(true);
    const model = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-tiny"
    );
    setTranscriber(model);
    setLoading(false);
  }

  // Start recording
  async function startRecording() {
    await loadModel();

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = processAudio;

    mediaRecorder.start();
    setRecording(true);
  }

  // Stop recording
  function stopRecording() {
    mediaRecorderRef.current.stop();
    setRecording(false);
  }

  // Convert audio → text
  async function processAudio() {
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

    setLoading(true);

    let result;
    if (language === "auto") {
      result = await transcriber(audioBlob);
    } else {
      result = await transcriber(audioBlob, { language });
    }

    setText(result.text);
    setLoading(false);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎤 Speech to Text (Transformers.js)</h1>

      {/* Language selection */}
      <select onChange={(e) => setLanguage(e.target.value)}>
        <option value="auto">Auto Detect</option>
        <option value="english">English</option>
        <option value="spanish">Spanish</option>
      </select>

      <br /><br />

      {/* Buttons */}
      {!recording ? (
        <button onClick={startRecording}>
          Start Recording
        </button>
      ) : (
        <button onClick={stopRecording}>
          Stop Recording
        </button>
      )}

      {loading && <p>Processing...</p>}

      <h3>Output:</h3>
      <p>{text}</p>
    </div>
  );
}