"use client";
import React from 'react';
import Image from 'next/image';
import { Michroma, Inter } from 'next/font/google';
import { motion } from 'motion/react';
import styles from './Features.module.css';

const michroma = Michroma({ weight: '400', subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function Features() {

  const ArrowUpRight = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  } as any;

  const bentoVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 150, damping: 20 }
    }
  } as any;

  return (
    <section className={`${styles.section} ${inter.className}`}>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={styles.header}
      >
        <h2 className={`${styles.title} ${michroma.className}`}>
          See What Makes Our Luxury<br />Rentals Truly Exceptional.
        </h2>
        <p className={styles.subtitle}>
          Experience premium cars, unparalleled service, and peace of mind with every ride.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={styles.grid}
      >

        {/* Card 1: Left Vertical */}
        <motion.div variants={bentoVariants} className={`${styles.card} ${styles.cardLeft}`}>
          <Image
            src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=800&auto=format&fit=crop"
            alt="Porsche driving"
            fill
            className={styles.image}
          />
          <div className={styles.mask} />
          <div className={styles.cardContent}>
            <div className={styles.textGroup}>
              <span className={styles.textBold}>Experience the Thrill<br />of Driving </span>
              <span className={styles.textMuted}>McLaren,<br />Lamborghini, and<br />Rolls-Royce</span>
            </div>

          </div>
        </motion.div>

        {/* Card 2: Top Mid */}
        <motion.div variants={bentoVariants} className={`${styles.card} ${styles.cardTopMid}`}>
          <Image
            src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop"
            alt="Flexible Rentals"
            fill
            className={styles.image}
          />
          <div className={styles.mask} />
          <button className={styles.topRightBtn}>
            <ArrowUpRight />
          </button>
          <div className={styles.cardContent}>
            <div className={styles.textGroup}>
              <span className={styles.textBold}>Flexible Rentals<br /></span>
              <span className={styles.textMuted}>for Any Schedule</span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Top Right */}
        <motion.div variants={bentoVariants} className={`${styles.card} ${styles.cardTopRight}`}>
          <Image
            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1469&auto=format&fit=crop"
            alt="Unmatched Comfort"
            fill
            className={styles.image}
          />
          <div className={styles.mask} />
          <button className={styles.topRightBtn}>
            <ArrowUpRight />
          </button>
          <div className={styles.cardContent}>
            <div className={styles.textGroup}>
              <span className={styles.textBold}>Unmatched<br /></span>
              <span className={styles.textMuted}>Comfort and Style</span>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Bottom Wide */}
        <motion.div variants={bentoVariants} className={`${styles.card} ${styles.cardBottom}`}>
          <Image
            src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop"
            alt="Fully Insured"
            fill
            className={styles.image}
          />
          <div className={styles.mask} />
          <button className={styles.topRightBtn}>
            <ArrowUpRight />
          </button>
          <div className={`${styles.cardContent} ${styles.cardContentCentered}`}>
            <div className={styles.textGroup}>
              <span className={styles.textBold}>Travel Safely with Fully Insured, <br /></span>
              <span className={styles.textMuted}>Meticulously Maintained Vehicles</span>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
