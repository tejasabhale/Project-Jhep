// Shared motion tokens so every animation in the app feels like one system.
export const EASE = [0.22, 1, 0.36, 1];

export const SPRING = {
  type: "spring",
  stiffness: 420,
  damping: 36,
  mass: 0.8,
};

// Cap the stagger so long lists never feel slow.
export const staggerDelay = (index, step = 0.04, max = 8) =>
  Math.min(index, max) * step;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
