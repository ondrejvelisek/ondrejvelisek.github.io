import { Component as ReactComponent } from 'react';
import type { ComponentType, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  readonly children: ReactNode;
  readonly fallback: ReactNode;
  readonly onError?: (error: Error, info: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  readonly hasError: boolean;
}

class ErrorBoundary extends ReactComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info);
  }

  override render(): ReactNode {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

const DEFAULT_FALLBACK: ReactNode = (
  <p className="p-6 text-sm text-[var(--calc-text-danger)]">
    The calculator hit an unexpected error. Reload the page to start over.
  </p>
);

export function withErrorBoundary<TProps extends object>(
  WrappedComponent: ComponentType<TProps>,
  fallback: ReactNode = DEFAULT_FALLBACK,
): ComponentType<TProps> {
  function WithErrorBoundary(props: TProps) {
    return (
      <ErrorBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  }

  WithErrorBoundary.displayName = `withErrorBoundary(${
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
  })`;

  return WithErrorBoundary;
}
