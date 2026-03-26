const particles = [
  { size: 3,  x: 10,  y: 20,  duration: 8,  delay: 0,   opacity: 0.5 },
  { size: 2,  x: 25,  y: 60,  duration: 11, delay: 1.5, opacity: 0.3 },
  { size: 4,  x: 40,  y: 15,  duration: 9,  delay: 0.8, opacity: 0.4 },
  { size: 2,  x: 55,  y: 75,  duration: 13, delay: 2,   opacity: 0.35 },
  { size: 3,  x: 70,  y: 35,  duration: 7,  delay: 0.3, opacity: 0.5 },
  { size: 5,  x: 82,  y: 55,  duration: 10, delay: 1,   opacity: 0.2 },
  { size: 2,  x: 92,  y: 80,  duration: 12, delay: 2.5, opacity: 0.4 },
  { size: 3,  x: 15,  y: 85,  duration: 9,  delay: 0.6, opacity: 0.3 },
  { size: 4,  x: 60,  y: 90,  duration: 11, delay: 1.8, opacity: 0.25 },
  { size: 2,  x: 35,  y: 40,  duration: 8,  delay: 1.2, opacity: 0.45 },
  { size: 3,  x: 78,  y: 10,  duration: 14, delay: 3,   opacity: 0.3 },
  { size: 2,  x: 48,  y: 50,  duration: 10, delay: 0.4, opacity: 0.4 },
]

// Floating lines / streaks
const streaks = [
  { x: 20, y: 30, width: 40, angle: -30, duration: 6,  delay: 0 },
  { x: 65, y: 20, width: 60, angle: 20,  duration: 8,  delay: 2 },
  { x: 80, y: 70, width: 35, angle: -15, duration: 7,  delay: 1 },
  { x: 10, y: 65, width: 50, angle: 35,  duration: 9,  delay: 3 },
]

export default function BackgroundParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">

      {/* Animated gradient blobs */}
      <div
        className="absolute rounded-full opacity-[0.06] blur-3xl"
        style={{
          width: 600,
          height: 600,
          top: '-10%',
          right: '-5%',
          background: 'radial-gradient(circle, #22d3ee, #3b82f6)',
          animation: 'blobFloat1 14s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full opacity-[0.04] blur-3xl"
        style={{
          width: 400,
          height: 400,
          bottom: '5%',
          left: '-5%',
          background: 'radial-gradient(circle, #a78bfa, #22d3ee)',
          animation: 'blobFloat2 18s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full opacity-[0.035] blur-3xl"
        style={{
          width: 300,
          height: 300,
          top: '40%',
          left: '40%',
          background: 'radial-gradient(circle, #22d3ee, #06b6d4)',
          animation: 'blobFloat3 12s ease-in-out infinite',
        }}
      />

      {/* Glowing dots */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: '#22d3ee',
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 3}px rgba(34,211,238,0.8)`,
            animation: `floatUp ${p.duration}s ease-in-out infinite ${p.delay}s`,
          }}
        />
      ))}

      {/* Light streaks */}
      {streaks.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.width,
            height: 1,
            transform: `rotate(${s.angle}deg)`,
            background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.25), transparent)',
            animation: `streakPulse ${s.duration}s ease-in-out infinite ${s.delay}s`,
          }}
        />
      ))}

      {/* Corner accent glow */}
      <div
        className="absolute top-0 left-0 w-72 h-72 opacity-[0.07]"
        style={{
          background: 'conic-gradient(from 180deg at 0% 0%, #22d3ee, transparent 60%)',
          animation: 'pulseRing 6s ease-in-out infinite',
        }}
      />
    </div>
  )
}
