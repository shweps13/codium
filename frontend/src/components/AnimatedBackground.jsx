import { useEffect, useState } from 'react';
import styles from '../css/AnimatedBackground.module.css';

// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

export function AnimatedBackground() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes = [];
      for (let i = 0; i < 50; i++) {
        newNodes.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          id: i,
        });
      }
      setNodes(newNodes);
    };
    generateNodes();
  }, []);

  return (
    <div className={styles.container}>
      {/* Vertical grid lines */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`v-${i}`}
          className={styles.verticalLine}
          style={{ left: `${i * 5}%` }}
        />
      ))}
      
      {/* Horizontal grid lines */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`h-${i}`}
          className={styles.horizontalLine}
          style={{ top: `${i * 5}%` }}
        />
      ))}

      {/* Animated nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className={styles.node}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
