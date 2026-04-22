"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/registration", label: "Registration" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#120a06]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/site-logo.png"
              alt="Everything High logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain opacity-80"
            />

            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-white">
              Everything High
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs font-semibold uppercase tracking-[0.28em] transition duration-300 ${
                    isActive
                      ? "text-[#c89b75]"
                      : "text-[#f3e9e2] hover:text-[#c89b75]"
                  }`}
                >
                  {link.label}

                  {/* ACTIVE LINE */}
                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] bg-[#c89b75] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <Link
            href="/registration"
            className="hidden md:inline-flex rounded-full bg-[#4b2e1f] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#c89b75] hover:text-[#120a06]"
          >
            Apply Now
          </Link>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden flex h-11 w-11 items-center justify-center rounded-full border border-white/20"
          >
            ☰
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-50 transition duration-500 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* BACKDROP */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 transition ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* PANEL */}
        <div
          className={`absolute right-0 top-0 h-full w-[75%] max-w-sm transform transition duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* BACKGROUND IMAGE */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero-1.jpg"
              alt="menu background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#120a06]/90" />
          </div>

          {/* CONTENT */}
          <div className="relative flex h-full flex-col px-6 py-8">

            {/* TOP */}
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.4em] text-[#c89b75]">
                Menu
              </p>

              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
              >
                ✕
              </button>
            </div>

            {/* LINKS */}
            <div className="mt-10 space-y-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block text-base uppercase tracking-[0.18em] transition ${
                      isActive
                        ? "text-[#c89b75]"
                        : "text-white hover:text-[#c89b75]"
                    }`}
                  >
                    {link.label}

                    {/* subtle divider */}
                    <div className="mt-3 h-[1px] w-full bg-white/10" />
                  </Link>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-auto pt-10">
              <Link
                href="/registration"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-[#c89b75] py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#120a06]"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}