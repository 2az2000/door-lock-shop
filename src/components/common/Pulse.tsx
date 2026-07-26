"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PulseProps {
  children: ReactNode;
  className?: string;
}

export function Pulse({ children, className }: PulseProps) {
  return (
    <motion.span
      className={className}
      animate={{ opacity: [1, 0.35, 1] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
}
