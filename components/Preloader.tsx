"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Michroma } from 'next/font/google';
import styles from './Preloader.module.css';

const michroma = Michroma({ weight: '400', subsets: ['latin'] });

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Erratic jump simulation to feel like realistic asset loading
    const tick = (current: number) => {
      if (current >= 100) {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false); // Triggers the 1s upward curtain slide
          
          // Fire the Hero start sequence just as the curtain clears the critical center viewport
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              (window as any).preloaderFinished = true;
              window.dispatchEvent(new Event('preloaderFinished'));
            }
          }, 600); // Wait 600ms out of the 1000ms pull-up duration
        }, 200);
        return;
      }

      // Fast, aggressive snapping jumps
      let jump = Math.floor(Math.random() * 25) + 15;
      let delay = Math.floor(Math.random() * 100) + 80;

      // Very brief micro-hangs
      if (current > 40 && current < 70 && Math.random() > 0.5) {
        delay = Math.floor(Math.random() * 150) + 50;
        jump = Math.floor(Math.random() * 10) + 5;
      }
      
      // Final split-second friction
      if (current > 85) {
        delay = Math.floor(Math.random() * 100) + 30;
        jump = Math.floor(Math.random() * 10) + 2;
      }

      const next = Math.min(current + jump, 100);
      setProgress(next);
      timeoutId = setTimeout(() => tick(next), delay);
    };

    tick(0);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
           className={styles.preloaderOverlay}
           initial={{ y: 0 }}
           // The "curtain pull" effect
           exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className={styles.progressContainer}>
             {/* Dynamic tracking number */}
             <motion.div 
               className={`${styles.number} ${michroma.className}`}
               initial={{ left: "0%", x: "0%" }}
               animate={{ left: `${progress}%`, x: `-${progress}%` }}
               transition={{ ease: "circOut", duration: 0.15 }}
             >
               {progress}
             </motion.div>

             {/* Dynamic tracking line below the number */}
             <div className={styles.progressBarWrapper}>
               <motion.div 
                 className={styles.progressBar} 
                 initial={{ width: "0%" }}
                 animate={{ width: `${progress}%` }} 
                 transition={{ ease: "circOut", duration: 0.15 }}
               />
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
