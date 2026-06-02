"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { ShootingStars } from "@/components/ui/ShootingStars"
import { StarsBackground } from "@/components/ui/StarBackground"
import { Calendar } from "@/components/Calendar"
import { EventCard } from "@/components/EventCard"

// Reusable logo with CometCard-style 3D motion
function AnimatedLogo() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-12deg", "12deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["12deg", "-12deg"])
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-6px", "6px"])
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["6px", "-6px"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="perspective-distant transform-3d" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div
        style={{ rotateX, rotateY, translateX, translateY }}
        whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
      >
        <img
          src="/logo-mixto.png"
          alt="AstroGlimpse Logo"
          className="w-80 -ml-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.06)]"
        />
      </motion.div>
    </div>
  )
}

export default function Home() {
  const [calendarDate, setCalendarDate] = useState({ year: 2025, month: 9 })

  const events = [
    { date: "2025-10-10", image: "/chrome-star.png" },
    { date: "2025-10-15", image: "/chrome-star.png" },
    { date: "2025-10-25", image: "/chrome-star.png" },
  ]

  const handleExploreCTA = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById("calendar")
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <>
      {/* SVG filter for glass distortion */}
      <svg width="0" height="0" aria-hidden="true" focusable="false">
        <filter id="glass">
          <feTurbulence type="turbulence" baseFrequency="0.02 0.05" numOctaves="2" result="turb" />
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="20" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="relative min-h-screen text-white">
        <StarsBackground />
        <ShootingStars />

        {/* ── HERO ── */}
        <div className="min-h-screen flex flex-col justify-center items-center gap-9 px-6">

          <AnimatedLogo />

          {/* Description */}
          <p className="
            max-w-xs text-center text-sm font-light leading-relaxed text-gray-400 rounded-2xl px-7 py-4
            bg-gradient-to-br from-white/[0.04] to-white/[0.02]
            border border-white/10
            backdrop-blur-md
            transition-all duration-300
            hover:border-white/[0.18] hover:shadow-[0_0_30px_rgba(255,255,255,0.04)]
          ">
            A captivating calendar of upcoming astronomical events — explore
            celestial occurrences and plan your observations of the night sky.
          </p>

          {/* Auth buttons */}
          <div className="flex gap-3">
            <Link href="/login">
              <button className="
                cursor-pointer rounded-xl px-7 py-2.5
                text-sm font-light tracking-widest uppercase text-white
                bg-white/[0.04] border border-white/[0.15] backdrop-blur-md
                transition-all duration-200
                hover:bg-white/[0.08] hover:border-white/[0.28]
                hover:shadow-[0_0_20px_rgba(255,255,255,0.07),inset_0_1px_0_rgba(255,255,255,0.08)]
                hover:-translate-y-px active:translate-y-0
              ">
                Log In
              </button>
            </Link>
            <Link href="/register">
              <button className="
                cursor-pointer rounded-xl px-7 py-2.5
                text-sm font-light tracking-widest uppercase text-white
                bg-gradient-to-b from-white/[0.13] to-white/[0.06]
                border border-white/30 backdrop-blur-md
                shadow-[0_0_18px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.12)]
                transition-all duration-200
                hover:from-white/[0.20] hover:to-white/[0.10]
                hover:border-white/[0.45]
                hover:shadow-[0_0_30px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.18)]
                hover:-translate-y-px active:translate-y-0
              ">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Explore CTA */}
          <a
            href="#calendar"
            onClick={handleExploreCTA}
            className="group flex flex-col items-center gap-2 mt-1 opacity-60 hover:opacity-100 hover:translate-y-1 transition-all duration-300"
          >
            <span className="
              text-xs font-light tracking-[0.18em] uppercase text-gray-400
              transition-all duration-300
              group-hover:text-white/90 group-hover:tracking-[0.22em]
            ">
              Explore upcoming events
            </span>
            <svg
              className="
                w-3.5 h-3.5 text-gray-500
                transition-colors duration-300
                group-hover:text-white/70
                animate-slowBounce
              "
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* ── CALENDAR ── */}
        <div id="calendar" className="grid grid-cols-[1fr_2fr] gap-10 p-6">
          <div className="flex flex-col justify-center">
            <EventCard />
          </div>
          <Calendar
            year={calendarDate.year}
            month={calendarDate.month}
            events={events}
            onDateChange={setCalendarDate}
            onDayClick={(date) => alert(`Día seleccionado: ${date}`)}
          />
        </div>
      </div>
    </>
  )
}
