
// Updated appController.ts for message proxy pattern
import { useStardustStore } from './stateManager';
import { db } from './persistence';

export class StardustController {
  private store = useStardustStore;
  private worker: Worker | null = null;
  private workerReady = false;

  constructor() {
    this.initializeWorker();
  }
  
  // Initialize Web Worker
  private initializeWorker() {
    try {
      this.worker = new Worker(new URL('../workers/orbitalWorker.ts', import.meta.url));
      
      // Handle messages from worker
      this.worker.onmessage = (e) => {
        const { type, payload } = e.data;
        
        switch (type) {
          case 'POSITIONS_UPDATE':
            // Update positions in store for rendering
            this.updateNodePositions(payload);
            break;
            
          case 'ERROR':
            console.error('Physics worker error:', payload);
            break;
        }
      };
      
      // Initialize worker with current viewport size
      this.worker.postMessage({
        type: 'INIT',
        payload: {
          width: window.innerWidth,
          height: window.innerHeight,
          config: {
            repulsionStrength: 0.5,
            attractionStrength: 0.1,
            damping: 0.1,
            gravity: 0.01
          }
        }
      });
      
      this.workerReady = true;
    } catch (error) {
      console.error('Failed to initialize physics worker:', error);
    }
  }
  
  // Start physics simulation
  startSimulation() {
    if (this.workerReady && this.worker) {
      const state = this.store.getState();
      const physicsNodes = Object.values(state.notes).map(note => ({
        id: note.id,
        mass: (note.links?.length || 0) * 1.5 + (note.accessCount || 0) * 0.5,
        x: Math.random() * 1000,
        y: Math.random() * 1000
      }));
      
      this.worker.postMessage({
        type: 'SET_INITIAL_STATE',
        payload: {
          nodes: physicsNodes,
          links: state.links
        }
      });
      
      this.worker.postMessage({
        type: 'START_SIMULATION'
      });
    }
  }
  
  // Update node positions from worker
  private updateNodePositions(positions: {id: string, x: number, y: number}[]) {
    // This will be used by the rendering system to position nodes
    this.store.setState({ 
      nodePositions: positions.reduce((acc, pos) => ({
        ...acc,
        [pos.id]: { x: pos.x, y: pos.y }
      }), {})
    });
  }
  
  // Load data from database
  async loadData() {
    const notes = await db.notes.toArray();
    const links = await db.links.toArray();
    
    // Update store with loaded data
    this.store.setState({
      notes: notes.reduce((acc, note) => ({ ...acc, [note.id]: note }), {}),
      links
    });
  }
  
  // Save current state to database
  async saveData() {
    const state = this.store.getState();
    const notes = Object.values(state.notes);
    
    await db.transaction('rw', db.notes, db.links, async () => {
      await db.notes.bulkPut(notes);
      await db.links.bulkPut(state.links);
    });
  }
  
  // Clean up resources
  destroy() {
    if (this.worker) {
      this.worker.terminate();
    }
  }
}

// Export singleton instance
export const stardustController = new StardustController();

