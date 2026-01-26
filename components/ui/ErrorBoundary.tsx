import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch React component errors
 * Prevents entire app from crashing when a component throws
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Integrate with error reporting service (e.g., Sentry)
      console.error('Error caught by boundary:', error, errorInfo);
    } else {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="h-full w-full flex items-center justify-center min-h-[400px] flex-col p-8 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-4">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Something went wrong</h2>
          <p className="text-slate-500 mt-2 max-w-sm">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          {this.state.error && process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-left max-w-md">
              <summary className="text-xs text-slate-400 cursor-pointer">Error details</summary>
              <pre className="mt-2 text-xs text-slate-600 bg-slate-50 p-2 rounded overflow-auto">
                {this.state.error.toString()}
              </pre>
            </details>
          )}
          <button
            onClick={this.handleReset}
            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
