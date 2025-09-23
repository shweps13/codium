import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { AuthProvider } from './contexts/AuthProvider';
import Header from './shared/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './shared/ProtectedRoute';
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

function DashboardLayout() {
  return (
    <div className={styles.dashboardLayout}>
      <Header />
      <main>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
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
      element: <DashboardLayout />
    }
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App
