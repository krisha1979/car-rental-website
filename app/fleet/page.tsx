"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Michroma, Inter } from 'next/font/google';
import { motion } from 'motion/react';
import styles from './Fleet.module.css';
import Footer from '@/components/Footer';
import { carsData } from './data';

const michroma = Michroma({ weight: '400', subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function FleetPage() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  } as any;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  } as any;

  return (
    <main className={`${styles.container} ${inter.className}`}>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <motion.h1
          className={`${styles.title} ${michroma.className}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our Exclusive Fleet
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Discover a world-class collection of premium vehicles, meticulously maintained to deliver the ultimate driving experience.
        </motion.p>
      </section>

      {/* Grid Section */}
      <section className={styles.gridSection}>
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
        >
          {carsData.map((car) => (
            <Link href={`/fleet/${car.id}`} key={car.id} passHref legacyBehavior>
              <motion.a
                className={styles.card}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{ textDecoration: 'none' }}
              >
                <div className={styles.cardImageWrapper}>
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className={styles.cardImage}
                  />
                </div>

                <div className={styles.cardStats}>
                  <span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 10V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V10" />
                      <path d="M9 10V6C9 4.3 10.3 3 12 3C13.7 3 15 4.3 15 6V10" />
                    </svg>
                    {car.seats} Seats
                  </span>
                  <span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4l2.5 2.5" />
                    </svg>
                    {car.speed}
                  </span>
                </div>

                <div className={styles.cardTitle}>{car.name}</div>
                <div className={styles.cardPrice}>
                  {car.price}
                  <span className={styles.priceUnit}>/day</span>
                </div>

                <button className={styles.cardBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </motion.a>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.featuresSection}>
        <motion.h2
          className={`${styles.title} ${michroma.className}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ fontSize: '36px' }}
        >
          Why Choose Our Fleet
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          We go above and beyond to deliver a seamless, high-class experience for every journey.
        </motion.p>

        <div className={styles.featuresGrid}>
          {[
            { title: "Pristine Condition", text: "Every vehicle is inspected and detailed to showroom quality before your drive.", icon: "✨" },
            { title: "24/7 Concierge", text: "Round-the-clock support to assist with route planning, extensions, or emergencies.", icon: "🛎️" },
            { title: "White-Glove Delivery", text: "We deliver your chosen vehicle directly to your hotel, airport, or residence.", icon: "📍" }
          ].map((feat, i) => (
            <motion.div
              key={i}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={styles.iconWrapper} style={{ fontSize: '24px' }}>{feat.icon}</div>
              <h3 className={styles.featureTitle}>{feat.title}</h3>
              <p className={styles.featureText}>{feat.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Rental Requirements */}
      <section className={styles.reqSection}>
        <motion.h2
          className={`${styles.title} ${michroma.className}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ fontSize: '36px' }}
        >
          Rental Requirements
        </motion.h2>

        <div className={styles.reqGrid}>
          {[
            "Must be 25 years of age or older",
            "Valid driver's license (International accepted)",
            "Full-coverage auto insurance transferable to rentals",
            "Security deposit via major credit card"
          ].map((req, i) => (
            <motion.div
              key={i}
              className={styles.reqItem}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={styles.reqCheck}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className={styles.reqText}>{req}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
