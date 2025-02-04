import { useGlossary } from "../store/useGlossary";
import { useState } from "react";

function Glossary() {
  const { glossary, addTerm } = useGlossary();
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");

  const handleAdd = () => {
    if (term && definition) {
      addTerm(term, definition);
      setTerm("");
      setDefinition("");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Glossary</h1>
      <input
        type="text"
        placeholder="Term"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="border p-2 m-2"
      />
      <input
        type="text"
        placeholder="Definition"
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
        className="border p-2 m-2"
      />
      <button onClick={handleAdd} className="bg-blue-500 text-white p-2">
        Add Term
      </button>

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

export default Glossary;