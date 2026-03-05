import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ziv Balbirsky — Visual Artist',
  description: 'Portfolio of visual artist Ziv Balbirsky. Paintings, mixed media, and contemporary fine art.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Ziv Balbirsky — Visual Artist',
    description: 'Paintings, mixed media, and contemporary fine art.',
    siteName: 'Ziv Balbirsky',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Ziv Balbirsky — Visual Artist' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ziv Balbirsky — Visual Artist',
    description: 'Paintings, mixed media, and contemporary fine art.',
    images: ['/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#fafafa',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
