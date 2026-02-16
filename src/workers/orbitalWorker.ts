
// Updated orbitalWorker.ts for true Web Worker decoupling
self.importScripts('https://cdn.jsdelivr.net/npm/d3-quadtree@3');

// Worker State
let nodes = [];
let links = [];
let width = 1000;
let height = 1000;
let config = {
  repulsionStrength: 0.5,
  attractionStrength: 0.1,
  damping: 0.1,
  gravity: 0.01
};

// Quadtree for spatial partitioning
let quadtree;

// Node structure for physics
class PhysicsNode {
  constructor(data) {
    this.id = data.id;
    this.x = data.x || Math.random() * width;
    this.y = data.y || Math.random() * height;
    this.vx = 0;
    this.vy = 0;
    this.mass = data.mass || 1;
    this.radius = data.radius || 10;
  }
}

// Initialize the physics engine
self.addEventListener('message', function(e) {
  const { type, payload } = e.data;
  
  switch (type) {
    case 'INIT':
      width = payload.width || width;
      height = payload.height || height;
      config = { ...config, ...payload.config };
      break;
      
    case 'SET_INITIAL_STATE':
      // Convert to PhysicsNode objects
      nodes = payload.nodes.map(node => new PhysicsNode(node));
      links = [...payload.links];
      rebuildQuadtree();
      break;
      
    case 'UPDATE_NODES':
      // Update node data
      payload.forEach(update => {
        const node = nodes.find(n => n.id === update.id);
        if (node) {
          Object.assign(node, update);
        }
      });
      break;
      
    case 'UPDATE_LINKS':
      links = [...payload];
      break;
      
    case 'START_SIMULATION':
      simulate();
      break;
      
    case 'STOP_SIMULATION':
      // Stop simulation handled externally
      break;
  }
});

// Rebuild quadtree for spatial partitioning
function rebuildQuadtree() {
  quadtree = d3.quadtree()
    .x(d => d.x)
    .y(d => d.y)
    .addAll(nodes);
}

// Barnes-Hut simulation step
function simulate() {
  // Apply forces using Barnes-Hut algorithm
  applyBarnesHutForces();
  applyAttractionForces();
  applyCenterGravity();
  
  // Update positions
  nodes.forEach(node => {
    node.vx *= (1 - config.damping);
    node.vy *= (1 - config.damping);
    node.x += node.vx;
    node.y += node.vy;
    
    // Boundary constraints
    node.x = Math.max(0, Math.min(width, node.x));
    node.y = Math.max(0, Math.min(height, node.y));
  });
  
  // Send position updates back to main thread
  const positions = nodes.map(node => ({
    id: node.id,
    x: node.x,
    y: node.y
  }));
  
  self.postMessage({
    type: 'POSITIONS_UPDATE',
    payload: positions
  });
  
  // Continue simulation
  setTimeout(simulate, 16); // ~60fps
}

// Apply repulsion forces using Barnes-Hut algorithm
function applyBarnesHutForces() {
  rebuildQuadtree();
  
  nodes.forEach(node => {
    quadtree.visit((quad, x1, y1, x2, y2) => {
      if (!quad.length) {
        // Leaf node - direct calculation
        const other = quad.data;
        if (other !== node) {
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy) + 1;
          
          if (distance < (node.radius + other.radius) * 2) {
            const force = config.repulsionStrength * node.mass * other.mass / (distance * distance);
            node.vx -= (dx / distance) * force;
            node.vy -= (dy / distance) * force;
          }
        }
      } else {
        // Internal node - check if far enough to approximate
        const dx = quad.x - node.x;
        const dy = quad.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Barnes-Hut criterion: s/d < θ (we use θ = 0.5)
        if ((x2 - x1) / distance < 0.5) {
          const force = config.repulsionStrength * node.mass * quad.mass / (distance * distance);
          node.vx -= (dx / distance) * force;
          node.vy -= (dy / distance) * force;
          return true; // Skip children
        }
      }
      return false;
    });
  });
}

// Apply attraction forces along links
function applyAttractionForces() {
  links.forEach(link => {
    const source = nodes.find(n => n.id === link.sourceId);
    const target = nodes.find(n => n.id === link.targetId);
    
    if (source && target) {
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const distance = Math.sqrt(dx * dx + dy * dy) + 1;
      const force = config.attractionStrength * link.strength / distance;
      
      source.vx += (dx / distance) * force;
      source.vy += (dy / distance) * force;
      target.vx -= (dx / distance) * force;
      target.vy -= (dy / distance) * force;
    }
  });
}

// Apply center gravity to keep nodes in view
function applyCenterGravity() {
  const centerX = width / 2;
  const centerY = height / 2;
  
  nodes.forEach(node => {
    const dx = centerX - node.x;
    const dy = centerY - node.y;
    node.vx += dx * config.gravity;
    node.vy += dy * config.gravity;
  });
}

// Error handling
self.addEventListener('error', function(error) {
  self.postMessage({ type: 'ERROR', payload: error.message });
});

