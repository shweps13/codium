import styles from '../css/Home.module.css';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { useNavigate } from 'react-router';
import SignInModal from '../features/SignInModal';
import { useState } from 'react';
import Snippet from '../shared/Snippet';
import Header from '../shared/Header';

// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

function NotFound() {
  const navigate = useNavigate();
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
    <Header />
    <div className={styles.hero}>
      <AnimatedBackground />
      <div className={styles.heroMainContent}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          404 Page Not Found
        </motion.h1>

        <Snippet message={`import { useCollaboration } from 'codium';

export default function NotFound() {
  const { doc, users, connect } = useCollaboration();

  console.error("404: Page not found");

  return (
    <Editor
      doc={doc}
      users={users}
      onConnect={connect}
      message="Oops! The page you are looking for doesn't exist."
    />
  );
}`} extended={true} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Better luck next time!
        </motion.p>

        <motion.div
          className={styles.heroButtons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button onClick={() => navigate('/')}>
            Go to Home
          </button>
        </motion.div>
      </div>

      {showSignIn && (
        <SignInModal
          onClose={() => setShowSignIn(false)}
          onSwitchToSignUp={() => {
            setShowSignIn(false);
          }}
        />
      )}
    </div>
    </>
  );
}

export default NotFound;