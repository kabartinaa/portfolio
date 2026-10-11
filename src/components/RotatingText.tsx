import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

interface RotatingTextProps {
  items: string[]
  className?: string
}

/** Cycles through short phrases. Screen readers get the full list once; reduced motion shows it statically. */
export default function RotatingText({ items, className }: RotatingTextProps) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % items.length), 2800)
    return () => window.clearInterval(id)
  }, [reduce, items.length])

  if (reduce) {
    return <p className={`text-brand ${className ?? ''}`}>{items.join(' · ')}</p>
  }

  return (
    <p className={className}>
      <span className="sr-only">{items.join(', ')}</span>
      <span className="relative block h-[1.6em] overflow-hidden" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={items[index]}
            className="text-brand absolute inset-0 block"
            initial={{ y: '60%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-60%', opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {items[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  )
}
