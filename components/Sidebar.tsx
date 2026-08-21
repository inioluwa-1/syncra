"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  ShoppingBag,
  Package,
  Users,
  MessageSquareText,
  Banknote,
  BarChart3,
  Tag,
  SlidersHorizontal,
  Settings,
  Sparkles,
  RefreshCw,
  LucideIcon,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number | string;
  href?: string;
}

const mainNavItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "orders", label: "Orders", icon: ShoppingBag, badge: 24 },
  { id: "products", label: "Products", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
  { id: "conversations", label: "Conversations", icon: MessageSquareText },
  { id: "payments", label: "Payments", icon: Banknote },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "discounts", label: "Discounts", icon: Tag },
];

const secondaryNavItems: NavItem[] = [
  { id: "integrations", label: "Integrations", icon: SlidersHorizontal },
  { id: "settings", label: "Store Settings", icon: Settings },
];

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (id: string) => void;
  className?: string;
  onCloseMobile?: () => void;
}

export default function Sidebar({
  activeTab = "overview",
  onTabChange,
  className = "",
  onCloseMobile,
}: SidebarProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [auditScore, setAuditScore] = useState(75);

  const handleSelect = (id: string) => {
    setCurrentTab(id);
    if (onTabChange) {
      onTabChange(id);
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleRunAudit = () => {
    setIsRunningAudit(true);
    setTimeout(() => {
      setIsRunningAudit(false);
      setAuditScore((prev) => (prev === 75 ? 82 : 75));
    }, 1200);
  };

  return (
    <aside
      className={`w-64 bg-[#003934] text-[#fffef0] flex flex-col justify-between h-screen min-h-screen px-3.5 py-5 select-none shrink-0 border-r border-[#002f2b] transition-all duration-300 ${className}`}
    >
      {/* Top Header & Navigation */}
      <div className="flex flex-col gap-5">
        {/* Syncra Logo */}
        <div className="flex items-center gap-3 px-3">
          {/* Custom Asterisk Logo */}
          <div className="relative flex items-center justify-center w-8 h-8 text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-7 h-7 drop-shadow-sm"
            >
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white font-sans">
            Syncra
          </span>
        </div>

        {/* Store Profile Selector */}
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl transition hover:bg-white/5 cursor-pointer">
          <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#e68434]/80 p-0.5 bg-gradient-to-tr from-amber-400 to-rose-500 shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden bg-amber-100 flex items-center justify-center">
              {/* Boutique fashion photo placeholder */}
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=120&auto=format&fit=crop"
                alt="Veekee Fashion house"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <span className="text-[13.5px] font-semibold text-white/95 truncate">
            Veekee Fashion house.ng
          </span>
        </div>

        {/* Primary Navigation Items */}
        <nav className="flex flex-col gap-1 mt-1">
          {mainNavItems.map((item) => {
            const isActive = currentTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`group flex items-center justify-between px-4 py-3 rounded-2xl text-[14.5px] font-medium transition-all duration-200 cursor-pointer text-left w-full ${
                  isActive
                    ? "bg-[#fffef0] text-[#003934] shadow-sm font-semibold"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${
                      isActive ? "text-[#003934] stroke-[2.4]" : "text-white/80 stroke-[1.8]"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-[#e65c27] rounded-lg shadow-sm">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Divider */}
          <div className="my-2 border-t border-white/10 mx-2" />

          {/* Secondary Navigation Items */}
          {secondaryNavItems.map((item) => {
            const isActive = currentTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`group flex items-center justify-between px-4 py-3 rounded-2xl text-[14.5px] font-medium transition-all duration-200 cursor-pointer text-left w-full ${
                  isActive
                    ? "bg-[#fffef0] text-[#003934] shadow-sm font-semibold"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${
                      isActive ? "text-[#003934] stroke-[2.4]" : "text-white/80 stroke-[1.8]"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Friction Audit Card */}
      <div className="mt-6">
        <div className="bg-[#002d29]/90 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm shadow-lg flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-[14px] font-semibold text-white leading-tight">
                Friction Audit
              </h4>
              <p className="text-[11.5px] text-white/60 mt-1 leading-snug">
                See what's slowing <br /> your sales
              </p>
            </div>

            {/* Circular Gauge / Percentage Indicator */}
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <svg className="w-12 h-12 -rotate-90 transform" viewBox="0 0 36 36">
                {/* Background track */}
                <path
                  className="text-[#05443d]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Progress arc */}
                <path
                  className="text-[#5ce5b4] transition-all duration-700 ease-out"
                  strokeDasharray={`${auditScore}, 100`}
                  strokeDashoffset="0"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[11px] font-bold text-white tracking-tight">
                  {auditScore}%
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleRunAudit}
            disabled={isRunningAudit}
            className="w-full py-2 px-3 rounded-lg border border-white/15 bg-[#033c36] hover:bg-[#074b43] active:scale-[0.98] transition text-[12px] font-medium text-white/90 text-center flex items-center justify-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-75"
          >
            {isRunningAudit ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#5ce5b4]" />
                <span>Auditing...</span>
              </>
            ) : (
              <span>Run Audit Again</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
