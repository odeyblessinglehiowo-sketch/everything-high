"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type StatItem = {
  icon: string;
  value: number;
  suffix?: string;
  label: string;
  description: string;
};

const stats: StatItem[] = [
  {
    icon: "👠",
    value: 150,
    suffix: "+",
    label: "Models Trained",
    description:
      "Aspiring models refined through structured grooming, runway coaching, and confidence development.",
  },
  {
    icon: "📸",
    value: 50,
    suffix: "+",
    label: "Portfolio Shoots",
    description:
      "Professional photo sessions designed to build strong visual identity and industry-ready portfolios.",
  },
  {
    icon: "🎯",
    value: 30,
    suffix: "+",
    label: "Runway Events",
    description:
      "Fashion showcases and curated experiences focused on presence, visibility, and expression.",
  },
  {
    icon: "🌍",
    value: 10,
    suffix: "+",
    label: "Exposure Opportunities",
    description:
      "Access to meaningful platforms that position emerging models for growth and discovery.",
  },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

function useCountUp(target: number, shouldStart: boolean, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let start = 0;
    const increment = Math.max(1, Math.ceil(target / (duration / 16)));

    const timer = window.setInterval(() => {
      start += increment;

      if (start >= target) {
        setCount(target);
        window.clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => window.clearInterval(timer);
  }, [target, duration, shouldStart]);

  return count;
}

function StatCard({
  icon,
  value,
  suffix = "",
  label,
  description,
  shouldStart,
}: StatItem & { shouldStart: boolean }) {
  const count = useCountUp(value, shouldStart);

  const formatted = useMemo(() => {
    return `${count.toLocaleString()}${suffix}`;
  }, [count, suffix]);

  return (
    <div className="rounded-[1rem] md:rounded-[1.2rem] border border-[#eadfd6] bg-white p-4 md:p-8 text-center transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* ICON */}
      <div className="mx-auto mb-4 md:mb-6 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#f3e5d9] text-xl md:text-2xl">
        {icon}
      </div>

      {/* NUMBER */}
      <h3 className="heading-font text-[1.8rem] md:text-[2.6rem] lg:text-[3rem] tracking-[-0.02em] text-[#1a0f0a]">
        {formatted}
      </h3>

      {/* LABEL */}
      <p className="mt-2 md:mt-3 text-[9px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.3em] text-[#b08968]">
        {label}
      </p>

      {/* DESCRIPTION */}
      <p className="mx-auto mt-2 md:mt-4 max-w-xs text-[12px] md:text-[14px] leading-6 md:leading-7 text-[#6b5a50]">
        {description}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="bg-[#f8f5f2]">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-6 md:py-16 lg:px-10 lg:py-8">

        {/* HEADER */}
        <div className="mx-auto max-w-4xl text-center space-y-4 md:space-y-6">

          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.45em] text-[#b08968]">
            At A Glance
          </p>

          <h2 className="heading-font text-[1.9rem] leading-[1.15] md:text-[2.4rem] lg:text-[3.2rem] text-[#1a0f0a]">
            Built for visibility,
            <span className="block italic text-[#b08968]">
              refinement and real growth.
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-[13px] md:text-[15px] leading-6 md:leading-7 text-[#6b5a50]">
            Everything High goes beyond training. It shapes identity, builds confidence,
            and prepares you to step into opportunities with presence and purpose.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-10 md:mt-14 grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} shouldStart={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}