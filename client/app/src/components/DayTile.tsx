import type { FC } from "react"
import { cn } from "@/lib/utils"

interface DayTileProps {
  day: number
  eventImage?: string   // URL de la imagen (opcional)
  isToday?: boolean     // marca si es el día actual
  isDisabled?: boolean  // por ejemplo días de otro mes
  onClick?: () => void  // acción al hacer click
}

export const DayTile: FC<DayTileProps> = ({
  day,
  eventImage,
  isToday = false,
  isDisabled = false,
  onClick,
}) => {
  return (
      <button
        onClick={onClick}
        disabled={isDisabled}
        style={{
          backgroundImage: 'url("/tile.png")', 
          backgroundSize: "102% 102%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className={cn(
          "relative flex flex-col items-center justify-center w-20 h-20 rounded-xl",
          // glass effect
          "liquidGlassEffect shadow-[inset_0_0_15px_rgba(255,255,255,0.)]",
          // hover / focus states
          "hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]",
          // state variations
          isToday && "shadow-[0_0_20px_rgba(255,255,255,0.4)]",
          isDisabled && "opacity-0 hover:shadow-none"
        )}
      >

        <span
          className={cn(
            "text-lg font-light tracking-wide text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.3)]",
          )}
        >
          {day}
        </span>

        {eventImage && (
          <img
            src={eventImage}
            alt="Event icon"
            className="w-8 h-8 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0)]"
          />
        )}
        
      </button>
  )
}
