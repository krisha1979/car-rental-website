"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Michroma, Inter } from 'next/font/google';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Process.module.css';

import { SiTesla, SiBmw, SiAudi, SiPorsche, SiFord, SiHonda, SiToyota, SiNissan } from 'react-icons/si';

const michroma = Michroma({ weight: '400', subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

const BRANDS = [
  { name: "Tesla", icon: <SiTesla size={40} color="#fff" /> },
  { name: "BMW", icon: <SiBmw size={40} color="#fff" /> },
  { name: "Audi", icon: <SiAudi size={40} color="#fff" /> },
  { name: "Porsche", icon: <SiPorsche size={40} color="#fff" /> },
  { name: "Ford", icon: <SiFord size={40} color="#fff" /> },
  { name: "Honda", icon: <SiHonda size={40} color="#fff" /> },
  { name: "Toyota", icon: <SiToyota size={40} color="#fff" /> },
  { name: "Nissan", icon: <SiNissan size={40} color="#fff" /> },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(1);

  const ArrowUpRight = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  );

  const steps = [
    {
      id: 1,
      shortTitle: "Choose Your Luxury Car",
      title: "Choose Your Luxury Car",
      body: "Select from our curated fleet of McLaren, Lamborghini, Rolls-Royce, and more."
    },
    {
      id: 2,
      shortTitle: "Pick Your Rental Dates",
      title: "Pick Your Rental Dates",
      body: "Choose flexible dates and times that work seamlessly around your personal itinerary."
    },
    {
      id: 3,
      shortTitle: "Book and Drive in Style",
      title: "Book and Drive in Style",
      body: "Complete your reservation online in seconds, and arrive at your destination in ultimate luxury."
    }
  ];

  return (
    <section className={`${styles.section} ${inter.className}`}>
      
      {/* Background silhouette */}
      <Image
        src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=1528&auto=format&fit=crop"
        alt="Car Silhouette"
        fill
        className={styles.bgImage}
      />
      <div className={styles.bgGradientOverlay} />
      <div className={styles.glowOrb} />

      <div className={styles.content}>
        {/* Left Column (Text & Button) */}
        <div className={styles.leftCol}>
          <h2 className={`${styles.title} ${michroma.className}`}>
            Discover How Easy It Is<br />to Rent Your Dream Car
          </h2>
          <p className={styles.text}>
            Experience the ease of renting your dream car with our seamless process. In just three simple steps, you can choose your luxury vehicle, select your rental dates.
          </p>

          <button className={styles.bookNow}>
            Book Now
            <div className={styles.iconCircle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Right Column (Steps Accordion) */}
        <div className={styles.rightCol}>
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            return (
              <motion.div 
                layout
                key={step.id} 
                className={`${styles.stepCard} ${isActive ? styles.stepCardActive : ''}`}
                onClick={() => setActiveStep(step.id)}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <motion.div layout className={styles.stepHeader}>
                  {isActive ? (
                    <motion.span layout className={styles.stepNum}>{step.id}</motion.span>
                  ) : (
                    <motion.div layout className={styles.stepInlineTitle}>
                      <span className={styles.stepNum}>{step.id}</span> {step.shortTitle}
                    </motion.div>
                  )}
                  <motion.button layout className={styles.topRightBtn}>
                    <ArrowUpRight />
                  </motion.button>
                </motion.div>
                
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div 
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className={styles.accordionContent}
                    >
                      <div className={styles.stepActiveTitle}>{step.title}</div>
                      <div className={styles.stepBody}>
                        {step.body}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Marquee Section */}
      <div className={styles.marqueeContainer}>
        <motion.div 
          className={styles.marqueeTrack}
          animate={{ x: ["0%", "-25%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {/* We use FOUR duplicate groups to ensure absolute seamless infinite scrolling even on massive ultra-wide monitors! */}
          {[1, 2, 3, 4].map((group) => (
            <div key={group} className={styles.marqueeGroup}>
              {BRANDS.map((brand, index) => (
                <div key={index} className={styles.logoBox} title={brand.name}>
                  {brand.icon}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
