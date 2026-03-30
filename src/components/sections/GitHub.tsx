import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, GitFork, ExternalLink, Github, Code2 } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { staggerContainer, staggerItem } from '../ui/AnimatedSection'

const GITHUB_USERNAME = 'Muthukumaruma'

interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  homepage: string | null
  fork: boolean
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Go: '#00ADD8',
  Rust: '#dea584',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Shell: '#89e051',
}

export default function GitHub() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`)
      .then((r) => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then((data: Repo[]) => {
        // Filter out forked repos, show own repos first
        const own = data.filter((r) => !r.fork)
        setRepos(own)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  return (
    <section id="github" className="section-padding bg-gray-50/50 dark:bg-white/[0.02]">
      <div className="container-max">
        <SectionHeader
          badge="Open Source"
          title="GitHub Repositories"
          accentWord="GitHub"
          subtitle="My public coding projects and open source contributions on GitHub."
        />

        {/* GitHub Stats Cards */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
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

        {/* Repo Cards */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card-base p-5 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-grey-dark rounded w-2/3 mb-3" />
                <div className="h-3 bg-gray-200 dark:bg-grey-dark rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 dark:bg-grey-dark rounded w-4/5" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-gray-400 dark:text-white/30 py-10">
            Could not load repositories. Visit{' '}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-theme underline"
            >
              github.com/{GITHUB_USERNAME}
            </a>{' '}
            directly.
          </p>
        )}

        {!loading && !error && repos.length === 0 && (
          <p className="text-center text-gray-400 dark:text-white/30 py-10">
            No public repositories yet.
          </p>
        )}

        {!loading && !error && repos.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {repos.map((repo) => (
              <motion.a
                key={repo.id}
                variants={staggerItem}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group card-base p-5 flex flex-col gap-3 hover:border-theme/40 hover:shadow-glow transition-all duration-300"
              >
                {/* Repo name */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Code2 size={15} className="text-theme shrink-0 mt-0.5" />
                    <span className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-theme transition-colors duration-300 break-all">
                      {repo.name}
                    </span>
                  </div>
                  <ExternalLink size={13} className="text-gray-400 dark:text-white/30 group-hover:text-theme shrink-0 mt-0.5 transition-colors" />
                </div>

                {/* Description */}
                <p className="text-xs text-gray-500 dark:text-white/40 leading-relaxed flex-1">
                  {repo.description || 'No description provided.'}
                </p>

                {/* Topics */}
                {repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {repo.topics.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full bg-theme/10 text-theme text-[10px] font-medium border border-theme/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer: language + stars + forks */}
                <div className="flex items-center gap-4 pt-1 border-t border-gray-100 dark:border-grey-dark">
                  {repo.language && (
                    <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/40">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: LANG_COLORS[repo.language] ?? '#8b8b8b' }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-white/40 ml-auto">
                    <Star size={11} />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-white/40">
                    <GitFork size={11} />
                    {repo.forks_count}
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* View all link */}
        {!loading && !error && repos.length > 0 && (
          <div className="text-center mt-8">
            <a
              href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-grey-dark-200 text-gray-700 dark:text-white/70 text-sm font-semibold hover:border-theme hover:text-theme transition-all duration-300"
            >
              <Github size={16} />
              View All Repositories
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
