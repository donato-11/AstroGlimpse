import type { FC } from "react"
import { cn } from "@/lib/utils"

interface DayTileProps {
  day: number
  eventImage?: string   // URL de la imagen (opcional)
  eventAlt?: string     // texto alternativo accesible
  isToday?: boolean     // marca si es el día actual
  isDisabled?: boolean  // por ejemplo días de otro mes
  onClick?: () => void  // acción al hacer click
}

export const DayTile: FC<DayTileProps> = ({
  day,
  eventImage,
  eventAlt = "event icon",
  isToday = false,
  isDisabled = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      style={{
        backgroundImage: 'url("/tile-best-2.png")', 
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={cn(
        "relative flex flex-col items-center justify-center w-20 h-20 rounded-2xl p-3 transition-all",
        // glass effect
        "bg-white/10 backdrop-blur-[2px] border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]",
        // hover / focus states
        "hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]",
        "focus:outline-none focus:ring-1 focus:ring-blue-400/60",
        // state variations
        isToday && "border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.5)]",
        isDisabled && "opacity-40 cursor-not-allowed hover:scale-100 hover:shadow-none"
      )}
    >
      <span
        className={cn(
          "text-lg font-light tracking-wide text-white drop-shadow-md",
          isToday && "text-blue-300"
        )}
      >
        {day}
      </span>
      {eventImage && (
        <img
          src={eventImage}
          alt={eventAlt}
          className="w-8 h-8 mt-1 object-contain drop-shadow-md"
        />
      )}
    </button>
  )
}
