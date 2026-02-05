import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleReload = () => {
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white p-8 text-center z-[99999]">
                    <div className="w-24 h-24 mb-6 rounded-full bg-red-900/20 flex items-center justify-center animate-pulse">
                        <div className="w-12 h-12 rounded-full bg-red-500/50 shadow-[0_0_30px_red]" />
                    </div>

                    <h1 className="text-4xl font-bold tracking-widest mb-4 font-mono">SYSTEM FAILURE</h1>
                    <p className="text-white/60 max-w-md mb-8 font-mono text-sm border border-white/10 p-4 rounded bg-white/5">
                        {this.state.error?.message || 'Unknown Error Occurred'}
                    </p>

                    <button
                        onClick={this.handleReload}
                        className="px-8 py-3 bg-white text-black font-bold tracking-widest hover:bg-white/90 transition-colors rounded"
                    >
                        REBOOT SYSTEM
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
