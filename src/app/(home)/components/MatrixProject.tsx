'use client'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'

const MatrixProject = ({ src, width, height, children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const box = boxRef.current

    const handleMouseMove = (e: MouseEvent) => {
      if (!container || !box) return

      const mouseX = e.clientX - container.getBoundingClientRect().left
      const mouseY = e.clientY - container.getBoundingClientRect().top

      const centerX = container.offsetWidth / 2
      const centerY = container.offsetHeight / 2

      const percentX = (mouseX - centerX) / centerX
      const percentY = (mouseY - centerY) / centerY

      const maxRotation = 15
      const rotateY = percentX * maxRotation
      const rotateX = -percentY * maxRotation

      box.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    const handleMouseLeave = () => {
      if (box) {
        box.style.transform = 'rotateX(0deg) rotateY(0deg)'
      }
    }

    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ perspective: '1000px' }}
      className="relative"
    >
      <Image
        ref={boxRef}
        src={src}
        width={width}
        height={height}
        alt="Matrix Box"
        className="w-full h-full object-contain rounded-lg ease-in duration-100"
      />
      {children}
    </div>
  )
}

export default MatrixProject
