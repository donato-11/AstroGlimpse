"use client"

import type { FC } from "react"
import { DayTile } from "./DayTile"
import { CometCard } from "../ui/comet-card"

interface Event {
  date: string // "YYYY-MM-DD"
  image: string
}

interface CalendarProps {
  year: number
  month: number // 0-based (0 = January, 11 = December)
  events?: Event[]
  onDayClick?: (date: string) => void
}

export const Calendar: FC<CalendarProps> = ({ year, month, events = [], onDayClick }) => {
  const today = new Date()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()

  // Day of the week the month starts on (0 = Sunday, 6 = Saturday)
  const startDay = firstDay.getDay()

  // Tiles matrix (including leading/trailing empty days)
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
      <CometCard key={i} className="flex items-center justify-center">
        <DayTile
          day={isValidDay ? dayNum : 0}
          eventImage={eventData?.image}
          isToday={
            isValidDay &&
            dayNum === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
          }
          isDisabled={!isValidDay}
          onClick={() => isValidDay && onDayClick?.(dateString)}
        />
      </CometCard>
    )
  }

  return (
    <div className="">
      {/* Month header */}
      <div className="flex justify-start items-center mb-4 ">
        <CometCard>
          <h2 className="text-xl font-normal text-white capitalize liquidGlassEffect p-4 rounded-lg "
              style={{
                backgroundImage: 'url("/tile-horizontal-3.png")',
                backgroundSize: "100% 102%", // Somehow increasing this gives the background image a 3d effect
                objectFit: "cover",
              }}
          >
            {new Date(year, month).toLocaleString("en-US", { month: "long", year: "numeric" })}
          </h2>
        </CometCard>
      </div>

      {/* Days of the week */}
      <div className="grid grid-cols-7 text-center text-sm font-normal text-white mb-2 gap-x-4 w-[100%]">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
          <CometCard key={d}>
            <div
              style={{
                backgroundImage: 'url("/tile-horizontal-2.png")',
                backgroundSize: "100% 102%",
                objectFit: "cover",
              }}
              className="liquidGlassEffect"
            >
              {d}
            </div>
          </CometCard>
        ))}
      </div>

      {/* Month tiles */}
      <div className="grid grid-cols-7 gap-4 w-[100%]">
        {tiles}
      </div>
    </div>
  )
}
