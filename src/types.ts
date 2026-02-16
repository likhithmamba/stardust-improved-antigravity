// Stardust Core Types
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  lastAccessed: Date;
  tags: string[];
  metadata: Record<string, any>;
  links: string[]; // IDs of linked notes
  accessCount: number;
  impact?: number; // 0-1 for Matrix Mode
  effort?: number; // 0-1 for Matrix Mode
  wavelengths: {
    action: string[];
    strategy: string[];
    resource: string[];
    counterPerspective: string;
  };
}

export interface Link {
  sourceId: string;
  targetId: string;
  strength: number; // 0-1
  type: 'semantic' | 'hierarchical' | 'temporal' | 'causal';
}

export interface Snapshot {
  timestamp: Date;
  state: any;
  diffFromPrevious: string;
}

export interface GlobalState {
  notes: Record<string, Note>;
  links: Link[];
  activeView: 'orbital' | 'matrix' | 'timeline' | 'prism';
  selectedNoteId: string | null;
  searchTerm: string;
  filters: {
    tags: string[];
    dateRange: { start: Date; end: Date } | null;
  };
}

// Physics engine types
export interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  radius: number;
  linksCount: number;
  accessCount: number;
  lastAccessed: Date;
}

export interface Edge {
  sourceId: string;
  targetId: string;
  strength: number;
}
