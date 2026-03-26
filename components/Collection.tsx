"use client";
import React from 'react';
import Image from 'next/image';
import { Michroma, Inter } from 'next/font/google';
import { motion } from 'motion/react';
import Link from 'next/link';
import styles from './Collection.module.css';

const michroma = Michroma({ weight: '400', subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function Collection() {
  const cars = [
    {
      id: 1,
      seats: 2,
      speed: '200 mph',
      title: 'McLaren 720S',
      price: '₹96,000',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      seats: 2,
      speed: '210 mph',
      title: 'Lamborghini Huracan',
      price: '₹96,000',
      image: 'https://images.unsplash.com/photo-1612825173281-9a193378527e?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 3,
      seats: 4,
      speed: '212 mph',
      title: 'Rolls-Royce Ghost',
      price: '₹1,20,000',
      image: 'https://images.unsplash.com/photo-1625510872834-7db6c4273870?w=600&auto=format&fit=crop&q=60'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  } as any;

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 200, damping: 20 }
    }
  } as any;

  return (
    <section className={`${styles.section} ${inter.className}`}>
      <div className={styles.container}>
        {/* Left Column (Hero Image) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`${styles.leftCol}`}
        >
          <Image
            src="https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury SUV"
            fill
            className={styles.leftImage}
          />
        </motion.div>

        {/* Right Column (Content & Cards) */}
        <div className={styles.rightCol}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className={`${styles.title} ${michroma.className}`}>
              Explore Our Exclusive<br />Luxury Car Collection.
            </h2>
            <p className={styles.subtitle}>
              Premium vehicles curated for your ultimate driving experience.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={styles.grid}
          >
            {cars.map((car) => (
              <motion.div
                key={car.id}
                variants={cardVariants}
                className={styles.card}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className={styles.cardImageWrapper}>
                  <Image
                    src={car.image}
                    alt={car.title}
                    fill
                    className={styles.cardImage}
                  />
                </div>

                <div className={styles.cardStats}>
                  <span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 10V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V10" />
                      <path d="M9 10V6C9 4.3 10.3 3 12 3C13.7 3 15 4.3 15 6V10" />
                    </svg>
                    {car.seats}
                  </span>
                  <span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4l2.5 2.5" />
                    </svg>
                    {car.speed}
                  </span>
                </div>

                <div className={styles.cardTitle}>{car.title}</div>
                <div className={styles.cardPrice}>
                  {car.price}
                  <span style={{ fontSize: '11px', fontWeight: '400', color: '#666' }}>/day</span>
                </div>

                <button className={styles.cardBtn}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={styles.viewAllWrapper}
          >
            <Link href="/fleet" style={{ textDecoration: 'none' }}>
              <button className={styles.viewAllBtn}>
                View All
                <div className={styles.iconCircle}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
