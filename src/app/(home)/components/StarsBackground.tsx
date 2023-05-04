'use client'
import React, { useEffect, useRef, useState } from 'react'

class Terrain {
  terCtx: CanvasRenderingContext2D
  scrollDelay: number
  lastScroll: number
  terrain: HTMLCanvasElement
  fillStyle: string
  mHeight: number
  points: number[]

  constructor(options: any) {
    this.terrain = document.createElement('canvas')
    this.terCtx = this.terrain.getContext('2d') as CanvasRenderingContext2D
    this.scrollDelay = options.scrollDelay || 90
    this.lastScroll = new Date().getTime()

    this.terrain.width = options.width
    this.terrain.height = options.height
    this.fillStyle = options.fillStyle || 'rgb(23, 23, 23)'
    this.mHeight = options.mHeight || options.height

    // Generate terrain points
    this.points = []

    let displacement = options.displacement || 140
    let power = Math.pow(2, Math.ceil(Math.log(options.width) / Math.log(2)))

    this.points[0] = this.mHeight
    this.points[power] = this.points[0]

    for (let i = 1; i < power; i *= 2) {
      for (let j = power / i / 2; j < power; j += power / i) {
        this.points[j] =
          (this.points[j - power / i / 2] + this.points[j + power / i / 2]) /
            2 +
          Math.floor(Math.random() * -displacement + displacement)
      }
      displacement *= 0.6
    }
  }

  update() {
    this.terCtx.clearRect(0, 0, this.terrain.width, this.terrain.height)
    this.terCtx.fillStyle = this.fillStyle

    if (new Date().getTime() > this.lastScroll + this.scrollDelay) {
      this.lastScroll = new Date().getTime()
      this.points.push(this.points.shift() as number)
    }

    this.terCtx.beginPath()
    for (let i = 0; i <= this.terrain.width; i++) {
      if (i === 0) {
        this.terCtx.moveTo(0, this.points[0])
      } else if (this.points[i] !== undefined) {
        this.terCtx.lineTo(i, this.points[i])
      }
    }

    this.terCtx.lineTo(this.terrain.width, this.terrain.height)
    this.terCtx.lineTo(0, this.terrain.height)
    this.terCtx.lineTo(0, this.points[0])
    this.terCtx.fill()
  }
}

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
  const [entities, setEntities] = useState<any[]>([])
  const animationId = useRef<number | null>(null)

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)

    return () => {
      window.removeEventListener('resize', updateScreenSize)
    }
  }, [])

  useEffect(() => {
    if (screenSize.width === 0 || screenSize.height === 0) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = screenSize.width
    canvas.height = screenSize.height

    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, screenSize.width, screenSize.height)

    const newEntities: any[] = []

    // Initialize the stars
    for (let i = 0; i < screenSize.height; i++) {
      newEntities.push(
        new Star({
          x: Math.random() * screenSize.width,
          y: Math.random() * screenSize.height,
        })
      )
    }

    // Add 3 shooting stars
    newEntities.push(new ShootingStar())
    newEntities.push(new ShootingStar())
    newEntities.push(new ShootingStar())

    // Add terrain
    newEntities.push(
      new Terrain({
        width: screenSize.width,
        height: screenSize.height,
        // scrollDelay: 50,
        mHeight: screenSize.height / 1.25 - 60,
      })
    )
    newEntities.push(
      new Terrain({
        width: screenSize.width,
        height: screenSize.height + 120,
        displacement: 120,
        scrollDelay: 50,
        fillStyle: 'rgb(20, 20, 20)',
        mHeight: screenSize.height / 1.25,
      })
    )
    newEntities.push(
      new Terrain({
        width: screenSize.width,
        height: screenSize.height,
        displacement: 100,
        scrollDelay: 20,
        fillStyle: 'rgb(17, 17, 17)',
        mHeight: screenSize.height / 1.25 + 60,
      })
    )

    setEntities(newEntities)
  }, [screenSize])

  useEffect(() => {
    if (entities.length === 0) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function animate() {
      if (!ctx) return
      ctx.fillStyle = 'rgb(16, 16, 16)'
      ctx.fillRect(0, 0, screenSize.width, screenSize.height)
      ctx.fillStyle = '#ffffff'
      ctx.strokeStyle = '#ffffff'

      entities.forEach((entity) => {
        if (entity instanceof Star) {
          entity.update(ctx)
        } else if (entity instanceof ShootingStar) {
          entity.update(ctx, screenSize.height)
        } else if (entity instanceof Terrain) {
          ctx.drawImage(entity.terrain, 0, 0)
          entity.update()
        }
      })

      animationId.current = requestAnimationFrame(animate)
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

      if (animationId.current) {
        cancelAnimationFrame(animationId.current)
      }
    }
  }, [entities, screenSize])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, zIndex: -1, overflow: 'hidden' }}
    />
  )
}

export default StarsBackground
