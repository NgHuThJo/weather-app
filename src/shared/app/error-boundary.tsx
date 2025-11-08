import {
  Component,
  type ErrorInfo,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { logger } from "#frontend/shared/app/logging";

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<
  PropsWithChildren<{
    fallback: ReactNode;
  }>,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
