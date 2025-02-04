import { useState } from "react";
import { generateText } from "../services/huggingFace";

function SpeechBuilder() {
  const [speech, setSpeech] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleGenerate = async () => {
    if (speech.trim()) {
      const suggestion = await generateText(speech);
      setAiSuggestion(suggestion);
    }
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setIsRecording(true);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      setSpeech(event.results[0][0].transcript);
      setIsRecording(false);
    };

    recognition.onerror = (event: SpeechRecognitionError) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
      alert("Speech recognition error. Please try again.");
    };
  };

  const handleSpeak = () => {
    if (!aiSuggestion) return;

    const utterance = new SpeechSynthesisUtterance(aiSuggestion);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Speech Builder 🎙️</h1>

      <textarea
        className="border w-full p-2 my-2"
        rows={5}
        placeholder="Write or speak your speech..."
        value={speech}
        onChange={(e) => setSpeech(e.target.value)}
      ></textarea>

      <button onClick={handleGenerate} className="bg-blue-500 text-white p-2 mx-2">
        Improve Speech (AI)
      </button>

      <button onClick={startSpeechRecognition} className="bg-green-500 text-white p-2 mx-2">
        {isRecording ? "Listening..." : "🎤 Speak"}
      </button>

      <button onClick={handleSpeak} className="bg-purple-500 text-white p-2 mx-2">
        🔊 Read Aloud
      </button>

      {aiSuggestion && (
        <div className="mt-4 p-2 border">
          <h2 className="text-xl font-bold">AI Suggestion</h2>
          <p>{aiSuggestion}</p>
        </div>
      )}
    </div>
  );
}

export default SpeechBuilder;