import AnimatedSection from './AnimatedSection'

interface Props {
  badge: string
  title: string
  accentWord: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({
  badge,
  title,
  accentWord,
  subtitle,
  align = 'center',
}: Props) {
  const idx = title.indexOf(accentWord)
  const before = idx >= 0 ? title.slice(0, idx) : title
  const after = idx >= 0 ? title.slice(idx + accentWord.length) : ''

  return (
    <AnimatedSection className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}>
      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-theme/10 text-theme border border-theme/20 mb-5">
        {badge}
      </span>
      <h2
        className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight ${
          align === 'center' ? 'text-center' : ''
        }`}
      >
        {before}
        <span className="text-theme">{accentWord}</span>
        {after}
      </h2>
      {subtitle && (
        <p
          className={`text-gray-600 dark:text-white/50 text-base max-w-2xl leading-relaxed ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  )
}
