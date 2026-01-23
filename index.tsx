
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './modules/settings/i18n.config';

/**
 * Enterprise PMS Bootstrapper
 * Ensures GraphQL Mocking is active only in the browser and only during development/mocking sessions.
 */
async function bootstrap() {
  const isBrowser = typeof window !== 'undefined';
  
  if (isBrowser && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    try {
      const { worker } = await import('./mocks/browser');
      if (worker) {
        await worker.start({
          onUnhandledRequest: 'bypass',
          serviceWorker: {
            url: './mockServiceWorker.js'
          }
        });
        console.log('[MSW] GraphQL Mock Service Worker active.');
      }
    } catch (err) {
      // Fail silently in production or if worker fails to load to prevent app crash
      console.error('[MSW] Failed to start:', err);
    }
  }

  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error("Root element not found");

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

bootstrap();
