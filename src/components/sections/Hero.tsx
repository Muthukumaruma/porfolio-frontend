import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Phone, Download, ArrowRight, ChevronDown } from 'lucide-react'
import { profile, stats } from '../../data/portfolio'

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  // Typewriter effect
  useEffect(() => {
    const currentRole = profile.roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (typing) {
      if (displayed.length < currentRole.length) {
        timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 80)
      } else {
        timeout = setTimeout(() => setTyping(false), 1800)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      } else {
        setRoleIndex((i) => (i + 1) % profile.roles.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, typing, roleIndex])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-white/0 dark:bg-transparent pt-16"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(34,211,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-theme/10 border border-theme/20 text-theme text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-theme animate-pulse" />
                Available for new opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4"
            >
              <span className="text-gray-900 dark:text-white">Hi, I'm </span>
              <br />
              <span className="text-gradient">{profile.firstName}</span>
              <span className="text-gray-900 dark:text-white">.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 mb-6 h-10"
            >
              <span className="text-xl md:text-2xl font-semibold text-gray-600 dark:text-white/70">
                I'm a{' '}
              </span>
              <span className="text-xl md:text-2xl font-bold text-theme">
                {displayed}
                <span className="animate-pulse">|</span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-500 dark:text-white/50 text-base leading-relaxed max-w-lg mb-8"
            >
              {profile.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme text-night font-semibold text-sm hover:bg-theme-dark transition-all duration-300 hover:shadow-glow group"
              >
                Hire Me
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <a
                href={`${import.meta.env.BASE_URL}Muthukumar2026-exp.pdf`}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-grey-dark-200 text-gray-700 dark:text-white/80 font-semibold text-sm hover:border-theme hover:text-theme transition-all duration-300"
              >
                <Download size={16} />
                Download CV
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-grey-dark-200 text-gray-500 dark:text-white/50 hover:border-theme hover:text-theme transition-all duration-300"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-grey-dark-200 text-gray-500 dark:text-white/50 hover:border-theme hover:text-theme transition-all duration-300"
              >
                <Mail size={18} />
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-grey-dark-200 text-gray-500 dark:text-white/50 hover:border-theme hover:text-theme transition-all duration-300"
              >
                <Phone size={18} />
              </a>
            </motion.div>
          </div>

          {/* Right Content — Avatar + Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Avatar */}
            <div className="relative">

              {/* Floating light orbs above image */}
              <div
                className="absolute -top-5 left-1/2 -translate-x-1/2 w-32 h-6 rounded-full blur-xl bg-theme/50 pointer-events-none"
                style={{ animation: 'floatUp 3s ease-in-out infinite' }}
              />
              <div
                className="absolute -top-2 left-1/4 w-4 h-4 rounded-full blur-sm bg-theme/70 pointer-events-none"
                style={{ animation: 'floatUp 3.5s ease-in-out infinite 0.5s' }}
              />
              <div
                className="absolute -top-2 right-1/4 w-3 h-3 rounded-full blur-sm bg-blue-400/60 pointer-events-none"
                style={{ animation: 'floatUp 2.8s ease-in-out infinite 1s' }}
              />

              {/* Outer pulse ring */}
              <div
                className="absolute -inset-2 rounded-3xl border border-theme/20 pointer-events-none"
                style={{ animation: 'pulseRing 3s ease-in-out infinite' }}
              />

              {/* Glow background */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-theme/40 to-blue-500/20 blur-md" />

              {/* Image with light sweep */}
              <div className="avatar-light-sweep relative w-64 h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden border-2 border-theme/40 shadow-glow">
                <img
                  src={`${import.meta.env.BASE_URL}muthu.jpeg`}
                  alt="Muthukumar U"
                  className="w-full h-full object-cover object-top"
                />
                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-night/60 to-transparent pointer-events-none" />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 -right-3 bg-white dark:bg-metal border border-gray-100 dark:border-grey-dark rounded-xl px-3 py-1.5 shadow-lg text-xs font-semibold text-theme whitespace-nowrap z-10">
                15+ Years Exp
              </div>
              <div className="absolute -bottom-3 -left-3 bg-white dark:bg-metal border border-gray-100 dark:border-grey-dark rounded-xl px-3 py-1.5 shadow-lg text-xs font-semibold text-gray-700 dark:text-white whitespace-nowrap z-10">
                MERN Stack Expert
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="card-base p-4 text-center"
                >
                  <p className="text-2xl font-black text-theme">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-white/40 mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 dark:text-white/30 hover:text-theme transition-colors duration-300 animate-bounce"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} />
      </button>
    </section>
  )
}
