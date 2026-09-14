"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FadeIn({
  children,
  className,
  delay = 0,
  eager = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  eager?: boolean;
}) {
  const reduce = useReducedMotion();
  const skipMotion = Boolean(reduce || eager);

  return (
    <motion.div
      className={className}
      initial={skipMotion ? false : { opacity: 1, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: skipMotion ? 0 : 0.7, delay: skipMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? false : "hidden"}
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        reduce
          ? undefined
          : {
              hidden: { opacity: 1, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }
      }
    >
      {children}
    </motion.div>
  );
}
