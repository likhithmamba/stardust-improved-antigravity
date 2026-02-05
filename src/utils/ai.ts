// Client-side AI wrapper
// Encrypts/decrypts API key locally

const STORAGE_KEY = 'stardust_ai_key';

export const saveApiKey = async (key: string, _password: string) => {
    // Obfuscate with Base64 to prevent casual reading (Not full encryption)
    const encoded = btoa(key);
    localStorage.setItem(STORAGE_KEY, encoded);
};

export const getApiKey = async (_password: string): Promise<string | null> => {
    const encoded = localStorage.getItem(STORAGE_KEY);
    if (!encoded) return null;
    try {
        return atob(encoded);
    } catch (e) {
        return null; // Handle verification failure or legacy plain text
    }
};

export const generateContent = async (prompt: string, context: string = ''): Promise<string> => {
    const key = await getApiKey('default');
    if (!key) throw new Error("No API Key configured. Please set it in Settings.");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;

    const fullPrompt = context
        ? `Context: ${context}\n\nTask: ${prompt}`
        : prompt;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: fullPrompt }]
                }]
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error?.message || 'AI Request Failed');
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch (error) {
        console.error("AI Error:", error);
        throw error;
    }
};
