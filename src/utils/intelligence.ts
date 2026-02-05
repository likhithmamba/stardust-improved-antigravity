// Simple local regex-based intelligence
export const analyzeContent = (content: string) => {
    if (!content) return null;

    const lower = content.toLowerCase();

    // Mood/Color Detection
    if (lower.match(/\b(urgent|important|critical|alert)\b/)) {
        return { color: '#ef4444' }; // Red
    }
    if (lower.match(/\b(todo|task|list|buy)\b/)) {
        return { color: '#f97316' }; // Orange
    }
    if (lower.match(/\b(idea|plan|concept|draft)\b/)) {
        return { color: '#3b82f6' }; // Blue
    }
    if (lower.match(/\b(done|completed|finished|success)\b/)) {
        return { color: '#22c55e' }; // Green
    }
    if (lower.match(/\b(love|heart|memory|dream)\b/)) {
        return { color: '#ec4899' }; // Pink
    }

    return null;
};
