import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LayoutProvider } from './context/LayoutContext.jsx';
import { ProgressProvider } from './context/ProgressContext.jsx';
import './styles/tokens.css';
import './styles/base.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LayoutProvider>
        <ProgressProvider>
          <RouterProvider router={router} />
        </ProgressProvider>
      </LayoutProvider>
    </ThemeProvider>
  </StrictMode>
);
