import { motion } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import AnimatedSection from '../ui/AnimatedSection'
import { skills } from '../../data/portfolio'

const categories = ['Frontend', 'Backend', 'Database', 'Cloud & DevOps', 'AI / LLM']

const categoryColors: Record<string, string> = {
  Frontend: 'from-cyan-500 to-blue-500',
  Backend: 'from-green-500 to-emerald-600',
  Database: 'from-orange-500 to-amber-500',
  'Cloud & DevOps': 'from-purple-500 to-indigo-500',
  'AI / LLM': 'from-pink-500 to-rose-500',
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-white/0 dark:bg-transparent">
      <div className="container-max">
        <SectionHeader
          badge="Skills"
          title="My Technical Skills"
          accentWord="Technical"
          subtitle="15+ years of hands-on expertise across the full modern web stack."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, ci) => {
            const catSkills = skills.filter((s) => s.category === category)
            const gradient = categoryColors[category] ?? 'from-theme to-blue-500'
            return (
              <AnimatedSection key={category} delay={ci * 0.1}>
                <div className="card-base p-6 h-full">
                  <div className="flex items-center gap-2 mb-5">
                    <div className={`w-2 h-5 rounded-full bg-gradient-to-b ${gradient}`} />
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">
                      {category}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {catSkills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm text-gray-700 dark:text-white/80 font-medium">
                            {skill.name}
                          </span>
                          <span className="text-xs text-theme font-semibold">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 dark:bg-grey-dark-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                            className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
