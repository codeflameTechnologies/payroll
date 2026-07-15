import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider } from '../lib/theme-provider';
import { Toaster } from './components/ui/sonner';

export default function App() {
  
  return (
    <ThemeProvider defaultTheme="light" storageKey="payroll-ui-theme">
      <Toaster />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
