import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RootProvider from './providers/RootProvider.tsx';
import RouteConfiguration from './routes/route-configuration.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootProvider>
      <RouteConfiguration />
    </RootProvider>
  </React.StrictMode>
);
