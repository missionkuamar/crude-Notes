import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import './index.css';

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  event.preventDefault();
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

// Render app with error handling
try {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <ProductProvider>
        <App />
      </ProductProvider>
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  
  // Show error message in DOM
  const errorElement = document.createElement('div');
  errorElement.innerHTML = `
    <div style="
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      text-align: center;
      font-family: system-ui, -apple-system, sans-serif;
    ">
      <h1 style="font-size: 2rem; color: #dc2626; margin-bottom: 1rem;">
        Application Error
      </h1>
      <p style="color: #6b7280; margin-bottom: 2rem;">
        Failed to load application. Please refresh the page.
      </p>
      <button 
        onclick="window.location.reload()"
        style="
          background: #2563eb;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        "
      >
        Refresh Page
      </button>
    </div>
  `;
  
  document.body.innerHTML = '';
  document.body.appendChild(errorElement);
}