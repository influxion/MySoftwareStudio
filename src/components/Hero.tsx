'use client'
import { useEffect, useState } from 'react'
import JordonNichols from 'src/components/global/JordonNichols'
import RevealDiv from 'src/components/global/RevealDiv'

export default function Hero() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (typeof window !== undefined) {
      setWidth(window.innerWidth)
    }
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <div className="h-full flex flex-col m-auto px-4 w-full justify-center items-center">
      {/* <JordonNichols className="2xl:text-10xl xl:text-9xl md:text-8xl text-5xl text-center whitespace-nowrap lg:pt-8 pt-4" /> */}
      <h3 className="2xl:text-10xl xl:text-9xl md:text-8xl text-5xl leading-zero font-light mb-2 lg:mt-0 mt-2 text-center">
        Software Studio
      </h3>
      <p className="px-4 text-white/50 lg:text-base text-sm text-center max-w-[700px] lg:py-8 py-4">
        A collection of reports and findings as a software engineer and cyber
        security practitioner
      </p>
    </div>
  )
}
