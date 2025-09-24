import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { useCallback } from 'react';
import { AuthProvider } from './contexts/AuthProvider';
import Header from './shared/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Editor from './pages/MainEditor';
import styles from './css/App.module.css';
import { getAuth } from 'firebase/auth';

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
  const auth = getAuth();
  const getToken = useCallback(async () => {
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken();
    }
    return null;
  }, [auth.currentUser]);

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
      element: <Editor roomId="demo" getToken={getToken} />
    }
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App
