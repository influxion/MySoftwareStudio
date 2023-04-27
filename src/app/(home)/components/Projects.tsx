import { urlForImage } from 'src/lib/sanity.image'
import { Project } from 'src/lib/sanity.queries'

import MatrixImage from './MatrixImage'

export default function Projects({ projects }: { projects: Project[] }) {
  const project = projects[0]
  return (
    <div className="w-[1440px] m-auto h-full px-4">
      <div className="w-3/5">
        <MatrixImage
          width={1000}
          height={1000}
          src={urlForImage(project.coverImage).url()}
        />
      </div>
      <div className="w-3/5 ml-auto">
        <MatrixImage
          width={1000}
          height={1000}
          src={urlForImage(project.coverImage).url()}
        />
      </div>
    </div>
  )
}
