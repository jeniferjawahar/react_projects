export const startSpeechToText = (onResult) => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Not supported");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    onResult(text);
  };

  recognition.start();

  return recognition;
};