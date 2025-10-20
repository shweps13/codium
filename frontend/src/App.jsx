import { createBrowserRouter, RouterProvider, Navigate, useParams } from 'react-router';
import { useCallback } from 'react';
import { AuthProvider } from './contexts/AuthProvider';
import { ToastProvider } from './contexts/ToastProvider';
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

function EditorWrapper() {
  const { roomId } = useParams();
  const auth = getAuth();
  const getToken = useCallback(async () => {
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken();
    }
    return null;
  }, [auth.currentUser]);

  return <Editor roomId={roomId || "demo"} getToken={getToken} />;
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
      element: <EditorWrapper />
    },
    {
      path: "/editor/:roomId",
      element: <EditorWrapper />
    }
  ]);

  return (
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App
