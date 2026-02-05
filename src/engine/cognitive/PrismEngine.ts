/**
 * PRISM ENGINE - Advanced Spectral Refraction
 * Splits markdown content into four cognitive wavelengths
 * 
 * @module PrismEngine
 * @author ImperialX
 */

import type { SpectralFacets, Note } from '../../types/StardustSchema';

// === CONSTANTS ===

export const SPECTRAL_COLORS = {
    action: '#ef4444',     // Red
    strategy: '#3b82f6',   // Blue
    resource: '#22c55e',   // Green
    counter: '#8b5cf6'     // Violet
} as const;

const REFRACTION_PATTERNS = {
    // Action (Red): Tasks, deadlines, TODOs
    ACTION: {
        checkbox: /^[-*]\s*\[[ x]\]/,
        keywords: /\b(TODO|FIXME|ACTION|DEADLINE|ASAP|URGENT|DUE)\b/i,
        dates: /\b\d{4}-\d{2}-\d{2}\b|\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/,
        imperatives: /^(do|create|make|build|fix|update|implement|add|remove|delete|complete)\b/i
    },

    // Strategy (Blue): Goals, vision, "why"
    STRATEGY: {
        headers: /^#+\s/,
        keywords: /\b(goal|objective|why|vision|strategy|because|therefore|purpose|mission|outcome|result)\b/i,
        questions: /\b(what if|how might|should we|could we)\b/i
    },

    // Resource (Green): Links, code, data
    RESOURCE: {
        markdownLinks: /\[.*\]\(.*\)/,
        urls: /https?:\/\/[^\s]+/,
        codeBlock: /^```/,
        inlineCode: /`[^`]+`/,
        tables: /^\|.*\|$/,
        dataPatterns: /\b\d+(\.\d+)?%|\$[\d,]+|\b\d{1,3}(,\d{3})*\b/
    },

    // Counter (Violet): Challenges, risks, adversarial
    COUNTER: {
        keywords: /\b(but|however|although|risk|concern|problem|issue|challenge|obstacle|limitation|weakness|threat|warning|caution)\b/i,
        negations: /\b(not|never|don't|won't|can't|shouldn't|wouldn't|couldn't)\b/i,
        questions: /\?$/
    }
};

// Adversarial prompt templates
const ADVERSARIAL_TEMPLATES = [
    '⚠️ Challenge: What if the opposite were true? "{statement}"',
    '🔍 Consider: What evidence contradicts this?',
    '⚡ Risk: What could cause this to fail?',
    '🎯 Assumption Check: What are we taking for granted here?',
    '🔄 Devil\'s Advocate: Why might this be the wrong approach?',
    '📊 Data Gap: What data would invalidate this?'
];

// === REFRACTION PARSER ===

/**
 * Refract markdown content into four spectral wavelengths.
 * Each wavelength captures a different cognitive dimension.
 */
export function refractNote(markdown: string): SpectralFacets {
    const lines = markdown.split('\n');
    const facets: SpectralFacets = {
        action: [],
        strategy: [],
        resource: [],
        counter: []
    };

    let inCodeBlock = false;
    let codeBlockContent: string[] = [];

    for (const line of lines) {
        const trimmed = line.trim();

        // Track code blocks
        if (REFRACTION_PATTERNS.RESOURCE.codeBlock.test(trimmed)) {
            if (inCodeBlock) {
                // End of code block
                codeBlockContent.push(trimmed);
                facets.resource.push(codeBlockContent.join('\n'));
                codeBlockContent = [];
                inCodeBlock = false;
            } else {
                // Start of code block
                inCodeBlock = true;
                codeBlockContent = [trimmed];
            }
            continue;
        }

        if (inCodeBlock) {
            codeBlockContent.push(line);
            continue;
        }

        // Skip empty lines
        if (trimmed.length === 0) continue;

        // Classify the line
        const classification = classifyLine(trimmed);
        facets[classification].push(trimmed);
    }

    // Generate counter-perspectives from strategy
    if (facets.strategy.length > 0) {
        const adversarialNotes = generateAntiNote(facets.strategy);
        facets.counter.push(...adversarialNotes);
    }

    return facets;
}

/**
 * Classify a single line into a spectral category
 */
function classifyLine(line: string): keyof SpectralFacets {
    // Check for counter-indicators first (explicit challenges)
    if (REFRACTION_PATTERNS.COUNTER.keywords.test(line)) {
        return 'counter';
    }

    // Check for action items
    if (REFRACTION_PATTERNS.ACTION.checkbox.test(line) ||
        REFRACTION_PATTERNS.ACTION.keywords.test(line) ||
        REFRACTION_PATTERNS.ACTION.dates.test(line) ||
        REFRACTION_PATTERNS.ACTION.imperatives.test(line)) {
        return 'action';
    }

    // Check for resources
    if (REFRACTION_PATTERNS.RESOURCE.markdownLinks.test(line) ||
        REFRACTION_PATTERNS.RESOURCE.urls.test(line) ||
        REFRACTION_PATTERNS.RESOURCE.inlineCode.test(line) ||
        REFRACTION_PATTERNS.RESOURCE.tables.test(line) ||
        REFRACTION_PATTERNS.RESOURCE.dataPatterns.test(line)) {
        return 'resource';
    }

    // Check for strategy
    if (REFRACTION_PATTERNS.STRATEGY.headers.test(line) ||
        REFRACTION_PATTERNS.STRATEGY.keywords.test(line) ||
        REFRACTION_PATTERNS.STRATEGY.questions.test(line)) {
        return 'strategy';
    }

    // Default to strategy for general content
    return 'strategy';
}

// === ADVERSARIAL REASONING ===

/**
 * Generate anti-notes that challenge the author's logic.
 * Uses heuristic-based adversarial reasoning.
 */
function generateAntiNote(strategyLines: string[]): string[] {
    const antiNotes: string[] = [];

    for (const line of strategyLines) {
        const antiNote = generateAdversarialResponse(line);
        if (antiNote) {
            antiNotes.push(antiNote);
        }
    }

    // Limit to prevent overwhelming output
    return antiNotes.slice(0, 5);
}

/**
 * Generate a single adversarial response for a statement
 */
function generateAdversarialResponse(statement: string): string | null {
    // Skip very short statements
    if (statement.length < 15) return null;

    // Skip questions (already self-questioning)
    if (statement.endsWith('?')) return null;

    // Check for absolute statements
    if (/\b(always|never|every|all|must|definitely|certainly)\b/i.test(statement)) {
        return `⚠️ Absolute Detected: Are there exceptions to "${truncate(statement, 50)}"?`;
    }

    // Check for assertions
    if (/\b(is|are|will|should)\b/i.test(statement)) {
        const template = ADVERSARIAL_TEMPLATES[0];
        return template.replace('{statement}', truncate(statement, 50));
    }

    // Check for positive assumptions
    if (/\b(will succeed|will work|easy|simple|obvious)\b/i.test(statement)) {
        return `⚡ Optimism Check: What if "${truncate(statement, 40)}" doesn't go as planned?`;
    }

    // Generic challenge for substantial statements
    if (statement.length > 30) {
        const templates = [
            `🔍 Consider: What evidence would disprove this?`,
            `🎯 Assumption: What unspoken assumptions underlie this?`,
            `🔄 Alternative: What's a completely different approach?`
        ];
        return templates[Math.floor(Math.random() * templates.length)];
    }

    return null;
}

/**
 * Truncate string with ellipsis
 */
function truncate(str: string, maxLen: number): string {
    if (str.length <= maxLen) return str;
    return str.slice(0, maxLen - 3) + '...';
}

// === PRISM LAYOUT ===

/**
 * Get prism layout targets - vertical columns for each wavelength
 */
export function getPrismLayoutTargets(
    notes: Note[],
    center: { x: number; y: number },
    columnWidth: number = 300
): Map<string, { x: number; y: number; wavelength: string }> {
    const targets = new Map<string, { x: number; y: number; wavelength: string }>();

    const columns = ['action', 'strategy', 'resource', 'counter'] as const;

    const totalWidth = columns.length * columnWidth;
    const startX = center.x - totalWidth / 2 + columnWidth / 2;

    // Track items per column
    const columnCounts = { action: 0, strategy: 0, resource: 0, counter: 0 };

    for (const note of notes) {
        // Determine primary wavelength from content
        const wavelength = determinePrimaryWavelength(note);
        const colIndex = columns.indexOf(wavelength);
        const count = columnCounts[wavelength]++;

        targets.set(note.id, {
            x: startX + colIndex * columnWidth,
            y: center.y - 300 + count * 120,
            wavelength
        });
    }

    return targets;
}

/**
 * Determine the primary wavelength of a note
 */
function determinePrimaryWavelength(note: Note): keyof SpectralFacets {
    const tags = (note.tags || []).map(t => t.toLowerCase());
    const content = (note.content || '').toLowerCase();

    // Tag-based classification
    if (tags.some(t => ['todo', 'task', 'action', 'deadline'].includes(t))) {
        return 'action';
    }
    if (tags.some(t => ['resource', 'reference', 'link', 'data'].includes(t))) {
        return 'resource';
    }
    if (tags.some(t => ['risk', 'concern', 'blocker', 'issue'].includes(t))) {
        return 'counter';
    }
    if (tags.some(t => ['goal', 'strategy', 'vision', 'plan'].includes(t))) {
        return 'strategy';
    }

    // Content-based classification
    if (REFRACTION_PATTERNS.ACTION.checkbox.test(content) ||
        REFRACTION_PATTERNS.ACTION.keywords.test(content)) {
        return 'action';
    }
    if (REFRACTION_PATTERNS.RESOURCE.urls.test(content) ||
        content.includes('```')) {
        return 'resource';
    }
    if (REFRACTION_PATTERNS.COUNTER.keywords.test(content)) {
        return 'counter';
    }

    return 'strategy';
}

// === FACET STATISTICS ===

/**
 * Get statistics about the spectral distribution
 */
export function getFacetStatistics(facets: SpectralFacets): {
    total: number;
    distribution: Record<keyof SpectralFacets, number>;
    primary: keyof SpectralFacets;
    balance: number;
} {
    const counts = {
        action: facets.action.length,
        strategy: facets.strategy.length,
        resource: facets.resource.length,
        counter: facets.counter.length
    };

    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    // Find primary wavelength
    let primary: keyof SpectralFacets = 'strategy';
    let maxCount = 0;
    for (const [key, count] of Object.entries(counts)) {
        if (count > maxCount) {
            maxCount = count;
            primary = key as keyof SpectralFacets;
        }
    }

    // Calculate balance (entropy-like measure)
    // 1.0 = perfectly balanced, 0.0 = all in one category
    let balance = 0;
    if (total > 0) {
        const nonZero = Object.values(counts).filter(c => c > 0).length;
        balance = nonZero / 4;
    }

    return {
        total,
        distribution: counts,
        primary,
        balance
    };
}

// === BATCH REFRACTION ===

/**
 * Refract multiple notes at once
 */
export function refractNotes(notes: Note[]): Map<string, SpectralFacets> {
    const results = new Map<string, SpectralFacets>();

    for (const note of notes) {
        results.set(note.id, refractNote(note.content || ''));
    }

    return results;
}

// === EXPORTS ===

export const PrismEngine = {
    refractNote,
    refractNotes,
    getPrismLayoutTargets,
    getFacetStatistics,
    REFRACTION_PATTERNS,
    ADVERSARIAL_TEMPLATES
};
