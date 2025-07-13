import './globals.css';
import { ThemeProvider, NotificationProvider } from '@/shared/components';
import ThemeToggle from '@/shared/components/ui/ThemeToggle';
import Link from 'next/link';

export const metadata = {
  title: 'Product CRUD App',
  description: 'Manage products with beautiful UI cards',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <NotificationProvider>
            <header style={{ 
              padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem)', 
              background: 'var(--form-bg)', 
              backdropFilter: 'blur(10px)',
              borderBottom: '1px solid var(--form-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'clamp(0.4rem, 1vw, 0.5rem)',
              position: 'sticky',
              top: 0,
              zIndex: 100
            }}>
              <nav style={{ 
                display: 'flex', 
                gap: 'clamp(0.5rem, 2vw, 1rem)', 
                alignItems: 'center', 
                flexWrap: 'wrap',
                flex: 1
              }}>
                <h1 style={{ 
                  margin: 0, 
                  color: 'var(--text-primary)', 
                  fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
                  fontWeight: 'bold'
                }}>
                  🏪 Products
                </h1>
                <div style={{ 
                  display: 'flex', 
                  gap: 'clamp(0.25rem, 1vw, 0.5rem)', 
                  flexWrap: 'wrap' 
                }}>
                  <Link href="/" style={{ 
                    color: 'var(--text-primary)', 
                    textDecoration: 'none',
                    padding: 'clamp(0.3rem, 1vw, 0.4rem) clamp(0.6rem, 2vw, 0.8rem)',
                    borderRadius: '6px',
                    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    🏠 Home
                  </Link>
                  <Link href="/products" style={{ 
                    color: 'var(--text-primary)', 
                    textDecoration: 'none',
                    padding: 'clamp(0.3rem, 1vw, 0.4rem) clamp(0.6rem, 2vw, 0.8rem)',
                    borderRadius: '6px',
                    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    📦 Products
                  </Link>
                </div>
              </nav>
              <ThemeToggle />
            </header>
            <main className="container" style={{ 
              padding: 'clamp(0.5rem, 2vw, 1rem)', 
              minHeight: 'calc(100vh - 140px)',
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {children}
            </main>
            <footer style={{ 
              padding: 'clamp(0.75rem, 2vw, 1rem)', 
              textAlign: 'center',
              borderTop: '1px solid var(--form-border)',
              background: 'var(--form-bg)',
              color: 'var(--text-secondary)',
              fontSize: 'clamp(0.75rem, 2vw, 0.9rem)'
            }}>
              © {new Date().getFullYear()} Product Manager - Built with ❤️ and Next.js
            </footer>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
