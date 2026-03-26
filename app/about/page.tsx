"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Michroma, Inter } from 'next/font/google';
import { motion, useScroll, useTransform, type Variants } from 'motion/react';
import styles from './About.module.css';
import Footer from '@/components/Footer';

const michroma = Michroma({ weight: '400', subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

const cards = [
  {
    id: "01",
    title: "The Arsenal",
    desc: "Our core collection consists of over 50 ultra-premium exotics, luxury sedans, and armored SUVs. We refuse to supply standard agency vehicles. Track-focused hypercars and hybrid executives alike are maintained to a grueling 150-point clinical standard.",
    img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: "02",
    title: "Elite Chauffeurs",
    desc: "Driving is optional. We permanently mandate rigorous operatives possessing internationally recognized evasive driving certifications. They maintain a totally invisible yet omnipresent standard of service throughout your highly complex itinerary.",
    img: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=2000&auto=format&fit=crop&q=80"
  },
  {
    id: "03",
    title: "VIP Protection",
    desc: "For high-threat pipelines, we provide certified B6+ armored assignments, live threat vector analysis, and advanced close-protection operatives drawn strictly from tier-1 military backgrounds. Extreme mitigation against any hostile element.",
    img: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: "04",
    title: "Logistics",
    desc: "Luxride operates confidently without geographical borders. Whether you seamlessly require an Aston Martin waiting elegantly on the sun-baked tarmac beside your jet, or an armored SUV delivered quietly to a subterranean garage globally—it will be fully prepped and waiting.",
    img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=2000&q=80"
  }
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }
};

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  // Parallax effects for the hero section to make it extremely eye-catching
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className={`${styles.container} ${inter.className}`}>



      {/* 1. Eye-Catching Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className={styles.heroBg}>
          <Image
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2500&q=80" // Bright Mercedes AMG
            alt="Luxride Hero" fill priority style={{ objectFit: 'cover' }}
          />
        </motion.div>

        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className={`${styles.heroSuperTitle} ${michroma.className}`}
          >
            The Syndicate
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className={`${styles.heroTitle} ${michroma.className}`}
          >
            <span>Redefining</span>
            <span>Mobility</span>
          </motion.h1>
        </div>

        <motion.div
          className={styles.heroScroll}
          initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 1, delay: 1.5 }}
        >
          <div className={styles.scrollText}>Discover</div>
          <div className={styles.scrollLine} />
        </motion.div>
      </section>

      {/* 2. Company Genesis Section */}
      <section className={styles.companySection}>
        <div className={styles.companyGrid}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
            <motion.div variants={fadeUp} className={`${styles.companyHeader} ${michroma.className}`}>Our Genesis</motion.div>
            <motion.h2 variants={fadeUp} className={`${styles.companyTitle} ${michroma.className}`}>
              Engineered for absolute invisibility and mechanical perfection.
            </motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <p className={styles.companyText}>
              Luxride was founded by a private syndicate to entirely bypass traditional luxury vehicle rental. We supply flawless, clinical mobility solutions engineered strictly for clients demanding extreme privacy and absolute mechanical supremacy.
              <br /><br />
              Our operational blueprint was drafted directly alongside prominent private security firms. Every protocol—from the exact microsecond your logistics team requests a vehicle to the final elegant handover—was mechanically engineered to provide unparalleled operational fluidity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Interactive Stacked Cards (Ecosystem & Operations) */}
      <section className={styles.operationsSection}>
        <motion.div
          className={styles.operationsHeader}
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        >
          <h2 className={`${styles.operationsTitle} ${michroma.className}`}>The Ecosystem</h2>
        </motion.div>

        <div className={styles.cardsContainer}>
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              className={styles.cardWrapper}
              // The sticky offset grows incrementally so cards stack smoothly on top of one another
              style={{ top: `calc(10vh + ${i * 40}px)` }}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            >
              <div className={styles.cardInner}>
                <Image src={card.img} alt={card.title} fill className={styles.cardImage} />
                <div className={styles.cardOverlay} />

                <div className={styles.cardContent}>
                  <div className={`${styles.cardNum} ${michroma.className}`}>{card.id}</div>
                  <h3 className={`${styles.cardTitle} ${michroma.className}`}>{card.title}</h3>
                  <p className={styles.cardText}>{card.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
