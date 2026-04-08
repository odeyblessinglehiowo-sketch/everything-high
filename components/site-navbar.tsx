import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/registration", label: "Registration" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#4a433f]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="relative inline-flex items-center">
          <div className="relative flex items-center">
            <Image
              src="/images/site-logo.png"
              alt="Everything High logo"
              width={82}
              height={82}
              className="absolute -left-18 top-1/2 h-16 w-16 -translate-y-1/2 object-contain opacity-38"
            />
            <span className="relative z-10 text-lg font-bold uppercase tracking-[0.3em] text-white transition duration-300 hover:text-[#d8ab86]">
              Everything High
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-semibold uppercase tracking-[0.24em] text-[#f8f4ef] transition duration-300 hover:text-[#d8ab86]"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#d8ab86] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <Link
          href="/registration"
          className="inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
        >
          Apply Now
        </Link>
      </div>
    </header>
  );
}