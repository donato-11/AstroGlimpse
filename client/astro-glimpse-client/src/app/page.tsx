"use client"

import { ShootingStars } from "@/components/ui/ShootingStars"
import { StarsBackground } from "@/components/ui/StarBackground"
import { Calendar } from "@/components/Calendar"
import { EventCard } from "@/components/EventCard"

export default function Home() {

  const events = [
    { date: "2025-10-10", image: "/chrome-star.png"},
    { date: "2025-10-15", image: "/chrome-star.png"},
    { date: "2025-10-25", image: "/chrome-star.png"},
  ]

  return (
    <>
      {/*SVG filter for glass distortion (non visible in the app)*/}
      <svg width="0" height="0" aria-hidden="true" focusable="false">
        <filter id="glass">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.02 0.05"
            numOctaves="2"
            result="turb"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turb"
            scale="20"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Main app container */}
      <div className={"relative min-h-screen text-white"}> 
        <StarsBackground/>
        <ShootingStars/>

        <div className="min-h-screen flex flex-col justify-start items-center"> 
          <img
            src="/logo-mixto.png"
            alt="AstroGlimpse Logo"
            className="w-96 mt-16 -ml-4"
          />

          <p className="w-1/4 mt-12">
            AstroGlimpse provides a captivating calendar of upcoming astronomical
            events, allowing users to easily explore celestial ocurrences and plan their 
            observations of the night sky.
          </p>

          <div className="flex gap-8 mt-8">
            <button className="cursor-pointer border border-white rounded-xl py-2 px-4">
              Log In
            </button>
            <button className="cursor-pointer bg-white text-black rounded-xl py-2 px-4">
              Sign Up
            </button>
          </div>

          <a href="#calendar" className="mt-12">
            <button className="cursor-pointer underline">
              Explore upcoming events 
            </button>
          </a>
        </div>
        
        <div className="grid grid-cols-[1fr_2fr] gap-10 p-6">
          <div className="flex flex-col justify-center">
            <EventCard/>
          </div>

          <Calendar
            year={2025}
            month={9} // (0-based)
            events={events}
            onDayClick={(date) => alert(`Día seleccionado: ${date}`)}
          />
        </div>
      </div>
    </>
  )
}
