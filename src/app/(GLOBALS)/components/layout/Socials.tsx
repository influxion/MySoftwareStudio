import React from 'react'

export default function Socials() {
  return (
    <div className="fixed left-4 bottom-0 flex flex-col items-center">
      <div className="p-2 bg-blue-700/50 rounded-lg flex flex-col items-center">
        <a
          href="https://github.com/influxion"
          target="_blank"
          rel="noopener noreferer"
        >
          <i
            className="fa-brands fa-square-github text-4xl drop-shadow-md hover:scale-110 duration-150"
            title="Github"
          ></i>
        </a>
        <a
          href="https://www.linkedin.com/in/jordon-nichols/"
          target="_blank"
          rel="noopener noreferer"
        >
          <i
            className="fa-brands fa-linkedin text-4xl drop-shadow-md hover:scale-110 duration-150"
            title="LinkedIn"
          ></i>
        </a>
        <a
          href="https://twitter.com/influxedio"
          target="_blank"
          rel="noopener noreferer"
        >
          <i
            className="fa-brands fa-square-twitter text-4xl drop-shadow-md hover:scale-110 duration-150"
            title="Twitter"
          ></i>
        </a>
        <a
          href="https://codepen.io/influxion"
          target="_blank"
          rel="noopener noreferer"
        >
          <i
            className="fa-brands fa-codepen text-2xl drop-shadow-md text-blue-800 bg-white p-1 rounded-[4px] hover:scale-110 duration-150 mt-0.5"
            title="Codepen"
          ></i>
        </a>
      </div>
      <div className="bg-blue-700/50 h-12 w-0.5"></div>
    </div>
  )
}
