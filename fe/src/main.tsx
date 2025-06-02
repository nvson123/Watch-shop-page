import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import './index.css';
// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SocketProvider } from './data/socket/useSocket';


// Create a new router instance
export const router = createRouter({ routeTree });
// Create a new query instance
export const queryClient = new QueryClient()

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  document.documentElement.classList.remove('light');
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
        <RouterProvider router={router} />
        </SocketProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

