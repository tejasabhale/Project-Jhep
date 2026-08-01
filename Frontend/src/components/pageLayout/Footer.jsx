import { MapPin, Mail, Phone } from "lucide-react";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-orange-50">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Left */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-4">
              <img
                src="https://res.cloudinary.com/jwamgvca/image/upload/v1785234935/Project-Jhep-Logo_nsnlyc.png"
                alt="Project Jhep Logo"
                className="h-16 w-16 object-contain"
              />

              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Project <span className="text-orange-600">Jhep</span>
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Powered by Sprough Hub Foundation
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-xl leading-7 text-slate-600">
              Project Jhep empowers rural and underprivileged students to learn
              English through interactive lessons, engaging classroom
              activities, and accessible digital learning resources designed for
              schools and community learning centers.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="https://www.instagram.com/sproughub_foundation?igsh=bTd3Y25kb3hnOGlq"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-200 bg-white text-orange-600 shadow-sm transition hover:bg-orange-500 hover:text-white"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://www.youtube.com/@sproughubfoundation?si=PMuUjJ_QkZHugN8a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-200 bg-white text-orange-600 shadow-sm transition hover:bg-orange-500 hover:text-white"
              >
                <FaYoutube size={18} />
              </a>

              <a
                href="https://www.linkedin.com/company/sproughubfoundation/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-200 bg-white text-orange-600 shadow-sm transition hover:bg-orange-500 hover:text-white"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-lg font-semibold text-slate-800">
                Contact Us
              </h3>

              <div className="space-y-5">
                <a
                  href="https://maps.google.com/?q=Pune,Maharashtra,India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-slate-600 transition hover:text-orange-600"
                >
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-orange-600" />
                  <span>Pune, Maharashtra, India</span>
                </a>

                <a
                  href="mailto:projectjhep@gmail.com"
                  className="flex items-start gap-3 text-slate-600 transition hover:text-orange-600"
                >
                  <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-orange-600" />
                  <span>projectjhep@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-orange-200 pt-6 text-sm text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium">Sprough Hub Foundation</span>. All
            rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              to="/privacy-policy"
              className="transition hover:text-orange-600"
            >
              Privacy Policy
            </Link>

            <Link to="/tnc" className="transition hover:text-orange-600">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
