import { Github, ExternalLink } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'

const GITHUB_USERNAME = 'Muthukumaruma'

export default function GitHub() {
  return (
    <section id="github" className="section-padding bg-gray-50/50 dark:bg-white/[0.02]">
      <div className="container-max">
        <SectionHeader
          badge="Open Source"
          title="GitHub"
          accentWord="GitHub"
          subtitle="My public coding projects and open source contributions on GitHub."
        />

        <div className="flex justify-center">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group card-base px-6 py-4 flex items-center gap-3 hover:border-theme/40 hover:shadow-glow transition-all duration-300"
          >
            <Github size={22} className="text-gray-500 dark:text-white/50 group-hover:text-theme transition-colors" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">@{GITHUB_USERNAME}</p>
              <p className="text-xs text-gray-500 dark:text-white/40">View Profile</p>
            </div>
            <ExternalLink size={14} className="text-gray-400 dark:text-white/30 group-hover:text-theme ml-2 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  )
}
