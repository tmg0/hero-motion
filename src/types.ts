export interface SpringTransition {
  delay: number
  repeat: number
  repeatDelay: number
  repeatType: 'loop' | 'mirror' | 'reverse'
  type: 'spring'
  stiffness: number
  damping: number
  mass: number
  bounce: number
  ease: string
}

export interface KeyframesTransition {
  delay: number
  repeat: number
  repeatDelay: number
  repeatType: 'loop' | 'mirror' | 'reverse'
  type: 'keyframes'
  duration: number
}

export type Transition = SpringTransition | KeyframesTransition
