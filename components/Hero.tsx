"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Michroma, Inter } from 'next/font/google';
import { motion } from 'motion/react';
import Link from 'next/link';
import styles from './Hero.module.css';

const michroma = Michroma({ weight: '400', subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function Hero() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).preloaderFinished) {
      setIsReady(true);
    } else {
      const handleLoad = () => setIsReady(true);
      window.addEventListener('preloaderFinished', handleLoad);
      return () => window.removeEventListener('preloaderFinished', handleLoad);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  } as any;

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
  } as any;

  const fadeRight = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
  } as any;

  return (
    <section className={`${styles.heroSection} ${inter.className}`}>
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={isReady ? { scale: 1, opacity: 1 } : { scale: 1.05, opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?q=80&w=1470&auto=format&fit=crop"
          alt="Luxury car skyline sunset"
          fill
          className={styles.backgroundImage}
          style={{ objectFit: 'cover' }}
          priority
        />
      </motion.div>
      <div className={styles.backgroundOverlay} />




      {/* Right Stats */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
        className={styles.statsRight}
      >
        <div className={styles.statsNumber}>
          <span className={styles.statsValue}>50+</span>
          <span className={styles.statsText}>luxury cars</span>
        </div>
        <div className={styles.statsSubText}>
          Available in major cities
        </div>
      </motion.div>

      {/* Main Content (Title and Description) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        className={styles.mainContent}
      >
        <div className={styles.titleContainer}>
          <h1 className={`${styles.title} ${michroma.className}`}>
            Drive the World&apos;s<br />Finest Luxury Cars
          </h1>
        </div>
        <div className={styles.description}>
          <p>
            Experience the raw power and surgical handling of the world&apos;s
            most iconic supercars, meticulously maintained and ready to
            transform a simple journey into an adrenaline-fueled masterclass
            in performance.
          </p>
        </div>
      </motion.div>


    </section>
  );
}
