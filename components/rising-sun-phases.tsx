"use client"

import { useState, useEffect } from "react"

export function RisingSunPhases() {
  const [visiblePhase, setVisiblePhase] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisiblePhase((prev) => (prev + 1) % 3)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const phases = [
    { title: "Step 1: Find", description: "scholarships/opportunities", sunHeight: 20 },
    { title: "Step 2: Build", description: "your personalized list and apply", sunHeight: 50 },
    { title: "Step 3: Use", description: "our online resources to track status", sunHeight: 80 },
  ]

  return (
    <div className="w-full space-y-12">
      {/* Minimalist Horizontal Sunrise Animation */}
      <div className="relative w-full h-56 bg-gradient-to-b from-blue-100 to-orange-50 rounded-2xl shadow-md overflow-hidden">
        {/* Container for suns - clip anything below the horizon line */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 65%, 0 65%)",
          }}
        >
          {/* Horizon line (visible above the clipped area) */}
          <div className="absolute bottom-20 left-0 right-0 h-1 bg-gray-400 z-10"></div>

          {/* Three progressively rising suns */}
          <div className="absolute inset-0 flex items-end justify-around px-8">
            {phases.map((phase, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center"
                style={{
                  opacity: visiblePhase === index ? 1 : 0.3,
                  transition: "opacity 500ms ease-in-out",
                }}
              >
                <div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 shadow-lg border-2 border-yellow-200"
                  style={{
                    position: "absolute",
                    bottom: `${phase.sunHeight}px`,
                    transition: "bottom 1500ms ease-in-out",
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Horizon line overlay below clip area for visibility */}
        <div className="absolute bottom-20 left-0 right-0 h-1 bg-gray-400 z-20"></div>
      </div>

      {/* Step descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {phases.map((phase, index) => (
          <div
            key={index}
            className={`text-center transition-all duration-500 ${
              visiblePhase === index ? "opacity-100" : "opacity-50"
            }`}
          >
            <h3 className="text-lg font-bold text-primary mb-2">{phase.title}</h3>
            <p className="text-muted-foreground text-sm">{phase.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
