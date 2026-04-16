import { useState, useRef } from "react";
import { pipeline, env } from "@xenova/transformers";

// Config
env.allowLocalModels = false;
env.useBrowserCache = true;

export default function App() {
  const [pipe, setPipe] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("auto");

  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  // ✅ Load model (ONLY ONE FUNCTION)
  async function loadModel() {
    if (pipe) return pipe;

    try {
      console.log("⏳ Loading model...");
      setLoading(true);

      const model = await pipeline(
        "automatic-speech-recognition",
        "Xenova/whisper-base" // multilingual
      );

      console.log("✅ Model loaded");

      setPipe(model);
      return model;
    } catch (err) {
      console.error("❌ Model load error:", err);
      alert("Model failed to load");
    } finally {
      setLoading(false);
    }
  }

  // 🎤 Start recording
  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = processAudio;
      recorder.start();
    } catch (err) {
      console.error("Mic error:", err);
      alert("Microphone permission denied");
    }
  }

  // ⛔ Stop recording
  function stopRecording() {
    if (recorderRef.current) {
      recorderRef.current.stop();
    }
  }

  // 🧠 Process audio
  async function processAudio() {
    try {
      console.log("🎤 Processing audio...");

      const blob = new Blob(chunksRef.current, {
        type: "audio/webm",
      });

      if (blob.size === 0) {
        alert("No audio recorded");
        return;
      }

      const arrayBuffer = await blob.arrayBuffer();

      // ❗ Do NOT force sample rate
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      let channelData;

      if (audioBuffer.numberOfChannels > 1) {
        const left = audioBuffer.getChannelData(0);
        const right = audioBuffer.getChannelData(1);

        channelData = new Float32Array(left.length);

        for (let i = 0; i < left.length; i++) {
          channelData[i] = (left[i] + right[i]) / 2;
        }
      } else {
        channelData = audioBuffer.getChannelData(0);
      }

      if (!channelData || channelData.length < 1000) {
        alert("Audio too short or invalid");
        return;
      }

      const model = await loadModel();

      setLoading(true);

      console.log("🧠 Running model...");

      let result;

      if (language === "auto") {
        result = await model(channelData);
      } else {
        result = await model(channelData, {
          generate_kwargs: {
            language: language,
            task: "transcribe",
          },
        });
      }

      console.log("✅ Result:", result);

      setText(result.text);
    } catch (err) {
      console.error("❌ FULL ERROR:", err);
      alert("Transcription failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🎤 Speech-to-Text (English + Tamil)</h2>

      <select onChange={(e) => setLanguage(e.target.value)}>
        <option value="auto">Auto Detect</option>
        <option value="english">English</option>
        <option value="tamil">Tamil</option>
      </select>

      <br /><br />

      <button onClick={startRecording}>Start</button>
      <button onClick={stopRecording}>Stop</button>

      {loading && <p>⏳ Processing...</p>}

      <h3>Output:</h3>
      <p>{text}</p>
    </div>
  );
}