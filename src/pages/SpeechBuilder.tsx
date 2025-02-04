import { useState } from "react";
import { useGlossary } from "../store/useGlossary";

function SpeechBuilder() {
  const { glossary, speeches, addSpeech } = useGlossary();
  const [speech, setSpeech] = useState("");

  const handleSaveSpeech = () => {
    if (speech.trim() !== "") {
      addSpeech(speech);
      setSpeech("");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Speech Builder</h1>

      <textarea
        className="border w-full p-2 my-2"
        rows={5}
        placeholder="Write your speech here..."
        value={speech}
        onChange={(e) => setSpeech(e.target.value)}
      ></textarea>

      <button onClick={handleSaveSpeech} className="bg-blue-500 text-white p-2">
        Save Speech
      </button>

      <h2 className="text-xl font-bold mt-4">Saved Speeches</h2>
      <ul>
        {speeches.map((s, i) => (
          <li key={i} className="border p-2 my-1">
            {s}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-4">Your Glossary</h2>
      <ul>
        {glossary.map((entry, index) => (
          <li key={index}>
            <strong>{entry.term}</strong>: {entry.definition}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpeechBuilder;