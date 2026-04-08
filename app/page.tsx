import Image from "next/image";
import Link from "next/link";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import StatsSection from "@/components/stats-section";

const faqs = [
  {
    question: "Who can apply to Everything High?",
    answer:
      "Everything High is open to aspiring models who want structured training, grooming, confidence development, and runway exposure.",
  },
  {
    question: "Do applicants need previous modelling experience?",
    answer:
      "No. Beginners are welcome. The academy is designed to help applicants develop confidence, presence, poise, and professional modelling skills.",
  },
  {
    question: "Will applicants submit photos and a catwalk video?",
    answer:
      "Yes. During registration, applicants will submit their photos and a short catwalk video as part of the application review process.",
  },
  {
    question: "Is registration paid?",
    answer:
      "Yes. Applicants will complete their registration payment during the application process before their submission is marked complete.",
  },
];

const stats = [
  { icon: "👠", number: "150+", text: "Models Trained" },
  { icon: "📸", number: "50+", text: "Portfolio Shoots" },
  { icon: "🎯", number: "30+", text: "Runway Events" },
  { icon: "🌍", number: "10+", text: "Industry Exposure Opportunities" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#120a06] text-white">
      <SiteNavbar />

      {/* Hero Section */}
     <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#2a170f_0%,#120a06_45%,#0b0503_100%)]">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(200,155,117,0.10),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.04),transparent_18%)]" />

  <div className="relative mx-auto grid h-[calc(100vh-80px)] max-w-7xl items-center gap-8 px-6 py-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
    {/* LEFT CONTENT */}
    <div className="-mt-8 max-w-2xl space-y-4 lg:-mt-12">
      <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-[#c89b75] md:text-xs">
        Everything High Modelling Academy
      </p>

      <div className="flex items-start gap-4">
        <div className="mt-2 hidden md:flex flex-col gap-2">
          <span className="h-14 w-[3px] rounded-full bg-[#8a5a3b]" />
          <span className="ml-3 h-9 w-[3px] rounded-full bg-[#c89b75]" />
        </div>

        <div>
          <h1 className="max-w-3xl text-[2.1rem] font-black uppercase leading-[0.9] tracking-[-0.05em] md:text-[2.9rem] lg:text-[3.7rem]">
            Elegance,
            <span className="block text-[#c89b75]">Confidence</span>
            <span className="block text-white">&amp; Presence</span>
          </h1>
        </div>
      </div>

      <p className="max-w-xl text-[0.96rem] leading-7 text-[#eadfd6] md:text-[1rem]">
        A premium modelling academy built to discover, refine, and showcase the
        next generation of confident runway talent.
      </p>

      <div className="flex flex-wrap gap-4 pt-1">
        <Link
          href="/registration"
          className="inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
        >
          Register Now
        </Link>

        <Link
          href="/about"
          className="inline-flex items-center justify-center rounded-full border border-[#6a432b] px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition duration-300 hover:border-[#c89b75] hover:bg-[#c89b75]/12 hover:text-[#f7ede4]"
        >
          Learn More
        </Link>
      </div>
    </div>

    {/* RIGHT CARD */}
    <div className="relative self-center">
      <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-[#8a5a3b]/20 blur-3xl md:block" />
      <div className="absolute -bottom-6 right-0 hidden h-32 w-32 rounded-full bg-[#c89b75]/10 blur-3xl md:block" />

      <div className="rounded-[2rem] border border-white/10 bg-[#1a0f0a]/90 p-4 shadow-2xl backdrop-blur-sm">
        <div className="relative overflow-hidden rounded-[1.6rem]">
          <Image
            src="/images/hero-2.jpg"
            alt="Everything High featured model"
            width={1000}
            height={1300}
            className="h-[360px] w-full object-cover object-top md:h-[430px] lg:h-[500px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>

        <div className="space-y-3 px-1 pb-1 pt-5">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#c89b75]">
            Luxury. Poise. Expression.
          </p>

          <h2 className="max-w-md text-[1.9rem] font-semibold leading-tight text-white">
            A premium platform for aspiring models.
          </h2>

          <p className="max-w-md text-sm leading-7 text-[#dfd2c8]">
            From registration to selection, Everything High is designed to
            spotlight talent with beauty, structure, and class.
          </p>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white text-[#1a0f0a]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10">
          <div className="relative">
            <div className="absolute -left-5 top-10 hidden h-28 w-28 rounded-full bg-[#c89b75]/20 blur-3xl md:block" />
            <div className="absolute -bottom-8 -right-4 hidden h-32 w-32 rounded-full bg-[#4b2e1f]/10 blur-3xl md:block" />

            <div className="relative overflow-hidden rounded-[2.4rem] bg-[#f8f5f2] p-3 shadow-xl">
              <div className="relative overflow-hidden rounded-[2rem]">
                <Image
                  src="/images/hero-1.jpg"
                  alt="About Everything High"
                  width={900}
                  height={1200}
                  className="h-[520px] w-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#b08968]">
              About Everything High
            </p>

            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              Where beauty meets discipline, and confidence becomes identity.
            </h2>

            <p className="leading-8 text-[#4a3a30]">
              Everything High is not just a modelling academy. It is a
              structured environment designed to refine elegance, develop
              presence, and build confident individuals ready for the runway and
              beyond.
            </p>

            <p className="leading-8 text-[#4a3a30]">
              From grooming to runway training, every step is intentional,
              shaping models who do not just walk, but truly stand out with
              poise, expression, and professionalism.
            </p>

            <Link
  href="/about"
  className="inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] !text-white transition duration-300 hover:bg-[#c89b75] hover:!text-white"
>
  Explore More
</Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 overflow-hidden">
  <div className="mx-auto max-w-7xl px-6 lg:px-10">
    
    {/* Title */}
    <div className="mb-10 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-[#8a5a3b]">
        Our Models
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-[#120a06]">
        Beauty in Motion
      </h2>
    </div>

    {/* Moving Gallery */}
    
    <div className="relative overflow-hidden">
  <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10" />
  <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10" />
      <div className="flex w-max animate-marquee gap-6">
        
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-6">
            {[
              "/images/model1.jpg",
              "/images/model2.jpg",
              "/images/model3.jpg",
              "/images/model4.jpg",
              "/images/model5.jpg",
              "/images/model6.jpg",
              "/images/model7.jpg",
              "/images/model8.jpg",
            ].map((src, index) => (
              <div
                key={index}
                className="h-[280px] w-[220px] flex-shrink-0 overflow-hidden rounded-[1.5rem] border border-[#8a5a3b]/40"
              >
                <Image
                  src={src}
                  alt="Model"
                  width={300}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        ))}

      </div>
    </div>

  </div>
</section>

      <StatsSection />
      {/* Why Join */}
      <section className="bg-[#120a06]">
  <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
    <div className="max-w-2xl space-y-4">
      <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#c89b75]">
        Why Join
      </p>
      <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
        A premium modelling experience built for serious growth.
      </h2>
    </div>

    <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {[
        {
          title: "Confidence Training",
          text: "Develop poise, self-awareness, and personal presence that shows before you even speak.",
        },
        {
          title: "Runway Development",
          text: "Refine your walk, movement, posture, and stage confidence with guided structure.",
        },
        {
          title: "Image & Grooming",
          text: "Learn how presentation, elegance, and style shape a memorable modelling identity.",
        },
        {
          title: "Exposure & Opportunity",
          text: "Position yourself for visibility, discovery, and professional growth through the academy process.",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="rounded-[1.8rem] border border-white/10 bg-[#1a0f0a] p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-[#c89b75]/50"
        >
          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-4 text-sm leading-7 text-[#dfd2c8]">{item.text}</p>
        </div>
      ))}
    </div>

    <div className="mt-12 flex justify-center">
      <Link
        href="/registration"
        className="inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-8 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
      >
        Register Now
      </Link>
    </div>
  </div>
</section>

      {/* Gallery Preview */}
      <section className="border-t border-[#eadfd6] bg-white">
  <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
    <div className="mx-auto max-w-3xl space-y-4 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#b08968]">
        Gallery Preview
      </p>
      <h2 className="text-3xl font-semibold leading-tight text-[#1a0f0a] md:text-4xl">
        A glimpse into beauty, confidence, and expression.
      </h2>
    </div>

    <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {[
        "/images/model1.jpg",
        "/images/model2.jpg",
        "/images/model3.jpg",
        "/images/model4.jpg",
        "/images/model5.jpg",
        "/images/model6.jpg",
        "/images/model7.jpg",
        "/images/model8.jpg",
      ].map((src, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[2rem] border border-[#eadfd6] bg-[#f8f5f2] p-3 shadow-sm"
        >
          <div className="relative overflow-hidden rounded-[1.5rem]">
            <Image
              src={src}
              alt={`Everything High gallery preview ${index + 1}`}
              width={900}
              height={1200}
              className="h-[320px] w-full object-cover object-top transition duration-500 hover:scale-[1.03]"
            />
          </div>
        </div>
      ))}
    </div>

    <div className="mt-12 flex justify-center">
      <Link
        href="/gallery"
        className="inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-8 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
      >
        View Gallery
      </Link>
    </div>
  </div>
</section>

      {/* FAQ */}
     <section className="bg-[#f8f5f2]">
  <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
    {/* Left Image */}
    <div className="relative">
      <div className="absolute -left-4 top-10 hidden h-24 w-24 rounded-full bg-[#c89b75]/15 blur-3xl md:block" />
      <div className="relative overflow-hidden rounded-[2.2rem] border border-[#eadfd6] bg-white p-3 shadow-sm">
        <div className="relative overflow-hidden rounded-[1.8rem]">
          <Image
            src="/images/model6.jpg"
            alt="Everything High model"
            width={900}
            height={1200}
            className="h-[520px] w-full object-cover object-top"
          />
        </div>
      </div>
    </div>

    {/* Right FAQ */}
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#b08968]">
          FAQ
        </p>

        <h2 className="text-3xl font-semibold leading-tight text-[#1a0f0a] md:text-4xl">
          Frequently Asked Questions
        </h2>

        <p className="max-w-2xl text-base leading-8 text-[#6b5a50]">
          Here are a few quick answers to help you understand the application
          process, expectations, and what to expect from Everything High.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded-[1.25rem] border border-[#eadfd6] bg-white p-5 transition duration-300 open:border-[#c89b75]"
          >
            <summary className="cursor-pointer list-none font-semibold text-[#1a0f0a]">
              <span className="flex items-center justify-between gap-4">
                {faq.question}
                <span className="text-[#b08968] transition group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>

            <p className="mt-4 text-sm leading-7 text-[#6b5a50]">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="bg-white">
  <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#4b2e1f] to-[#2a170f] p-8 md:p-12">
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c89b75]/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl space-y-5 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#e7c4a7]">
          Begin Your Journey
        </p>

        <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
          Step into a space where confidence is trained, refined, and seen.
        </h2>

        <p className="text-sm leading-7 text-[#f2e6dd] md:text-base">
          Start your application today and take your first step toward an
          elevated modelling experience with Everything High.
        </p>

        <p className="text-sm leading-7 text-[#e7d9cf]">
          Applications are now open for aspiring models ready to grow with confidence.
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
<section className="bg-white">
  <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
    <div className="mb-8 space-y-3 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#b08968]">
        Visit Us
      </p>

      <h2 className="text-3xl font-semibold leading-tight text-[#1a0f0a] md:text-4xl">
        Find Everything High
      </h2>

      <p className="mx-auto max-w-2xl text-base leading-8 text-[#6b5a50]">
        20 Monrovia Street, Wuse II, Abuja
      </p>
    </div>

    <div className="overflow-hidden rounded-[2rem] border border-[#eadfd6] bg-[#f8f5f2] p-3 shadow-sm">
      <div className="overflow-hidden rounded-[1.5rem]">
        <iframe
          title="Everything High Location Map"
          src="https://www.google.com/maps?q=20%20Monrovia%20Street,%20Wuse%202,%20Abuja&output=embed"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </div>
</section>
      <SiteFooter />
    </main>
  );
}