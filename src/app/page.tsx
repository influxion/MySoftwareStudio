import { getAllPosts } from 'src/lib/sanity.client'
import Reports from '../components/Reports'
import StarsBackground from '../components/StarsBackground'
import Hero from 'src/components/Hero'
import RevealDiv from 'src/components/global/RevealDiv'

export default async function HomePage() {
  const posts = await getAllPosts()
  return (
    <>
      <StarsBackground />
      <RevealDiv className='w-full h-full'>
        <Hero />
        <Reports posts={posts} />
      </RevealDiv>
    </>
  )
}
