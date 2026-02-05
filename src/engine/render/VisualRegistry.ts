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

    updatePosition(id: string, x: number, y: number, scale: number = 1, rotate: number = 0) {
        const el = this.refs.get(id);
        if (el) {
            // Force 3D transform for GPU acceleration
            el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}rad)`;
        }
    }

    private connectionRefs: Map<string, SVGPathElement> = new Map();

    registerConnection(id: string, element: SVGPathElement) {
        this.connectionRefs.set(id, element);
    }

    unregisterConnection(id: string) {
        this.connectionRefs.delete(id);
    }

    updateConnection(id: string, x1: number, y1: number, x2: number, y2: number) {
        const el = this.connectionRefs.get(id);
        if (el) {
            // Calculate Cubic Bezier
            const cp1x = x1 + (x2 - x1) * 0.5;
            const cp1y = y1;
            const cp2x = x2 - (x2 - x1) * 0.5;
            const cp2y = y2;
            const path = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
            el.setAttribute('d', path);
        }
    }
}

export const visualRegistry = VisualRegistry.getInstance();
