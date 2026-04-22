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
    <footer className="relative overflow-hidden bg-[#0d0604] text-white">

      {/* BACKGROUND TEXT */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-8 md:gap-12 opacity-[0.04]">
        {Array.from({ length: 5 }).map((_, i) => (
          <p
            key={i}
            className="text-[70px] md:text-[120px] font-semibold tracking-[0.25em] md:tracking-[0.3em] text-white whitespace-nowrap rotate-[-12deg]"
          >
            EVERYTHING HIGH
          </p>
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative mx-auto grid max-w-7xl gap-8 md:gap-10 px-5 py-12 md:px-6 md:py-16 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-10 lg:py-20">

        {/* BRAND */}
        <div className="space-y-4 md:space-y-5">
          <div className="flex items-center gap-3 md:gap-4">
            <Image
              src="/images/site-logo.png"
              alt="Everything High logo"
              width={56}
              height={56}
              className="h-12 w-12 md:h-14 md:w-14 object-contain"
            />

            <div>
              <h3 className="heading-font text-[16px] md:text-xl uppercase tracking-[0.2em] md:tracking-[0.25em]">
                Everything High
              </h3>
              <p className="text-[12px] md:text-sm italic text-[#c89b75]">
                Modelling Academy
              </p>
            </div>
          </div>

          <p className="max-w-md text-[13px] md:text-sm leading-6 md:leading-7 text-[#cdbfb3]">
            A premium modelling academy focused on elegance, confidence,
            presence, and professional growth for aspiring models.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="space-y-4 md:space-y-5">
          <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] md:tracking-[0.4em] text-[#c89b75]">
            Quick Links
          </h4>

          <div className="space-y-2 md:space-y-3 text-[13px] md:text-sm text-[#e6d9cf]">
            <Link href="/" className="block hover:text-[#c89b75]">Home</Link>
            <Link href="/about" className="block hover:text-[#c89b75]">About</Link>
            <Link href="/registration" className="block hover:text-[#c89b75]">Registration</Link>
            <Link href="/gallery" className="block hover:text-[#c89b75]">Gallery</Link>
            <Link href="/contact" className="block hover:text-[#c89b75]">Contact</Link>
          </div>
        </div>

        {/* ACADEMY */}
        <div className="space-y-4 md:space-y-5">
          <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] md:tracking-[0.4em] text-[#c89b75]">
            Academy
          </h4>

          <div className="space-y-2 md:space-y-3 text-[13px] md:text-sm text-[#e6d9cf]">
            <p>Runway Training</p>
            <p>Image Grooming</p>
            <p>Portfolio Development</p>
            <p>Confidence Building</p>
          </div>
        </div>

        {/* CONTACT */}
        <div className="space-y-4 md:space-y-5">
          <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] md:tracking-[0.4em] text-[#c89b75]">
            Contact
          </h4>

          <div className="space-y-2 md:space-y-3 text-[13px] md:text-sm leading-6 md:leading-7 text-[#e6d9cf]">
            <p>University of Abuja, Nigeria</p>
            <p>info@everythinghigh.com</p>
            <p>+234 812 676 9069</p>
          </div>

          {/* SOCIALS */}
          <div className="flex items-center gap-2 md:gap-3 pt-2">
            <a
              href="https://wa.me/2348126769069"
              target="_blank"
              className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-white/10 bg-[#1a0f0a] text-sm md:text-lg hover:border-[#c89b75] hover:bg-[#4b2e1f]"
            >
              <FaWhatsapp />
            </a>

            <a href="#" className="social"><FaInstagram /></a>
            <a href="#" className="social"><FaTiktok /></a>
            <a href="#" className="social"><FaYoutube /></a>
            <a href="#" className="social"><FaFacebookF /></a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="relative border-t border-white/10 py-4 md:py-6 text-center text-[12px] md:text-sm text-[#cdbfb3]">
        © 2026 Everything High. All rights reserved.
      </div>

      {/* SOCIAL STYLE */}
      <style jsx>{`
        .social {
          display: flex;
          height: 40px;
          width: 40px;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.1);
          background: #1a0f0a;
          transition: all 0.3s ease;
        }
        @media(min-width:768px){
          .social {
            height: 44px;
            width: 44px;
          }
        }
        .social:hover {
          border-color: #c89b75;
          background: #4b2e1f;
        }
      `}</style>

    </footer>
  );
}