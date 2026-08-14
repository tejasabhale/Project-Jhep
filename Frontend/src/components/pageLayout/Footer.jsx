import { MapPin, Mail, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SPROUG_HUB_URL = "https://www.sproughub.org/";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-orange-100">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            inset-0
            opacity-[0.18]
            [background-image:radial-gradient(#f97316_0.6px,transparent_0.6px)]
            [background-size:24px_24px]
          "
        />

        <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-orange-100/50 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-72 w-72 rounded-full bg-orange-50/70 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange-100 bg-orange-50 p-1.5">
                <img
                  src="https://res.cloudinary.com/jwamgvca/image/upload/v1785234935/Project-Jhep-Logo_nsnlyc.png"
                  alt="Project Jhep Logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Project <span className="text-orange-500">Jhep</span>
                </h2>

                <a
                  href={SPROUG_HUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-slate-500 transition hover:text-orange-500"
                >
                  Powered by Sproug Hub Foundation
                </a>
              </div>
            </div>

            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-500">
              Empowering rural and underprivileged students through accessible
              English education and digital learning resources.
            </p>

            <div className="mt-5 flex gap-2.5">
              <a
                href="https://www.instagram.com/sproughub_foundation?igsh=bTd3Y25kb3hnOGlq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  flex h-9 w-9 items-center justify-center rounded-lg
                  border border-slate-200 bg-white text-slate-500
                  shadow-sm transition
                  hover:border-orange-200 hover:bg-orange-500 hover:text-white
                "
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="https://www.youtube.com/@sproughubfoundation?si=PMuUjJ_QkZHugN8a"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="
                  flex h-9 w-9 items-center justify-center rounded-lg
                  border border-slate-200 bg-white text-slate-500
                  shadow-sm transition
                  hover:border-orange-200 hover:bg-orange-500 hover:text-white
                "
              >
                <FaYoutube size={16} />
              </a>

              <a
                href="https://www.linkedin.com/company/sproughubfoundation/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  flex h-9 w-9 items-center justify-center rounded-lg
                  border border-slate-200 bg-white text-slate-500
                  shadow-sm transition
                  hover:border-orange-200 hover:bg-orange-500 hover:text-white
                "
              >
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">Quick Links</h3>

            <div className="mt-4 flex flex-col items-start gap-2.5 text-sm">
              <Link
                to="/"
                className="text-slate-500 transition hover:text-orange-500"
              >
                Home
              </Link>

              <Link
                to="/privacy-policy"
                className="text-slate-500 transition hover:text-orange-500"
              >
                Privacy Policy
              </Link>

              <Link
                to="/tnc"
                className="text-slate-500 transition hover:text-orange-500"
              >
                Terms & Conditions
              </Link>

              <a
                href={SPROUG_HUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-500 transition hover:text-orange-500"
              >
                Sproug Hub Foundation
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">Get in Touch</h3>

            <div className="mt-4 space-y-3">
              <a
                href="https://maps.google.com/?q=97/7,Sukhwani+Residency,Udyam+Nagar,Pimpri,Pune,Maharashtra,411018"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  p-2
                  -ml-2
                  transition
                  hover:bg-orange-50
                "
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500 group-hover:bg-orange-100">
                  <MapPin size={16} />
                </span>

                <div>
                  <p className="text-xs font-medium text-slate-400">Address</p>

                  <p className="mt-0.5 text-xs leading-5 text-slate-600">
                    Pimpri, Pune, Maharashtra
                    <br />
                    411018, India
                  </p>
                </div>
              </a>

              <a
                href="mailto:projectjhep@gmail.com"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  p-2
                  -ml-2
                  transition
                  hover:bg-orange-50
                "
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500 group-hover:bg-orange-100">
                  <Mail size={16} />
                </span>

                <div>
                  <p className="text-xs font-medium text-slate-400">Email</p>

                  <p className="mt-0.5 text-xs font-medium text-slate-600 transition group-hover:text-orange-500">
                    projectjhep@gmail.com
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-5 text-xs text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()}{" "}
            <a
              href={SPROUG_HUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-600 transition hover:text-orange-500"
            >
              Sproug Hub Foundation
            </a>
            . All rights reserved.
          </p>

          <p className="text-center sm:text-right">
            Empowering education through{" "}
            <span className="font-medium text-orange-500">Project Jhep</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
