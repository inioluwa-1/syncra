"use client";

import React from "react";
import { Search, ArrowUpRight, Bell, ChevronDown } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-5 pb-3 px-6 md:px-8 w-full">
      {/* Search Input Bar */}
      <div className="relative flex-1 max-w-xl md:max-w-2xl">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full pl-11 pr-4 py-2.5 text-sm bg-white border border-gray-200/80 rounded-full text-[#0b0b0b] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003934]/20 focus:border-[#003934] transition shadow-sm"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center justify-end gap-5">
        {/* View Store Front */}
        <a
          href="/"
          className="flex items-center gap-1.5 text-sm font-semibold text-[#0b0b0b] hover:text-[#003934] transition"
        >
          <span>View Store Front</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
        </a>

        {/* Notification Bell */}
        <button
          className="relative p-2.5 rounded-full bg-white border border-gray-200/80 text-gray-700 hover:text-[#003934] hover:border-[#003934]/30 transition shadow-sm"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 stroke-[2]" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#e65c27] ring-2 ring-white" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 cursor-pointer pl-1 group">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 ring-1 ring-[#003934]/10 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=160&auto=format&fit=crop"
              alt="Veekee"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-bold text-[#0b0b0b] group-hover:text-[#003934] leading-tight transition">
              Veekee
            </span>
            <span className="text-[11px] text-gray-400 font-medium">Owner</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition" />
        </div>
      </div>
    </header>
  );
}
