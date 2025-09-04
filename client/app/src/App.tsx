import {Calendar} from "./components/Calendar"
import { StarBackground } from "./components/StarBackground"
import { StarBackground2 } from "./components/StarBackground"

function App() {

  const events = [
    { date: "2025-09-10", image: "/chrome-star.png", alt: "Evento 1" },
    { date: "2025-09-15", image: "/chrome-star.png", alt: "Evento 2" },
    { date: "2025-09-23", image: "/chrome-star.png", alt: "Evento 3" },
  ]

  return (
    <>
      <div className={"relative min-h-screen text-white"}>
        <img src="/tile-best-2.png" alt="Fondo de galaxia" className="fixed inset-0 w-[100px] h-[100px] object-cover" />
        <StarBackground2 />
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
