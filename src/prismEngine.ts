
import { Note, Wavelengths } from './types';

// Prism Mode: Advanced Spectral Refraction Logic
export class PrismEngine {
  // Refract a note's content into four spectral wavelengths
  static refractContent(content: string, metadata?: Record<string, any>): Wavelengths {
    const wavelengths: Wavelengths = {
      action: [],       // Red - Executable tasks/deadlines
      strategy: [],     // Blue - High-level goals
      resource: [],     // Green - Data, links, code snippets
      counterPerspective: '' // Violet - Adversarial reasoning/challenges
    };

    // Parse content for actionable items (checkboxes, deadlines, etc.)
    const actionRegex = /(?:\[ \]|\[x\]|\*\*TODO\*\*|ACTION:)s*(.+?)(?=\n|$)/gi;
    let match;
    while ((match = actionRegex.exec(content)) !== null) {
      wavelengths.action.push(match[1].trim());
    }

    // Extract resources (URLs, code blocks, file references)
    const urlRegex = /https?:\/\/[^s)]*/g;
    const urls = content.match(urlRegex) || [];
    wavelengths.resource.push(...urls);

    const codeBlockRegex = /`[\s\S]*?`/g;
    const codeBlocks = content.match(codeBlockRegex) || [];
    wavelengths.resource.push(...codeBlocks);

    // Extract strategic elements (goals, objectives, vision statements)
    const strategyRegex = /(?:(?:Goal|Objective|Vision):\s*(.+?)\n)|(?:#\s+(?:Goal|Objective|Vision)\s+(.+?)\n)/gi;
    while ((match = strategyRegex.exec(content)) !== null) {
      const strategyText = (match[1] || match[2])?.trim();
      if (strategyText) {
        wavelengths.strategy.push(strategyText);
      }
    }

    // Generate counter-perspective (AI-assisted adversarial reasoning)
    wavelengths.counterPerspective = this.generateCounterPerspective(content, metadata);

    return wavelengths;
  }

  // Generate adversarial perspective challenging the note's assumptions
  private static generateCounterPerspective(content: string, metadata?: Record<string, any>): string {
    // In a full implementation, this would leverage an LLM or rule-based system
    // For now, we'll implement rules-based challenges
    
    const challenges: string[] = [];
    
    // Challenge assumptions in the content
    if (content.includes('always') || content.includes('never')) {
      challenges.push("Consider scenarios where exceptions might apply.");
    }
    
    if (content.includes('best') || content.includes('worst')) {
      challenges.push("What criteria define 'best' or 'worst' in this context?");
    }
    
    if (content.includes('impossible') || content.includes('can\'t')) {
      challenges.push("What constraints make this seem impossible, and could any be relaxed?");
    }
    
    if (content.includes('everyone') || content.includes('no one')) {
      challenges.push("Are you sure this applies to absolutely everyone? Consider edge cases.");
    }
    
    // If we have metadata, use it for more specific challenges
    if (metadata) {
      if (metadata.confidence && parseFloat(metadata.confidence) > 0.8) {
        challenges.push("High confidence claims require strong evidence. What evidence supports this?");
      }
      
      if (metadata.complexity && parseFloat(metadata.complexity) > 0.7) {
        challenges.push("Complex systems often have unintended consequences. What could go wrong?");
      }
    }
    
    // Default challenges if none match
    if (challenges.length === 0) {
      challenges.push(
        "What assumptions underlie this thinking?",
        "Who might disagree with this perspective and why?",
        "What would have to be true for the opposite to be correct?"
      );
    }
    
    return challenges.join(' ');
  }

  // Update wavelengths when note content changes
  static updateRefractedContent(note: Note): Note {
    return {
      ...note,
      wavelengths: this.refractContent(note.content, note.metadata)
    };
  }
}

