"use client";

import React, { useState } from 'react';
import { Michroma, Inter } from 'next/font/google';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Faq.module.css';

const michroma = Michroma({ weight: '400', subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

const FAQS = [
  { 
    id: 1, 
    q: "How long does a typical rental process take?", 
    a: "Most bookings are instantly confirmed. The physical handover takes less than 10 minutes." 
  },
  { 
    id: 2, 
    q: "Do you handle long-term rentals as well as daily bookings?", 
    a: "Yes! From multi-month contracts to weekend getaways, we ensure every plan meets our high standards of service and flexibility." 
  },
  { 
    id: 3, 
    q: "Can I customize the vehicle pickup to suit my schedule?", 
    a: "Absolutely. We offer white-glove delivery directly to your home, hotel, or airport terminal at any hour." 
  },
  { 
    id: 4, 
    q: "What is your pricing structure?", 
    a: "We offer completely transparent, daily fixed pricing with no hidden fees, inclusive of standard premium insurance." 
  }
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(2);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  } as any;

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  } as any;

  return (
    <section className={`${styles.section} ${inter.className}`}>
      <div className={styles.container}>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.leftCol}
        >
          <h2 className={`${styles.title} ${michroma.className}`}>FAQ</h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={styles.rightCol}
        >
          {FAQS.map((faq) => {
            const isActive = activeIndex === faq.id;

            return (
              <motion.div layout variants={itemVariants} key={faq.id} className={styles.faqItem}>
                <motion.div 
                  layout
                  className={`${styles.questionBox} ${isActive ? styles.questionBoxActive : ''}`}
                  onClick={() => setActiveIndex(isActive ? null : faq.id)}
                >
                  <div className={styles.questionText}>{faq.q}</div>
                  <div className={`${styles.icon} ${isActive ? styles.iconActive : ''}`}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </motion.div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div 
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className={styles.answerWrapper}
                    >
                      <div className={styles.answerText}>{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
