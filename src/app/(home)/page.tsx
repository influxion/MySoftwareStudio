import { getAllPosts, getAllProjects } from 'src/lib/sanity.client'

import AboutMe from './components/AboutMe'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Reports from './components/Reports'
import StarsBackground from './components/StarsBackground'

export default async function HomePage() {
  const projects = await getAllProjects()
  const posts = await getAllPosts()
  return (
    <>
      <StarsBackground />
      <Hero />
      <AboutMe />
      <Reports posts={posts} />
      <Projects projects={projects} />
    </>
  )
}
