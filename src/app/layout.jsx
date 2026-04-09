// D:\Works\portfolio-website\frontend\src\app\layout.jsx
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '../components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://defargobeze.com'), // Replace with your actual domain
  title: 'Defar Gobeze | Senior Software Engineer & Tech Lead',
  description: 'Senior Software Engineer with 9+ years of experience in full-stack development, leading teams, and building scalable applications. Available for freelance and consulting.',
  keywords: 'Defar Gobeze, Senior Software Engineer, Full Stack Developer, Tech Lead, React, Node.js, .NET, MongoDB, Portfolio, Software Architect',
  authors: [{ name: 'Defar Gobeze Wondafrash' }],
  creator: 'Defar Gobeze Wondafrash',
  publisher: 'Defar Gobeze Wondafrash',
  openGraph: {
    title: 'Defar Gobeze - Senior Software Engineer',
    description: 'Building innovative solutions with 9+ years of experience in fintech and enterprise applications',
    url: 'https://defargobeze.com', // Replace with your actual domain
    siteName: 'Defar Gobeze Portfolio',
    images: [
      {
        url: '/og-image.jpg', // Will be composed with metadataBase
        width: 1200,
        height: 630,
        alt: 'Defar Gobeze - Senior Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Defar Gobeze - Senior Software Engineer',
    description: 'Building innovative solutions with 9+ years of experience',
    images: ['/twitter-image.jpg'], // Will be composed with metadataBase
    creator: '@defargobeze', // Update with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster 
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}