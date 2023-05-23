'use client'
// RevealDiv.tsx
import React, { useEffect, useRef, useState } from 'react'

interface RevealDivProps {
  children: React.ReactNode
  className?: string
}

const RevealDiv: React.FC<RevealDivProps> = ({ children, className }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isHidden, setIsHidden] = useState(true)

  useEffect(() => {
    const currentRef = sectionRef.current

    const observerCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        setIsHidden(false)
        observer.unobserve(entry.target)
      })
    }

    const observerOptions = { threshold: 0.15 }
    const observer = new IntersectionObserver(observerCallback, observerOptions)

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className={` duration-1000 transition-opacity transform-gpu ${
        isHidden ? 'opacity-0 translate-y-8' : ''
      } ${className ? className : ''}`}
    >
      {children}
    </div>
  )
}

export default RevealDiv
