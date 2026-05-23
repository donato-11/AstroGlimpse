import type { FC } from "react"
import { cn } from "@/lib/utils"

interface DayTileProps {
  day: number
  eventImage?: string   // Image URL for the event icon
  isToday?: boolean     // True if this tile represents today
  isDisabled?: boolean  // True if this tile is not a valid day (empty tile)
  onClick?: () => void
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
          backgroundImage: 'url("/tile-day.png")', 
          backgroundSize: "102% 102%", // Somehow increasing size gives the background image lightning a 3d effect
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className={cn(
          "relative flex flex-col items-center justify-center w-20 h-20 rounded-xl",
          "liquidGlassEffect",
          "hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]",
          // State variations
          isToday && "shadow-[0_0_20px_rgba(255,255,255,0.4)]",
          isDisabled && "opacity-0 hover:shadow-none"
        )}
      >

        <span
          className={cn(
            "text-lg font-light tracking-wide text-white ",
            //"drop-shadow-[0_0_13px_rgba(202,213,226,1)]",
            "drop-shadow-[0_0_13px_rgba(255,255,255,0.5)]"
          )}
        >
          {day}
        </span>

        {eventImage && (
          <img
            src={eventImage}
            alt="Event icon"
            className="w-8 h-8 object-contain"
          />
        )}
        
      </button>
  )
}