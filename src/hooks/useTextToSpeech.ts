// import { useState } from "react";

// export function useTextToSpeech() {
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   const speak = (text: string, lang: string = "en-US") => {
//     if (!text) return;

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = lang;

//     utterance.onstart = () => setIsSpeaking(true);
//     utterance.onend = () => setIsSpeaking(false);
//     utterance.onerror = () => setIsSpeaking(false);

//     speechSynthesis.speak(utterance);
//   };

//   return { speak, isSpeaking };
// }

// import { useState } from 'react';

// export function useTextToSpeech() {
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   const speak = (text: string) => {
//     if (!text.trim()) return;

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.onend = () => setIsSpeaking(false);

//     speechSynthesis.speak(utterance);
//     setIsSpeaking(true);
//   };

//   const stop = () => {
//     speechSynthesis.cancel();
//     setIsSpeaking(false);
//   };

//   const pause = () => {
//     speechSynthesis.pause();
//   };

//   const resume = () => {
//     speechSynthesis.resume();
//   };

//   return { speak, stop, pause, resume, isSpeaking };
// }

import { useState } from 'react';

export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;
  let utterance: SpeechSynthesisUtterance | null = null;

  const speak = (text: string) => {
    if (!synth) {
      alert('Text-to-speech is not supported.');
      return;
    }

    utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    synth.speak(utterance);
  };

  const stop = () => {
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
    }
  };

  const pause = () => {
    if (synth.speaking) synth.pause();
  };

  const resume = () => {
    if (synth.paused) synth.resume();
  };

  const restart = (text: string) => {
    stop();
    speak(text);
  };

  return {
    speak,
    stop,
    pause,
    resume,
    restart,
    isSpeaking,
  };
}
