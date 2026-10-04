import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import { prefersReducedMotion } from "../../lib/motion";

/**
 * Tweens between numbers with GSAP. The text node is owned by GSAP (React
 * renders an empty span) so React never fights the tween over its content.
 */
export function AnimatedNumber({ value, duration = 0.8, className }) {
  const ref = useRef(null);
  const current = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (prefersReducedMotion()) {
      current.current = value;
      el.textContent = String(value);
      return undefined;
    }

    const state = { v: current.current };
    const tween = gsap.to(state, {
      v: value,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        current.current = state.v;
        el.textContent = String(Math.round(state.v));
      },
      onComplete: () => {
        current.current = value;
        el.textContent = String(value);
      },
    });

    return () => tween.kill();
  }, [value, duration]);

  return <span ref={ref} className={className} />;
}
