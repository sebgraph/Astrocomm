// import { useState } from 'react';

// export function useAiSpeechEnhancer() {
//   const [aiSuggestion, setAiSuggestion] = useState('');
//   const [aiExplanation, setAiExplanation] = useState('');
//   const [loading, setLoading] = useState(false);

//   const enhanceSpeech = async (text: string) => {
//     if (!text.trim()) {
//       alert('Please enter or speak some text first.');
//       return;
//     }

//     setLoading(true);

//     try {
//       console.log('Sending text to AI:', text);

//       // Simulate AI enhancement (Replace with real API call)
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       const improvedText = text.replace('example', 'great example'); // Simulated change
//       setAiSuggestion(improvedText);

//       // Highlight differences (basic diffing logic)
//       const explanation = `Changed 'example' to 'great example' for clarity.`;
//       setAiExplanation(explanation);

//       console.log('AI Suggestion:', improvedText);
//       console.log('AI Explanation:', explanation);
//     } catch (error) {
//       console.error('Error enhancing speech:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { aiSuggestion, aiExplanation, enhanceSpeech, loading };
// }

import { useState } from 'react';

export function useAiSpeechEnhancer() {
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const enhanceSpeech = async (speech: string): Promise<string> => {
    if (!speech.trim()) return speech; // Always return something

    setLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const improvedSpeech = speech.replace(/bad/gi, 'better'); // Fake improvement
        setAiSuggestion(improvedSpeech);
        setLoading(false);
        resolve(improvedSpeech); // Return the improved speech
      }, 1000);
    });
  };

  const getHighlightedEnhancement = (original: string, enhanced: string) => {
    return enhanced
      .split(' ')
      .map((word, i) =>
        word !== original.split(' ')[i] ? `<mark>${word}</mark>` : word
      )
      .join(' ');
  };

  return { aiSuggestion, enhanceSpeech, loading, getHighlightedEnhancement };
}
