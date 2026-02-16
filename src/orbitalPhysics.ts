
// Orbital Mode Physics Engine
export class OrbitalPhysicsEngine {
  private nodes: Map<string, any> = new Map();
  private links: Array<{source: string, target: string}> = [];
  private width: number = 1000;
  private height: number = 1000;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  // Calculate gravitational score for a note
  calculateGravitationalScore(linksCount: number, accessCount: number, daysSinceLastAccess: number): number {
    const baseScore = (linksCount * 1.5) + (accessCount * 0.5);
    const decayFactor = 0.1;
    const decayMultiplier = Math.exp(-decayFactor * daysSinceLastAccess);
    return baseScore * decayMultiplier;
  }

  // Update node positions using force-directed graph algorithm
  updateNodePositions(alpha: number = 0.1): void {
    // Calculate repulsive forces
    this.applyRepulsiveForces();
    
    // Calculate attractive forces
    this.applyAttractiveForces();
    
    // Update positions
    this.nodes.forEach(node => {
      // Apply forces to velocity
      node.vx = (node.vx + (node.fx / node.mass) * alpha) * 0.9; // With damping
      node.vy = (node.vy + (node.fy / node.mass) * alpha) * 0.9;
      
      // Update position
      node.x += node.vx * alpha;
      node.y += node.vy * alpha;
      
      // Boundary constraints
      node.x = Math.max(0, Math.min(this.width, node.x));
      node.y = Math.max(0, Math.min(this.height, node.y));
    });
  }

  private applyRepulsiveForces(): void {
    // Simplified repulsive force calculation
    const nodesArray = Array.from(this.nodes.values());
    for (let i = 0; i < nodesArray.length; i++) {
      for (let j = i + 1; j < nodesArray.length; j++) {
        const nodeA = nodesArray[i];
        const nodeB = nodesArray[j];
        
        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 0.01; // Prevent division by zero
        
        // Repulsive force (Coulomb's law)
        const force = (nodeA.mass * nodeB.mass) / (distance * distance);
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;
        
        nodeA.fx += fx;
        nodeA.fy += fy;
        nodeB.fx -= fx;
        nodeB.fy -= fy;
      }
    }
  }

  private applyAttractiveForces(): void {
    // Attractive forces for linked nodes
    for (const link of this.links) {
      const source = this.nodes.get(link.source);
      const target = this.nodes.get(link.target);
      
      if (source && target) {
        const dx = source.x - target.x;
        const dy = source.y - target.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 0.01;
        
        // Spring force (Hooke's law) with desired distance based on masses
        const optimalDistance = Math.log(source.mass + target.mass + 1) * 50;
        const force = (distance - optimalDistance) * 0.01;
        const fx = -(dx / distance) * force;
        const fy = -(dy / distance) * force;
        
        source.fx += fx;
        source.fy += fy;
        target.fx -= fx;
        target.fy -= fy;
      }
    }
  }

  // Identify peripheral zones (nodes with lowest activity scores)
  getPeripheralZones(thresholdPercentile: number = 0.2): string[] {
    const scores: {id: string, score: number}[] = [];
    
    for (const [id, node] of this.nodes.entries()) {
      scores.push({ id, score: node.mass });
    }
    
    // Sort by score ascending (lowest first)
    scores.sort((a, b) => a.score - b.score);
    
    // Return IDs in bottom percentile
    const cutoffIndex = Math.floor(scores.length * thresholdPercentile);
    return scores.slice(0, cutoffIndex).map(item => item.id);
  }

  // Detect semantic clusters using a simplified approach
  detectSemanticClusters(similarityThreshold: number = 0.7): Array<{cluster: string[], centroid: {x: number, y: number}}> {
    const clusters: Array<{cluster: string[], centroid: {x: number, y: number}}> = [];
    const visited = new Set<string>();
    
    for (const [id, node] of this.nodes.entries()) {
      if (visited.has(id)) continue;
      
      // Find spatially nearby nodes
      const clusterNodes: any[] = [node];
      visited.add(id);
      
      for (const [otherId, otherNode] of this.nodes.entries()) {
        if (visited.has(otherId)) continue;
        
        const dx = node.x - otherNode.x;
        const dy = node.y - otherNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Cluster nodes within a certain distance threshold
        if (distance < 150) { // Configurable distance
          clusterNodes.push(otherNode);
          visited.add(otherId);
        }
      }
      
      // Only consider clusters with at least 2 nodes
      if (clusterNodes.length > 1) {
        // Calculate centroid
        const centroid = {
          x: clusterNodes.reduce((sum, n) => sum + n.x, 0) / clusterNodes.length,
          y: clusterNodes.reduce((sum, n) => sum + n.y, 0) / clusterNodes.length
        };
        
        clusters.push({
          cluster: clusterNodes.map(n => n.id),
          centroid
        });
      }
    }
    
    return clusters;
  }
}

