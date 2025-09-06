import {Calendar} from "./components/Calendar"
import { ShootingStars } from "./components/ui/shooting-stars"
import { StarsBackground } from "./components/ui/star-background"

function App() {

  const events = [
    { date: "2025-09-10", image: "/chrome-star.png", alt: "Evento 1" },
    { date: "2025-09-15", image: "/chrome-star.png", alt: "Evento 2" },
    { date: "2025-09-23", image: "/chrome-star.png", alt: "Evento 3" },
  ]

  return (
    <>
      <div className={"relative min-h-screen text-white"}> 
        <StarsBackground/>
        <ShootingStars/>
        <div>
          <div className="p-6">
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
