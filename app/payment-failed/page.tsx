"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Inter, Michroma } from 'next/font/google';
import styles from './Failed.module.css';

const inter = Inter({ subsets: ['latin'] });
const michroma = Michroma({ weight: '400', subsets: ['latin'] });

export default function PaymentFailedPage() {
  const router = useRouter();

  return (
    <main className={`${styles.container} ${inter.className}`}>
      <motion.div 
        className={styles.failedCard}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
      >
        <motion.div 
          className={styles.iconWrapper}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </motion.div>
        
        <h1 className={`${styles.title} ${michroma.className}`}>Payment Failed</h1>
        <p className={styles.text}>
          We were unable to process your payment. Please ensure your card details are correct or try a different payment method. No charges have been made.
        </p>

        <div className={styles.buttons}>
          <button onClick={() => router.back()} className={styles.retryButton}>
            Try Again
          </button>
          
          <Link href="/" className={styles.homeButton}>
            Return Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
