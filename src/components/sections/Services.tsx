import { motion } from 'framer-motion'
import { Code, Layers, Users, Plug, Cloud, Zap, ArrowUpRight } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { staggerContainer, staggerItem } from '../ui/AnimatedSection'
import { services } from '../../data/portfolio'

const iconMap: Record<string, React.ElementType> = {
  Code,
  Layers,
  Users,
  Plug,
  Cloud,
  Zap,
}

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white/0 dark:bg-transparent">
      <div className="container-max">
        <SectionHeader
          badge="Services"
          title="What I Provide"
          accentWord="Provide"
          subtitle="From architecture to deployment — end-to-end engineering solutions for enterprise products."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Code
            return (
              <motion.div
                key={service.number}
                variants={staggerItem}
                className="group card-base p-6 hover:border-theme dark:hover:border-theme hover:shadow-glow cursor-default"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-theme/10 border border-theme/20 flex items-center justify-center group-hover:bg-theme/20 transition-colors duration-300">
                    <Icon
                      size={22}
                      className="text-theme group-hover:-rotate-12 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-3xl font-black text-gray-100 dark:text-white/5 group-hover:text-theme/10 transition-colors duration-300 select-none">
                    {service.number}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base group-hover:text-theme transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-white/40 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-theme text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn more
                  <ArrowUpRight size={12} />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
