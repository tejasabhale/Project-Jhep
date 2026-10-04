import { motion, useReducedMotion } from "framer-motion";
import { Link, Outlet, useLocation } from "react-router-dom";

const LOGO_URL =
  "https://res.cloudinary.com/jwamgvca/image/upload/v1785234935/Project-Jhep-Logo_nsnlyc.png";

const EASE = [0.22, 1, 0.36, 1];

/* Solid quarter-circle centered on a page corner, in --primary at low opacity */
function Arc({ className, cx, cy }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className={`pointer-events-none absolute h-44 w-44 md:h-64 md:w-64 ${className}`}
    >
      <circle
        cx={cx}
        cy={cy}
        r={170}
        className="fill-primary"
        fillOpacity="0.08"
      />
    </svg>
  );
}

/**
 * Route layout for all auth pages. Use it as a parent route:
 *   <Route element={<AuthLayout />}>
 *     <Route path="/login" element={<Login />} />
 *   </Route>
 * Pages render <AuthHeader /> / <AuthFooter /> themselves.
 */
export default function AuthLayout() {
  const reduce = useReducedMotion();
  const { pathname } = useLocation();

  /* Left panel: staggered entrance (plays once, since the layout stays mounted) */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.15 } },
  };

  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  /* Chalk-style "writing" reveal, like the hero blackboard */
  const write = (delay) => ({
    hidden: {
      clipPath: reduce ? "inset(-6px 0% -6px 0)" : "inset(-6px 100% -6px 0)",
    },
    show: {
      clipPath: "inset(-6px 0% -6px 0)",
      transition: {
        duration: reduce ? 0 : 1.1,
        delay: reduce ? 0 : delay,
        ease: "easeOut",
      },
    },
  });

  return (
    <main className="grid min-h-[100svh] w-full bg-background lg:grid-cols-2">
      {/* ===== Brand panel (desktop only) ===== */}
      <aside className="relative hidden min-h-[100svh] overflow-hidden bg-dark-bg text-dark-text lg:block">
        {/* Marathi letter watermarks: fade in, then drift very slowly */}
        <motion.span
          aria-hidden="true"
          lang="mr"
          initial={{ opacity: 0, x: reduce ? 0 : 40 }}
          animate={
            reduce ? { opacity: 1, x: 0 } : { opacity: 1, x: 0, y: [0, 16, 0] }
          }
          transition={{
            opacity: { duration: 1.2 },
            x: { duration: 1.2, ease: EASE },
            y: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          }}
          className="pointer-events-none absolute -right-10 -top-16 select-none font-display text-[24rem] font-extrabold leading-none text-white/[0.04]"
        >
          अ
        </motion.span>

        <motion.span
          aria-hidden="true"
          lang="mr"
          initial={{ opacity: 0, x: reduce ? 0 : -40 }}
          animate={
            reduce ? { opacity: 1, x: 0 } : { opacity: 1, x: 0, y: [0, -14, 0] }
          }
          transition={{
            opacity: { duration: 1.2, delay: 0.3 },
            x: { duration: 1.2, delay: 0.3, ease: EASE },
            y: { duration: 16, repeat: Infinity, ease: "easeInOut" },
          }}
          className="pointer-events-none absolute -bottom-24 -left-8 select-none font-display text-[18rem] font-extrabold leading-none text-primary/[0.08]"
        >
          आ
        </motion.span>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative flex min-h-[100svh] flex-col justify-between p-14 xl:p-20"
        >
          {/* Logo */}
          <motion.div variants={rise}>
            <Link to="/" className="flex w-fit items-center gap-3.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1.5 shadow-[var(--shadow-md)]">
                <img
                  src={LOGO_URL}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="font-display text-xl font-bold tracking-tight">
                Project <span className="text-primary">Jhep</span>
              </span>
            </Link>
          </motion.div>

          {/* Message */}
          <div className="max-w-lg">
            <motion.h2
              variants={write(0.4)}
              className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight xl:text-7xl"
            >
              Let&apos;s learn <span className="text-primary">English!</span>
            </motion.h2>

            {/* Orange bar grows from the left */}
            <motion.span
              variants={{
                hidden: { scaleX: reduce ? 1 : 0 },
                show: {
                  scaleX: 1,
                  transition: {
                    duration: 0.6,
                    delay: reduce ? 0 : 1.3,
                    ease: EASE,
                  },
                },
              }}
              className="mt-7 block h-1 w-24 origin-left rounded-full bg-primary"
            />

            <motion.p
              lang="mr"
              variants={write(1.7)}
              className="mt-7 font-display text-2xl font-semibold text-primary-light/90 xl:text-3xl"
            >
              चला इंग्रजी शिकूया
            </motion.p>
          </div>

          {/* Footer line */}
          <motion.p
            variants={rise}
            className="text-sm font-medium text-dark-muted"
          >
            Learn • Speak • Grow
          </motion.p>
        </motion.div>
      </aside>

      {/* ===== Form side: no box, corner arcs ===== */}
      <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-12 sm:px-10 lg:px-16">
        <Arc className="right-0 top-0" cx={200} cy={0} />
        <Arc className="bottom-0 left-0" cx={0} cy={200} />

        {/* key = pathname, so the form block fades in again on every auth route */}
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Mobile logo (the brand panel is hidden below lg) */}
          <div className="mb-5 text-center lg:hidden">
            <Link
              to="/"
              className="inline-flex items-center justify-center transition-opacity duration-200 hover:opacity-80"
            >
              <img
                src={LOGO_URL}
                alt="Project Jhep"
                className="h-16 w-16 object-contain"
              />
            </Link>
          </div>

          <Outlet />
        </motion.div>
      </div>
    </main>
  );
}
