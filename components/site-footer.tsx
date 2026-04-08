import Image from "next/image";
import Link from "next/link";
import {
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";

export default function SiteFooter() {
  return (
    <footer className="bg-[#0d0604] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-10">
        {/* Brand */}
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <Image
              src="/images/site-logo.png"
              alt="Everything High logo"
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
            />

            <div>
              <h3 className="text-xl font-semibold uppercase tracking-[0.22em] text-white">
                Everything High
              </h3>
              <p className="text-sm text-[#cdbfb3]">Modelling Academy</p>
            </div>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#cdbfb3]">
            A premium modelling academy focused on elegance, confidence,
            presence, and professional growth for aspiring models.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-5">
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c89b75]">
            Quick Links
          </h4>

          <div className="space-y-3 text-sm text-[#e6d9cf]">
            <Link href="/" className="block transition hover:text-[#c89b75]">
              Home
            </Link>
            <Link href="/about" className="block transition hover:text-[#c89b75]">
              About
            </Link>
            <Link
              href="/registration"
              className="block transition hover:text-[#c89b75]"
            >
              Registration
            </Link>
            <Link
              href="/gallery"
              className="block transition hover:text-[#c89b75]"
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              className="block transition hover:text-[#c89b75]"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Academy */}
        <div className="space-y-5">
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c89b75]">
            Academy
          </h4>

          <div className="space-y-3 text-sm text-[#e6d9cf]">
            <p>Runway Training</p>
            <p>Image Grooming</p>
            <p>Portfolio Development</p>
            <p>Confidence Building</p>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-5">
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c89b75]">
            Contact
          </h4>

          <div className="space-y-3 text-sm leading-7 text-[#e6d9cf]">
            <p>20 Monrovia Street, Wuse 2, Abuja</p>
            <p>hello@everythinghigh.com</p>
            <p>+234 812 676 9069</p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://wa.me/2340000000000"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#1a0f0a] text-lg text-white transition duration-300 hover:border-[#c89b75] hover:bg-[#4b2e1f]"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#1a0f0a] text-lg text-white transition duration-300 hover:border-[#c89b75] hover:bg-[#4b2e1f]"
            >
              <FaInstagram />
            </a>

            <a
              href="https://tiktok.com/"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#1a0f0a] text-lg text-white transition duration-300 hover:border-[#c89b75] hover:bg-[#4b2e1f]"
            >
              <FaTiktok />
            </a>

            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#1a0f0a] text-lg text-white transition duration-300 hover:border-[#c89b75] hover:bg-[#4b2e1f]"
            >
              <FaYoutube />
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#1a0f0a] text-lg text-white transition duration-300 hover:border-[#c89b75] hover:bg-[#4b2e1f]"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
         <div className="border-t border-white/10 py-5 text-center text-sm text-[#cdbfb3]">
    © 2026 Everything High. All rights reserved.
  </div>
      </div>
    </footer>
  );
}