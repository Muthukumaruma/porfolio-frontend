import { useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ExternalLink, Tag, ChevronLeft, ChevronRight, Lock, WifiOff, X, LayoutTemplate, Github, FileText, Briefcase, Smartphone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import { projects } from '../../data/portfolio'

const filters = ['All', 'Featured', 'AI Tools', 'Enterprise', 'Media', 'eCommerce']

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const [archModal, setArchModal] = useState<string | null>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filtered = projects.filter((p) => {
    if (active === 'All') return true
    if (active === 'Featured') return p.featured
    return p.category === active
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  // Reset carousel on filter change
  const handleFilter = (f: string) => {
    setActive(f)
    setSelectedIndex(0)
    setTimeout(() => emblaApi?.scrollTo(0, true), 0)
  }

  // Update dot on slide change
  if (emblaApi) emblaApi.on('select', onSelect)

  return (
    <section id="portfolio" className="section-padding bg-gray-50 dark:bg-white/[0.02]">
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
              onClick={() => handleFilter(f)}
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

        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-white/30 py-10">
            No projects in this category.
          </p>
        ) : (
          <div className="relative">
            {/* Carousel viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {filtered.map((project) => (
                  <div
                    key={project.title}
                    className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  >
                    <div className="group card-base overflow-hidden hover:border-theme/40 hover:shadow-glow h-full">
                      {/* Project Image */}
                      <div className="relative h-48 overflow-hidden">
                        {project.image ? (
                          <img
                            src={project.image.startsWith('http') ? project.image : `${import.meta.env.BASE_URL}${project.image}`}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${project.gradient}`} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            project.featured ? 'bg-theme text-night' : 'bg-white/20 text-white'
                          }`}>
                            {project.featured ? '★ Featured' : project.category}
                          </span>
                        </div>
                        {'archDiagram' in project && project.archDiagram && (
                          <div className="absolute inset-0 bg-night/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                            <button
                              onClick={(e) => { e.stopPropagation(); setArchModal(project.archDiagram as string) }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 border border-white/30 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
                            >
                              <LayoutTemplate size={12} />
                              Architecture
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base mb-3 group-hover:text-theme transition-colors duration-300">
                          {project.title}
                        </h3>

                        <ul className="space-y-1.5 mb-4">
                          {'role' in project && project.role && (
                            <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-white/70 font-medium">
                              <Briefcase size={13} className="text-theme mt-0.5 shrink-0" />
                              {project.role}
                            </li>
                          )}
                          <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-white/40 leading-relaxed">
                            <Tag size={13} className="text-theme mt-0.5 shrink-0" />
                            {project.description}
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-white/40">
                            <Tag size={13} className="text-theme mt-0.5 shrink-0" />
                            {project.tags.join(' + ')}
                          </li>
                        </ul>

                        <ul className="space-y-1.5 border-t border-gray-100 dark:border-grey-dark-200 pt-3">
                          {project.link ? (
                            <li>
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-white/70 hover:text-theme transition-colors"
                              >
                                <ExternalLink size={13} />
                                {project.linkLabel}
                              </a>
                            </li>
                          ) : project.linkLabel === 'Private Project' ? (
                            <li className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 dark:text-white/30">
                              <Lock size={13} />
                              Private Project
                            </li>
                          ) : (
                            <li className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 dark:text-white/30">
                              <WifiOff size={13} />
                              No Longer Available
                            </li>
                          )}
                          {'playStore' in project && project.playStore && (
                            <li>
                              <a
                                href={project.playStore as string}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-white/70 hover:text-theme transition-colors"
                              >
                                <Smartphone size={13} />
                                Play Store
                              </a>
                            </li>
                          )}
                          {'github' in project && project.github && (
                            <li>
                              <a
                                href={project.github as string}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-white/70 hover:text-theme transition-colors"
                              >
                                <Github size={13} />
                                GitHub
                              </a>
                            </li>
                          )}
                          {'caseStudy' in project && project.caseStudy && (
                            <li>
                              <a
                                href={project.caseStudy as string}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-white/70 hover:text-theme transition-colors"
                              >
                                <FileText size={13} />
                                Case Study
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prev / Next buttons */}
            <button
              onClick={scrollPrev}
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white dark:bg-metal border border-gray-200 dark:border-grey-dark shadow-md flex items-center justify-center text-gray-600 dark:text-white/70 hover:border-theme hover:text-theme transition-all duration-300 z-10"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white dark:bg-metal border border-gray-200 dark:border-grey-dark shadow-md flex items-center justify-center text-gray-600 dark:text-white/70 hover:border-theme hover:text-theme transition-all duration-300 z-10"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === selectedIndex
                      ? 'w-6 h-2 bg-theme'
                      : 'w-2 h-2 bg-gray-300 dark:bg-grey-dark-200 hover:bg-theme/50'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Architecture Diagram Modal */}
      <AnimatePresence>
        {archModal && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setArchModal(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setArchModal(null)}
                className="absolute -top-4 -right-4 z-10 w-9 h-9 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-white hover:border-theme hover:text-theme transition-all"
              >
                <X size={16} />
              </button>
              <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
                <div className="bg-gray-900 px-5 py-3 flex items-center gap-2 border-b border-gray-700">
                  <LayoutTemplate size={15} className="text-theme" />
                  <span className="text-white text-sm font-semibold">CodeSense AI — Architecture Diagram</span>
                </div>
                <img
                  src={`${import.meta.env.BASE_URL}${archModal}`}
                  alt="Architecture Diagram"
                  className="w-full object-contain bg-gray-950 max-h-[75vh]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
