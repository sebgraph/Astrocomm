// import { useState, useEffect } from 'react';

// interface SavedSpeech {
//   id: number;
//   title: string;
//   content: string;
// }

// export function useSavedSpeeches() {
//   const [savedSpeeches, setSavedSpeeches] = useState<SavedSpeech[]>([]);

//   // Load saved speeches from localStorage on mount
//   useEffect(() => {
//     const storedSpeeches = localStorage.getItem('savedSpeeches');
//     if (storedSpeeches) {
//       setSavedSpeeches(JSON.parse(storedSpeeches));
//     }
//   }, []);

//   // Save speeches to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem('savedSpeeches', JSON.stringify(savedSpeeches));
//   }, [savedSpeeches]);

//   const saveSpeech = (speech: string) => {
//     if (!speech.trim()) return;

//     const newSpeech: SavedSpeech = {
//       id: Date.now(),
//       title: speech.split('. ')[0] || 'Untitled Speech', // First sentence as title
//       content: speech,
//     };

//     setSavedSpeeches([...savedSpeeches, newSpeech]);
//   };

//   const deleteSpeech = (id: number) => {
//     setSavedSpeeches(savedSpeeches.filter((speech) => speech.id !== id));
//   };

//   return { savedSpeeches, saveSpeech, deleteSpeech };
// }

import { useState, useEffect } from 'react';

interface SavedSpeech {
  id: number;
  title: string;
  content: string;
}

export function useSavedSpeeches() {
  const [savedSpeeches, setSavedSpeeches] = useState<SavedSpeech[]>([]);
  const [speechToDelete, setSpeechToDelete] = useState<SavedSpeech | null>(
    null
  );
  const [speechToSave, setSpeechToSave] = useState<SavedSpeech | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const storedSpeeches = localStorage.getItem('savedSpeeches');
    if (storedSpeeches) {
      setSavedSpeeches(JSON.parse(storedSpeeches));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('savedSpeeches', JSON.stringify(savedSpeeches));
  }, [savedSpeeches]);

  const saveSpeech = (speech: string) => {
    if (!speech.trim()) return;

    const title = speech.split('. ')[0] || 'Untitled Speech';
    const existingSpeech = savedSpeeches.find((s) => s.title === title);

    if (existingSpeech) {
      setSpeechToSave({ id: existingSpeech.id, title, content: speech });
      setShowSaveDialog(true);
      return;
    }

    // Save new speech
    const newSpeech: SavedSpeech = { id: Date.now(), title, content: speech };
    setSavedSpeeches([...savedSpeeches, newSpeech]);
  };

  const replaceSpeech = () => {
    if (!speechToSave) return;
    setSavedSpeeches(
      savedSpeeches.map((s) =>
        s.id === speechToSave.id ? { ...s, content: speechToSave.content } : s
      )
    );
    setShowSaveDialog(false);
  };

  const saveNewSpeech = () => {
    if (!speechToSave) return;
    setSavedSpeeches([...savedSpeeches, { ...speechToSave, id: Date.now() }]);
    setShowSaveDialog(false);
  };

  const deleteSpeech = (id: number) => {
    setSpeechToDelete(savedSpeeches.find((s) => s.id === id) || null);
    setShowDeleteDialog(true);
  };

  const confirmDeleteSpeech = () => {
    if (!speechToDelete) return;
    setSavedSpeeches(savedSpeeches.filter((s) => s.id !== speechToDelete.id));
    setShowDeleteDialog(false);
  };

  return {
    savedSpeeches,
    saveSpeech,
    deleteSpeech,
    replaceSpeech,
    saveNewSpeech,
    confirmDeleteSpeech,
    showSaveDialog,
    showDeleteDialog,
    setShowSaveDialog,
    setShowDeleteDialog,
  };
}
