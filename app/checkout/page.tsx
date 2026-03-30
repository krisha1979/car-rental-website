"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Inter, Michroma } from 'next/font/google';
import styles from './Checkout.module.css';
import { carsData } from '../fleet/data';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });
const michroma = Michroma({ weight: '400', subsets: ['latin'] });

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const carId = searchParams.get('carId');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const pickup = searchParams.get('pickup');
  const dropoff = searchParams.get('dropoff');

  const car = carsData.find(c => c.id.toString() === carId) || carsData[0];

  const [paymentState, setPaymentState] = useState<'idle' | 'processing'>('idle');
  const [cardNumber, setCardNumber] = useState('');

  // Calculate days and total price
  let days = 1;
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    days = diffDays > 0 ? diffDays : 1;
  }

  const numericPrice = parseInt(car.price.replace(/\D/g, '')) || 0;
  const totalPrice = numericPrice * days;
  const formattedTotal = `₹${totalPrice.toLocaleString('en-IN')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentState('processing');

    // Simulate payment processing time
    setTimeout(() => {
      // Simple validation for simulated payment success
      const normalizedCard = cardNumber.replace(/\s/g, '');
      if (normalizedCard.startsWith('4242')) {
        router.push('/success');
      } else {
        router.push('/payment-failed');
      }
    }, 2000);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    let formatted = val;
    if (val.length > 0) {
      formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    }
    setCardNumber(formatted);
  };

  return (
    <div className={styles.checkoutLayout}>
      <div className={styles.formSection}>
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Personal Information
            </h2>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>First Name</label>
                <input required type="text" className={styles.input} placeholder="John" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Last Name</label>
                <input required type="text" className={styles.input} placeholder="Doe" />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Email Address</label>
                <input required type="email" className={styles.input} placeholder="john@example.com" />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Phone Number</label>
                <input required type="tel" className={styles.input} placeholder="+1 (555) 000-0000" />
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className={styles.card} style={{ marginTop: '32px' }}>
            <h2 className={styles.cardTitle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
              Payment Details
            </h2>
            
            <div className={styles.testCredentials}>
              <strong>DEMO MODE:</strong> Use <strong>4242 4242 4242 4242</strong> for a successful transaction. Use any other card number to simulate a failure.
            </div>

            <div className={styles.formGrid} style={{ marginTop: '24px' }}>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Name on Card</label>
                <input required type="text" className={styles.input} placeholder="John Doe" />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Card Number</label>
                <input 
                  required 
                  type="text" 
                  className={styles.input} 
                  placeholder="0000 0000 0000 0000" 
                  maxLength={19}
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Expiry Date</label>
                <input required type="text" className={styles.input} placeholder="MM/YY" maxLength={5} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>CVC</label>
                <input required type="text" className={styles.input} placeholder="123" maxLength={4} />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={paymentState === 'processing'}>
              {paymentState === 'processing' ? <div className={styles.loader}></div> : `Pay ${formattedTotal}`}
            </button>
          </div>
        </form>
      </div>

      <div className={styles.summarySection}>
        <div className={styles.card} style={{ position: 'sticky', top: '120px' }}>
          <h2 className={styles.cardTitle}>Order Summary</h2>
          
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Vehicle</span>
            <span className={styles.summaryValue}>{car.name}</span>
          </div>
          
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Pick-up</span>
            <span className={styles.summaryValue}>{pickup || 'TBD'}</span>
          </div>
          
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Drop-off</span>
            <span className={styles.summaryValue}>{dropoff || 'TBD'}</span>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Duration</span>
            <span className={styles.summaryValue}>{days} Day{days !== 1 ? 's' : ''}</span>
          </div>
          
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Rate</span>
            <span className={styles.summaryValue}>{car.price} / day</span>
          </div>

          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span className={michroma.className}>{formattedTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main className={`${styles.container} ${inter.className}`}>
      <h1 className={`${styles.title} ${michroma.className}`}>Secure Checkout</h1>
      <Suspense fallback={<div style={{ color: '#fff', textAlign: 'center', marginTop: '100px' }}>Loading checkout...</div>}>
        <CheckoutForm />
      </Suspense>
      <div style={{ marginTop: '80px' }}>
        <Footer />
      </div>
    </main>
  );
}
