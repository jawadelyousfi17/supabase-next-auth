// ============================================
// Apple-style Animation Component
// ============================================
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AppleAnimationProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AppleAnimation({
  children,
  delay = 0,
  className,
}: AppleAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.2,
        delay,
        ease: [0.4, 0, 0.2, 1], // Apple's signature cubic-bezier easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
