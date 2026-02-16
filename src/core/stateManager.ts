
// Stardust State Manager
import { createStore } from 'zustand';
import type { Note, Link, GlobalState } from '../types';

interface StoreState extends GlobalState {
  // Note actions
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (noteId: string) => void;
  
  // Link actions
  addLink: (link: Link) => void;
  updateLinks: (links: Link[]) => void;
  
  // View actions
  setActiveView: (view: GlobalState['activeView']) => void;
  setSelectedNoteId: (id: string | null) => void;
  setSearchTerm: (term: string) => void;
  setFilters: (filters: GlobalState['filters']) => void;
}

const createStardustStore = () => {
  return createStore<StoreState>((set) => ({
    // Initial state
    notes: {},
    links: [],
    activeView: 'orbital',
    selectedNoteId: null,
    searchTerm: '',
    filters: {
      tags: [],
      dateRange: null
    },

    // Note actions
    addNote: (note) => set((state) => ({
      notes: { ...state.notes, [note.id]: note }
    })),
    
    updateNote: (note) => set((state) => ({
      notes: { ...state.notes, [note.id]: note }
    })),
    
    deleteNote: (noteId) => set((state) => {
      const newNotes = { ...state.notes };
      delete newNotes[noteId];
      return { notes: newNotes };
    }),

    // Link actions
    addLink: (link) => set((state) => ({
      links: [...state.links, link]
    })),
    
    updateLinks: (links) => set({ links }),

    // View actions
    setActiveView: (view) => set({ activeView: view }),
    setSelectedNoteId: (id) => set({ selectedNoteId: id }),
    setSearchTerm: (term) => set({ searchTerm: term }),
    setFilters: (filters) => set({ filters })
  }));
};

export const useStardustStore = createStardustStore();

