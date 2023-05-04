'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import ReportPreview from 'src/app/(GLOBALS)/components/ReportPreview'
import RevealDiv from 'src/app/(GLOBALS)/components/RevealDiv'
import useMobileDetect from 'src/hooks/useMobileDetect'
import { getAllPosts } from 'src/lib/sanity.client'
import { Post } from 'src/lib/sanity.queries'

import DraggableCarousel from '../../(GLOBALS)/components/DraggableCarousel'

export default function Reports({ posts }: { posts: Post[] }) {
  const divRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedPreview, setSelectedPreview] = useState()
  const [scrollerPercent, setScrollerPercent] = useState(0)

  useEffect(() => {
    // scroll events
    const handleScroll = () => {
      if (divRef.current) {
        const rect1 = divRef.current.getBoundingClientRect()
        if (rect1.y < window.innerHeight && rect1.y > 0) {
          setScrollerPercent(
            Math.abs(rect1.y / ((window.innerHeight * 0.8) / 100) - 100)
          )
        }
        if (rect1.y > window.innerHeight * 0.8) setScrollerPercent(0)
        if (rect1.y < 0) setScrollerPercent(100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="w-full flex flex-col justify-center z-20 relative my-24 md:my-48 bg-darkergrey">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="visual"
        viewBox="0 0 1440 150"
        version="1.1"
        className="absolute top-0 z-50 w-full -translate-y-full"
      >
        <path
          d="M0 95L34.3 90.5C68.7 86 137.3 77 205.8 70.8C274.3 64.7 342.7 61.3 411.2 62C479.7 62.7 548.3 67.3 617 69C685.7 70.7 754.3 69.3 823 67.3C891.7 65.3 960.3 62.7 1028.8 66C1097.3 69.3 1165.7 78.7 1234.2 77.3C1302.7 76 1371.3 64 1405.7 58L1440 52L1440 151L1405.7 151C1371.3 151 1302.7 151 1234.2 151C1165.7 151 1097.3 151 1028.8 151C960.3 151 891.7 151 823 151C754.3 151 685.7 151 617 151C548.3 151 479.7 151 411.2 151C342.7 151 274.3 151 205.8 151C137.3 151 68.7 151 34.3 151L0 151Z"
          fill="#141414"
          stroke-linecap="round"
          stroke-linejoin="miter"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="visual"
        viewBox="0 0 1440 150"
        version="1.1"
        className="absolute bottom-0 z-50 w-full translate-y-full"
      >
        <path
          d="M0 90L34.3 90.8C68.7 91.7 137.3 93.3 205.8 88.5C274.3 83.7 342.7 72.3 411.2 70.8C479.7 69.3 548.3 77.7 617 82.2C685.7 86.7 754.3 87.3 823 82.5C891.7 77.7 960.3 67.3 1028.8 67.5C1097.3 67.7 1165.7 78.3 1234.2 77.7C1302.7 77 1371.3 65 1405.7 59L1440 53L1440 0L1405.7 0C1371.3 0 1302.7 0 1234.2 0C1165.7 0 1097.3 0 1028.8 0C960.3 0 891.7 0 823 0C754.3 0 685.7 0 617 0C548.3 0 479.7 0 411.2 0C342.7 0 274.3 0 205.8 0C137.3 0 68.7 0 34.3 0L0 0Z"
          fill="#141414"
          stroke-linecap="round"
          stroke-linejoin="miter"
        />
      </svg>
      <RevealDiv>
        <div
          className="max-w-[1440px] m-auto lg:overflow-visible overflow-hidden w-full"
          ref={containerRef}
        >
          <div className="flex lg:gap-16 lg:mb-16 flex-col lg:flex-row px-4">
            <div className="flex lg:gap-16 gap-6 lg:justify-start justify-center">
              <div
                className="rounded lg:flex flex-col hidden gap-1 relative w-2"
                ref={divRef}
              >
                <div
                  className={`bg-blue-500 h-4 rounded absolute w-full`}
                  style={{
                    top: `calc(${scrollerPercent}% - ${
                      scrollerPercent * 0.16
                    }px)`,
                  }}
                ></div>
                <div className="bg-white/5 h-full rounded"></div>
              </div>

              <h2 className="text-xl lg:text-4xl xl:text-5xl font-light flex flex-col gap-1 py-4 whitespace-nowrap lg:text-left text-center">
                <span>Showcasing the art</span>
                <span>and science of building and</span>
                <span>breaking down secure systems.</span>
              </h2>
            </div>
            <p className="mt-auto py-4 text-white/50 lg:text-base text-sm lg:text-left text-center">
              Explore a comprehensive collection of articles and resources that
              delve into the intricate world of cybersecurity. Uncover the
              latest trends, innovative strategies, and expert advice on
              designing, implementing, and maintaining secure systems.
            </p>
          </div>
          <DraggableCarousel>
            {posts.map((post, i) => (
              <ReportPreview
                key={i}
                number={i}
                selectedPreview={selectedPreview}
                setSelectedPreview={setSelectedPreview}
                date={post.date}
                image={post.coverImage}
                excerpt={post.excerpt}
                category={post.category?.title}
                title={post.title}
                slug={post.slug}
              />
            ))}
          </DraggableCarousel>
          <div className="flex justify-center lg:mt-16 mt-6">
            <Link
              href="/posts"
              className=" hover:border-4 border-2 border-blue-500 duration-200 p-4 rounded-lg text-base hover:scale-110 hover:font-bold"
            >
              All Reports
            </Link>
          </div>
        </div>
      </RevealDiv>
    </div>
  )
}
