import JordonNichols from '../../components/global/JordonNichols'

export default function Footer() {
  return (
    <div className="w-full flex justify-center relative">
      <div className="flex items-center flex-col absolute bottom-4 overflow-hidden">
        <p className="text-white/50">Designed and developed by</p>
        <JordonNichols />
      </div>
    </div>
  )
}
