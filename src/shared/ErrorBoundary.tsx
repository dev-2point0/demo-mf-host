import React from "react";
import './ErrorBoundary.scss';

interface CompState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<any, CompState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }


  render() {
    if (this.state.hasError) {
      return <h1 className="error-boundary">Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;