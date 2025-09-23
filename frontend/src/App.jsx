import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { AuthProvider } from './contexts/AuthProvider';
import Header from './shared/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Editor from './pages/MainEditor';
import styles from './css/App.module.css';

function AppLayout() {
  return (
    <div className={styles.appLayout}>
      <Header />
      <main>
        <Home />
      </main>
    </div>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    },
    {
      path: "/editor",
      element: <Editor />
    }
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App
