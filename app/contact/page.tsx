"use client";

import { useState } from "react";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form);
    alert("Message sent successfully!");
  };

  return (
    <main className="min-h-screen bg-[#120a06] text-white">
          <SiteNavbar />

      {/* HERO (MATCHES GALLERY STYLE) */}
      <section className="relative h-[60vh] flex items-center justify-center text-center">
        <img
  src="/images/12.jpeg"
  className="absolute inset-0 w-full h-full object-cover object-[center_40%] md:object-[center_24%]"
/>
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 px-4 text-white">
          <h1 className="font-serif text-[2.5rem] md:text-[4rem]">
            Get In Touch
          </h1>
          <p className="mt-3 text-sm md:text-base opacity-90 max-w-xl mx-auto">
            Whether you're ready to start your journey or have questions,
            we're here to guide you.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="bg-[#efe3d6]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 grid gap-12 md:grid-cols-2">

          {/* FORM */}
          <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-[1.5rem] border border-[#eadfd6] shadow-sm">

            <h2 className="font-serif text-[1.6rem] mb-6 text-[#1a0f0a]">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-[#d6c5b7] p-3 rounded-lg outline-none focus:border-[#4b2e1f] placeholder:text-[#1a0f0a]"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-[#d6c5b7] p-3 rounded-lg outline-none focus:border-[#4b2e1f] placeholder:text-[#1a0f0a]"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-[#d6c5b7] p-3 rounded-lg outline-none focus:border-[#4b2e1f] placeholder:text-[#1a0f0a]"
              />

              <button
                type="submit"
                className="w-full rounded-full bg-[#4b2e1f] py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
              >
                Send Message
              </button>

            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="flex flex-col justify-center space-y-6">

            <p className="text-[11px] uppercase tracking-[0.5em] text-[#b08968]">
              Contact Information
            </p>

            <h2 className="font-serif text-[2rem] leading-tight text-[#1a0f0a]">
              Let’s connect and build something powerful.
            </h2>

            <div className="space-y-4 text-sm text-[#5a4a40]">

              <div>
                <p className="font-semibold text-[#1a0f0a]">📍 Address</p>
                <p>University of Abuja, Nigeria</p>
              </div>

              <div>
                <p className="font-semibold text-[#1a0f0a]">📧 Email</p>
                <p>Everythingthing03@gmail.com</p>
              </div>

              <div>
                <p className="font-semibold text-[#1a0f0a]">⏰ Hours</p>
                <p>Mon - Fri: 9AM - 6PM</p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FULL WIDTH MAP */}
      <section className="w-full h-[400px]">
        <iframe
          src="https://maps.google.com/maps?q=University%20of%20Abuja&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </section>

      {/* CTA */}
      <section className="bg-[#efe3d6] text-center py-10 px-6">

        <h2 className="font-serif text-[2rem] md:text-[2.5rem] mb-4 text-[#1a0f0a]">
          Start Your Journey Today
        </h2>

        <p className="max-w-xl mx-auto text-sm md:text-base text-[#5a4a40] mb-6">
          Step into a space where confidence is trained, refined, and seen.
        </p>

        <Link
          href="/registration"
          className="inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-8 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
        >
          Apply Now
        </Link>

      </section>

      <SiteFooter />
    </main>
  );
}