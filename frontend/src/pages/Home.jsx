import styles from '../css/Home.module.css';
import { AnimatedBackground } from '../components/AnimatedBackground';
import githubIcon from '../assets/github-icon.svg';
import { useNavigate } from 'react-router';

// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

function Home() {
  const navigate = useNavigate();
  
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
            <button onClick={() => navigate('/dashboard')}>
              Try Codium
            </button>
            <button onClick={() => window.open('https://github.com/shweps13/codium', '_blank')}>
              <img src={githubIcon} alt="GitHub" />
              View on GitHub
            </button>
          </motion.div>
      </div>
    </div>
  );
}

export default Home;