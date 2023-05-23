import 'tailwindcss/tailwind.css'
import './global.css'

import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import Footer from 'src/components/layout/Footer'

import Navigation from '../components/layout/Navigation'
import Socials from '../components/layout/Socials'

export const metadata = {
  title: 'My Software Studio',
  description:
    "Jordon Nichols' personal portfolio offering a curated selection of top-notch reports and projects, demonstrating skills and expertise as a software and security engineer. Explore to get a glimpse of my professional accomplishments and innovative solutions.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Analytics />
      <head>
        <Script
          src="https://kit.fontawesome.com/cc6c58e096.js"
          crossOrigin="anonymous"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="128x128"
          href="/favicon/128x128.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicon/icon.png"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className='h-[100dvh]'>
        {/* <Navigation /> */}
        <main>{children}</main>
        <Socials />
        <Footer />
      </body>
    </html>
  )
}
