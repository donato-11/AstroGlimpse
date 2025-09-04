import type { FC } from "react"
import { DayTile } from "./DayTile"

interface Event {
  date: string // formato: "YYYY-MM-DD"
  image: string
  alt?: string
}

interface CalendarProps {
  year: number
  month: number // 0 = Enero, 11 = Diciembre
  events?: Event[]
  onDayClick?: (date: string) => void
}

export const Calendar: FC<CalendarProps> = ({ year, month, events = [], onDayClick }) => {
  const today = new Date()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()

  // día de la semana del primer día (0 = domingo, 6 = sábado)
  const startDay = firstDay.getDay()

  // matriz para todos los tiles (incluyendo vacíos previos y posteriores)
  const totalTiles = Math.ceil((daysInMonth + startDay) / 7) * 7

  const tiles = []
  for (let i = 0; i < totalTiles; i++) {
    const dayNum = i - startDay + 1
    const isValidDay = dayNum > 0 && dayNum <= daysInMonth

    let dateString = ""
    let eventData = undefined

    if (isValidDay) {
      dateString = new Date(year, month, dayNum).toISOString().split("T")[0]
      eventData = events.find(e => e.date === dateString)
    }

    tiles.push(
      <DayTile
        key={i}
        day={isValidDay ? dayNum : 0}
        eventImage={eventData?.image}
        eventAlt={eventData?.alt}
        isToday={
          isValidDay &&
          dayNum === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear()
        }
        isDisabled={!isValidDay}
        onClick={() => isValidDay && onDayClick?.(dateString)}
      />
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* encabezado del mes */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
      </div>

      {/* días de la semana */}
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 w-[100%]">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* tiles del mes */}
      <div className="grid grid-cols-7 gap-2 w-[100%]">
        {tiles}
      </div>
    </div>
  )
}
