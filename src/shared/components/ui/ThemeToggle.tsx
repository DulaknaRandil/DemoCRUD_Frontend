'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import styles from '@/shared/styles/ThemeToggle.module.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.themeToggle}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className={styles.input}
        />
        <div className={`${styles.slider} ${styles.round}`}>
          <div className={styles.sunMoon}>
            <svg className={styles.moonDot} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={styles.moonDot} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={styles.moonDot} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={styles.lightRay} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={styles.lightRay} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={styles.lightRay} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={styles.cloudDark} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={styles.cloudDark} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={styles.cloudDark} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={styles.cloudLight} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={styles.cloudLight} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg className={styles.cloudLight} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
          </div>
          <div className={styles.stars}>
            <svg className={styles.star} viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
            <svg className={styles.star} viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
            <svg className={styles.star} viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
            <svg className={styles.star} viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
          </div>
        </div>
      </label>
    </div>
  );
};

export default ThemeToggle;
