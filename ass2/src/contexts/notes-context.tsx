import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
};

type NotesContextValue = {
  notes: Note[];
  activeNoteId: string | null;
  setActiveNoteId: (id: string | null) => void;
  createNote: (title?: string, content?: string) => Note;
  updateNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
};

const NotesContext = createContext<NotesContextValue | undefined>(undefined);

const INITIAL_NOTES: Note[] = [
  {
    id: "1",
    title: "Roadmap for Q2",
    content:
      "Finalize onboarding flow, tighten release checklist, and confirm analytics events.",
    updatedAt: "May 10, 2026",
  },
  {
    id: "2",
    title: "Morning Pages",
    content:
      "Breathe. Write. Stretch. No phone for the first 30 minutes. Focus on one task.",
    updatedAt: "May 11, 2026",
  },
  {
    id: "3",
    title: "Design Review",
    content:
      "Reduce shadow intensity, simplify typography, and align card paddings across sections.",
    updatedAt: "May 8, 2026",
  },
  {
    id: "4",
    title: "Reading List",
    content:
      "Atomic Habits, The Design of Everyday Things, and The Practice of Management.",
    updatedAt: "May 6, 2026",
  },
  {
    id: "5",
    title: "Product Ideas",
    content:
      "Shared focus sessions, collaborative annotations, daily summaries with smart tags.",
    updatedAt: "May 9, 2026",
  },
];

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(
    INITIAL_NOTES[0]?.id ?? null,
  );

  const createNote = useCallback((title = "Untitled", content = "") => {
    const newNote: Note = {
      id: `${Date.now()}`,
      title: title.trim() ? title : "Untitled",
      content,
      updatedAt: formatDate(new Date()),
    };
    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
    return newNote;
  }, []);

  const updateNote = useCallback(
    (id: string, title: string, content: string) => {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id
            ? {
                ...note,
                title: title.trim() ? title : "Untitled",
                content,
                updatedAt: formatDate(new Date()),
              }
            : note,
        ),
      );
    },
    [],
  );

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    setActiveNoteId((current) => (current === id ? null : current));
  }, []);

  const value = useMemo(
    () => ({
      notes,
      activeNoteId,
      setActiveNoteId,
      createNote,
      updateNote,
      deleteNote,
    }),
    [notes, activeNoteId, createNote, updateNote, deleteNote],
  );

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}

export type { Note };
