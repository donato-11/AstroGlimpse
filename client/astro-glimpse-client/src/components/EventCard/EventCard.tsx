

export function EventCard() {
  return (
    <div className="h-fit flex flex-col bg-black/40 border border-gray-600 rounded-2xl shadow-lg backdrop-blur-sm text-gray-200 p-4">
      <div className="flex flex-row items-center gap-3 border-b border-gray-700 pb-3">
        <img 
          src="/images/mars.png" 
          alt="Marte" 
          className="w-14 h-14 object-contain rounded-full border border-gray-500"
        />
        <div>
          <div className="text-xl font-semibold text-white">
            Oposición de Marte
          </div>
          <div className="flex items-center text-sm text-gray-400 mt-1">
            <span>15 de septiembre de 2025</span>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <div className="text-gray-300 leading-relaxed text-justify">
          Marte se encuentra en oposición, es decir, alineado con la Tierra y el Sol. 
          Esto hace que brille más intensamente en el cielo nocturno y sea el mejor momento 
          del año para observarlo a simple vista o con telescopio.
        </div>
      </div>
    </div>
  )
}
