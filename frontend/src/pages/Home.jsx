import styles from '../css/Home.module.css';
import { AnimatedBackground } from '../components/AnimatedBackground';
import githubIcon from '../assets/github-icon.svg';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import SignInModal from '../features/SignInModal';
import { useState } from 'react';

// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);

  const tryCodium = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      setShowSignIn(true);
    }
  };

  return (
    <div className={styles.hero}>
      <AnimatedBackground />
      <div className={styles.heroMainContent}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Collaborate. Code. Create.
        </motion.h1>

        <motion.div
          className={styles.codeShowcase}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.codeContainer}>
            <div className={styles.codeHeader}>
              <div className={styles.codeHeaderLeft}>
                <div className={styles.windowButtons}>
                  <div /><div /><div />
                </div>
                <span className={styles.fileName}>app.tsx</span>
              </div>
              <div className={styles.codeHeaderRight}>
                <div className={styles.userList}>
                  <span><div />Alice</span>
                  <span><div />Bob</span>
                  <span><div />Carol</span>
                </div>
              </div>
            </div>

            <div className={styles.codeContent}>
              <pre className={styles.codePre}>
                <code className={styles.code}>
                  {`import { useCollaboration } from 'codium';

export default function App() {
  const { doc, users, connect } = useCollaboration();
  
  return (
    <Editor
      doc={doc}
      users={users}
      onConnect={connect}
    />
  );
}`}
                </code>
              </pre>
            </div>

             <div className={styles.cursorContainer}>
               <div className={styles.cursorWrapper}>
                 <svg width="3" height="20" viewBox="0 0 2 20" fill="none" className={styles.cursorSvg}>
                   <rect width="3" height="20" fill="#3b82f6" />
                 </svg>
                 <div className={styles.cursorLabel}>
                   Alice
                 </div>
               </div>
             </div>
             <div className={styles.cursorContainer2}>
               <div className={styles.cursorWrapper}>
                 <svg width="3" height="20" viewBox="0 0 2 20" fill="none" className={styles.cursorSvg}>
                   <rect width="3" height="20" fill="#22c55e" />
                 </svg>
                 <div className={styles.cursorLabel2}>
                   Bob
                 </div>
               </div>
             </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A next-generation real-time editor built for teams.
        </motion.p>

         <motion.div
           className={styles.heroButtons}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.4 }}
         >
           <button onClick={tryCodium}>
             Try Codium
           </button>
           <button onClick={() => window.open('https://github.com/shweps13/codium', '_blank')}>
             <img src={githubIcon} alt="GitHub" />
             View on GitHub
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
  );
}

export default Home;