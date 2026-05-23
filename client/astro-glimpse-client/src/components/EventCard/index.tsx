export function EventCard() {
  return (
    <div className="h-fit flex flex-col liquidGlassEffect rounded-2xl text-gray-200 p-8"
      style={{
        backgroundImage: 'url("/tile-event.webp")',
        backgroundSize: "100% 101%",
      }}>
      <div className="flex flex-row items-center gap-3 border-b border-gray-400 pb-3">
        <img 
          src="/images/mars.png" 
          alt="Marte" 
          className="w-14 h-14 object-contain rounded-full border border-white"
        />
        <div>
          <p className="text-xl font-semibold text-white eventCardShadow">
            Oposición de Marte
          </p>
          <div className="flex items-center text-sm text-gray-400 mt-1 eventCardShadow">
            <span>15 de septiembre de 2025</span>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <p className="text-gray-300 leading-relaxed text-justify eventCardShadow">
          Marte se encuentra en oposición, es decir, alineado con la Tierra y el Sol. 
          Esto hace que brille más intensamente en el cielo nocturno y sea el mejor momento 
          del año para observarlo a simple vista o con telescopio.
        </p>
      </div>
    </div>
  )
}