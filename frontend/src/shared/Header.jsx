import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import SignInModal from '../features/SignInModal';
import SignUpModal from '../features/SignUpModal';
import styles from '../css/Header.module.css';
import logo from '../assets/logo.svg';

function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (  
    <header className={styles.mainHeader}>
      <Link to="/">
        <img src={logo} alt="Codium" className={styles.logo} />
      </Link>
      
      <nav>
        {currentUser ? (
          <div className={styles.navLinks}>
            <span>
              Welcome, {currentUser.email}
            </span>
            <Link 
              to="/dashboard" 
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}              
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setShowSignIn(true)}
            >
              Sign In
            </button>
            <button
              onClick={() => setShowSignUp(true)}
            >
              Sign Up
            </button>
          </div>
        )}
      </nav>

      {showSignIn && (
        <SignInModal 
          onClose={() => setShowSignIn(false)}
          onSwitchToSignUp={() => {
            setShowSignIn(false);
            setShowSignUp(true);
          }}
        />
      )}

      {showSignUp && (
        <SignUpModal 
          onClose={() => setShowSignUp(false)}
          onSwitchToSignIn={() => {
            setShowSignUp(false);
            setShowSignIn(true);
          }}
        />
      )}
    </header>
  );
}

export default Header;