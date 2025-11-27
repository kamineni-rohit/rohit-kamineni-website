import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rohit Kamineni | Data Engineer & Analyst',
  description: 'Professional portfolio showcasing data engineering, analytics, and machine learning projects.',
  openGraph: {
    title: 'Rohit Kamineni | Data Engineer & Analyst',
    description: 'Professional portfolio showcasing data engineering, analytics, and machine learning projects.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
