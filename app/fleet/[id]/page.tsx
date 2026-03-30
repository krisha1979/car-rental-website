"use client";
import React, { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { Michroma, Inter } from 'next/font/google';
import { motion } from 'motion/react';
import styles from './CarDetail.module.css';
import Footer from '@/components/Footer';
import { carsData } from '../data';

const michroma = Michroma({ weight: '400', subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [isReady, setIsReady] = useState(false);
  const resolvedParams = use(params);
  const car = carsData.find((c) => c.id.toString() === resolvedParams.id);

  const [reservationState, setReservationState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [minDate, setMinDate] = useState('');
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    startDate: '',
    endDate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pickup || !formData.dropoff || !formData.startDate || !formData.endDate) {
      alert("Please fill in all fields.");
      return;
    }
    
    setReservationState('submitting');
    
    const query = new URLSearchParams({
      carId: car?.id.toString() || '',
      pickup: formData.pickup,
      dropoff: formData.dropoff,
      startDate: formData.startDate,
      endDate: formData.endDate
    }).toString();
    
    router.push(`/checkout?${query}`);
  };

  useEffect(() => {
    setIsReady(true);
    const today = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    setMinDate(`${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`);
  }, []);

  if (!car) {
    notFound();
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  } as any;

  return (
    <main className={`${styles.container} ${inter.className}`}>

      {/* Hero Image */}
      <motion.div
        className={styles.heroImageWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={car.image}
          alt={car.name}
          fill
          className={styles.heroImage}
          priority
        />
        <div className={styles.heroOverlay} />
      </motion.div>

      {/* Content */}
      <div className={styles.contentContainer}>
        {/* Left Column: Details */}
        <motion.div
          className={styles.leftCol}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
        >
          <Link href="/fleet" className={styles.backBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Collection
          </Link>

          <motion.h1 variants={fadeUp} className={`${styles.carName} ${michroma.className}`}>
            {car.name}
          </motion.h1>
          <motion.p variants={fadeUp} className={styles.carDescription}>
            {car.description}
          </motion.p>

          <div className={styles.specsGrid}>
            <motion.div variants={fadeUp} className={styles.specItem}>
              <div className={styles.specLabel}>Engine</div>
              <div className={styles.specValue}>{car.engine}</div>
            </motion.div>
            <motion.div variants={fadeUp} className={styles.specItem}>
              <div className={styles.specLabel}>Horsepower</div>
              <div className={styles.specValue}>{car.horsepower}</div>
            </motion.div>
            <motion.div variants={fadeUp} className={styles.specItem}>
              <div className={styles.specLabel}>Top Speed</div>
              <div className={styles.specValue}>{car.speed}</div>
            </motion.div>
            <motion.div variants={fadeUp} className={styles.specItem}>
              <div className={styles.specLabel}>0-60 mph</div>
              <div className={styles.specValue}>{car.acceleration}</div>
            </motion.div>
            <motion.div variants={fadeUp} className={styles.specItem}>
              <div className={styles.specLabel}>Seats</div>
              <div className={styles.specValue}>{car.seats}</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column: Reservation Card */}
        <motion.div
          className={styles.rightCol}
          initial={{ opacity: 0, x: 30 }}
          animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
        >
          <div className={styles.bookingCard}>
            <div className={`${styles.bookingPrice} ${michroma.className}`}>
              {car.price} <span>/day</span>
            </div>

              <form onSubmit={handleReserve}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Pick-up Location</label>
                  <input type="text" name="pickup" value={formData.pickup} onChange={handleInputChange} required placeholder="Enter city or airport" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Drop-off Location</label>
                  <input type="text" name="dropoff" value={formData.dropoff} onChange={handleInputChange} required placeholder="Enter city or airport" className={styles.input} />
                </div>
                <div className={styles.dateRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Start Date</label>
                    <input type="date" name="startDate" value={formData.startDate} min={minDate} onChange={handleInputChange} onClick={(e) => 'showPicker' in e.currentTarget && e.currentTarget.showPicker()} required className={styles.input} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>End Date</label>
                    <input type="date" name="endDate" value={formData.endDate} min={formData.startDate || minDate} onChange={handleInputChange} onClick={(e) => 'showPicker' in e.currentTarget && e.currentTarget.showPicker()} required className={styles.input} />
                  </div>
                </div>

                <button type="submit" disabled={reservationState === 'submitting'} className={styles.submitBtn}>
                  {reservationState === 'submitting' ? 'Processing...' : 'Reserve Now'}
                </button>
              </form>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
