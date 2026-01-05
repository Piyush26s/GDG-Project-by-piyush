import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
    }

    handleReset = () => {
        // Attempt to recover by clearing local storage if that's the issue
        // localStorage.clear(); 
        // We won't auto-clear, but we will reload.
        window.location.reload();
    };

    handleClearData = () => {
        localStorage.clear();
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0f0518',
                    color: '#fff',
                    fontFamily: 'sans-serif',
                    textAlign: 'center',
                    padding: '2rem'
                }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ef4444' }}>Something went wrong.</h2>
                    <p style={{ color: '#d8b4fe', marginBottom: '2rem' }}>
                        The application encountered an unexpected error.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={this.handleReset}
                            style={{
                                padding: '0.8rem 1.5rem',
                                background: '#fbbf24',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            Reload Page
                        </button>
                        <button
                            onClick={this.handleClearData}
                            style={{
                                padding: '0.8rem 1.5rem',
                                background: 'rgba(239, 68, 68, 0.2)',
                                border: '1px solid #ef4444',
                                color: '#ef4444',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            Reset Data & Reload
                        </button>
                    </div>
                    <pre style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', textAlign: 'left', maxWidth: '800px', overflow: 'auto' }}>
                        {this.state.error?.toString()}
                    </pre>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
