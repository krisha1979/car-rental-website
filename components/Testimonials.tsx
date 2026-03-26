"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Michroma, Inter } from 'next/font/google';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Testimonials.module.css';

const michroma = Michroma({ weight: '400', subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const TESTIMONIALS = [
    { id: 1, name: "Daniel R.", user: "@danielr", rating: "4.9", text: "An unforgettable experience from start to finish. The car was flawless and the service was exceptional.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" },
    { id: 2, name: "Sophia M.", user: "@sophiam", rating: "4.9", text: "An unforgettable experience from start to finish. The car was flawless and the service was exceptional.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
    { id: 3, name: "James L.", user: "@jamesl", rating: "4.9", text: "An unforgettable experience from start to finish. The car was flawless and the service was exceptional.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
    { id: 4, name: "Olivia T.", user: "@oliviat", rating: "4.9", text: "An unforgettable experience from start to finish. The car was flawless and the service was exceptional.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" },
    { id: 5, name: "William K.", user: "@williamk", rating: "4.9", text: "An unforgettable experience from start to finish. The car was flawless and the service was exceptional.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" },
    { id: 6, name: "Emma C.", user: "@emmac", rating: "4.9", text: "An unforgettable experience from start to finish. The car was flawless and the service was exceptional.", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" },
    { id: 7, name: "Michael B.", user: "@michaelb", rating: "4.9", text: "An unforgettable experience from start to finish. The car was flawless and the service was exceptional.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className={`${styles.section} ${inter.className}`}>
      
      <div className={styles.header}>
        <h2 className={`${styles.title} ${michroma.className}`}>
          Hear What Our Customers Say<br />About Their Experience
        </h2>
        <p className={styles.subtitle}>
          Real feedback from clients who enjoyed comfort, performance.
        </p>
      </div>

      <div className={styles.carouselWrapper}>
        <motion.div 
          className={styles.carousel}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragEnd={(_, info) => {
            if (info.offset.x < -100 || info.velocity.x < -400) {
              handleNext();
            } else if (info.offset.x > 100 || info.velocity.x > 400) {
              handlePrev();
            }
          }}
        >
          <AnimatePresence>
            {TESTIMONIALS.map((card, index) => {
              
              let diff = index - activeIndex;
              // Boundary wrapping calculations
              if (diff < -Math.floor(TESTIMONIALS.length / 2)) diff += TESTIMONIALS.length;
              if (diff > Math.floor(TESTIMONIALS.length / 2)) diff -= TESTIMONIALS.length;

              const isCenter = diff === 0;
              const absDiff = Math.abs(diff);

              return (
                <motion.div
                  key={card.id}
                  onClick={() => setActiveIndex(index)}
                  className={`${styles.card} ${isCenter ? styles.activeCard : ''}`}
                  initial={false}
                  animate={{
                    '--diff': diff,
                    '--opacity': absDiff > 2 ? 0 : 1,
                    '--scale': isCenter ? 1.05 : 1,
                    zIndex: 10 - absDiff,
                    backgroundColor: isCenter ? '#ffffff' : '#1a1a1a',
                    color: isCenter ? '#000000' : '#ffffff',
                  } as any}
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }}
                  style={{
                    pointerEvents: absDiff > 2 ? 'none' : 'auto',
                  }}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>
                        <Image src={card.img} alt={card.name} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <div className={styles.nameBlock}>
                        <span className={styles.userName}>{card.name}</span>
                        <span className={styles.userHandle}>{card.user}</span>
                      </div>
                    </div>
                    
                    <div className={styles.rating}>
                      <svg viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{card.rating}</span>
                    </div>
                  </div>
                  <p className={styles.cardText} style={{ color: isCenter ? '#333' : '#aaa' }}>{card.text}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Slider Controls */}
      <div className={styles.controls}>
        <button className={`${styles.controlBtn} ${styles.btnInactive}`} onClick={handlePrev}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <button className={`${styles.controlBtn} ${styles.btnActive}`} onClick={handleNext}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

    </section>
  );
}
