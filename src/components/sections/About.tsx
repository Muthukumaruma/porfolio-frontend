import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Calendar, Globe, GraduationCap } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import AnimatedSection, { staggerContainer, staggerItem } from '../ui/AnimatedSection'
import { profile } from '../../data/portfolio'

const personalInfo = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
  { icon: MapPin, label: 'Location', value: profile.address },
  { icon: Calendar, label: 'Date of Birth', value: profile.dob },
  { icon: Globe, label: 'Languages', value: profile.languages.join(', ') },
]

export default function About() {
  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-white/[0.02]">
      <div className="container-max">
        <SectionHeader
          badge="About Me"
          title="Know More About Me"
          accentWord="Me"
          subtitle="A passionate technology leader dedicated to building scalable, enterprise-grade solutions."
        />

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — Summary + Info */}
          <div className="space-y-8">
            <AnimatedSection direction="left">
              <div className="space-y-4">
                {profile.summary.slice(0, 3).map((point, i) => (
                  <p key={i} className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">
                    {point}
                  </p>
                ))}
              </div>
            </AnimatedSection>

            {/* Personal Info */}
            <AnimatedSection delay={0.1}>
              <div className="card-base p-6">
                <h3 className="text-sm font-semibold tracking-widest uppercase text-theme mb-4">
                  Personal Info
                </h3>
                <div className="space-y-3">
                  {personalInfo.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-theme/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={14} className="text-theme" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-white/30 mb-0.5">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            className="text-sm text-gray-700 dark:text-white/80 hover:text-theme transition-colors duration-300"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-700 dark:text-white/80">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right — Education + Competencies + Soft Skills */}
          <div className="space-y-6">
            {/* Education */}
            <AnimatedSection direction="right">
              <div className="card-base p-6">
                <h3 className="text-sm font-semibold tracking-widest uppercase text-theme mb-4 flex items-center gap-2">
                  <GraduationCap size={16} />
                  Education
                </h3>
                <div className="space-y-4">
                  {profile.education.map((edu, i) => (
                    <div
                      key={i}
                      className="flex gap-4 pb-4 last:pb-0 border-b last:border-0 border-gray-100 dark:border-grey-dark"
                    >
                      <div className="w-10 h-10 rounded-xl bg-theme/10 border border-theme/20 flex items-center justify-center flex-shrink-0 text-theme font-bold text-sm">
                        {edu.year.slice(-2)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{edu.degree}</p>
                        <p className="text-xs text-gray-600 dark:text-white/40 mt-0.5">{edu.institution}</p>
                        <p className="text-xs text-theme mt-1 font-medium">{edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Core Competencies */}
            <AnimatedSection delay={0.1} direction="right">
              <div className="card-base p-6">
                <h3 className="text-sm font-semibold tracking-widest uppercase text-theme mb-4">
                  Core Competencies
                </h3>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2"
                >
                  {profile.coreCompetencies.map((comp) => (
                    <motion.span
                      key={comp}
                      variants={staggerItem}
                      className="px-3 py-1 rounded-lg bg-theme/10 border border-theme/20 text-theme text-xs font-medium hover:bg-theme/20 transition-colors duration-300 cursor-default"
                    >
                      {comp}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </AnimatedSection>

          </div>
        </div>

        {/* Bottom Row — Soft Skills + Industry Domains */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">

          {/* Soft Skills */}
          <AnimatedSection delay={0.15} direction="up">
            <div className="card-base p-6 h-full">
              <h3 className="text-sm font-semibold tracking-widest uppercase text-theme mb-5 flex items-center gap-2">
                <span className="w-5 h-px bg-theme" />
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.softSkills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    className="group flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-grey-dark-200 bg-gray-50 dark:bg-grey-dark hover:border-theme hover:bg-theme/5 transition-all duration-300 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-theme group-hover:scale-125 transition-transform duration-300" />
                    <span className="text-sm font-medium text-gray-700 dark:text-white/70 group-hover:text-theme transition-colors duration-300">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Industry Domains */}
          <AnimatedSection delay={0.2} direction="up">
            <div className="card-base p-6 h-full">
              <h3 className="text-sm font-semibold tracking-widest uppercase text-theme mb-5 flex items-center gap-2">
                <span className="w-5 h-px bg-theme" />
                Industry Domains
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {profile.domains.map((domain, i) => (
                  <motion.div
                    key={domain.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-grey-dark border border-gray-100 dark:border-grey-dark-200 hover:border-theme/50 hover:bg-theme/5 transition-all duration-300 cursor-default"
                  >
                    <span className="text-lg leading-none group-hover:scale-110 transition-transform duration-300">
                      {domain.icon}
                    </span>
                    <span className="text-xs font-semibold text-gray-700 dark:text-white/70 group-hover:text-theme transition-colors duration-300 leading-tight">
                      {domain.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
