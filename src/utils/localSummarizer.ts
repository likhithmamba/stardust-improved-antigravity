export function summarizeLocal(text: string, maxSentences = 3) {
    if (!text) return '';
    // Split by sentence delimiters, looking behind to keep them or just simple split
    const sents = text.split(/(?<=[.?!])\s+/);
    // pick longest sentences as proxy for "importance" (cheap heuristic)
    return sents
        .sort((a, b) => b.length - a.length)
        .slice(0, maxSentences)
        .join(' ');
}
