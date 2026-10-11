import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { scrollToTop } from '../hooks/scrollToTop'
import { useScrolled } from '../hooks/useScrolled'

/** Floating shortcut that appears after the first screen of scrolling. */
export default function BackToTop() {
  const visible = useScrolled(700)

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-5 right-5 z-30 inline-flex size-12 items-center justify-center rounded-full border border-line-strong bg-surface-2/90 text-ink shadow-lg shadow-black/40 backdrop-blur transition hover:border-blue-soft sm:bottom-7 sm:right-7"
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
