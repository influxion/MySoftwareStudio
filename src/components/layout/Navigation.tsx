'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navigation() {
  const [scrolling, setScrolling] = useState(false)
  const [lastScrollPos, setLastScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      const isScrollingUp = currentScrollPos < lastScrollPos

      if (currentScrollPos < 50) {
        setScrolling(false)
      } else {
        setScrolling(!isScrollingUp)
      }
      setLastScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollPos])

  return (
    <div
      className={`w-full border-b border-white/10 text-white sticky backdrop-blur top-0 z-50 transition-transform duration-500 ${
        scrolling ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-[1440px] flex m-auto gap-4 justify-center px-4 py-2 md:py-4">
        {/* <div className="flex md:gap-8 gap-4 items-center md:text-xl text-lg font-light">
        </div> */}
        <div className="flex md:gap-8 gap-4 items-center md:text-xl text-lg font-light">
          <Link href="/" className="link-underline link-underline-black">
            Home
          </Link>
          <Link href="/posts" className="link-underline link-underline-black">
            Posts
          </Link>
          {/* <Link href="/resume" className="link-underline link-underline-black">
            Resume
          </Link>
          <Link
            href="/studio"
            className="border-2 border-blue-500 px-4 py-1 md:text-xl text-lg font-light rounded-lg hover:bg-blue-500 duration-150"
          >
            Studio
          </Link> */}
        </div>
      </div>
    </div>
  )
}
