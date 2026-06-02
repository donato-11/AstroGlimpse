"use client"

import { useState } from "react"
import type { FC } from "react"
import { motion, AnimatePresence } from "motion/react"
import { DayTile } from "@/components/tiles/DayTile"
import { CometCard } from "@/components/ui/CometCard"
import { MonthTile } from "@/components/tiles/MonthTile"
import { WeekTiles } from "@/components/tiles/WeekTiles"

const MIN_YEAR = 2025
const MAX_YEAR = 2030

interface Event {
  date: string // "YYYY-MM-DD"
  image: string
}

interface CalendarProps {
  year: number
  month: number // 0-based (0 = January, 11 = December)
  events?: Event[]
  onDateChange?: (date: { year: number; month: number }) => void
  onDayClick?: (date: string) => void
}

export const Calendar: FC<CalendarProps> = ({
  year,
  month,
  events = [],
  onDateChange,
  onDayClick,
}) => {
  // Direction: 1 = forward (next), -1 = backward (prev) — drives slide animation
  const [direction, setDirection] = useState<1 | -1>(1)

  const today = new Date()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startDay = firstDay.getDay()
  const totalTiles = Math.ceil((daysInMonth + startDay) / 7) * 7

  const isAtStart = year === MIN_YEAR && month === 0
  const isAtEnd   = year === MAX_YEAR && month === 11

  const navigate = (delta: 1 | -1) => {
    setDirection(delta)
    let newMonth = month + delta
    let newYear  = year

    if (newMonth > 11) { newMonth = 0;  newYear++ }
    if (newMonth < 0)  { newMonth = 11; newYear-- }

    onDateChange?.({ year: newYear, month: newMonth })
  }

  const tiles = []
  for (let i = 0; i < totalTiles; i++) {
    const dayNum = i - startDay + 1
    const isValidDay = dayNum > 0 && dayNum <= daysInMonth

    let dateString = ""
    let eventData  = undefined

    if (isValidDay) {
      dateString = new Date(year, month, dayNum).toISOString().split("T")[0]
      eventData  = events.find(e => e.date === dateString)
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

  // Unique key per month so AnimatePresence detects the change
  const calendarKey = `${year}-${month}`

  const variants = {
    enter:  (dir: number) => ({ x: dir * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir: number) => ({ x: dir * -40, opacity: 0 }),
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Month header with nav controls */}
      <div className="flex justify-start items-center gap-3">
        {/* Prev button */}
        <button
          onClick={() => navigate(-1)}
          disabled={isAtStart}
          aria-label="Previous month"
          className="
            flex items-center justify-center w-9 h-9 rounded-xl
            bg-white/[0.04] border border-white/10 backdrop-blur-md
            text-gray-400 transition-all duration-200
            hover:bg-white/[0.09] hover:border-white/25 hover:text-white
            hover:shadow-[0_0_14px_rgba(255,255,255,0.06)]
            hover:-translate-y-px active:translate-y-0
            disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-white/[0.04]
            disabled:hover:border-white/10 disabled:hover:shadow-none disabled:hover:translate-y-0
          "
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <MonthTile month={month} year={year} />

        {/* Next button */}
        <button
          onClick={() => navigate(1)}
          disabled={isAtEnd}
          aria-label="Next month"
          className="
            flex items-center justify-center w-9 h-9 rounded-xl
            bg-white/[0.04] border border-white/10 backdrop-blur-md
            text-gray-400 transition-all duration-200
            hover:bg-white/[0.09] hover:border-white/25 hover:text-white
            hover:shadow-[0_0_14px_rgba(255,255,255,0.06)]
            hover:-translate-y-px active:translate-y-0
            disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-white/[0.04]
            disabled:hover:border-white/10 disabled:hover:shadow-none disabled:hover:translate-y-0
          "
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days of the week */}
      <div className="grid grid-cols-7 text-center text-sm font-normal text-white gap-x-4 w-[100%]">
        <WeekTiles />
      </div>

      {/* Animated month grid */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={calendarKey}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="grid grid-cols-7 gap-4 w-[100%]"
          >
            {tiles}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}