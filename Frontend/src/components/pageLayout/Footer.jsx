import { MapPin, Mail, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SPROUG_HUB_URL = "https://www.sproughub.info/";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/sproughub_foundation?igsh=bTd3Y25kb3hnOGlq",
    icon: FaInstagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@sproughubfoundation?si=PMuUjJ_QkZHugN8a",
    icon: FaYoutube,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sproughubfoundation/?viewAsMember=true",
    icon: FaLinkedin,
  },
];

const QUICK_LINKS = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Privacy Policy",
    to: "/privacy-policy",
  },
  {
    label: "Terms & Conditions",
    to: "/tnc",
  },
];

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto",
  });
};

function FooterLink({ children, ...props }) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        props.onClick?.(event);

        if (!event.defaultPrevented) {
          scrollToTop();
        }
      }}
      className="group relative inline-flex w-fit items-center text-sm font-medium text-dark-muted transition-colors duration-200 hover:text-dark-text"
    >
      {children}

      <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-dark-bg text-dark-text">
      <div className="w-full border-b border-dark-surface">
        <div className="w-full px-6 py-16 md:px-10 lg:px-16 xl:px-20">
          <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.7fr_0.8fr_1fr]">
            {/* Brand */}
            <div className="max-w-2xl">
              <Link
                to="/"
                onClick={scrollToTop}
                className="group inline-flex items-center gap-3"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-dark-surface bg-dark-surface p-2 transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary-light">
                  <img
                    src="https://res.cloudinary.com/jwamgvca/image/upload/v1785234935/Project-Jhep-Logo_nsnlyc.png"
                    alt="Project Jhep Logo"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>
                  <h2 className="font-display text-2xl font-extrabold tracking-tight text-dark-text transition-colors duration-200 group-hover:text-primary">
                    Project <span className="text-primary">Jhep</span>
                  </h2>

                  <span className="mt-1 flex items-center gap-1 text-xs font-medium text-dark-muted transition-colors duration-200 group-hover:text-dark-text">
                    A Sproug Hub Foundation initiative
                    <ArrowUpRight
                      size={12}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>

              <p className="mt-6 max-w-xl text-sm leading-7 text-dark-muted md:text-base">
                Helping students build confidence in English through simple
                lessons, Marathi support, and accessible digital learning.
              </p>

              {/* Socials */}
              <div className="mt-8 flex gap-2.5">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex h-10 w-10 items-center justify-center rounded-xl border border-dark-surface bg-dark-surface text-dark-muted transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                Explore
              </p>

              <div className="mt-6 flex flex-col items-start gap-4">
                {QUICK_LINKS.map((link) => (
                  <FooterLink key={link.to} to={link.to}>
                    {link.label}
                  </FooterLink>
                ))}

                <a
                  href={SPROUG_HUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex w-fit items-center gap-1.5 text-sm font-medium text-dark-muted transition-colors duration-200 hover:text-dark-text"
                >
                  Sproug Hub Foundation
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-[calc(100%-18px)]" />
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                Get in touch
              </p>

              <div className="mt-6 space-y-5">
                {/* Address */}
                <a
                  href="https://maps.google.com/?q=97/7,Sukhwani+Residency,Udyam+Nagar,Pimpri,Pune,Maharashtra,411018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3 rounded-2xl transition-colors duration-200"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-dark-surface text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <MapPin
                      size={17}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </span>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-dark-muted">
                      Visit us
                    </p>

                    <p className="mt-1 text-sm leading-6 text-dark-text transition-colors duration-200 group-hover:text-primary">
                      Pimpri, Pune, Maharashtra
                      <br />
                      411018, India
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:projectjhep@gmail.com"
                  className="group flex gap-3 rounded-2xl transition-colors duration-200"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-dark-surface text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <Mail
                      size={17}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-dark-muted">
                      Email us
                    </p>

                    <p className="mt-1 break-all text-sm font-medium text-dark-text transition-colors duration-200 group-hover:text-primary">
                      projectjhep@gmail.com
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full">
        <div className="flex w-full flex-col gap-4 px-6 py-5 text-xs text-dark-muted md:flex-row md:items-center md:justify-between md:px-10 lg:px-16 xl:px-20">
          <p>
            © {new Date().getFullYear()}{" "}
            <a
              href={SPROUG_HUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative font-semibold text-dark-text transition-colors duration-200 hover:text-primary"
            >
              Sproug Hub Foundation
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
            . All rights reserved.
          </p>

          <p className="text-left md:text-right">
            Built with care for{" "}
            <Link
              to="/"
              onClick={scrollToTop}
              className="font-semibold text-primary transition-colors duration-200 hover:text-orange-300"
            >
              Project Jhep
            </Link>
          </p>
        </div>
      </div>

      {/* Accent Line */}
      <div className="h-1 w-full bg-primary" />
    </footer>
  );
}
