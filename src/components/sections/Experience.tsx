import { motion } from 'framer-motion'
import { MapPin, ChevronRight } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { experiences } from '../../data/portfolio'

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-gray-50/50 dark:bg-white/[0.02]">
      <div className="container-max">
        <SectionHeader
          badge="Experience"
          title="My Work Journey"
          accentWord="Journey"
          subtitle={`${experiences.length} companies · 15+ years of enterprise engineering leadership`}
        />

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 dark:bg-grey-dark-200 hidden sm:block" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative sm:pl-16"
              >
                {/* Timeline Dot */}
                <div
                  className="absolute left-3.5 top-6 w-5 h-5 rounded-full bg-theme border-2 border-white dark:border-night hidden sm:flex items-center justify-center"
                  style={{ boxShadow: '0 0 12px rgba(34,211,238,0.5)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-night" />
                </div>

                {/* Card */}
                <div className="group card-base p-6 hover:border-theme/40 hover:shadow-glow transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-theme transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <p className="text-theme font-semibold text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
                      <span className="px-3 py-1 rounded-full bg-theme/10 border border-theme/20 text-theme text-xs font-medium whitespace-nowrap">
                        {exp.startDate} — {exp.endDate}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-white/30">
                        <MapPin size={11} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-1.5">
                    {exp.description.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-500 dark:text-white/50">
                        <ChevronRight
                          size={14}
                          className="text-theme flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform duration-300"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
