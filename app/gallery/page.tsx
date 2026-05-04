"use client";

import { useState } from "react";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const images = [
    "/images/1.jpeg",
    "/images/10.jpeg",
    "/images/hero-1.jpg",
    "/images/models2.jpg",
    "/images/2.jpeg",
    "/images/17.jpg",
    
  ];

  return (
    <main className="min-h-screen bg-[#120a06] text-white">
      <SiteNavbar />

      {/* HERO */}
      <section className="relative h-[65vh] flex items-center justify-center text-center">
        <img
  src="/images/12.jpeg"
  className="absolute inset-0 w-full h-full object-cover object-[center_40%] md:object-[center_24%]"
/>
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 px-4">
          <h1 className="font-serif text-[2.6rem] md:text-[4rem]">
            Our Models. Our Standard.
          </h1>
          <p className="mt-3 text-sm md:text-base opacity-90">
            A glimpse into confidence, discipline, and presence.
          </p>
        </div>
      </section>

      {/* ========================= */}
      {/* SECTION 1 (VIDEO CENTER) */}
      {/* ========================= */}
      <section className="bg-[#f8f5f2] py-14 text-black">

        <div className="w-full px-4 lg:px-10">

          <div className="grid lg:grid-cols-12 gap-5 items-center">

            {/* LEFT */}
            <div className="hidden lg:flex col-span-3 flex-col gap-5">
              {images.slice(0, 2).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setLightbox(img)}
                  className="h-[180px] w-full object-cover rounded-xl cursor-pointer"
                />
              ))}
            </div>

            {/* VIDEO */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[1.5rem] overflow-hidden bg-black">

                {/* blurred bg */}
                <video
                  src="/videos/Action.mp4"
                  autoPlay
                  muted
                  loop
                  className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40"
                />

                {/* main */}
                <video
                  src="/videos/Action.mp4"
                  autoPlay
                  muted
                  loop
                  className="relative w-full h-[420px] object-contain"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="hidden lg:flex col-span-3 flex-col gap-5">
              {images.slice(2, 4).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setLightbox(img)}
                  className="h-[180px] w-full object-cover rounded-xl cursor-pointer"
                />
              ))}
            </div>

          </div>

          {/* MOBILE */}
          <div className="lg:hidden mt-5 grid grid-cols-2 gap-3">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setLightbox(img)}
                className="h-[130px] w-full object-cover rounded-lg"
              />
            ))}
          </div>

        </div>
      </section>

      {/* ========================= */}
      {/* SECTION 2 (VOGUE STYLE) */}
      {/* ========================= */}
      <section className="bg-white text-[#1a0f0a] py-10">

        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-14 lg:grid-cols-2">

          {/* LEFT */}
<div className="relative flex items-center justify-center">

  {/* CENTER VIDEO */}
  <div className="relative z-10 w-[260px] h-[420px] bg-black rounded-[1.5rem]">

    <video
      src="/videos/Walk1.mp4"
      autoPlay
      muted
      loop
      className="w-full h-full object-contain rounded-[1.5rem]"
    />
  </div>

  {/* FLOATING IMAGES */}
  <img
    src="/images/8.jpeg"
    onClick={() => setLightbox("/images/8.jpeg")}
    className="absolute top-0 left-0 z-20 w-28 h-28 object-cover rounded-xl cursor-pointer"
  />

  <img
    src="/images/12.jpeg"
    onClick={() => setLightbox("/images/12.jpeg")}
    className="absolute bottom-0 right-0 z-20 w-32 h-32 object-cover rounded-xl cursor-pointer"
  />

</div> 

          {/* RIGHT TEXT */}
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="font-serif text-[2.2rem]">
              More than visuals.
              <span className="block italic text-[#b08968]">
                This is identity.
              </span>
            </h2>

            <p className="text-sm leading-7 text-[#6b5a50]">
              Every frame tells a story of growth, presence, and transformation.
              This is where confidence becomes visible.
            </p>
          </div>

        </div>

      </section>
   <section className="bg-[#f8f5f2] py-10 overflow-hidden">

  <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-20 md:grid-cols-2 lg:grid-cols-4">

    {/* ORBIT COLUMN */}
    <div className="col-span-1 md:col-span-1 lg:col-span-2 flex items-center justify-center">

      <div className="group relative w-[240px] h-[400px] md:w-[300px] md:h-[460px] overflow-visible">

        {/* ORBIT WRAPPER (IMPORTANT CONTROL LAYER) */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">

          {[
            "/images/8.jpeg",
            "/images/12.jpeg",
            "/images/23.jpg",
            "/images/10.jpeg",
            "/images/11.jpeg",
            "/images/9.jpeg",
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              onClick={() => setLightbox(src)}
              className="orbit-item absolute pointer-events-auto w-20 h-20 md:w-28 md:h-28 object-cover rounded-xl shadow-xl cursor-pointer transition"
              style={{
                animation: `orbit 16s linear infinite`,
                animationDelay: `${i * 2.5}s`,
              }}
            />
          ))}

        </div>

        {/* CENTER VIDEO */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="w-[200px] h-[340px] md:w-[250px] md:h-[400px] rounded-[1.6rem] overflow-hidden bg-black shadow-2xl">
            <video
              src="/videos/About zully.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        </div>

      </div>

    </div>

    {/* IMAGE GRID COLUMN */}
    <div className="col-span-1 md:col-span-1 lg:col-span-2 grid grid-cols-2 gap-3">

      {[
        "/images/21.jpg",
        "/images/12.jpeg",
        "/images/17.jpg",
        "/images/10.jpeg",
      ].map((src, i) => (
        <div
          key={i}
          onClick={() => setLightbox(src)}
          className="relative overflow-hidden rounded-[1.2rem] cursor-pointer group"
        >
          <img
            src={src}
            className="w-full h-[140px] md:h-[230px] object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
        </div>
      ))}

    </div>

  </div>

</section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
        >
          <img
            src={lightbox}
            className="max-h-[90vh] rounded-lg"
          />
        </div>
      )}

{lightbox && (
  <div
    onClick={() => setLightbox(null)}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-6"
  >
    <img
      src={lightbox}
      className="max-w-4xl w-full rounded-lg"
    />
  </div>
)}
      <SiteFooter />
    </main>
  );
}