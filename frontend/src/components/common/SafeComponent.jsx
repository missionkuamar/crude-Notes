import { useState, useEffect } from 'react';

/**
 * Higher Order Component for safe component rendering
 */
const withSafeRender = (WrappedComponent, FallbackComponent = null) => {
  return function SafeComponent(props) {
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const errorHandler = (errorEvent) => {
        setHasError(true);
        setError(errorEvent.error);
        console.error('Component error:', errorEvent.error);
      };

      window.addEventListener('error', errorHandler);

      return () => {
        window.removeEventListener('error', errorHandler);
      };
    }, []);

    if (hasError) {
      if (FallbackComponent) {
        return <FallbackComponent error={error} />;
      }
      
      return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-yellow-700">
            Component failed to render. Please refresh the page.
          </p>
        </div>
      );
    }

    try {
      return <WrappedComponent {...props} />;
    } catch (err) {
      setHasError(true);
      setError(err);
      
      if (FallbackComponent) {
        return <FallbackComponent error={err} />;
      }
      
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-700">
            Component error: {err.message}
          </p>
        </div>
      );
    }
  };
};

export default withSafeRender;