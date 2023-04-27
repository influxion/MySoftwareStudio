import JordonNichols from 'src/app/(GLOBALS)/components/JordonNichols'

export default function Hero() {
  return (
    <div>
      <h1 className="2xl:text-10xl xl:text-9xl md:text-8xl text-5xl text-center leading-zero mt-8 mb-2">
        <JordonNichols />
      </h1>
      <h3 className="2xl:text-7xl xl:text-6xl md:text-5xl text-2xl text-center leading-zero font-light mb-4">
        Software Studio
      </h3>
      {/* <div className="w-full flex justify-center">
        <p className="text-center w-[600px] font-light">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas
          assumenda, sed aliquid magni sit vero nisi quasi nostrum, inventore
          quod quaerat voluptatem expedita optio pariatur in iusto enim cum
          doloribus.
        </p>
      </div> */}
    </div>
  )
}
