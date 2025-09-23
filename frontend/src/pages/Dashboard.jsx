import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div>
      <div>
        <h1>
          Dashboard
        </h1>
        <p>User {currentUser?.email}</p>
        <p>UserID {currentUser?.uid}</p>
        <p>Email Verified {currentUser?.emailVerified ? 'Yes' : 'No'}</p>
        <p>Account Created {currentUser?.metadata?.creationTime}</p>
      </div>
    </div>
  );
}
