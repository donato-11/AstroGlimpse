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
        backgroundImage: 'url("/tile-border-test.png")', 
        backgroundSize: "100% 102%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        objectFit: "fill",
      }}
      className={cn(
        "relative flex flex-col items-center justify-center w-20 h-20 p-3 transition-all",
        // glass effect
        // hover / focus states
        "hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]", // inner glow
        // state variations
        isToday && "shadow-[0_0_25px_rgba(255,255,255,0.5)]",
        isDisabled && "opacity-10 hover:shadow-none"
      )}
    >
      <span
        className={cn(
          "text-lg font-light tracking-wide text-white drop-shadow-md",
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
