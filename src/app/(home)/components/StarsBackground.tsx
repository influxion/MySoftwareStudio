'use client'
import React, { useEffect, useRef, useState } from 'react'

interface StarOptions {
  x: number
  y: number
}

class Star {
  size: number
  speed: number
  x: number
  y: number

  constructor(options: StarOptions) {
    this.size = Math.random() * 2
    this.speed = Math.random() * 0.1
    this.x = options.x
    this.y = options.y
  }

  reset(width: number, height: number) {
    this.size = Math.random() * 2
    this.speed = Math.random() * 0.1
    this.x = width
    this.y = Math.random() * height
  }

  update(ctx: CanvasRenderingContext2D) {
    this.x -= this.speed
    if (this.x < 0) {
      this.reset(ctx.canvas.width, ctx.canvas.height)
    } else {
      ctx.fillRect(this.x, this.y, this.size, this.size)
    }
  }
}

class ShootingStar {
  x: number
  y: number
  len: number
  speed: number
  size: number
  waitTime: number
  active: boolean

  constructor() {
    this.x = 0
    this.y = 0
    this.len = 0
    this.speed = 0
    this.size = 0
    this.waitTime = 0
    this.active = false
    this.reset()
  }

  reset() {
    this.x = Math.random() * (window.innerWidth * 2)
    this.y = window.pageYOffset
    this.len = Math.random() * 80 + 10
    this.speed = Math.random() * 10 + 6
    this.size = Math.random() * 1 + 0.1
    this.waitTime = new Date().getTime() + Math.random() * 3000 + 500
    this.active = false
  }

  update(ctx: CanvasRenderingContext2D, height: number) {
    if (this.active) {
      this.x -= this.speed
      this.y += this.speed
      if (this.x < 0 || this.y >= height) {
        this.reset()
      } else {
        ctx.lineWidth = this.size
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + this.len, this.y - this.len)
        ctx.stroke()
      }
    } else {
      if (this.waitTime < new Date().getTime()) {
        this.active = true
      }
    }
  }
}

const StarsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: document.body.offsetHeight,
      })
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)

    return () => {
      window.removeEventListener('resize', updateScreenSize)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = screenSize.width
    canvas.height = screenSize.height

    ctx.fillStyle = '#05004c'
    ctx.fillRect(0, 0, screenSize.width, screenSize.height)

    const entities: any[] = []

    // Initialize the stars
    for (let i = 0; i < screenSize.height; i++) {
      entities.push(
        new Star({
          x: Math.random() * screenSize.width,
          y: Math.random() * screenSize.height,
        })
      )
    }

    // Add 2 shooting stars
    entities.push(new ShootingStar())
    entities.push(new ShootingStar())

    function animate() {
      if (!ctx) return
      ctx.fillStyle = '#111'
      ctx.fillRect(0, 0, screenSize.width, screenSize.height)
      ctx.fillStyle = '#ffffff'
      ctx.strokeStyle = '#ffffff'

      entities.forEach((entity) => {
        if (entity instanceof Star) {
          entity.update(ctx)
        } else if (entity instanceof ShootingStar) {
          entity.update(ctx, screenSize.height)
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Clean up animation
      const cancelAnimationFrame =
        window.cancelAnimationFrame ||
        //@ts-expect-error
        window.mozCancelAnimationFrame ||
        function (id) {
          clearTimeout(id)
        }

      //@ts-expect-error
      cancelAnimationFrame(animate)
    }
  }, [screenSize])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, zIndex: -1, overflow: 'hidden' }}
    />
  )
}

export default StarsBackground
