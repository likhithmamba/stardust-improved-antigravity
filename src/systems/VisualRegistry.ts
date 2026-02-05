export class VisualRegistry {
    private static instance: VisualRegistry;
    private refs: Map<string, HTMLElement> = new Map();

    private constructor() { }

    static getInstance(): VisualRegistry {
        if (!VisualRegistry.instance) {
            VisualRegistry.instance = new VisualRegistry();
        }
        return VisualRegistry.instance;
    }

    register(id: string, element: HTMLElement) {
        this.refs.set(id, element);
    }

    unregister(id: string) {
        this.refs.delete(id);
    }

    updatePosition(id: string, x: number, y: number) {
        const el = this.refs.get(id);
        if (el) {
            el.style.transform = `translate(${x}px, ${y}px)`;
        }
    }

    get(id: string) {
        return this.refs.get(id);
    }
}

export const visualRegistry = VisualRegistry.getInstance();
