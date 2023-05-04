import { faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RevealDiv from 'src/app/(GLOBALS)/components/RevealDiv'
import { urlForImage } from 'src/lib/sanity.image'
import { Project } from 'src/lib/sanity.queries'

import MatrixImage from './MatrixImage'

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <div className="max-w-[1440px] m-auto h-full px-4 py-24 md:py-48">
      <RevealDiv>
        <div className="flex flex-col md:gap-24 gap-12">
          {projects.map((project, i) => (
            <div
              key={project._id}
              className={`${i % 2 === 0 ? '' : 'ml-auto'} w-full`}
            >
              <MatrixImage
                width={1000}
                height={600}
                src={urlForImage(project.coverImage).url()}
              />
              {/* <div className="absolute top-0 w-[60%] p-4 select-none backdrop-blur-sm rounded-lg">
                <div className="w-fit mb-4">
                  <h3 className=" text-5xl font-light">{project.title}</h3>
                  <div className="border rounded-full border-blue-500 w-2/3"></div>
                </div>
                <p className="w-full text-white/50">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Labore maiores illum atque perspiciatis inventore non! Quaerat
                  tenetur nisi reiciendis minus adipisci explicabo totam
                  necessitatibus fuga beatae, laborum voluptates. Molestiae,
                  rem?
                </p>
              </div> */}
              {/* <div className="absolute bottom-0 m-6 flex gap-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="norefferer"
                  className="border-2 border-blue-500 p-4 rounded-lg flex gap-2 items-center hover:scale-110 hover:border-4 duration-150 hover:font-bold"
                >
                  <p className="select-none">Code</p>
                  <FontAwesomeIcon icon={faCode} className="w-6 select-none" />
                </a>
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="norefferer"
                    className="border-2 border-blue-500 p-4 rounded-lg flex gap-2 items-center hover:scale-110 hover:border-4 duration-150 hover:font-bold"
                  >
                    <p className="select-none">Demo</p>
                    <i className="fa-regular fa-eyes text-lg select-none"></i>
                  </a>
                ) : (
                  ''
                )}
              </div> */}
            </div>
          ))}
        </div>
      </RevealDiv>
    </div>
  )
}
