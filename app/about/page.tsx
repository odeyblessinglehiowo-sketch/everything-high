"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";

const highlights = [
  {
    title: "Runway Development",
    text: "Structured training focused on walk, movement, posture, and stage presence.",
  },
  {
    title: "Image & Grooming",
    text: "Build a refined visual identity through styling, confidence, and elegance coaching.",
  },
  {
    title: "Portfolio Direction",
    text: "Develop a stronger model presentation through photos, expression, and visual discipline.",
  },
  {
    title: "Confidence Building",
    text: "Learn to command attention with self-awareness, poise, and personal presence.",
  },
];

const galleryImages = [
  "/images/model1.jpg",
  "/images/model2.jpg",
  "/images/model3.jpg",
  "/images/model4.jpg",
  "/images/model5.jpg",
  "/images/model6.jpg",
  "/images/model7.jpg",
  "/images/model8.jpg",
];

const timeline = [
  {
    step: "01",
    title: "Apply",
    text: "Start with your registration, photo submission, and required application details.",
  },
  {
    step: "02",
    title: "Selection",
    text: "Each application is reviewed for potential, readiness, and alignment with the academy.",
  },
  {
    step: "03",
    title: "Training",
    text: "Selected applicants move into guided development focused on runway, confidence, and image.",
  },
  {
    step: "04",
    title: "Visibility",
    text: "Models are positioned for stronger presentation, portfolio growth, and meaningful opportunities.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#120a06] text-white">
      <SiteNavbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#2a170f_0%,#120a06_45%,#0b0503_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,155,117,0.12),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.04),transparent_18%)]" />

        <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-6"
          >
            <p className="text-xs font-medium uppercase tracking-[0.38em] text-[#c89b75]">
              About Everything High
            </p>

            <div className="flex items-start gap-4">
              <div className="mt-2 hidden md:flex flex-col gap-2">
                <span className="h-14 w-[3px] rounded-full bg-[#8a5a3b]" />
                <span className="ml-3 h-9 w-[3px] rounded-full bg-[#c89b75]" />
              </div>

              <h1 className="text-[2.3rem] font-black uppercase leading-[0.9] tracking-[-0.05em] md:text-[3.2rem] lg:text-[4.2rem]">
                Elegance,
                <span className="block text-[#c89b75]">Discipline</span>
                <span className="block">&amp; Identity</span>
              </h1>
            </div>

            <p className="max-w-xl text-base leading-8 text-[#eadfd6]">
              Everything High is a premium modelling academy built to refine
              beauty into presence, and turn confidence into something visible,
              memorable, and professional.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/registration"
                className="inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
              >
                Register Now
              </Link>

              <Link
                href="/gallery"
                className="inline-flex items-center justify-center rounded-full border border-[#6a432b] px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition duration-300 hover:border-[#c89b75] hover:bg-[#c89b75]/12 hover:text-[#f7ede4]"
              >
                View Gallery
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-[#8a5a3b]/20 blur-3xl md:block" />
            <div className="absolute -bottom-6 right-0 hidden h-32 w-32 rounded-full bg-[#c89b75]/10 blur-3xl md:block" />

            <div className="rounded-[2rem] border border-white/10 bg-[#1a0f0a]/90 p-4 shadow-2xl backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-[1.6rem]">
                <Image
                  src="/images/hero-1.jpg"
                  alt="Everything High about hero"
                  width={1100}
                  height={1400}
                  className="h-[420px] w-full object-cover object-top md:h-[560px] lg:h-[640px]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STORY */}
      <section className="bg-white text-[#1a0f0a]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1fr] lg:px-10">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -left-4 top-8 hidden h-24 w-24 rounded-full bg-[#c89b75]/15 blur-3xl md:block" />
            <div className="relative overflow-hidden rounded-[2.3rem] border border-[#eadfd6] bg-[#f8f5f2] p-3 shadow-lg">
              <div className="relative overflow-hidden rounded-[2rem]">
                <Image
                  src="/images/hero-2.jpg"
                  alt="Everything High story"
                  width={1000}
                  height={1300}
                  className="h-[520px] w-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#b08968]">
              Our Story
            </p>

            <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
              Where beauty meets structure, and confidence becomes identity.
            </h2>

            <p className="text-base leading-8 text-[#5a4a40]">
              Everything High is more than a modelling academy. It is a space
              designed to shape talent with intention, helping aspiring models
              develop presence, discipline, elegance, and stronger self-belief.
            </p>

            <p className="text-base leading-8 text-[#5a4a40]">
              We believe modelling is not only about appearance. It is also
              about movement, self-expression, preparation, and the confidence
              to stand out in rooms, on runways, and in front of the lens.
            </p>

            <p className="text-base leading-8 text-[#5a4a40]">
              Through structured development, polished presentation, and guided
              growth, Everything High helps models become more than visible.
              It helps them become unforgettable.
            </p>

            <Link
              href="/registration"
              className="inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-white"
            >
              Explore More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* MOVING SHOWCASE */}
      <section className="overflow-hidden bg-[#f8f5f2] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a5a3b]">
              In Motion
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#120a06] md:text-4xl">
              Presence that never stands still
            </h2>
          </div>

          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#f8f5f2] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#f8f5f2] to-transparent" />

            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 40,
                ease: "linear",
                repeat: Infinity,
              }}
              className="flex w-max gap-6"
            >
              {[...galleryImages, ...galleryImages].map((src, index) => (
                <div
                  key={index}
                  className="h-[280px] w-[220px] flex-shrink-0 overflow-hidden rounded-[1.5rem] border border-[#8a5a3b]/40 bg-white p-2"
                >
                  <Image
                    src={src}
                    alt={`Everything High model ${index + 1}`}
                    width={300}
                    height={420}
                    className="h-full w-full rounded-[1.1rem] object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="bg-[#120a06]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#c89b75]">
              What We Build
            </p>
            <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
              A fashion-focused experience built for serious growth.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-[1.8rem] border border-white/10 bg-[#1a0f0a] p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-[#c89b75]/50"
              >
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#dfd2c8]">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-white text-[#1a0f0a]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#b08968]">
              The Journey
            </p>
            <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
              How the Everything High process works
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {timeline.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-[1.8rem] border border-[#eadfd6] bg-[#f8f5f2] p-6 shadow-sm"
              >
                <p className="text-sm font-bold tracking-[0.25em] text-[#b08968]">
                  {item.step}
                </p>
                <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#6b5a50]">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f8f5f2]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#4b2e1f] to-[#2a170f] p-8 md:p-12">
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c89b75]/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl space-y-5 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#e7c4a7]">
                Begin Your Journey
              </p>
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                Step into a space where confidence is trained, refined, and
                seen.
              </h2>
              <p className="text-sm leading-7 text-[#f2e6dd] md:text-base">
                Start your application today and take your first step toward an
                elevated modelling experience with Everything High.
              </p>
              <div className="pt-2">
                <Link
                  href="/registration"
                  className="inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-8 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}