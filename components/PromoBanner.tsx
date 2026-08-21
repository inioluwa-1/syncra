"use client";

import React from "react";

export default function PromoBanner() {
  return (
    <div className="bg-[#003934] text-white rounded-3xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
      {/* Left side: Stylized Illustration & Graphic */}
      <div className="flex items-center gap-5 shrink-0">
        <div className="relative w-36 h-20 bg-white/10 rounded-2xl border border-white/15 p-2 flex items-center justify-center overflow-hidden">
          {/* Subtle green ambient light */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#5ce5b4]/20 rounded-full blur-xl pointer-events-none" />

          {/* Stylized vector illustration of characters */}
          <svg
            viewBox="0 0 140 80"
            fill="none"
            className="w-full h-full text-white"
          >
            {/* Speech bubbles & swirls */}
            <rect
              x="82"
              y="10"
              width="45"
              height="24"
              rx="8"
              fill="#5ce5b4"
              fillOpacity="0.85"
            />
            <path
              d="M92 22 C 95 18, 105 18, 110 22 C 115 26, 120 22, 123 20"
              stroke="#003934"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Left Character with curly hair */}
            <circle cx="36" cy="32" r="16" fill="#fffef0" />
            <path
              d="M20 24 C 18 10, 52 8, 52 24 C 55 18, 48 35, 42 36"
              fill="#0b0b0b"
            />
            {/* Face details */}
            <circle cx="33" cy="30" r="1.5" fill="#0b0b0b" />
            <circle cx="41" cy="30" r="1.5" fill="#0b0b0b" />
            <path
              d="M34 36 Q 37 39 40 36"
              stroke="#0b0b0b"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Right Character */}
            <circle cx="95" cy="52" r="16" fill="#fffef0" />
            <path
              d="M80 44 C 80 30, 110 28, 110 44 C 112 38, 108 55, 102 56"
              fill="#0b0b0b"
            />
            {/* Face details */}
            <circle cx="92" cy="50" r="1.5" fill="#0b0b0b" />
            <circle cx="100" cy="50" r="1.5" fill="#0b0b0b" />
            <path
              d="M93 56 Q 96 59 99 56"
              stroke="#0b0b0b"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Laptop / Desk outline */}
            <rect
              x="16"
              y="58"
              width="60"
              height="20"
              rx="4"
              fill="#ffffff"
              fillOpacity="0.15"
              stroke="#ffffff"
              strokeWidth="1"
            />
            <path
              d="M24 66 C 30 63, 40 70, 50 64"
              stroke="#fffef0"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Text Content */}
        <div className="flex flex-col">
          <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-snug">
            You Sell. Syncra Organizes
          </h3>
          <p className="text-sm text-white/80 mt-1 max-w-lg">
            We bring clarity to every order, so you can focus on &ldquo;Growth&rdquo;
          </p>
        </div>
      </div>

      {/* Right Action Button */}
      <button className="whitespace-nowrap px-6 py-3 bg-white hover:bg-[#fffef0] text-[#003934] font-bold text-sm rounded-xl shadow-md transition-transform duration-150 active:scale-95 shrink-0 cursor-pointer">
        how Syncra Helps
      </button>
    </div>
  );
}
