"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Michroma, Inter } from 'next/font/google';
import { motion } from 'motion/react';
import styles from './Contact.module.css';

const michroma = Michroma({ weight: '400', subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function ContactPage() {
  const [isReady, setIsReady] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  } as any;

  return (
    <section className={`${styles.heroSection} ${inter.className}`}>
      {/* Background Image exactly like Hero */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={isReady ? { scale: 1, opacity: 1 } : { scale: 1.05, opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80"
          alt="Dark luxury car texture"
          fill
          className={styles.backgroundImage}
          style={{ objectFit: 'cover' }}
          priority
        />
      </motion.div>
      <div className={styles.backgroundOverlay} />



      {/* Body Layout Wrapper */}
      <div className={styles.bodyWrapper}>
        {/* Main Content (Left Title and Info) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className={styles.mainContent}
        >
          <h1 className={`${styles.title} ${michroma.className}`}>
            Reach Out<br />To Us
          </h1>
          <p className={styles.description}>
            Our specialized concierge team is at your disposal for reservations, custom inquiries, and elite chauffeur services right when you need them.
          </p>

          <div className={styles.contactInfoGrid}>
            <motion.div variants={fadeUp} initial="hidden" animate={isReady ? "visible" : "hidden"} transition={{ delay: 0.4 }} className={styles.infoItem}>
              <div className={styles.iconCircle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <div className={styles.infoText}>+1 (800) 123-4567</div>
                <div className={styles.infoLabel}>Direct Line</div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate={isReady ? "visible" : "hidden"} transition={{ delay: 0.5 }} className={styles.infoItem}>
              <div className={styles.iconCircle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <div className={styles.infoText}>concierge@luxride.com</div>
                <div className={styles.infoLabel}>Email Support</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
          className={styles.formContainer}
        >
          <h2 className={`${styles.formTitle} ${michroma.className}`}>Send Message</h2>

          {formState === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ marginBottom: '16px' }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '8px' }}>Confirmed</h3>
              <p style={{ color: '#999', fontSize: '14px', marginBottom: '24px' }}>We have received your message.</p>
              <button onClick={() => setFormState('idle')} className={styles.submitBtn}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <input type="text" required placeholder="Full Name" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <input type="email" required placeholder="Email Address" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <textarea required placeholder="Your Message..." className={styles.textarea}></textarea>
              </div>
              <button type="submit" disabled={formState === 'submitting'} className={styles.submitBtn}>
                <span>{formState === 'submitting' ? 'Sending...' : 'Send Inquiry'}</span>
                <div className={styles.submitBtnIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </button>
            </form>
          )}
        </motion.div>
      </div>

    </section>
  );
}
