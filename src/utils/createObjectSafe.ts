
// Ensure we can access custom window properties for legacy hooks
declare global {
    interface Window {
        objectStore?: any;
        createObject?: (obj: any) => void;
        createObjectSafe?: (obj: any) => any;
    }
}

export function createObjectSafe({ type, x, y, sizePx, title, parentId }: any) {
    // Convert sizePx to world units if needed
    const obj = {
        id: `obj_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        type: type || 'planet-rock',
        x,
        y,
        w: sizePx || 100,
        h: sizePx || 100,
        title: title || 'New Object',
        content: '',
        parentId: parentId ?? null,
        children: [],
        links: [],
        meta: {},
    };

    // call existing store create method (replace with your implementation)
    // Try window.createObject or direct store access if we had it imported, but this is a safe adapter
    if (window.objectStore?.create) {
        window.objectStore.create(obj);
    } else if (window.createObject) {
        window.createObject(obj);
    } else {
        console.warn('createObjectSafe: No creation hook found attached to window.');
    }

    // telemetry.track('object.created', { type }); // pseudo-code
    return obj;
}
