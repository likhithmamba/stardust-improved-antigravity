
// Stardust Integration Example
// Demonstrates how all components work together in a complete application

import { stardustController } from './core/appController';
import { useStardustStore } from './core/stateManager';
import { db } from './core/persistence';
import { OrbitalPhysicsEngine } from './core/orbitalPhysics';

// Example usage of the complete system
class StardustDemo {
  private controller = stardustController;
  private physicsEngine: OrbitalPhysicsEngine;
  
  constructor() {
    // Initialize physics engine with large scale for complex graphs
    this.physicsEngine = new OrbitalPhysicsEngine(3000, 3000);
  }
  
  // Demonstrate creating a comprehensive note with all features
  async createComprehensiveNote() {
    // Create a strategic project note
    const note = this.controller.createNote(
      
Q2
Product
Launch
Strategy, 
      # Q2 Product Launch

## Goals
- Increase market share by 15%
- Expand to 3 new markets
- Achieve 10,000 new users

## Action Items
- [ ] Complete market research by March 15th
- [ ] Finalize pricing model by March 30th
- [ ] Begin beta testing with selected customers April 1st

## Resources
- Market research data: https://company-data/research/q1-2026
- Competitor analysis spreadsheet attached
- Customer feedback survey results

## Challenges
- Entering saturated market space
- Limited marketing budget
- Competition from established players,
      [strategy, q2-planning, product]
    );
    
    console.log(Created
note
with
ID:, note.id);
    
    // Evaluate for matrix positioning
    const matrixPosition = this.controller.evaluateForMatrix(note.id);
    console.log(Matrix
position:, matrixPosition);
    
    // Add related notes to create a knowledge network
    const researchNote = this.controller.createNote(
      Market
Research
Findings,
      # Market Research Summary

Key findings from Q1 research:

1. Market size: .3B globally
2. Growth rate: 12% annually
3. Our target segment: 
4. Customer pain points identified:
   - Lack of intuitive interfaces
   - Poor integration capabilities
   - Insufficient analytics,
      [research, findings, market-analysis]
    );
    
    // Create semantic link between notes
    const link = {
      sourceId: note.id,
      targetId: researchNote.id,
      strength: 0.8,
      type: 'semantic' as const
    };
    
    useStardustStore.getState().addLink(link);
    
    return { mainNote: note, researchNote, link };
  }
  
  // Demonstrate orbital mode with physics simulation
  async demonstrateOrbitalMode() {
    // Load sample data
    const notes = Object.values(useStardustStore.getState().notes);
    
    // Initialize physics engine with current data
    this.physicsEngine.initialize(notes, useStardustStore.getState().links);
    
    // Run simulation for several steps
    for (let i = 0; i < 100; i++) {
      this.physicsEngine.simulate(1);
      
      // Every 10 steps, identify semantic clusters
      if (i % 10 === 0) {
        const clusters = this.physicsEngine.identifySemanticClusters(0.6);
        if (clusters.length > 0) {
          console.log(Found  semantic clusters at step );
        }
      }
    }
    
    // Get final positions for rendering
    const positions = this.physicsEngine.getNodePositions();
    console.log(Final
node
positions:, positions);
    
    // Identify peripheral notes that may need attention
    const peripheralNotes = this.physicsEngine.getPeripheralZoneNodes(0.2);
    console.log(Found  peripheral notes);
    
    return positions;
  }
  
  // Demonstrate matrix mode evaluation
  async demonstrateMatrixMode() {
    const notes = Object.values(useStardustStore.getState().notes);
    
    // Evaluate all notes for matrix positioning
    const evaluations = notes.map(note => ({
      noteId: note.id,
      position: this.controller.evaluateForMatrix(note.id),
      quadrant: this.controller.matrixEngine.getQuadrant(
        this.controller.evaluateForMatrix(note.id)!
      )
    }));
    
    console.log(Matrix
evaluations:, evaluations);
    
    // Identify notes that should be pruned
    const pruneCandidates = evaluations.filter(eval => 
      this.controller.matrixEngine.shouldPrune(eval.position!)
    );
    
    console.log(Identified  pruning candidates);
    
    return evaluations;
  }
  
  // Demonstrate timeline tracking
  async demonstrateTimelineMode() {
    // Create a snapshot for historical tracking
    const snapshot = this.controller.createSnapshot();
    console.log(Created
timeline
snapshot:, snapshot.timestamp);
    
    // Simulate some work being done
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update a note to show change over time
    const notes = Object.values(useStardustStore.getState().notes);
    if (notes.length > 0) {
      const noteToUpdate = notes[0];
      this.controller.updateNote(noteToUpdate.id, {
        content: noteToUpdate.content + \n\n##
Progress
Update\n-
Market
research
completed\n-
Initial
prototype
ready
      });
    }
    
    // Create another snapshot
    const snapshot2 = this.controller.createSnapshot();
    console.log(Created
second
snapshot:, snapshot2.timestamp);
    
    // Compare snapshots to show evolution
    const comparison = this.controller.timelineEngine.compareSnapshots(snapshot, snapshot2);
    console.log(Snapshot
comparison:, comparison);
    
    return { snapshot, snapshot2, comparison };
  }
  
  // Demonstrate prism mode analysis
  async demonstratePrismMode() {
    const notes = Object.values(useStardustStore.getState().notes);
    
    notes.forEach(note => {
      // Show the spectral decomposition of each note
      const wavelengths = this.controller.prismEngine.categorizeContent(note.content);
      console.log(Note  decomposed into:, wavelengths);
    });
  }
  
  // Run complete demonstration
  async runFullDemonstration() {
    console.log(===
Stardust
Full
Demonstration
===);
    
    // 1. Create comprehensive notes
    console.log(\n1.
Creating
comprehensive
notes...);
    await this.createComprehensiveNote();
    
    // 2. Demonstrate orbital mode
    console.log(\n2.
Running
orbital
physics
simulation...);
    await this.demonstrateOrbitalMode();
    
    // 3. Demonstrate matrix mode
    console.log(\n3.
Evaluating
matrix
positioning...);
    await this.demonstrateMatrixMode();
    
    // 4. Demonstrate timeline mode
    console.log(\n4.
Tracking
timeline
evolution...);
    await this.demonstrateTimelineMode();
    
    // 5. Demonstrate prism mode
    console.log(\n5.
Analyzing
spectral
decomposition...);
    await this.demonstratePrismMode();
    
    console.log(\n===
Demonstration
Complete
===);
    
    // Save all data
    await this.controller.saveData();
    console.log(All
data
saved
to
persistence
layer);
  }
}

// Export for use in applications
export const stardustDemo = new StardustDemo();

// Example of how to run the demonstration
// stardustDemo.runFullDemonstration().catch(console.error);

export default stardustDemo;

