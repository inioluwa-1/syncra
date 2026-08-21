"use client";

import React from "react";
import { FileText, TrendingUp, Clock, Truck } from "lucide-react";

export default function StatCards() {
  const cards = [
    {
      id: "orders",
      label: "Total Orders",
      value: "128",
      badge: "+18%",
      badgeType: "positive",
      footer: (
        <div className="flex items-center gap-1.5 text-xs text-[#007a5e] font-medium">
          <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>higher than last month</span>
        </div>
      ),
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#e2f7ef] flex items-center justify-center text-[#007a5e]">
          <FileText className="w-5 h-5 stroke-[2]" />
        </div>
      ),
    },
    {
      id: "revenue",
      label: "Revenue (This Month)",
      value: "₦3,245,000",
      badge: "+24%",
      badgeType: "positive",
      footer: (
        <div className="flex items-center gap-1.5 text-xs text-[#007a5e] font-medium">
          <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>higher than last month</span>
        </div>
      ),
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#ffede2] flex items-center justify-center text-[#e65c27]">
          {/* Naira / Revenue currency icon */}
          <span className="font-bold text-lg leading-none">₦</span>
        </div>
      ),
    },
    {
      id: "pending",
      label: "Pending Payments",
      value: "18",
      footer: (
        <div className="text-xs text-gray-500 font-normal">
          ₦540,000 awaiting
        </div>
      ),
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#ffeded] flex items-center justify-center text-[#e65c27]">
          <Clock className="w-5 h-5 stroke-[2]" />
        </div>
      ),
    },
    {
      id: "delivered",
      label: "Delivered Orders",
      value: "89",
      footer: (
        <div className="text-xs text-gray-500 font-normal">Completed</div>
      ),
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#e2f7ef] flex items-center justify-center text-[#007a5e]">
          <Truck className="w-5 h-5 stroke-[2]" />
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-black/[0.03] flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
        >
          {/* Top row with Icon and Optional Badge */}
          <div className="flex items-start justify-between">
            {card.icon}
            {card.badge && (
              <span className="text-[11px] font-semibold text-gray-600 bg-gray-50 border border-gray-200/80 px-2 py-0.5 rounded-full">
                {card.badge}
              </span>
            )}
          </div>

          {/* Metric Details */}
          <div className="mt-4 mb-3">
            <span className="text-xs font-medium text-gray-500 block">
              {card.label}
            </span>
            <span className="text-2xl md:text-[26px] font-bold text-[#0b0b0b] tracking-tight block mt-1">
              {card.value}
            </span>
          </div>

          {/* Footer note / trend */}
          <div className="pt-1 border-t border-transparent">{card.footer}</div>
        </div>
      ))}
    </div>
  );
}
