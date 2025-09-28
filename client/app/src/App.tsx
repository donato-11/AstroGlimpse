import { Calendar } from "./components/Calendar"
import { ShootingStars } from "./components/ui/shooting-stars"
import { StarsBackground } from "./components/ui/star-background"

function App() {

  const events = [
    { date: "2025-09-10", image: "/chrome-star.png"},
    { date: "2025-09-15", image: "/chrome-star.png"},
    { date: "2025-09-25", image: "/chrome-star.png"},
  ]

  return (
    <>
      {/*SVG filter for glass distortion (non visible in the app)*/}
      <svg width="0" height="0" aria-hidden="true" focusable="false">
        <filter id="glass">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.02 0.05"
            numOctaves="2"
            result="turb"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turb"
            scale="20"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Main app container */}
      <div className={"relative min-h-screen text-white"}> 
        <StarsBackground/>
        <ShootingStars/>
        <div>
          <div className="flex justify-end p-6">
            <Calendar
              year={2025}
              month={8} // (0-based)
              events={events}
              onDayClick={(date) => alert(`Día seleccionado: ${date}`)}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
