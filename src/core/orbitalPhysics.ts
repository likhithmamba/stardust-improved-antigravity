
// Stardust Orbital Mode - Force-Directed Knowledge Graph Physics Engine
import type { Note, Node, Edge } from '../types';

export class OrbitalPhysicsEngine {
  private nodes: Map<string, Node> = new Map();
  private edges: Edge[] = [];
  private width: number = 1000;
  private height: number = 1000;
  
  // Physics constants
  private readonly repulsionStrength: number = 1000;
  private readonly attractionStrength: number = 0.05;
  private readonly damping: number = 0.9;
  private readonly gravityStrength: number = 0.01;
  private readonly timeStep: number = 0.1;

  constructor(width: number = 1000, height: number = 1000) {
    this.width = width;
    this.height = height;
  }

  // Initialize physics engine with notes and links
  initialize(notes: Note[], links: any[]) {
    // Convert notes to nodes with physics properties
    this.nodes.clear();
    notes.forEach(note => {
      const linksCount = note.links?.length || 0;
      const mass = this.calculateGravitationalMass(note, linksCount);
      
      this.nodes.set(note.id, {
        id: note.id,
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: 0,
        vy: 0,
        mass,
        radius: Math.sqrt(mass) * 5,
        linksCount,
        accessCount: note.accessCount || 0,
        lastAccessed: note.lastAccessed || new Date()
      });
    });

    // Convert links to edges
    this.edges = links.map(link => ({
      sourceId: link.sourceId,
      targetId: link.targetId,
      strength: link.strength || 1.0
    }));

    // Apply temporal decay
    this.applyTemporalDecay();
  }

  // Calculate gravitational mass based on links and access count
  private calculateGravitationalMass(note: Note, linksCount: number): number {
    // G_score = (Links × 1.5) + (AccessCount × 0.5)
    const accessCount = note.accessCount || 0;
    return (linksCount * 1.5) + (accessCount * 0.5);
  }

  // Apply temporal decay to node masses
  private applyTemporalDecay() {
    const now = new Date();
    this.nodes.forEach(node => {
      const lastAccessDate = node.lastAccessed;
      const hoursSinceAccess = (now.getTime() - lastAccessDate.getTime()) / (1000 * 60 * 60);
      
      // Exponential decay function
      const decayFactor = Math.exp(-hoursSinceAccess / 168); // 168 hours = 1 week
      node.mass *= decayFactor;
      
      // Ensure minimum mass
      node.mass = Math.max(node.mass, 0.1);
    });
  }

  // Identify semantic clusters (satellites)
  identifySemanticClusters(threshold: number = 0.7): Node[][] {
    const clusters: Node[][] = [];
    const visited = new Set<string>();
    
    this.nodes.forEach(node => {
      if (visited.has(node.id)) return;
      
      const cluster = this.findConnectedNodes(node.id, threshold, visited);
      if (cluster.length > 1) {
        clusters.push(cluster);
      }
    });
    
    return clusters;
  }

  // Find connected nodes that form clusters
  private findConnectedNodes(startNodeId: string, threshold: number, visited: Set<string>): Node[] {
    const cluster: Node[] = [];
    const queue: string[] = [startNodeId];
    
    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      if (visited.has(nodeId)) continue;
      
      visited.add(nodeId);
      const node = this.nodes.get(nodeId);
      if (!node) continue;
      
      cluster.push(node);
      
      // Find neighbors with strong connections
      this.edges
        .filter(edge => edge.sourceId === nodeId || edge.targetId === nodeId)
        .filter(edge => edge.strength >= threshold)
        .forEach(edge => {
          const neighborId = edge.sourceId === nodeId ? edge.targetId : edge.sourceId;
          if (!visited.has(neighborId)) {
            queue.push(neighborId);
          }
        });
    }
    
    return cluster;
  }

  // Suggest bridge notes between clusters
  suggestBridgeNotes(clusters: Node[][], maxSuggestions: number = 5): Node[] {
    const bridgeCandidates: Node[] = [];
    
    // For each pair of clusters, find nodes that could bridge them
    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        const clusterA = clusters[i];
        const clusterB = clusters[j];
        
        // Find nodes with connections to both clusters
        const potentialBridges = Array.from(this.nodes.values()).filter(node => {
          const connectsToA = clusterA.some(clusterNode => 
            this.edges.some(edge => 
              (edge.sourceId === node.id && edge.targetId === clusterNode.id) ||
              (edge.targetId === node.id && edge.sourceId === clusterNode.id)
            )
          );
          
          const connectsToB = clusterB.some(clusterNode => 
            this.edges.some(edge => 
              (edge.sourceId === node.id && edge.targetId === clusterNode.id) ||
              (edge.targetId === node.id && edge.sourceId === clusterNode.id)
            )
          );
          
          return connectsToA && connectsToB;
        });
        
        bridgeCandidates.push(...potentialBridges);
      }
    }
    
    // Sort by connectivity and return top candidates
    return bridgeCandidates
      .sort((a, b) => b.linksCount - a.linksCount)
      .slice(0, maxSuggestions);
  }

  // Main simulation step - applies forces and updates positions
  simulate(steps: number = 1) {
    for (let step = 0; step < steps; step++) {
      // Apply repulsion forces (node-to-node)
      this.applyRepulsionForces();
      
      // Apply attraction forces (along links)
      this.applyAttractionForces();
      
      // Apply center gravity
      this.applyCenterGravity();
      
      // Update positions
      this.updatePositions();
    }
  }

  // Apply repulsive forces between all nodes
  private applyRepulsionForces() {
    this.nodes.forEach(nodeA => {
      this.nodes.forEach(nodeB => {
        if (nodeA.id === nodeB.id) return;
        
        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 0.01; // Prevent division by zero
        
        // Repulsion force inversely proportional to square of distance
        const force = this.repulsionStrength * nodeA.mass * nodeB.mass / (distance * distance);
        
        // Apply force to velocities
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;
        
        nodeA.vx += fx * this.timeStep;
        nodeA.vy += fy * this.timeStep;
      });
    });
  }

  // Apply attractive forces along links
  private applyAttractionForces() {
    this.edges.forEach(edge => {
      const sourceNode = this.nodes.get(edge.sourceId);
      const targetNode = this.nodes.get(edge.targetId);
      
      if (!sourceNode || !targetNode) return;
      
      const dx = targetNode.x - sourceNode.x;
      const dy = targetNode.y - sourceNode.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 0.01;
      
      // Attraction force proportional to distance and edge strength
      const force = this.attractionStrength * edge.strength * distance;
      
      // Apply force to velocities
      const fx = (dx / distance) * force;
      const fy = (dy / distance) * force;
      
      sourceNode.vx += fx * this.timeStep;
      sourceNode.vy += fy * this.timeStep;
      targetNode.vx -= fx * this.timeStep;
      targetNode.vy -= fy * this.timeStep;
    });
  }

  // Apply center gravity to keep nodes in frame
  private applyCenterGravity() {
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    
    this.nodes.forEach(node => {
      const dx = centerX - node.x;
      const dy = centerY - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 0.01;
      
      // Gravity force proportional to distance from center
      const force = this.gravityStrength * node.mass;
      
      const fx = (dx / distance) * force;
      const fy = (dy / distance) * force;
      
      node.vx += fx * this.timeStep;
      node.vy += fy * this.timeStep;
    });
  }

  // Update positions based on velocities
  private updatePositions() {
    this.nodes.forEach(node => {
      // Apply damping
      node.vx *= this.damping;
      node.vy *= this.damping;
      
      // Update positions
      node.x += node.vx * this.timeStep;
      node.y += node.vy * this.timeStep;
      
      // Boundary constraints
      node.x = Math.max(0, Math.min(this.width, node.x));
      node.y = Math.max(0, Math.min(this.height, node.y));
    });
  }

  // Get current node positions for rendering
  getNodePositions(): Record<string, { x: number; y: number }> {
    const positions: Record<string, { x: number; y: number }> = {};
    this.nodes.forEach(node => {
      positions[node.id] = { x: node.x, y: node.y };
    });
    return positions;
  }

  // Identify peripheral zone nodes
  getPeripheralZoneNodes(threshold: number = 0.1): Node[] {
    return Array.from(this.nodes.values()).filter(node => node.mass < threshold);
  }

  // Update with new notes or changes
  updateNotes(notes: Note[]) {
    notes.forEach(note => {
      const linksCount = note.links?.length || 0;
      const mass = this.calculateGravitationalMass(note, linksCount);
      
      if (this.nodes.has(note.id)) {
        // Update existing node
        const node = this.nodes.get(note.id)!;
        node.mass = mass;
        node.radius = Math.sqrt(mass) * 5;
        node.linksCount = linksCount;
        node.accessCount = note.accessCount || node.accessCount;
        node.lastAccessed = note.lastAccessed || node.lastAccessed;
      } else {
        // Add new node
        this.nodes.set(note.id, {
          id: note.id,
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: 0,
          vy: 0,
          mass,
          radius: Math.sqrt(mass) * 5,
          linksCount,
          accessCount: note.accessCount || 0,
          lastAccessed: note.lastAccessed || new Date()
        });
      }
    });
    
    // Reapply temporal decay
    this.applyTemporalDecay();
  }

  // Update with new links
  updateLinks(links: any[]) {
    this.edges = links.map(link => ({
      sourceId: link.sourceId,
      targetId: link.targetId,
      strength: link.strength || 1.0
    }));
  }

  // Resize simulation space
  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

