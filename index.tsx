import React from 'react';
import { createRoot } from 'react-dom/client';
import Example from './src/example';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Example />
  </React.StrictMode>,
);
