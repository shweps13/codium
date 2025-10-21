import styles from '../css/Snippet.module.css';

// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

function Snippet({ message, extended = false }) {
    return (
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
                            {message}
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
                <div className={extended ? styles.cursorContainer3 : styles.cursorContainer2}>
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
    )
}

export default Snippet;