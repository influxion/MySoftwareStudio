'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import ReportPreview from 'src/components/global/ReportPreview'
import RevealDiv from 'src/components/global/RevealDiv'
import useMobileDetect from 'src/hooks/useMobileDetect'
import { getAllPosts } from 'src/lib/sanity.client'
import { Post } from 'src/lib/sanity.queries'

import DraggableCarousel from '../components/global/DraggableCarousel'

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
    <div className="w-full flex flex-col justify-center z-20 relative">
      <RevealDiv>
        <div
          className="max-w-[1440px] m-auto lg:overflow-visible overflow-hidden w-full"
          ref={containerRef}
        >
          {/* <div className="flex lg:gap-16 lg:mb-16 flex-col lg:flex-row px-4">
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
          </div> */}
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
