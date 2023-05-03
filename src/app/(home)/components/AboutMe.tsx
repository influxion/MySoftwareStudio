import React from 'react'

export default function AboutMe() {
  return (
    <div className="max-w-[1080px] m-auto px-4 flex gap-8">
      <div className="w-2/3 flex flex-col gap-4">
        <div className="flex items-center gap-8">
          <h6 className="uppercase text-5xl font-light text-blue-500 whitespace-nowrap">
            About me
          </h6>
          <div className="border border-blue-500 w-full"></div>
        </div>
        {/* <h3 className="text-5xl font-light">Who am I?</h3> */}
        <p className="text-white/50">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod,
          blanditiis! Architecto velit, obcaecati quidem accusantium facilis
          repellendus earum. Ex a sequi pariatur exercitationem. Obcaecati,
          commodi ad. Laborum porro voluptatibus aperiam? Lorem ipsum, dolor sit
          amet consectetur adipisicing elit.
        </p>
        <p className="text-white/50">
          Nihil accusamus corrupti ipsum fuga temporibus libero sit corporis
          tenetur maxime quibusdam sint, aut molestias sequi ipsa hic magni
          consequatur sed eum! Lorem ipsum dolor sit amet consectetur
          adipisicing elit.
        </p>
        <p className="text-white/50">
          Aperiam obcaecati sint, laboriosam reiciendis eligendi perferendis
          veniam cum! Nemo, aliquam nesciunt provident odit illum omnis eligendi
          amet consequuntur saepe voluptate repudiandae.
        </p>
      </div>
      <div className="w-1/3">
        <p>s</p>
      </div>
    </div>
  )
}
