import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlossaryEntry {
  term: string;
  definition: string;
}

interface GlossaryStore {
  glossary: GlossaryEntry[];
  addTerm: (term: string, definition: string) => void;

  speeches: string[];
  addSpeech: (speech: string) => void;
}

export const useGlossary = create(
  persist<GlossaryStore>(
    (set) => ({
      glossary: [],
      addTerm: (term, definition) =>
        set((state) => ({ glossary: [...state.glossary, { term, definition }] })),

      speeches: [],
      addSpeech: (speech) =>
        set((state) => ({ speeches: [...state.speeches, speech] })),
    }),
    { name: "astrocomm-storage" }
  )
);