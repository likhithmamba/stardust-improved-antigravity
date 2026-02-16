import { Note } from '../types';

export interface MatrixQuadrant {
  name: string;
  color: string;
  description: string;
}

export interface MatrixPosition {
  impact: number; // 0-1
  effort: number; // 0-1
}

// The four quadrants of the matrix
export const MATRIX_QUADRANTS: Record<string, MatrixQuadrant> = {
  'quickWins': {
    name: 'Quick Wins',
    color: '#4CAF50',
    description: 'High impact, low effort - Do these first'
  },
  'majorProjects': {
    name: 'Major Projects',
    color: '#2196F3',
    description: 'High impact, high effort - Schedule these carefully'
  },
  'fillIns': {
    name: 'Fill-ins',
    color: '#FF9800',
    description: 'Low impact, low effort - Do if time permits'
  },
  'thanklessTasks': {
    name: 'Thankless Tasks',
    color: '#F44336',
    description: 'Low impact, high effort - Consider eliminating'
  }
};

export class MatrixEngine {
  // Evaluate a note's position in the matrix
  static evaluateNote(note: Note): MatrixPosition {
    return {
      impact: note.impact || 0.5,
      effort: note.effort || 0.5
    };
  }

  // Determine which quadrant a note belongs to
  static getQuadrant(position: MatrixPosition): string {
    if (position.impact >= 0.5 && position.effort < 0.5) {
      return 'quickWins';
    } else if (position.impact >= 0.5 && position.effort >= 0.5) {
      return 'majorProjects';
    } else if (position.impact < 0.5 && position.effort < 0.5) {
      return 'fillIns';
    } else {
      return 'thanklessTasks';
    }
  }

  // Auto-pruning logic for low impact/high effort tasks
  static shouldPrune(position: MatrixPosition): boolean {
    // Prune tasks in thankless tasks quadrant with very low impact
    return position.impact < 0.3 && position.effort > 0.7;
  }

  // Generate ghost layers (alternative views)
  static generateGhostLayers(notes: Note[]): Record<string, Note[]> {
    return {
      moscow: this.categorizeByMoSCoW(notes),
      swot: this.categorizeBySWOT(notes)
    };
  }

  // Handle drag-to-position updates
  static handleDragUpdate(noteId: string, newX: number, newY: number, containerWidth: number, containerHeight: number): Partial<Note> {
    // Convert canvas coordinates to impact/effort values (0-1 scale)
    const impact = Math.max(0, Math.min(1, newX / containerWidth));
    const effort = Math.max(0, Math.min(1, 1 - (newY / containerHeight))); // Y is inverted (top = high effort)
    
    return {
      impact,
      effort,
      updatedAt: new Date()
    };
  }

  // Get CSS position for a note based on its impact/effort
  static getCSSPosition(note: Note, containerWidth: number, containerHeight: number): {left: string, top: string} {
    const x = (note.impact || 0.5) * containerWidth;
    const y = (1 - (note.effort || 0.5)) * containerHeight; // Y is inverted
    
    return {
      left: ${x}px,
      top: ${y}px
    };
  }

  private static categorizeByMoSCoW(notes: Note[]): Note[] {
    return notes.filter(note => {
      const content = note.content.toLowerCase();
      return content.includes('must') || content.includes('should') || 
             content.includes('could') || content.includes('won\'t');
    });
  }

  private static categorizeBySWOT(notes: Note[]): Note[] {
    return notes.filter(note => {
      const content = note.content.toLowerCase();
      return content.includes('strength') || content.includes('weakness') || 
             content.includes('opportunity') || content.includes('threat');
    });
  }
}
