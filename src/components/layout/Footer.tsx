import { Mail, Linkedin, Phone } from 'lucide-react'
import { profile } from '../../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-50/80 dark:bg-white/[0.03] backdrop-blur-sm border-t border-gray-100 dark:border-grey-dark py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-lg font-bold">
              <span className="text-theme">M</span>
              <span className="text-gray-900 dark:text-white">uthukumar</span>
              <span className="text-theme">.</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-white/40 mt-1">
              Lead Software Technologist & Solution Architect
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-grey-dark-200 text-gray-500 dark:text-white/50 hover:border-theme hover:text-theme transition-all duration-300"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-grey-dark-200 text-gray-500 dark:text-white/50 hover:border-theme hover:text-theme transition-all duration-300"
            >
              <Mail size={16} />
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-grey-dark-200 text-gray-500 dark:text-white/50 hover:border-theme hover:text-theme transition-all duration-300"
            >
              <Phone size={16} />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-grey-dark text-center">
          <p className="text-sm text-gray-400 dark:text-white/30">
            © {year} Muthukumar U. Built with React & TypeScript.
          </p>
        </div>
      </div>
    </footer>
  )
}
