"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Michroma, Inter } from 'next/font/google';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Navbar.module.css';

const michroma = Michroma({ weight: '400', subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function Navbar() {
  const [isReady, setIsReady] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // If not on the homepage, immediately render the navbar
    if (pathname !== "/") {
      setIsReady(true);
      return;
    }

    // On the homepage, sync with the custom preloader event
    if (typeof window !== 'undefined' && (window as any).preloaderFinished) {
      setIsReady(true);
    } else {
      const handleLoad = () => setIsReady(true);
      window.addEventListener('preloaderFinished', handleLoad);
      return () => window.removeEventListener('preloaderFinished', handleLoad);
    }
  }, [pathname]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  // Close menu automatically on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <>
      <AnimatePresence>
        {isReady && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`${styles.header} ${inter.className}`}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div className={`${styles.logo} ${michroma.className}`}>Luxride</div>
          </Link>

          <nav className={styles.nav}>
            {["Home", "Fleet", "About", "Contact"]
              .filter((link) => {
                if (link === "Home") return true;
                const hrefTarget = link === "Fleet" ? "/fleet" : link === "Contact" ? "/contact" : link === "About" ? "/about" : "/";
                const isActive = pathname === hrefTarget || (hrefTarget !== '/' && pathname.startsWith(hrefTarget));
                return !isActive;
              })
              .map((link) => {
              const hrefTarget = link === "Fleet" ? "/fleet" : link === "Contact" ? "/contact" : link === "About" ? "/about" : "/";
              return (
                <Link
                  href={hrefTarget}
                  key={link}
                  className={styles.navLinkOuter}
                  style={{ textDecoration: 'none' }}
                >
                  <motion.div
                    initial="initial"
                    whileHover="hover"
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <div style={{ display: 'flex' }}>
                      {link.split('').map((char, i) => (
                        <motion.span
                          key={i}
                          variants={{
                            initial: { y: 0, filter: "blur(0px)", opacity: 1 },
                            hover: { y: "-100%", filter: "blur(4px)", opacity: 0 }
                          }}
                          transition={{ type: "spring", stiffness: 250, damping: 15, delay: i * 0.02 }}
                          style={{ whiteSpace: 'pre', display: 'inline-block' }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
                      {link.split('').map((char, i) => (
                        <motion.span
                          key={i}
                          variants={{
                            initial: { y: "100%", filter: "blur(4px)", opacity: 0 },
                            hover: { y: 0, filter: "blur(0px)", opacity: 1 }
                          }}
                          transition={{ type: "spring", stiffness: 250, damping: 15, delay: i * 0.02 }}
                          style={{ whiteSpace: 'pre', display: 'inline-block' }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          <div className={styles.headerRight}>
            {pathname === '/' && (
              <Link href="/fleet" style={{ textDecoration: 'none' }}>
                <button className={styles.bookNow}>
                  Book Now
                  <div className={styles.iconCircle}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </Link>
            )}

            <div 
              className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`} 
              onClick={toggleMobileMenu}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>

    {/* Mobile Overlay Menu */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className={`${styles.mobileMenu} ${inter.className}`}
        >
          {["Home", "Fleet", "About", "Contact"]
            .filter((link) => {
              if (link === "Home") return true;
              const hrefTarget = link === "Fleet" ? "/fleet" : link === "Contact" ? "/contact" : link === "About" ? "/about" : "/";
              const isActive = pathname === hrefTarget || (hrefTarget !== '/' && pathname.startsWith(hrefTarget));
              return !isActive;
            })
            .map((link) => {
              const hrefTarget = link === "Fleet" ? "/fleet" : link === "Contact" ? "/contact" : link === "About" ? "/about" : "/";
              return (
                <Link
                  href={hrefTarget}
                  key={`mobile-${link}`}
                  className={`${styles.mobileNavLink} ${michroma.className}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link}
                </Link>
              );
          })}
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
