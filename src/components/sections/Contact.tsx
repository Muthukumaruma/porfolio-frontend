import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import ReCAPTCHA from 'react-google-recaptcha'
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import AnimatedSection from '../ui/AnimatedSection'
import { profile } from '../../data/portfolio'
import { useTheme } from '../../context/ThemeContext'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY

const contactItems = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
  { icon: MapPin, label: 'Location', value: profile.address },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/muthukumaru', href: profile.linkedin },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const { isDark } = useTheme()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setError(null)

    const captchaToken = recaptchaRef.current?.getValue()
    if (!captchaToken) {
      setError('Please complete the reCAPTCHA verification.')
      return
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          to_name: 'Muthukumar',
          'g-recaptcha-response': captchaToken,
        },
        { publicKey: PUBLIC_KEY },
      )
      setSent(true)
      reset()
      recaptchaRef.current?.reset()
      setTimeout(() => setSent(false), 6000)
    } catch (err: unknown) {
      const e = err as { text?: string; status?: number }
      console.error('EmailJS error:', err)
      recaptchaRef.current?.reset()
      setError(
        e?.text
          ? `Error: ${e.text}`
          : 'Failed to send message. Please try again or email directly.',
      )
    }
  }

  return (
    <section id="contact" className="section-padding bg-white/0 dark:bg-transparent">
      <div className="container-max">
        <SectionHeader
          badge="Contact"
          title="Get In Touch"
          accentWord="Touch"
          subtitle="Have a project in mind or want to discuss an opportunity? Let's connect."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <AnimatedSection direction="left" className="lg:col-span-2 space-y-4">
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="group card-base p-4 flex items-center gap-4 hover:border-theme/40 hover:shadow-glow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-theme/10 border border-theme/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-theme" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-white/30 mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-sm text-gray-700 dark:text-white/80 hover:text-theme transition-colors duration-300 font-medium"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-700 dark:text-white/80 font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection direction="right" className="lg:col-span-3">
            <div className="card-base p-6 md:p-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle size={48} className="text-theme mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 dark:text-white/50 text-sm">
                    Thank you for reaching out. I'll get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-white/50 mb-1.5">
                        Your Name
                      </label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-grey-dark border border-gray-200 dark:border-grey-dark-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 text-sm focus:outline-none focus:border-theme focus:ring-1 focus:ring-theme/30 transition-all duration-300"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-white/50 mb-1.5">
                        Email Address
                      </label>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
                        })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-grey-dark border border-gray-200 dark:border-grey-dark-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 text-sm focus:outline-none focus:border-theme focus:ring-1 focus:ring-theme/30 transition-all duration-300"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-white/50 mb-1.5">
                      Subject
                    </label>
                    <input
                      {...register('subject', { required: 'Subject is required' })}
                      placeholder="Project Discussion"
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-grey-dark border border-gray-200 dark:border-grey-dark-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 text-sm focus:outline-none focus:border-theme focus:ring-1 focus:ring-theme/30 transition-all duration-300"
                    />
                    {errors.subject && (
                      <p className="text-xs text-red-400 mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-white/50 mb-1.5">
                      Message
                    </label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-grey-dark border border-gray-200 dark:border-grey-dark-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 text-sm focus:outline-none focus:border-theme focus:ring-1 focus:ring-theme/30 transition-all duration-300 resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* reCAPTCHA */}
                  <div className="flex justify-start">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_KEY}
                      theme={isDark ? 'dark' : 'light'}
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      <AlertCircle size={15} className="flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-theme text-night font-semibold text-sm hover:bg-theme-dark transition-all duration-300 hover:shadow-glow disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-night/30 border-t-night rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send
                          size={15}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                        />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
