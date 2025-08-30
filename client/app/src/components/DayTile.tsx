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
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl p-3 w-20 h-20 transition-all shadow-sm",
        "border border-gray-200 dark:border-gray-700",
        "hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400",
        isToday && "bg-blue-100 dark:bg-blue-800 border-blue-500",
        isDisabled && "opacity-40 cursor-not-allowed"
      )}
    >
      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {day}
      </span>
      {eventImage && (
        <img
          src={eventImage}
          alt={eventAlt}
          className="w-8 h-8 mt-1 object-contain"
        />
      )}
    </button>
  )
}
