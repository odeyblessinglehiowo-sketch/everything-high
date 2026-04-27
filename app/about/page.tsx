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

  {/* GRAIN TEXTURE */}
  <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('/images/grain.png')]" />

  {/* LIGHT GLOW */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,155,117,0.12),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.04),transparent_18%)]" />

  <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-8 px-6 py-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-5">

    {/* LEFT */}
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl space-y-5 md:space-y-6"
    >
      <p className="text-[11px] uppercase tracking-[0.38em] text-[#c89b75] text-center md:text-left">
        About Everything High
      </p>

      <div className="flex items-start justify-center gap-4 md:justify-start">
        {/* LINE */}
        <div className="mt-2 hidden md:flex flex-col gap-2">
          <span className="h-14 w-[3px] rounded-full bg-[#8a5a3b]" />
          <span className="ml-3 h-9 w-[3px] rounded-full bg-[#c89b75]" />
        </div>

        {/* HEADING (MATCH HOME STYLE) */}
      <h1 className="font-serif text-[2.3rem] leading-[1] tracking-[0.08em] text-white uppercase md:text-[3.2rem] lg:text-[4rem] text-center md:text-left">
  ELEGANCE,
  <span className="block text-[#c89b75]">DISCIPLINE</span>

  {/* CENTERED AMPERSAND */}
  <span className="block w-full text-center md:text-left">
    <span className="inline-block md:block md:text-center text-center">
      AND
    </span>
  </span>

  <span className="block">IDENTITY</span>
</h1>
      </div>

      <p className="max-w-xl text-[15px] leading-7 text-[#eadfd6] text-center md:text-left">
        Everything High is a premium modelling academy built to refine
        beauty into presence, and turn confidence into something visible,
        memorable, and professional.
      </p>

      {/* CTA */}
      <div className="flex flex-row justify-center gap-3 pt-2 md:justify-start">
        <Link
          href="/registration"
          className="inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
        >
          Register Now
        </Link>

        <Link
          href="/gallery"
          className="inline-flex items-center justify-center rounded-full border border-[#6a432b] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:border-[#c89b75] hover:bg-[#c89b75]/12 hover:text-[#f7ede4]"
        >
          View Gallery
        </Link>
      </div>
    </motion.div>

    {/* RIGHT (VIDEO CARD) */}
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.1 }}
      className="relative"
    >
      <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-[#8a5a3b]/20 blur-3xl md:block" />
      <div className="absolute -bottom-6 right-0 hidden h-32 w-32 rounded-full bg-[#c89b75]/10 blur-3xl md:block" />

      <div className="rounded-[2rem] border border-white/10 bg-[#1a0f0a]/90 p-3 md:p-4 shadow-2xl backdrop-blur-sm">
        <div className="relative overflow-hidden rounded-[1.4rem] md:rounded-[1.6rem]">
          
          <video
            src="/videos/herovid.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="h-[340px] w-full object-cover object-center md:h-[560px] lg:h-[640px]"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>
      </div>
    </motion.div>
  </div>
</section>

      {/* STORY */}
      <section className="bg-white text-[#1a0f0a]">
  <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:px-10">

    {/* TEXT SIDE (comes first on mobile) */}
    <motion.div
      initial={{ opacity: 0, x: 36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="order-1 space-y-5 lg:order-2"
    >
      <p className="text-[11px] uppercase tracking-[0.45em] text-[#b08968]">
        Our Story
      </p>

      {/* MATCHED HOMEPAGE FONT STYLE */}
      <h2 className="font-serif text-[2.2rem] leading-[1.05] tracking-[-0.02em] md:text-[3rem]">
        Where beauty meets structure,
        <span className="block italic text-[#b08968]">
          and confidence becomes identity.
        </span>
      </h2>

      {/* PERSONALIZED PARAGRAPH */}
      <p className="text-[15px] leading-7 text-[#5a4a40]">
        Everything High was founded by <strong>Zuleihat Yusuf Oyarazi</strong> in Abuja, a distinguished titleholder who has held crowns including BAIP Miss Teen International Nigeria, Miss Niger, Miss Kogi, Miss Universe Nigeria, Miss Akwa Ibom, Miss Corporate Nigeria, Best in Friendship, Miss Tourism 2024, and currently serves as State Director for the Miss Abuja Pageant.
      </p>

      {/* SHORT CLEAN SUMMARY */}
      <p className="text-[15px] leading-7 text-[#5a4a40]">
        Built on discipline, elegance, and intentional growth, Everything High shapes aspiring models into confident individuals who carry presence, purpose, and identity both on and off the runway.
      </p>

      {/* CTA */}
     <Link
  href="/registration"
  className="inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] !text-white transition duration-300 hover:bg-[#c89b75] hover:!text-white"
>
  Explore More
</Link>
    </motion.div>

    {/* IMAGE SIDE */}
    <motion.div
      initial={{ opacity: 0, x: -36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="order-2 relative lg:order-1"
    >
      {/* OUTER FRAME (like landing page) */}
      <div className="absolute -top-5 -left-5 hidden h-full w-full border border-[#d6c5b7] md:block" />

      {/* CARD */}
      <div className="relative h-full overflow-hidden rounded-[1rem] border border-[#eadfd6] bg-[#f8f5f2] p-3 shadow-lg">

       
                 <div className="relative h-full overflow-hidden rounded-[0.8rem]">
<video
            src="/videos/walk3.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="h-[420px] w-full object-cover object-top md:h-[520px] lg:h-[560px]"
          />
  
          {/* subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </div>
      </div>
    </motion.div>

  </div>
</section>

<section className="bg-[#120a06] text-white">
  <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">

    {/* HEADER */}
    <div className="mx-auto max-w-3xl space-y-4 text-center">
      <p className="text-[10px] uppercase tracking-[0.5em] text-[#c89b75] md:text-[11px]">
        Our Philosophy
      </p>

      <h2 className="font-serif text-[2rem] leading-[1.1] tracking-[-0.02em] md:text-[2.6rem] lg:text-[3rem]">
        We don’t just train models.
        <span className="block italic text-[#c89b75]">
          We build presence, identity, and power.
        </span>
      </h2>

      <p className="text-[13px] leading-6 text-[#d6c5b7] md:text-sm md:leading-7">
        Everything High is rooted in a deeper standard — one that goes beyond appearance,
        and focuses on how you carry yourself, how you’re seen, and how you’re remembered.
      </p>
    </div>

    {/* PILLARS */}
    <div className="mt-5 grid grid-cols-2 gap-4 md:mt-12 md:gap-6 md:grid-cols-4">

  {[
    {
      title: "Presence over appearance",
      text: "It’s not just about how you look. It’s about how you enter a room and leave an impression.",
    },
    {
      title: "Discipline over hype",
      text: "We focus on structure and consistency — because real confidence is built, not performed.",
    },
    {
      title: "Confidence with intention",
      text: "Every movement, every step, every expression is shaped with purpose.",
    },
    {
      title: "Identity over imitation",
      text: "We refine individuality, helping you discover and own your unique presence.",
    },
  ].map((item) => (
    <div
      key={item.title}
      className="group flex h-full flex-col justify-between rounded-[1rem] border border-white/10 bg-[#1a0f0a] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#c89b75]/50 md:p-6"
    >
      {/* TOP CONTENT */}
      <div>
        <h3 className="font-serif text-[1rem] leading-snug text-white md:text-[1.2rem]">
          {item.title}
        </h3>

        <p className="mt-2 text-[12px] leading-6 text-[#dfd2c8] md:mt-4 md:text-[14px] md:leading-7">
          {item.text}
        </p>
      </div>

      {/* BOTTOM LINE (ALWAYS ALIGNED) */}
      <div className="mt-4 h-[1px] w-8 bg-[#c89b75]/40 transition-all duration-300 group-hover:w-14 group-hover:bg-[#c89b75] md:mt-6 md:w-10 md:group-hover:w-16" />
    </div>
  ))}
</div>
  </div>
</section>


      <section className="bg-white text-[#1a0f0a]">
  <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-20">

    {/* HEADER */}
    <div className="mx-auto max-w-3xl space-y-3 text-center">
      <p className="text-[10px] uppercase tracking-[0.35em] text-[#b08968]">
        The Journey
      </p>

      <h2 className="font-serif text-[2rem] leading-tight md:text-5xl">
        How the Everything High process works
      </h2>
    </div>

    {/* CARDS */}
    <div className="mt-8 grid grid-cols-2 gap-4 md:mt-12 md:gap-6 md:grid-cols-2 xl:grid-cols-4">
      {timeline.map((item, index) => (
        <motion.div
          key={item.step}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: index * 0.08 }}
          className="rounded-[1.2rem] border border-[#eadfd6] bg-[#f8f5f2] p-4 text-center md:rounded-[1.8rem] md:p-6 md:text-left shadow-sm"
        >
          {/* STEP */}
          <p className="text-[11px] font-semibold tracking-[0.25em] text-[#b08968]">
            {item.step}
          </p>

          {/* TITLE */}
          <h3 className="mt-2 text-[1rem] font-semibold md:mt-4 md:text-2xl">
            {item.title}
          </h3>

          {/* TEXT */}
          <p className="mt-2 text-[12px] leading-6 text-[#6b5a50] md:mt-4 md:text-sm md:leading-7">
            {item.text}
          </p>
        </motion.div>
      ))}
    </div>

  </div>
</section>
<section className="bg-[#0b0503] text-white py-14">

  {/* FULL WIDTH WRAPPER */}
  <div className="w-full px-4 lg:px-10">

    {/* DESKTOP LAYOUT */}
    <div className="hidden lg:grid grid-cols-12 gap-6 items-center">

      {/* LEFT COLUMN */}
      <div className="col-span-3 flex flex-col gap-6">

        <div className="h-[180px] overflow-hidden rounded-[1rem]">
          <img src="/images/17.jpg" className="w-full h-full object-cover" />
        </div>

        <div className="h-[220px] overflow-hidden rounded-[1rem]">
          <img src="/images/10.jpeg" className="w-full h-full object-cover" />
        </div>

      </div>

      {/* CENTER VIDEO */}
<div className="col-span-6">

  <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">

    {/* BLURRED BACKGROUND */}
    <video
      src="/videos/Walk1.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40"
    />

    {/* MAIN VIDEO (FULL BODY) */}
    <video
      src="/videos/Walk1.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="relative w-full h-[520px] object-contain"
    />

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-black/20 pointer-events-none" />

  </div>

</div>

      {/* RIGHT COLUMN */}
      <div className="col-span-3 flex flex-col gap-6">

        <div className="h-[200px] overflow-hidden rounded-[1rem]">
          <img src="/images/21.jpg" className="w-full h-full object-cover" />
        </div>

        <div className="h-[160px] overflow-hidden rounded-[1rem]">
          <img src="/images/16.jpg" className="w-full h-full object-cover" />
        </div>

      </div>

    </div>

    {/* BOTTOM ROW (DESKTOP EXTRA FLOATING IMAGES) */}
    <div className="hidden lg:grid grid-cols-12 gap-6 mt-6">

      <div className="col-span-3 h-[180px] overflow-hidden rounded-[1rem]">
        <img src="/images/1.jpeg" className="w-full h-full object-cover" />
      </div>

      <div className="col-span-3 h-[140px] overflow-hidden rounded-[1rem]">
        <img src="/images/models2.jpg" className="w-full h-full object-cover" />
      </div>

      <div className="col-span-3 h-[220px] overflow-hidden rounded-[1rem]">
        <img src="/images/modelse6.jpg" className="w-full h-full object-cover" />
      </div>

      <div className="col-span-3 h-[160px] overflow-hidden rounded-[1rem]">
        <img src="/images/modela.jpg" className="w-full h-full object-cover" />
      </div>

    </div>

    {/* MOBILE VERSION (CLEAN STACK — VERY IMPORTANT) */}
    <div className="lg:hidden space-y-4">

  {/* VIDEO FIRST */}
  <div className="relative overflow-hidden rounded-[1.2rem]">

    {/* BLURRED BACKGROUND */}
    <video
      src="/videos/Walk1.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40"
    />

    {/* MAIN VIDEO */}
    <video
      src="/videos/Walk1.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="relative w-full h-[260px] object-contain"
    />

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-black/20 pointer-events-none" />

  </div>



      {/* GRID IMAGES */}
      <div className="grid grid-cols-2 gap-3">

        {[
          "/images/1.jpeg",
          "/images/12.jpeg",
          "/images/modelse6.jpg",
          "/images/modela.jpg",
        ].map((src, i) => (
          <div key={i} className="h-[140px] overflow-hidden rounded-[0.8rem]">
            <img src={src} className="w-full h-full object-cover" />
          </div>
        ))}

      </div>

    </div>

  </div>

</section>
<section className="bg-white text-[#1a0f0a]">
  <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">

    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center">

      {/* LEFT SIDE */}
      <div className="space-y-5 text-center lg:text-left">

        <p className="text-[10px] uppercase tracking-[0.45em] text-[#b08968] md:text-[11px]">
          The Experience
        </p>

        <h2 className="font-serif text-[2rem] leading-[1.08] tracking-[-0.02em] md:text-[2.8rem]">
          This is where transformation
          <span className="block italic text-[#b08968]">
            becomes visible.
          </span>
        </h2>

        <p className="mx-auto max-w-sm text-[13px] leading-6 text-[#6b5a50] md:max-w-md md:text-[14px] md:leading-7 lg:mx-0">
          Every moment inside Everything High is intentional — from how you walk,
          to how you carry yourself, to how you are seen when you step into a room.
          This is not just training. It’s refinement.
        </p>

      </div>

      {/* RIGHT SIDE */}
      <div className="grid gap-4 sm:grid-cols-2 md:gap-5">

        {[
          {
            title: "Runway Presence",
            text: "Learn how to walk with confidence, control, and signature identity.",
          },
          {
            title: "Confidence Development",
            text: "Build self-awareness, poise, and presence that commands attention.",
          },
          {
            title: "Image & Grooming",
            text: "Refine your look, posture, and presentation to industry standards.",
          },
          {
            title: "Real Exposure",
            text: "Step into real opportunities that position you for visibility and growth.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="
              group 
              rounded-[0.9rem] 
              border border-[#eadfd6] 
              bg-[#f8f5f2] 
              p-4
              transition duration-300 
              hover:-translate-y-1 
              hover:border-[#c89b75]/40

              sm:p-5
              lg:p-5
            "
          >
            <h3 className="font-serif text-[1rem] leading-snug text-[#1a0f0a] md:text-[1.1rem]">
              {item.title}
            </h3>

            <p className="mt-2 text-[12.5px] leading-6 text-[#6b5a50] md:mt-3 md:text-[13px]">
              {item.text}
            </p>

            <div className="mt-3 h-[1px] w-6 bg-[#b08968]/40 transition-all duration-300 group-hover:w-10 group-hover:bg-[#b08968] md:mt-4 md:w-8 md:group-hover:w-12" />
          </div>
        ))}
      </div>
    </div>

  </div>
  
</section>
      {/* CTA */}
<section className="bg-[#f8f5f2]">

  <div className="w-full px-4 py-14 md:px-6 md:py-20 lg:px-10">

    <div className="relative overflow-hidden rounded-[2.4rem] bg-gradient-to-r from-[#4b2e1f] to-[#2a170f] p-8 md:p-12">

      {/* ANIMATED GLOW */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute left-[20%] top-[30%] h-40 w-40 animate-pulse rounded-full bg-[#c89b75]/20 blur-[100px]" />
        <div className="absolute right-[10%] bottom-[20%] h-52 w-52 animate-pulse rounded-full bg-[#c89b75]/10 blur-[120px]" />
      </div>

      {/* SUBTLE GRAIN (optional but 🔥) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('/images/grain.png')]" />

      {/* CONTENT */}
      <div className="relative mx-auto max-w-3xl space-y-5 text-center">

        <p className="text-[11px] uppercase tracking-[0.45em] text-[#e7c4a7]">
          Begin Your Journey
        </p>

        <h2 className="font-serif text-[2.2rem] leading-[1.1] md:text-[2.8rem]">
          Step into a space where confidence is trained,
          <span className="block italic text-[#c89b75]">
            refined, and seen.
          </span>
        </h2>

        <p className="text-[13px] leading-6 text-[#f2e6dd] md:text-[15px] md:leading-7">
          Start your application today and take your first step toward an
          elevated modelling experience with Everything High.
        </p>

        {/* BUTTON */}
        <div className="pt-3">
          <Link
            href="/registration"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#4b2e1f] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
          >
            {/* LIGHT SWEEP */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition duration-700 group-hover:translate-x-full" />

            <span className="relative z-10">Apply Now</span>
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