"use client"

import { useState } from "react"
import Link from "next/link"
import { ShootingStars } from "@/components/ui/ShootingStars"
import { StarsBackground } from "@/components/ui/StarBackground"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Auth logic goes here
  }

  return (
    <>
      <svg width="0" height="0" aria-hidden="true" focusable="false">
        <filter id="glass">
          <feTurbulence type="turbulence" baseFrequency="0.02 0.05" numOctaves="2" result="turb" />
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="20" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="relative min-h-screen text-white flex flex-col items-center justify-center px-4">
        <StarsBackground />
        <ShootingStars />

        {/* Card */}
        <div className="
          relative z-10 w-full max-w-sm rounded-2xl px-8 py-10
          flex flex-col gap-7
          bg-gradient-to-br from-white/[0.05] to-white/[0.02]
          border border-white/10
          backdrop-blur-2xl
          shadow-[0_0_60px_rgba(0,0,0,0.6),0_0_30px_rgba(255,255,255,0.03)]
        ">

          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            <Link href="/">
              <img
                src="/logo-mixto.png"
                alt="AstroGlimpse"
                className="w-48 -ml-2 opacity-85 hover:opacity-100 transition-opacity duration-300"
              />
            </Link>
            <p className="text-xs tracking-[0.20em] uppercase text-gray-600 font-light">
              Welcome back
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-light tracking-[0.16em] uppercase text-gray-500">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="
                  w-full rounded-xl px-4 py-2.5
                  text-sm font-light text-white placeholder-white/20
                  bg-white/[0.04] border border-white/10
                  backdrop-blur-md outline-none
                  transition-all duration-200
                  focus:border-white/25 focus:shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_0_16px_rgba(255,255,255,0.04)]
                "
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-xs font-light tracking-[0.16em] uppercase text-gray-500">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs font-light tracking-wide text-gray-700 hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="
                  w-full rounded-xl px-4 py-2.5
                  text-sm font-light text-white placeholder-white/20
                  bg-white/[0.04] border border-white/10
                  backdrop-blur-md outline-none
                  transition-all duration-200
                  focus:border-white/25 focus:shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_0_16px_rgba(255,255,255,0.04)]
                "
              />
            </div>

            {/* Forgot password */}
            <div className="flex justify-end -mt-1">
              <Link
                href="#"
                className="text-xs font-light tracking-wide text-gray-700 hover:text-gray-400 transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
                mt-1 w-full cursor-pointer rounded-xl py-2.5
                text-xs font-light tracking-[0.18em] uppercase text-white
                bg-gradient-to-b from-white/[0.13] to-white/[0.06]
                border border-white/[0.28]
                backdrop-blur-md
                shadow-[0_0_18px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.10)]
                transition-all duration-200
                hover:from-white/[0.20] hover:to-white/[0.10]
                hover:border-white/[0.42]
                hover:shadow-[0_0_28px_rgba(255,255,255,0.10),inset_0_1px_0_rgba(255,255,255,0.16)]
                hover:-translate-y-px
                active:translate-y-0
              "
            >
              Log In
            </button>
          </form>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          {/* Sign up link */}
          <p className="text-center text-xs font-light tracking-wide text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-gray-400 hover:text-white underline underline-offset-2 transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}