// import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
// import { useTextToSpeech } from '../hooks/useTextToSpeech';
// import { useAiSpeechEnhancer } from '../hooks/useAiSpeechEnhancer';

// function SpeechBuilder() {
//   const { speech, isRecording, startRecognition, setSpeech } =
//     useSpeechRecognition();
//   const { speak, isSpeaking } = useTextToSpeech();
//   const { aiSuggestion, enhanceSpeech, loading } = useAiSpeechEnhancer();

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">Speech Builder 🎙️</h1>

//       <textarea
//         className="border w-full p-2 my-2"
//         rows={5}
//         placeholder="Write or speak your speech..."
//         value={speech}
//         onChange={(e) => setSpeech(e.target.value)}
//       ></textarea>

//       <button
//         onClick={() => enhanceSpeech(speech)}
//         className="bg-blue-500 text-white p-2 mx-2"
//       >
//         {loading ? 'Enhancing...' : 'Improve Speech (AI)'}
//       </button>

//       <button
//         onClick={startRecognition}
//         className="bg-green-500 text-white p-2 mx-2"
//       >
//         {isRecording ? 'Listening...' : '🎤 Speak'}
//       </button>

//       <button
//         onClick={() => speak(aiSuggestion || speech)}
//         className="bg-purple-500 text-white p-2 mx-2"
//       >
//         🔊 {isSpeaking ? 'Speaking...' : 'Read Aloud'}
//       </button>

//       {aiSuggestion && (
//         <div className="mt-4 p-2 border">
//           <h2 className="text-xl font-bold">AI Suggestion</h2>
//           <p>{aiSuggestion}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SpeechBuilder;

// import { useState } from 'react';
// import { useTextToSpeech } from '../hooks/useTextToSpeech';
// import { useAiSpeechEnhancer } from '../hooks/useAiSpeechEnhancer';
// import { useSavedSpeeches } from '../hooks/useSavedSpeeches';

// function SpeechBuilder() {
//   const [speech, setSpeech] = useState('');
//   const [reviewedSpeech, setReviewedSpeech] = useState<string | null>(null);
//   const { speak, stop } = useTextToSpeech();
//   const { aiSuggestion, enhanceSpeech, loading, getHighlightedEnhancement } =
//     useAiSpeechEnhancer();
//   const { savedSpeeches, saveSpeech, deleteSpeech } = useSavedSpeeches();

//   const handleEdit = (content: string) => {
//     setSpeech(content);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">Speech Builder 🎙️</h1>

//       <textarea
//         className="border w-full p-2 my-2"
//         rows={5}
//         placeholder="Write or speak your speech..."
//         value={speech}
//         onChange={(e) => setSpeech(e.target.value)}
//       ></textarea>

//       <button
//         onClick={() => saveSpeech(speech)}
//         className="bg-yellow-500 text-white p-2 mx-2"
//       >
//         💾 Save Speech
//       </button>

//       <button
//         onClick={() => enhanceSpeech(speech)}
//         className="bg-blue-500 text-white p-2 mx-2"
//       >
//         {loading ? 'Enhancing...' : 'Improve Speech (AI)'}
//       </button>

//       {/* AI Enhanced Speech Display with Highlights */}
//       {aiSuggestion && (
//         <div className="mt-4 p-3 border rounded bg-gray-100">
//           <h2 className="text-lg font-semibold">✨ Improved Speech</h2>
//           <p
//             dangerouslySetInnerHTML={{
//               __html: getHighlightedEnhancement(speech, aiSuggestion),
//             }}
//           ></p>

//           <button
//             onClick={() => speak(aiSuggestion)}
//             className="bg-purple-500 text-white px-3 py-1 mt-2"
//           >
//             🔊 Read Aloud
//           </button>
//         </div>
//       )}

//       {/* Saved Speeches Section */}
//       <div className="mt-6">
//         <h2 className="text-xl font-bold">📜 Saved Speeches</h2>
//         {savedSpeeches.length === 0 ? (
//           <p className="text-gray-500">Here will be saved your speeches.</p>
//         ) : (
//           savedSpeeches.map((speech) => (
//             <div key={speech.id} className="border p-3 mt-2 shadow-md">
//               <h3 className="font-semibold">{speech.title}</h3>
//               <p className="text-gray-600">
//                 {speech.content.split('\n').slice(0, 4).join('\n')}...
//               </p>

//               <button
//                 onClick={() => setReviewedSpeech(speech.content)}
//                 className="bg-blue-400 text-white px-3 py-1 mt-2"
//               >
//                 🔍 Review
//               </button>

//               <button
//                 onClick={() => handleEdit(speech.content)}
//                 className="bg-yellow-500 text-white px-3 py-1 mt-2 ml-2"
//               >
//                 ✏️ Edit
//               </button>

//               <button
//                 onClick={() => deleteSpeech(speech.id)}
//                 className="bg-red-500 text-white px-3 py-1 mt-2 ml-2"
//               >
//                 🗑 Delete
//               </button>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Review Dialog */}
//       {reviewedSpeech && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-5 rounded-lg shadow-lg w-96">
//             <h2 className="text-lg font-bold">Reviewed Speech</h2>
//             <p className="mt-2">{reviewedSpeech}</p>

//             <div className="mt-4">
//               <button
//                 onClick={() => speak(reviewedSpeech)}
//                 className="bg-purple-500 text-white px-3 py-1"
//               >
//                 🔊 Read Aloud
//               </button>
//               <button
//                 onClick={() => stop()}
//                 className="bg-red-500 text-white px-3 py-1 ml-2"
//               >
//                 ⏹ Stop
//               </button>
//               <button
//                 onClick={() => setReviewedSpeech(null)}
//                 className="bg-gray-400 text-white px-3 py-1 ml-2"
//               >
//                 ❌ Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SpeechBuilder;

import { useState } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useAiSpeechEnhancer } from '../hooks/useAiSpeechEnhancer';
import { useSavedSpeeches } from '../hooks/useSavedSpeeches';
import { Dialog } from '../components/dialog/Dialog';

function SpeechBuilder() {
  const [speech, setSpeech] = useState('');
  const [dialogType, setDialogType] = useState<'delete' | 'replace' | null>(
    null
  );
  const [selectedSpeech, setSelectedSpeech] = useState<{
    id: number;
    content: string;
  } | null>(null);

  const {
    isRecording,
    timer,
    startRecognition,
    stopRecognition,
    restartRecognition,
  } = useSpeechRecognition();
  const { speak, stop, isSpeaking } = useTextToSpeech();
  const { aiSuggestion, enhanceSpeech, loading } = useAiSpeechEnhancer();
  const { savedSpeeches, saveSpeech, deleteSpeech } = useSavedSpeeches();

  const handleDeleteSpeech = (speechId: number) => {
    setSelectedSpeech({ id: speechId, content: '' });
    setDialogType('delete');
  };

  const handleConfirmDelete = () => {
    if (selectedSpeech) deleteSpeech(Number(selectedSpeech.id));
    setDialogType(null);
    setSelectedSpeech(null);
  };

  const handleEditSpeech = (speechItem: { id: number; content: string }) => {
    if (speechItem.content === speech) {
      setSpeech(speechItem.content);
      return;
    }

    setSelectedSpeech(speechItem);
    setDialogType('replace');
  };

  const handleConfirmReplace = () => {
    if (selectedSpeech) {
      setSpeech(selectedSpeech.content);
    }
    setDialogType(null);
    setSelectedSpeech(null);
  };

  return (
    <div className="p-4 flex flex-col gap-4 h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold">Speech Builder 🎙️</h1>

      {/* Main Textarea */}
      <textarea
        className="border w-full p-2  h-400"
        rows={5}
        placeholder="Write or speak your speech..."
        value={speech}
        onChange={(e) => setSpeech(e.target.value)}
      ></textarea>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={startRecognition}
          className="bg-green-500 text-white p-2"
        >
          {isRecording ? `🎤 Recording... (${timer}s)` : '🎤 Speak'}
        </button>
        {isRecording && (
          <>
            <button
              onClick={stopRecognition}
              className="bg-red-500 text-white p-2"
            >
              Stop
            </button>
            <button
              onClick={restartRecognition}
              className="bg-yellow-500 text-white p-2"
            >
              Restart
            </button>
          </>
        )}
        <button
          onClick={() => speak(speech)}
          className="bg-purple-500 text-white p-2"
        >
          🔊 {isSpeaking ? 'Speaking...' : 'Read Aloud'}
        </button>
        {isSpeaking && (
          <button onClick={stop} className="bg-red-500 text-white p-2">
            Stop
          </button>
        )}
        <button
          onClick={() => enhanceSpeech(speech)}
          className="bg-blue-500 text-white p-2"
        >
          {loading ? 'Enhancing...' : '✨ Improve Speech (AI)'}
        </button>
        <button
          onClick={() => saveSpeech(speech)}
          className="bg-gray-500 text-white p-2"
        >
          💾 Save
        </button>
      </div>

      {/* Two Sections Below */}
      <div className="flex flex-col md:flex-row gap-4 flex-grow">
        {/* AI Improved Speech Section */}
        <div className="flex-1 p-4 border rounded-lg shadow-md h-[50vh] overflow-auto">
          <h2 className="text-lg font-bold">✨ AI Improved Speech</h2>
          {aiSuggestion ? (
            <p>{aiSuggestion}</p>
          ) : (
            <p className="text-gray-500 italic">
              Here you will find the improved versions of your speech.
            </p>
          )}
        </div>

        {/* Saved Speeches Section */}
        <div className="flex-1 p-4 border rounded-lg shadow-md h-[50vh] overflow-auto">
          <h2 className="text-lg font-bold">📜 Saved Speeches</h2>
          {savedSpeeches.length > 0 ? (
            savedSpeeches.map((speech) => (
              <div
                key={speech.id}
                className="border p-2 my-2 rounded-lg shadow-sm bg-white"
              >
                <h3 className="font-bold">{speech.title}</h3>
                <p className="text-gray-700 line-clamp-2 whitespace-normal">
                  {speech.content}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setSpeech(speech.content)}
                    className="text-blue-500"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleEditSpeech(speech)}
                    className="text-blue-500"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSpeech(speech.id)}
                    className="text-red-500"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">
              Here you will find the speeches you've saved.
            </p>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        isOpen={dialogType === 'delete'}
        title="Confirm Deletion"
        message="Are you sure you want to delete this speech?"
        confirmText="Yes, delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDialogType(null)}
      />

      <Dialog
        isOpen={dialogType === 'replace'}
        title="Speech Already Exists"
        message="This speech already exists. Do you want to replace it or save a new one?"
        confirmText="Replace"
        cancelText="Cancel"
        onConfirm={handleConfirmReplace}
        onCancel={() => setDialogType(null)}
      />
    </div>
  );
}

export default SpeechBuilder;
