import { useInView } from '../../hooks/useInView'

export default function Reveal({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView(0.15)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}