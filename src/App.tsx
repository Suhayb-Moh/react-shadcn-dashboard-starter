import { RouterProvider } from 'react-router-dom';
import AppProvider from './providers';
import { routes } from './routes';

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={routes} />
    </AppProvider>
  );
}
