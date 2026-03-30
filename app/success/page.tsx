"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Inter, Michroma } from 'next/font/google';
import styles from './Success.module.css';

const inter = Inter({ subsets: ['latin'] });
const michroma = Michroma({ weight: '400', subsets: ['latin'] });

export default function SuccessPage() {
  return (
    <main className={`${styles.container} ${inter.className}`}>
      <motion.div 
        className={styles.successCard}
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
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </motion.div>
        
        <h1 className={`${styles.title} ${michroma.className}`}>Payment Successful</h1>
        <p className={styles.text}>
          Thank you for choosing us. Your reservation has been confirmed and a receipt has been sent to your email. Our concierge will contact you shortly with further details.
        </p>
        
        <Link href="/" className={styles.button}>
          Return to Home
        </Link>
      </motion.div>
    </main>
  );
}
