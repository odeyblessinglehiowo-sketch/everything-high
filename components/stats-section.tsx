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
      "Professional photo sessions designed to help talent build stronger visual presence and industry-ready portfolios.",
  },
  {
    icon: "🎯",
    value: 30,
    suffix: "+",
    label: "Runway Events",
    description:
      "Fashion showcases, training appearances, and curated model experiences focused on visibility and expression.",
  },
  {
    icon: "🌍",
    value: 10,
    suffix: "+",
    label: "Exposure Opportunities",
    description:
      "Access to meaningful opportunities that position emerging models for growth, discovery, and professional reach.",
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
    <div className="rounded-[1.9rem] border border-[#eadfd6] bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mx-auto mb-5 flex h-18 w-18 items-center justify-center rounded-full bg-[#f3e5d9] text-3xl">
        {icon}
      </div>

      <h3 className="text-4xl font-bold tracking-[-0.04em] text-[#1a0f0a] md:text-5xl">
        {formatted}
      </h3>

      <p className="mt-4 text-xl font-semibold text-[#4b2e1f]">{label}</p>

      <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-[#6b5a50]">
        {description}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="bg-[#f8f5f2]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-4xl space-y-4 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#b08968]">
            At A Glance
          </p>

          <h2 className="text-3xl font-semibold leading-tight text-[#1a0f0a] md:text-5xl">
            Built for visibility, refinement, and real modelling growth.
          </h2>

          <p className="mx-auto max-w-3xl text-base leading-8 text-[#6b5a50]">
            Everything High is designed to do more than train talent. It helps
            aspiring models build identity, gain confidence, and step into
            opportunities with stronger presence and professional readiness.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} shouldStart={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}