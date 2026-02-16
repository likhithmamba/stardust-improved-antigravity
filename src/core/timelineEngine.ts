
// Stardust Timeline Mode - Sequential Momentum Tracking
import type { Note, Snapshot } from '../types';

export interface TimelineEntry {
  timestamp: Date;
  noteId: string;
  action: 'created' | 'updated' | 'deleted' | 'completed' | 'contextSwitch';
  metadata?: Record<string, any>;
}

export interface ProjectVelocity {
  createdAt: Date;
  completionRate: number; // tasks completed per day
  movingAverage: number;  // 7-day moving average
}

export class TimelineEngine {
  // Context switching detection
  static detectContextSwitch(entries: TimelineEntry[]): TimelineEntry[] {
    return entries.filter(entry => {
      // Detect when user switches between unrelated topics
      return entry.action === 'contextSwitch' || 
             (entry.action === 'updated' && entry.metadata?.contextChange);
    });
  }

  // Interstitial journaling prompt
  static shouldPromptForJournal(lastEntries: TimelineEntry[], timeThresholdMinutes: number = 30): boolean {
    if (lastEntries.length < 2) return false;
    
    const lastEntry = lastEntries[lastEntries.length - 1];
    const secondLastEntry = lastEntries[lastEntries.length - 2];
    
    const timeDiff = lastEntry.timestamp.getTime() - secondLastEntry.timestamp.getTime();
    return timeDiff > timeThresholdMinutes * 60 * 1000;
  }

  // Calculate project velocity
  static calculateProjectVelocity(
    notes: Note[], 
    startDate: Date, 
    endDate: Date
  ): ProjectVelocity {
    const createdNotes = notes.filter(note => 
      note.createdAt >= startDate && note.createdAt <= endDate
    );
    
    const completedNotes = notes.filter(note => 
      note.tags.includes('done') && 
      note.updatedAt >= startDate && 
      note.updatedAt <= endDate
    );
    
    const daysInRange = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const completionRate = daysInRange > 0 ? completedNotes.length / daysInRange : 0;
    
    // Simplified moving average calculation
    const movingAverage = completionRate; // In a real implementation, this would be calculated over time
    
    return {
      createdAt: new Date(),
      completionRate,
      movingAverage
    };
  }

  // Create snapshot for rewind functionality
  static createSnapshot(notes: Note[], links: any[]): Snapshot {
    return {
      timestamp: new Date(),
      state: {
        notes: notes.reduce((acc, note) => ({ ...acc, [note.id]: note }), {}),
        links,
        activeView: 'timeline',
        selectedNoteId: null,
        searchTerm: '',
        filters: { tags: [], dateRange: null }
      },
      diffFromPrevious: '' // Would contain actual diff in production
    };
  }

  // Compare snapshots to show evolution
  static compareSnapshots(oldSnapshot: Snapshot, newSnapshot: Snapshot) {
    // Implementation would show differences between snapshots
    // For now, returning a simplified comparison
    const oldNoteCount = Object.keys(oldSnapshot.state.notes).length;
    const newNoteCount = Object.keys(newSnapshot.state.notes).length;
    
    return {
      notesDelta: newNoteCount - oldNoteCount,
      linksDelta: newSnapshot.state.links.length - oldSnapshot.state.links.length
    };
  }
}

