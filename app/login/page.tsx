'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './login.module.css';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // The OAuth redirect will happen automatically
    window.location.href = `${process.env.NEXT_PUBLIC_OAUTH_AUTHORIZE_URL}?client_id=${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI}&response_type=code`;
  };

  return (
    <div className={styles.loginContainer}>
      {/* Background with animated gradient */}
      <div className={styles.background}>
        <div className={styles.gradientOverlay}></div>
        <div className={styles.floatingShapes}>
          <div className={styles.shape1}></div>
          <div className={styles.shape2}></div>
          <div className={styles.shape3}></div>
        </div>
      </div>

      {/* Login Card */}
      <div className={styles.loginCard}>
        <div className={styles.cardHeader}>
          <div className={styles.logoContainer}>
            <Image
              src="https://images.contentstack.io/v3/assets/blt7359e2a55efae483/blt518e5105a0686696/663e30a08f19535905e50af2/Logo.svg"
              alt="Contentstack Logo"
              width={80}
              height={80}
              className={styles.logo}
              priority
            />
          </div>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>
            Sign in to access your application
          </p>
        </div>

        <div className={styles.cardBody}>
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={styles.loginButton}
          >
            {isLoading ? (
              <div className={styles.loadingSpinner}></div>
            ) : (
              <>
                <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z"
                    fill="currentColor"
                  />
                </svg>
                Continue with Contentstack
              </>
            )}
          </button>

          <div className={styles.divider}>
            <span className={styles.dividerText}>Secure Authentication</span>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔒</div>
              <span>Enterprise Security</span>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>⚡</div>
              <span>Fast & Reliable</span>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🌐</div>
              <span>Global Access</span>
            </div>
          </div>
        </div>

        <div className={styles.cardFooter}>
          <p className={styles.footerText}>
            By signing in, you agree to our{' '}
            <a href="#" className={styles.footerLink}>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className={styles.footerLink}>
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}