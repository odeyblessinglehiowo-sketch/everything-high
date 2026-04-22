"use client";

import { useState } from "react";

export default function CatwalkSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#120a06] text-white py-24">
      
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-100px] left-[-80px] h-[300px] w-[300px] rounded-full bg-[#c89b75]/10 blur-[120px]" />
        <div className="absolute bottom-[-100px] right-[-80px] h-[300px] w-[300px] rounded-full bg-[#4b2e1f]/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        
        {/* LABEL */}
        <p className="text-[10px] uppercase tracking-[0.45em] text-[#c89b75]">
          Beauty in Motion
        </p>

        {/* HEADING */}
        <h2 className="heading-font mt-4 text-[2.4rem] leading-[1.1] md:text-[3rem]">
          The walk. The presence.
          <span className="block italic text-[#c89b75]">
            The transformation.
          </span>
        </h2>

        {/* TEXT */}
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#d6c5b7] md:text-base">
          Experience the energy, discipline, and confidence that define
          Everything High. Every step tells a story. Every movement commands attention.
        </p>

        {/* VIDEO CARD */}
        <div
          onClick={() => setOpen(true)}
          className="group relative mx-auto mt-14 w-full max-w-3xl cursor-pointer"
        >
          
          {/* FRAME OFFSET */}
          <div className="absolute -top-5 -left-5 h-full w-full border border-[#c89b75]/40" />

          {/* VIDEO CONTAINER */}
          <div className="relative overflow-hidden rounded-[0.6rem] shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
            
            {/* VIDEO PREVIEW */}
            <video
              src="/videos/catwalk.mp4" // <-- replace with your real video
              muted
              loop
              autoPlay
              playsInline
              className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-[1.05]"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition duration-500" />

            {/* PLAY BUTTON */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md transition group-hover:scale-110">
                ▶
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-6"
        >
          <div className="relative w-full max-w-4xl">
            
            <video
              src="/videos/catwalk.mp4"
              controls
              autoPlay
              className="w-full rounded-lg"
            />

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-sm text-white/70 hover:text-white"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}