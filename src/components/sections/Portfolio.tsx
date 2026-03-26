import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Tag } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { staggerContainer, staggerItem } from '../ui/AnimatedSection'
import { projects } from '../../data/portfolio'

const filters = ['All', 'Featured', 'Enterprise', 'Media', 'eCommerce']

export default function Portfolio() {
  const [active, setActive] = useState('All')

  const filtered = projects.filter((p) => {
    if (active === 'All') return true
    if (active === 'Featured') return p.featured
    return p.category === active
  })

  return (
    <section id="portfolio" className="section-padding bg-gray-50/50 dark:bg-white/[0.02]">
      <div className="container-max">
        <SectionHeader
          badge="Portfolio"
          title="My Recent Projects"
          accentWord="Projects"
          subtitle="Enterprise-scale solutions built with the MERN stack and modern cloud infrastructure."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                active === f
                  ? 'bg-theme text-night shadow-glow-sm'
                  : 'bg-gray-100 dark:bg-grey-dark text-gray-600 dark:text-white/50 hover:text-theme border border-transparent hover:border-theme/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                variants={staggerItem}
                className="group card-base overflow-hidden hover:border-theme/40 hover:shadow-glow"
              >
                {/* Project Image / Gradient */}
                <div className={`relative h-44 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 flex items-end p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        project.featured
                          ? 'bg-theme text-night'
                          : 'bg-white/20 text-white'
                      }`}
                    >
                      {project.featured ? '★ Featured' : project.category}
                    </span>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-night/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-theme text-night text-xs font-semibold">
                        <ExternalLink size={12} />
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Decorative circles */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/10" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2 group-hover:text-theme transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-white/40 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-grey-dark text-gray-600 dark:text-white/50 text-xs"
                      >
                        <Tag size={9} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 dark:text-white/30 py-10">
            No projects in this category.
          </p>
        )}
      </div>
    </section>
  )
}
