import { useAuth } from '../hooks/useAuth';
import Header from '../shared/Header';
import ProtectedRoute from '../shared/ProtectedRoute';

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div>
      <Header />
      <ProtectedRoute>
        <div>
          <h1>
            Dashboard
          </h1>
          <p>User {currentUser?.email}</p>
          <p>UserID {currentUser?.uid}</p>
          <p>Email Verified {currentUser?.emailVerified ? 'Yes' : 'No'}</p>
          <p>Account Created {currentUser?.metadata?.creationTime}</p>
        </div>
      </ProtectedRoute>
    </div>
  );
}
