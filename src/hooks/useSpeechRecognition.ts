// import { useState } from 'react';

// export function useSpeechRecognition() {
//   const [speech, setSpeech] = useState('');
//   const [isRecording, setIsRecording] = useState(false);

//   const startRecognition = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert('Speech recognition is not supported in this browser.');
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.start();
//     setIsRecording(true);

//     recognition.onresult = (event: SpeechRecognitionEvent) => {
//       setSpeech(event.results[0][0].transcript);
//       setIsRecording(false);
//     };

//     recognition.onerror = (event: SpeechRecognitionError) => {
//       console.error('Speech recognition error:', event.error);
//       setIsRecording(false);
//       alert('Speech recognition error. Please try again.');
//     };
//   };

//   return { speech, isRecording, startRecognition, setSpeech };
// }

// import { useState, useEffect } from 'react';

// export function useSpeechRecognition() {
//   const [speech, setSpeech] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [recognition, setRecognition] = useState<SpeechRecognition | null>(
//     null
//   );

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;

//       if (SpeechRecognition) {
//         const recogInstance = new SpeechRecognition();
//         recogInstance.lang = 'en-US';
//         recogInstance.continuous = false; // Ensures recognition stops after speaking
//         recogInstance.interimResults = false;

//         recogInstance.onresult = (event: SpeechRecognitionEvent) => {
//           const transcript = event.results[0][0].transcript;
//           setSpeech(transcript);
//           setIsRecording(false);
//         };

//         recogInstance.onerror = (event: SpeechRecognitionError) => {
//           console.error('Speech recognition error:', event.error);
//           setIsRecording(false);
//         };

//         setRecognition(recogInstance);
//       } else {
//         console.warn('Speech recognition is not supported in this browser.');
//       }
//     }
//   }, []);

//   const startRecognition = () => {
//     if (recognition) {
//       recognition.start();
//       setIsRecording(true);
//     } else {
//       alert('Speech recognition is not supported in this browser.');
//     }
//   };

//   return { speech, isRecording, startRecognition, setSpeech };
// }

import { useState, useRef } from 'react';

export function useSpeechRecognition() {
  const [speech, setSpeech] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<number | null>(null); // Fix NodeJS.Timer issue

  const startRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    setIsRecording(true);

    intervalRef.current = window.setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      setSpeech(event.results[0][0].transcript);
      setIsRecording(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTimer(0);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTimer(0);
    };
  };

  const stopRecognition = () => {
    setIsRecording(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimer(0);
  };

  const restartRecognition = () => {
    stopRecognition();
    startRecognition();
  };

  return {
    speech,
    isRecording,
    timer,
    startRecognition,
    stopRecognition,
    restartRecognition,
  };
}
