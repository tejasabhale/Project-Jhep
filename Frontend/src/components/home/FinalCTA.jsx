import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Reveal from "../ui/Reveal";

export default function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="w-full px-6 py-20 md:py-24">
      <Reveal>
        <div className="w-full border-y border-orange-100 bg-[#FFF8F2] px-7 py-14 text-center sm:px-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{
                color: "#C2410C",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Every Child Deserves a Chance to Learn
            </p>

            <h2
              className="mt-5 text-3xl font-semibold leading-tight md:text-[2.7rem] md:leading-[1.15]"
              style={{
                color: "#17213B",
                fontFamily: "'Fraunces', serif",
              }}
            >
              A Little Practice Today,
              <br className="hidden sm:block" />
              <span style={{ color: "#EA580C" }}>
                {" "}
                A More Confident Tomorrow.
              </span>
            </h2>

            <p
              className="mx-auto mt-5 max-w-2xl text-sm leading-7 md:text-base"
              style={{
                color: "#667085",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Help children build the confidence to speak, understand, and use
              English in their everyday lives.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#F97316] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EA580C] hover:shadow-md active:scale-[0.98]"
              style={{
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Start Learning
              <ArrowRight
                size={17}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <p
              className="mt-5 text-xs"
              style={{
                color: "#98A2B3",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Learn at your own pace. Grow with confidence.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
