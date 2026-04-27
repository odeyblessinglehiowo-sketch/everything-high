"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import StatsSection from "@/components/stats-section";
import {
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";

const faqs = [
  {
    question: "Who can apply to Everything High?",
    answer:
      "Everything High is open to aspiring models who want structured training, grooming, confidence development, runway exposure, and stronger personal expression.",
  },
  {
    question: "Do applicants need previous modelling experience?",
    answer:
      "No. Beginners are welcome. The academy is designed to help aspiring models develop confidence, presence, poise, and professional runway discipline.",
  },
  {
    question: "Will applicants submit photos and a catwalk video?",
    answer:
      "Yes. During registration, applicants will submit clear photos and a short catwalk video as part of the application review process.",
  },
  {
    question: "Is registration paid?",
    answer:
      "Yes. Applicants complete their registration payment during the application process before submission is marked complete.",
  },
];

const galleryImages = [
  
  "/images/1.jpeg",
  "/images/8.jpeg",
  "/images/models4.jpg",
  "/images/26.jpeg",
  "/images/12.jpeg",
  "/images/modelse6.jpg",
  "/images/modele5.jpg",
  "/images/23.jpg",
];


export default function Home() {
  /* =========================
     MODAL / MEDIA STATES
  ========================= */
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  /* =========================
     HERO ANIMATION STATES
  ========================= */
  const [heroScale, setHeroScale] = useState(1.06);
  const [heroShift, setHeroShift] = useState({ x: 0, y: 0 });
  const [orbPhase, setOrbPhase] = useState(0);

  /* =========================
     GALLERY
  ========================= */
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const loopImages = [...galleryImages, ...galleryImages];
  
  const [activeImage, setActiveImage] = useState(galleryImages[0]);


  /* =========================
     VIDEO CONTROL (ONLY ONE VIDEO)
  ========================= */
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };
useEffect(() => {
  if (activeVideo && modalVideoRef.current) {
    modalVideoRef.current.play().catch(() => {
      // fallback if browser blocks autoplay
    });
  }
}, [activeVideo]);
useEffect(() => {
  if (activeVideo && videoRef.current) {
    videoRef.current.pause();
  }
}, [activeVideo]);
  useEffect(() => {
    let animationFrame: number;
    const start = performance.now();

    const animate = (time: number) => {
      const t = (time - start) / 1000;
      setHeroScale(1.06 + Math.sin(t * 0.75) * 0.035);
      setOrbPhase(t);
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    const container = galleryRef.current;
    if (!container) return;

    let index = 0;
    const cardWidth = 244;

    const timer = window.setInterval(() => {
      index += 1;

      if (index >= galleryImages.length) {
        index = 0;
      }

      container.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }, 1700);

    return () => window.clearInterval(timer);
  }, []);

  function handleHeroMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 24;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    setHeroShift({ x, y });
  }

  function handleHeroLeave() {
    setHeroShift({ x: 0, y: 0 });
  }

  const floatingGlowStyleOne = useMemo(
    () => ({
      transform: `translate(${Math.sin(orbPhase * 0.9) * 28}px, ${
        Math.cos(orbPhase * 0.8) * 20
      }px)`,
    }),
    [orbPhase]
  );

  const floatingGlowStyleTwo = useMemo(
    () => ({
      transform: `translate(${Math.cos(orbPhase * 0.7) * 24}px, ${
        Math.sin(orbPhase * 0.95) * 22
      }px)`,
    }),
    [orbPhase]
  );

  return (
    <main className="min-h-screen bg-[#120a06] text-white">
      <SiteNavbar />

      {/* HERO */}
     <section className="relative overflow-hidden bg-black">

  {/* BACKGROUND */}
  <div className="absolute inset-0">
    <Image
      src="/images/hero-1.jpg"
      alt="Everything High hero background"
      fill
      priority
      className="object-cover object-center"
    />

    {/* DARK LUXURY OVERLAY */}
    <div className="absolute inset-0 bg-[#120a06]/85" />

    {/* SOFT GOLD LIGHT */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(200,155,117,0.12),transparent_40%)]" />
  </div>

  {/* CONTENT */}
  <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">

    {/* LEFT */}
    <div className="mx-auto max-w-2xl space-y-6 text-center lg:mx-0 lg:text-left">

      <p className="text-[11px] uppercase tracking-[0.4em] text-[#c89b75]">
        Everything High Modelling Academy
      </p>

      <h1 className="font-serif text-[2.3rem] leading-[1] tracking-[0.08em] text-white uppercase md:text-[3.2rem] lg:text-[4rem]">
        Where Confidence
        <span className="block text-[#c89b75]">Takes</span>
        <span className="block">The Runway</span>
      </h1>

      <p className="mx-auto max-w-xl text-[0.95rem] leading-7 text-[#e7d8cc] md:text-[1rem] lg:mx-0">
        Everything High is more than a modelling academy. It is a
        launchpad for bold self-expression, strong presence, and the
        kind of confidence that enters every room before you speak.
      </p>

      {/* CTA */}
      <div className="flex flex-row justify-center gap-4 pt-3 lg:justify-start">
        <Link
          href="/registration"
          className="inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#c89b75] hover:text-[#120a06]"
        >
          Register Now
        </Link>

        <Link
          href="/about"
          className="inline-flex items-center justify-center rounded-full border border-[#6a432b] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:border-[#c89b75] hover:bg-[#c89b75]/10"
        >
          Learn More
        </Link>
      </div>
    </div>

    {/* RIGHT IMAGE CARD */}
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">

      <div className="rounded-[1.2rem] border border-white/10 bg-[#1a0f0a]/80 p-3 shadow-xl backdrop-blur-sm">

        <div className="relative overflow-hidden rounded-[1rem]">
          <Image
            src="/images/hero1-new.jpg"
            alt="Everything High featured model"
            width={900}
            height={1100}
            className="h-[340px] w-full object-cover md:h-[420px] lg:h-[460px]"
            priority
          />
        </div>

        <div className="space-y-3 px-1 pt-4 text-center lg:text-left">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#c89b75]">
            Luxury. Poise. Expression.
          </p>

          <h2 className="font-serif text-[1.6rem] leading-tight text-white md:text-[1.8rem]">
            A premium platform for aspiring models.
          </h2>

          <p className="text-[0.85rem] leading-6 text-[#dfd2c8] md:text-sm">
            We train models, pageant queens, and everyday dreamers to walk
            tall, own every room, and turn the pavement into their
            personal runway.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ABOUT PREVIEW */}
      <section className="bg-white text-[#1a0f0a]">
  <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 lg:gap-12 lg:px-10 lg:py-20 lg:grid-cols-2">
    
    {/* IMAGE SIDE */}
    <div className="relative order-4 lg:order-1 mt-6 lg:mt-0">
      {/* BACK FRAME */}
      <div className="absolute -top-6 -left-6 h-full w-full border border-[#d6c5b7]" />

      {/* GOLD EDGE GLOW */}
      <div className="absolute inset-0 rounded-[0.6rem] border border-[#c89b75]/20" />

      {/* IMAGE CARD */}
      <div className="relative overflow-hidden rounded-[0.6rem] bg-[#f8f5f2] shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition duration-500 hover:-translate-y-2">
        
        <Image
          src="/images/models1.jpg"
          alt="About Everything High"
          width={900}
          height={1200}
          className="h-[420px] w-full object-cover object-top transition duration-700 hover:scale-[1.03] md:h-[560px]"
        />

        {/* DARK GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>
    </div>

    {/* TEXT SIDE */}
    <div className="space-y-5 order-1 lg:order-2">
      
      <p className="text-[11px] uppercase tracking-[0.4em] text-[#b08968]">
        About Everything High
      </p>

      <h2 className="heading-font text-[1.9rem] leading-[1.1] tracking-[-0.02em] md:text-[2.4rem] lg:text-[3rem]">
        More than a modelling academy.
        <span className="block text-[#b08968] italic">
          A launchpad for bold self-expression.
        </span>
      </h2>

      <p className="max-w-xl text-[0.92rem] leading-7 text-[#6b5a4f] md:text-[0.98rem] md:leading-8">
        Everything High trains models, pageant queens, and everyday
        dreamers to walk tall, own every room, and turn the pavement into
        their personal runway. Here, the only direction is up.
      </p>

      {/* CARDS */}
      <div className="grid grid-cols-2 gap-3 md:gap-5">
        
        <div className="rounded-[0.9rem] border border-[#e6dbd2] bg-[#f8f5f2] px-4 py-4 md:px-5 md:py-6 transition duration-300 hover:border-[#c89b75]/40">
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#b08968]">
            Our Mission
          </p>
          <p className="mt-2 text-[0.8rem] leading-6 text-[#6b5a4f] md:text-[0.92rem] md:leading-7">
            To equip aspiring models and young women with runway skills,
            stage presence, and branding tools that transform their walk
            into power.
          </p>
        </div>

        <div className="rounded-[0.9rem] border border-[#e6dbd2] bg-[#f8f5f2] px-4 py-4 md:px-5 md:py-6 transition duration-300 hover:border-[#c89b75]/40">
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#b08968]">
            Our Vision
          </p>
          <p className="mt-2 text-[0.8rem] leading-6 text-[#6b5a4f] md:text-[0.92rem] md:leading-7">
            To become Africa’s most influential modelling academy, where
            raw talent meets refined excellence and graduates leave with
            poise, posture, and purpose.
          </p>
        </div>

      </div>

      {/* CTA */}
      <div className="pt-2">
        <Link
          href="/about"
          className="w-full inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] !text-white transition duration-300 hover:bg-[#c89b75] hover:!text-[#120a06]"
        >
          Explore More
        </Link>
      </div>
    </div>

  </div>
</section>

  
    <section className="relative overflow-hidden bg-[#120a06] text-white py-12 md:py-6">

  {/* FLOATING IMAGES */}
  <div className="pointer-events-none absolute inset-0 hidden md:block">
    
    <div className="absolute left-10 top-10 w-[140px] animate-float opacity-60">
      <Image
        src="/images/models7.jpg"
        alt="model"
        width={200}
        height={260}
        className="rounded-[0.4rem] border border-[#c89b75]/30"
      />
    </div>

    <div className="absolute right-10 bottom-10 w-[150px] animate-float opacity-60">
      <Image
        src="/images/models2.jpg"
        alt="model"
        width={200}
        height={260}
        className="rounded-[0.4rem] border border-[#c89b75]/30"
      />
    </div>
  </div>

  <div className="relative mx-auto max-w-4xl px-6 text-center">

    {/* LABEL */}
    <p className="text-[10px] uppercase tracking-[0.45em] text-[#c89b75]">
      Beauty in Motion
    </p>

    {/* HEADING */}
    <h2 className="heading-font mt-3 text-[2rem] leading-[1.1] md:text-[2.5rem]">
      The walk. The presence.
      <span className="block italic text-[#c89b75]">
        The transformation.
      </span>
    </h2>

    {/* TEXT */}
    <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#d6c5b7]">
      Experience the discipline, confidence, and presence that define Everything High.
    </p>

    {/* VIDEO CARD */}
    <div
      onClick={() => setActiveVideo("/videos/sample-catwalkie.mp4")}
      className="group relative mx-auto mt-8 w-full max-w2xl cursor-pointer"
    >
      
      {/* FRAME */}
      <div className="absolute -top-3 -left-3 h-full w-full border border-[#c89b75]/40" />

      <div className="relative overflow-hidden rounded-[0.4rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        
        {/* VIDEO */}
        <video
          ref={videoRef}
          src="/videos/sample-catwalkie.mp4"
          muted
          loop
          autoPlay
          playsInline
          className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition duration-500" />

        {/* PLAY ICON */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md">
            ▶
          </div>
        </div>

        {/* PAUSE / PLAY BUTTON */}
        <button
          onClick={togglePlay}
          className="absolute bottom-4 right-4 rounded-full bg-black/50 px-4 py-2 text-xs uppercase tracking-wider text-white backdrop-blur hover:bg-black/70"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  </div>

  {/* MODAL */}
  {activeVideo && (
    
    <div
      onClick={() => setActiveVideo("/videos/sample-catwalkie.mp4")}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl"
      >
        <video
  ref={modalVideoRef}
  src={activeVideo}
  controls
  autoPlay
  playsInline
  className="w-full rounded-lg"
/>

        <button
          onClick={() => setActiveVideo("/videos/sample-catwalkie.mp4")}
          className="absolute -top-10 right-0 text-sm text-white/70 hover:text-white"
        >
          Close ✕
        </button>
        
      </div>
    </div>
  )}
</section>

      {/* BEAUTY IN MOTION */}
      <section className="bg-white py-20 overflow-hidden">
  <div className="mx-auto max-w-7xl px-6 lg:px-10">

    <div className="mb-12 text-center">
      <p className="text-[10px] uppercase tracking-[0.45em] text-[#8a5a3b]">
        Our Models
      </p>

      <h2 className="heading-font mt-4 text-[2.6rem] text-[#120a06]">
        Presence in Motion
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-sm text-[#6b5a50]">
        Every walk carries energy. Every frame captures attitude.
      </p>
    </div>

    <div className="relative overflow-hidden">

      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="flex gap-6 animate-runway w-max">

        {loopImages.map((src, index) => (
          <button
            key={index}
            onClick={() => setLightboxImage(src)}
            className={`group h-[320px] w-[230px] flex-shrink-0 overflow-hidden rounded-[1rem] border border-[#8a5a3b]/40 bg-[#f8f5f2] p-2 transition duration-300 hover:-translate-y-3 hover:shadow-xl zigzag-${index % 6}`}
          >
            <Image
              src={src}
              alt={`Model ${index}`}
              width={320}
              height={460}
              className="h-full w-full rounded-[0.8rem] object-cover transition duration-500 group-hover:scale-[1.05]"
            />
          </button>
        ))}
      </div>
    </div>
  </div>
</section>

<section className="relative overflow-hidden py-5 md:py-3 text-[#120a06]">

  {/* BACKGROUND IMAGE */}
  <div className="absolute inset-0">
    <Image
      src="/images/10.jpeg"
      alt="Programs background"
      fill
      className="object-cover scale-100 animate-heroZoom"
      priority
    />
  </div>

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-[#f8f5f2]/85 backdrop-blur-[2px]" />

  {/* CONTENT */}
  <div className="relative mx-auto max-w-7xl px-5 md:px-6 lg:px-10">

    {/* HEADER */}
    <div className="mb-10 md:mb-16 text-center">
      <p className="text-[10px] uppercase tracking-[0.4em] md:tracking-[0.45em] text-[#8a5a3b]">
        Our Programs
      </p>

      <h2 className="heading-font mt-3 md:mt-4 text-[2rem] leading-[1.1] md:text-[2.8rem] lg:text-[3.4rem]">
        Where talent becomes
        <span className="block italic text-[#b08968]">
          presence
        </span>
      </h2>

      <p className="mx-auto mt-3 md:mt-4 max-w-xl text-[13px] md:max-w-2xl md:text-sm leading-6 md:leading-7 text-[#6b5a50]">
        Every program is designed to refine not just how you walk, but how you
        carry yourself, command attention, and leave a lasting impression.
      </p>
    </div>

    {/* GRID */}
    <div className="grid gap-4 md:gap-8 lg:grid-cols-3">

      {/* FEATURED */}
      <div className="group col-span-1 border border-[#e6ddd6] bg-white/90 p-5 md:p-8 backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl lg:col-span-2">

        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.35em] md:tracking-[0.4em] text-[#8a5a3b]">
          Signature Program
        </p>

        <h3 className="heading-font mt-3 md:mt-4 text-[1.4rem] md:text-2xl lg:text-3xl">
          Runway & Catwalk Mastery
        </h3>

        <p className="mt-3 md:mt-4 max-w-lg text-[13px] md:text-sm leading-6 md:leading-7 text-[#6b5a50]">
          Learn the art of walking with intention. From posture to pacing,
          transitions to turns, this program builds a runway presence that
          commands attention and defines identity.
        </p>

        <div className="mt-4 md:mt-6 grid gap-2 md:gap-3 text-[12px] md:text-sm text-[#5a4a40] md:grid-cols-2">
          <p>• Walk techniques & posture</p>
          <p>• Signature turns & transitions</p>
          <p>• Stage confidence training</p>
          <p>• Live runway simulation</p>
        </div>
      </div>

      {/* SIDE CARDS */}
      <div className="space-y-4 md:space-y-6">

        <div className="border border-[#e6ddd6] bg-white/90 p-4 md:p-6 backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:shadow-lg">
          <h4 className="heading-font text-[1rem] md:text-lg">
            Image Grooming
          </h4>
          <p className="mt-1 md:mt-2 text-[12px] md:text-sm text-[#6b5a50]">
            Develop a polished personal image aligned with industry standards.
          </p>
        </div>

        <div className="border border-[#e6ddd6] bg-white/90 p-4 md:p-6 backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:shadow-lg">
          <h4 className="heading-font text-[1rem] md:text-lg">
            Portfolio Development
          </h4>
          <p className="mt-1 md:mt-2 text-[12px] md:text-sm text-[#6b5a50]">
            Build a portfolio that captures your identity and versatility.
          </p>
        </div>

        <div className="border border-[#e6ddd6] bg-white/90 p-4 md:p-6 backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:shadow-lg">
          <h4 className="heading-font text-[1rem] md:text-lg">
            Confidence & Presence
          </h4>
          <p className="mt-1 md:mt-2 text-[12px] md:text-sm text-[#6b5a50]">
            Master body language, expression, and powerful presence.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="relative bg-white py-14 md:py-20">
  <div className="mx-auto max-w-7xl px-5 md:px-6 lg:px-10">

    {/* HEADER */}
    <div className="mb-10 md:mb-12 text-center">
      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.45em] text-[#8a5a3b]">
        Testimonials
      </p>

      <h2 className="heading-font mt-3 md:mt-4 text-[1.9rem] leading-[1.15] text-[#120a06] md:text-[2.4rem] lg:text-[2.8rem]">
        The confidence speaks for itself
      </h2>
    </div>

    {/* CARDS */}
    <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">

      {[
        {
          name: "Amara",
          role: "Model Trainee",
          image: "/images/models8.jpg",
          text: "I walked in unsure of myself. Now I own every room I step into."
        },
        {
          name: "Chioma",
          role: "Pageant Queen",
          image: "/images/modelse6.jpg",
          text: "They didn’t just teach me how to walk — they changed how I carry myself."
        },
        {
          name: "Michael",
          role: "Runway Model",
          image: "/images/26.jpeg",
          text: "Everything High gave me presence. Not just confidence — presence."
        },
        {
          name: "Ada",
          role: "Student Model",
          image: "/images/2.jpeg",
          text: "From posture to mindset, everything about me transformed."
        }
      ].map((item, index) => (
        <div
          key={index}
          className="group relative rounded-[1rem] md:rounded-[1.2rem] border border-[#e6ddd6] bg-[#f8f5f2] p-4 md:p-6 text-center transition duration-500 hover:-translate-y-2 hover:shadow-lg"
        >
          {/* IMAGE */}
          <div className="mx-auto -mt-10 md:-mt-12 mb-3 md:mb-4 h-12 w-12 md:h-16 md:w-16 overflow-hidden rounded-full border-4 border-white shadow-md">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* NAME */}
          <h4 className="heading-font text-[0.9rem] md:text-base text-[#120a06]">
            {item.name}
          </h4>

          {/* ROLE */}
          <p className="text-[9px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-[#8a5a3b]">
            {item.role}
          </p>

          {/* TEXT */}
          <p className="mt-2 md:mt-3 text-[0.8rem] md:text-sm leading-5 md:leading-6 text-[#6b5a50]">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

    <section className="bg-[#120a06] text-white py-14 md:py-20">
  <div className="mx-auto max-w-7xl px-5 md:px-6 lg:px-10">

    <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-[0.4fr_0.6fr]">

      {/* LEFT (CTA TEXT) */}
      <div className="space-y-5 text-center lg:text-left">
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.45em] md:tracking-[0.5em] text-[#c89b75]">
          Begin Your Journey
        </p>

        <h2 className="heading-font text-[2rem] leading-[1.1] md:text-[2.6rem] lg:text-[3.2rem]">
          Step into the version
          <span className="block italic text-[#c89b75]">
            of you that owns
          </span>
          every room.
        </h2>

        <p className="mx-auto max-w-sm text-[0.9rem] leading-6 text-[#d6c5b7] md:max-w-md md:text-[15px] md:leading-7 lg:mx-0">
          This isn’t just training. It’s transformation. From your walk to your
          presence, everything shifts the moment you step in.
        </p>

        {/* CTA BUTTON */}
        <button className="mt-3 inline-flex items-center justify-center rounded-full bg-[#c89b75] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#120a06] transition duration-300 hover:bg-white">
          Apply Now
        </button>
      </div>

      {/* RIGHT (VIDEO) */}
      <div
        onClick={() => setActiveVideo("/videos/train.mp4")}
        className="group relative cursor-pointer mt-4 lg:mt-0"
      >
        {/* FRAME OFFSET */}
        <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 h-full w-full border border-[#c89b75]/40" />

        {/* VIDEO */}
        <div className="relative overflow-hidden rounded-[1rem] shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
          <video
            src="/videos/train.mp4"
            muted
            loop
            autoPlay
            playsInline
            className="h-[260px] md:h-[380px] lg:h-[480px] w-full object-cover transition duration-700 group-hover:scale-[1.05]"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition duration-500" />

          {/* PLAY ICON */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md transition group-hover:scale-110">
              ▶
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* MODAL (unchanged) */}
  {activeVideo && (
    <div
      onClick={() => setActiveVideo(null)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-6"
    >
      <div className="relative w-full max-w-5xl">
        <video
          src={activeVideo}
          controls
          autoPlay
          className="w-full rounded-lg"
        />

        <button
          onClick={() => setActiveVideo(null)}
          className="absolute -top-10 right-0 text-sm text-white/70 hover:text-white"
        >
          Close ✕
        </button>
      </div>
    </div>
  )}
</section>
  

      <StatsSection />

      {/* WHY JOIN */}
      <section className="bg-[#120a06] text-white">
  <div className="mx-auto max-w-7xl px-5 py-12 md:px-6 md:py-16 lg:px-10 lg:py-10">

    {/* HEADER */}
    <div className="max-w-2xl space-y-5 text-center lg:text-left">
      <p className="text-[10px] md:text-[11px] uppercase tracking-[0.45em] md:tracking-[0.5em] text-[#c89b75]">
        Why Join
      </p>

      <h2 className="heading-font text-[2rem] leading-[1.15] md:text-[2.5rem] lg:text-[3.2rem]">
        A premium modelling
        <span className="block italic text-[#c89b75]">
          experience built for
        </span>
        serious growth.
      </h2>
    </div>

    {/* CARDS */}
    <div className="mt-10 md:mt-14 grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4">
      {[
        {
          title: "Confidence Training",
          text: "Develop poise, self-awareness, and presence that speaks before you do.",
        },
        {
          title: "Runway Development",
          text: "Refine your walk, posture, and movement with structured guidance.",
        },
        {
          title: "Image & Grooming",
          text: "Master presentation, elegance, and personal style identity.",
        },
        {
          title: "Exposure & Opportunity",
          text: "Step into real opportunities that position you for growth and visibility.",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="group rounded-[1rem] md:rounded-[1.1rem] border border-white/10 bg-[#1a0f0a] p-4 md:p-7 transition duration-300 hover:-translate-y-1 hover:border-[#c89b75]/50 hover:shadow-[0_20px_60px_rgba(200,155,117,0.08)]"
        >
          <h3 className="heading-font text-[1rem] md:text-[1.2rem] leading-snug text-white">
            {item.title}
          </h3>

          <p className="mt-3 md:mt-4 text-[12px] md:text-[14px] leading-6 md:leading-7 text-[#dfd2c8]">
            {item.text}
          </p>

          {/* underline */}
          <div className="mt-4 md:mt-6 h-[1px] w-8 md:w-10 bg-[#c89b75]/40 transition-all duration-300 group-hover:w-14 md:group-hover:w-16 group-hover:bg-[#c89b75]" />
        </div>
      ))}
    </div>

    {/* CTA */}
    <div className="mt-10 md:mt-16 flex justify-center">
      <Link
        href="/registration"
        className="inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-8 md:px-10 py-3 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.22em] md:tracking-[0.25em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
      >
        Register Now
      </Link>
    </div>
  </div>
</section>

<section className="border-t border-[#eadfd6] bg-white">
  <div className="mx-auto max-w-7xl px-5 py-5 md:px-6 md:py-12 lg:px-10 lg:py-2">

    {/* HEADER */}
    <div className="max-w-xl space-y-3">
      <p className="text-[10px] md:text-[11px] uppercase tracking-[0.45em] md:tracking-[0.5em] text-[#b08968]">
        From Our
      </p>

      <h2 className="heading-font text-[2rem] leading-[1.1] md:text-[2.6rem] lg:text-[3.2rem] text-[#1a0f0a]">
        Studios.
      </h2>
    </div>

    {/* GRID */}
    <div className="mt-8 md:mt-12 grid gap-4 md:gap-6 lg:grid-cols-[1.4fr_1fr]">

      {/* BIG IMAGE */}
      <div
        onClick={() => setLightboxImage(activeImage)}
        className="group relative cursor-pointer overflow-hidden rounded-[1rem] md:rounded-[1.2rem] h-full min-h-[300px] md:min-h-[420px] lg:min-h-[520px]"
      >
        <Image
          src={activeImage}
          alt="Featured model"
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300" />
      </div>

      {/* SMALL GRID */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {galleryImages
          .slice(1, 7)
          .map((src, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(src)}
              className={`group relative overflow-hidden rounded-[0.8rem] md:rounded-[1rem] ${
                activeImage === src
                  ? "ring-2 ring-[#c89b75]"
                  : ""
              } ${index >= 4 ? "hidden md:block" : ""}`}  // 👈 hides last 2 on mobile
            >
              <Image
                src={src}
                alt={`Gallery ${index}`}
                width={500}
                height={600}
                className="h-[140px] md:h-[200px] lg:h-[250px] w-full object-cover transition duration-500 group-hover:scale-[1.05]"
              />

              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300" />
            </button>
          ))}
      </div>
    </div>

    {/* BUTTON */}
    <div className="mt-10 md:mt-14 flex justify-center">
      <a
        href="/gallery"
        className="inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-7 md:px-8 py-3 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.22em] md:tracking-[0.25em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
      >
        View Gallery
      </a>
    </div>
  </div>

  {/* LIGHTBOX */}
  {lightboxImage && (
    <div
      onClick={() => setLightboxImage(null)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full"
      >
        <Image
          src={lightboxImage}
          alt="Preview"
          width={1200}
          height={1400}
          className="w-full rounded-lg"
        />
      </div>
    </div>
  )}
</section>
{/* CTA */}
    <section className="relative overflow-hidden bg-gradient-to-r from-[#4b2e1f] to-[#2a170f] py-10 md:py-15">

  {/* SOFT GLOW */}
  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] md:h-[300px] md:w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c89b75]/10 blur-[100px] md:blur-[120px]" />
  </div>

  {/* CONTENT */}
  <div className="relative mx-auto max-w-4xl px-5 md:px-6 text-center text-white">

    {/* LABEL */}
    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.45em] md:tracking-[0.5em] text-[#e7c4a7]">
      Begin Your Journey
    </p>

    {/* HEADING */}
    <h2 className="heading-font mt-3 md:mt-4 text-[2rem] leading-[1.15] md:text-[2.6rem] lg:text-[3.2rem]">
      Step into a space where confidence is trained,
      <span className="block italic text-[#c89b75]">
        refined, and seen.
      </span>
    </h2>

    {/* TEXT */}
    <p className="mx-auto mt-4 md:mt-6 max-w-xl text-[13px] md:text-sm leading-6 md:leading-7 text-[#f2e6dd]">
      Start your application today and take your first step toward an elevated modelling experience with Everything High.
    </p>

    <p className="mt-2 md:mt-3 text-[13px] md:text-sm text-[#e7d9cf]">
      Applications are now open for aspiring models ready to grow with confidence.
    </p>

    {/* BUTTON */}
    <div className="mt-5 md:mt-8">
      <Link
        href="/registration"
        className="inline-flex items-center justify-center rounded-full bg-[#c89b75] px-8 md:px-10 py-3 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.22em] md:tracking-[0.25em] text-[#120a06] transition duration-300 hover:bg-white"
      >
        Apply Now
      </Link>
    </div>
  </div>
</section>

      {/* FAQ */}
      <section className="relative bg-[#f8f5f2] overflow-hidden">

  <div className="grid lg:grid-cols-[1.1fr_1fr] items-center">

    {/* LEFT IMAGE */}
    <div className="relative h-[300px] md:h-[500px] lg:h-[650px]">

      <Image
        src="/images/12.jpeg"
        alt="Everything High model"
        fill
        className="object-cover"
      />

      {/* SLANTED CUT */}
      <div className="absolute top-0 right-0 h-full w-[80px] md:w-[120px] bg-[#f8f5f2] skew-x-[-10deg] md:skew-x-[-12deg] origin-top" />
    </div>

    {/* RIGHT CONTENT */}
    <div className="px-5 py-12 md:px-6 md:py-16 lg:px-16 lg:py-20">

      {/* HEADER */}
      <div className="space-y-3 md:space-y-4 text-center lg:text-left">
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.45em] md:tracking-[0.5em] text-[#b08968]">
          FAQ
        </p>

        <h2 className="heading-font text-[2rem] leading-[1.15] md:text-[2.4rem] lg:text-[2.8rem] text-[#1a0f0a]">
          Frequently Asked
          <span className="block italic text-[#c89b75]">
            Questions
          </span>
        </h2>

        <p className="max-w-md mx-auto lg:mx-0 text-[13px] md:text-sm leading-6 md:leading-7 text-[#6b5a50]">
          Everything you need to know before stepping into the experience.
          Clear, simple, and straight to the point.
        </p>
      </div>

      {/* FAQ LIST */}
      <div className="mt-6 md:mt-10 space-y-3 md:space-y-4">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded-[1rem] md:rounded-[1.2rem] border border-[#eadfd6] bg-white px-4 py-3 md:px-5 md:py-4 transition duration-300 open:border-[#c89b75]"
          >
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between gap-3 md:gap-4 text-[13px] md:text-base font-medium text-[#1a0f0a]">
                {faq.question}

                <span className="text-[#c89b75] transition group-open:rotate-45 text-base md:text-lg">
                  +
                </span>
              </div>
            </summary>

            <p className="mt-3 text-[12px] md:text-sm leading-6 md:leading-7 text-[#6b5a50]">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  </div>
</section>
      {/* MAP */}
     <section className="bg-white overflow-hidden">

  {/* HEADER */}
  <div className="px-5 pt-10 pb-6 md:px-6 md:pt-14 md:pb-8 text-center">
    <p className="text-[10px] uppercase tracking-[0.45em] text-[#b08968]">
      Visit Us
    </p>

    <h2 className="heading-font text-[1.9rem] leading-[1.15] md:text-[2.4rem] text-[#1a0f0a]">
      Find Everything
      <span className="block italic text-[#c89b75]">
        High
      </span>
    </h2>

    <p className="mt-2 text-[13px] text-[#6b5a50]">
      University of Abuja, Abuja, Nigeria
    </p>
  </div>

  {/* MAIN GRID */}
  <div className="grid lg:grid-cols-2">

    {/* LEFT */}
    <div className="bg-[#efe3d6] px-5 py-8 md:px-12 md:py-12">

      <div className="max-w-md space-y-5 md:space-y-6">

        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#b08968]">
            Contact Information
          </p>

          <h3 className="heading-font mt-2 text-[1.5rem] leading-[1.2] md:text-[1.9rem] text-[#1a0f0a]">
            Let’s start a meaningful
            <span className="block italic text-[#c89b75]">
              conversation.
            </span>
          </h3>

          <p className="mt-2 text-[13px] leading-6 text-[#6b5a50]">
            We welcome inquiries about training, partnerships, and everything
            related to your modelling journey.
          </p>
        </div>

        {/* CONTACT ITEMS */}
        <div className="space-y-3">

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#b08968]">
              ✉
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#b08968]">
                Email
              </p>
              <p className="text-[13px] text-[#1a0f0a]">
                Everythingthing03@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#b08968]">
              ☎
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#b08968]">
                Phone
              </p>
              <p className="text-[13px] text-[#1a0f0a]">
                +234 812 676 9069
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#b08968]">
              📍
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#b08968]">
                Location
              </p>
              <p className="text-[13px] text-[#1a0f0a]">
                University of Abuja, Nigeria
              </p>
            </div>
          </div>

        </div>

        {/* SOCIALS */}
        <div className="flex items-center gap-3 pt-2">

          <a
            href="https://wa.me/2348126769069"
            target="_blank"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a0f0a] text-white hover:bg-[#4b2e1f] transition"
          >
            <FaWhatsapp />
          </a>

          <a
            href="#"
            target="_blank"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a0f0a] text-white hover:bg-[#4b2e1f] transition"
          >
            <FaInstagram />
          </a>

          <a
            href="#"
            target="_blank"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a0f0a] text-white hover:bg-[#4b2e1f] transition"
          >
            <FaTiktok />
          </a>

          <a
            href="#"
            target="_blank"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a0f0a] text-white hover:bg-[#4b2e1f] transition"
          >
            <FaYoutube />
          </a>

          <a
            href="#"
            target="_blank"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a0f0a] text-white hover:bg-[#4b2e1f] transition"
          >
            <FaFacebookF />
          </a>

        </div>

      </div>

    </div>

    {/* RIGHT - MAP */}
    <div className="h-[240px] md:h-[360px] lg:h-full">

      <iframe
        title="Everything High Location Map"
        src="https://www.google.com/maps?q=University%20of%20Abuja&output=embed"
        className="h-full w-full"
        style={{ border: 0 }}
        loading="lazy"
      />

    </div>

  </div>
</section>
      <SiteFooter />

      {/* LIGHTBOX */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#120a06] p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute right-5 top-5 z-10 rounded-full bg-[#4b2e1f] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
            >
              Close
            </button>

            <Image
              src={lightboxImage}
              alt="Expanded gallery view"
              width={1400}
              height={1600}
              className="max-h-[82vh] w-auto rounded-[1.4rem] object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}