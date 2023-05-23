'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const MatrixImage = ({ src, width, height }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLImageElement>(null)
  const [mouseOn, setMouseOn] = useState<Boolean>(false)

  useEffect(() => {
    const box = boxRef.current
    if (box) {
      console.log(mouseOn)
      // if (mouseOn) {
      //   setTimeout(() => {
      //     box.style.transitionDuration = '0ms'
      //   }, 150)
      // } else {
      //   box.style.transitionDuration = '100ms'
      // }
    }
  }, [mouseOn])

  useEffect(() => {
    const container = containerRef.current
    const box = boxRef.current

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseOn) {
        setMouseOn(true)
      }
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
      setMouseOn(false)
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
  }, [mouseOn])

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
        className="w-full h-full object-contain rounded-lg ease-in duration-75"
      />
    </div>
  )
}

export default MatrixImage
