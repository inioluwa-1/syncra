"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface BarData {
  label: string;
  heightPercent: number;
  amount: string;
}

const chartData: BarData[] = [
  { label: "May 1", heightPercent: 38, amount: "₦1,850,000" },
  { label: "May 8", heightPercent: 64, amount: "₦2,920,000" },
  { label: "May 15", heightPercent: 32, amount: "₦1,450,000" },
  { label: "May 22", heightPercent: 82, amount: "₦3,800,000" },
  { label: "May 31", heightPercent: 92, amount: "₦4,245,000" },
];

export default function SalesOverviewChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/[0.03] flex flex-col justify-between">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#003934]">Sales Overview</h3>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 border border-gray-200/70 rounded-xl text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition">
          <span>This Month</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </div>
      </div>

      {/* Metric summary */}
      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-2xl font-extrabold text-[#003934] tracking-tight">
          ₦3,245,000
        </span>
        <span className="text-xs font-semibold text-[#007a5e]">
          +24% <span className="text-gray-400 font-normal">vs last month</span>
        </span>
      </div>

      {/* Bar Chart Container */}
      <div className="mt-6 pt-4 flex gap-4">
        {/* Y-Axis Labels */}
        <div className="flex flex-col justify-between text-[11px] text-gray-400 font-medium py-1 text-left shrink-0 h-40">
          <span>Above 10M</span>
          <span>N4M</span>
          <span>N3M</span>
          <span>N2M</span>
          <span>N0</span>
        </div>

        {/* Chart Bars */}
        <div className="flex-1 flex items-end justify-around gap-2 h-40 pb-0 border-b border-transparent relative">
          {chartData.map((item, idx) => (
            <div
              key={item.label}
              className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip on hover */}
              {hoveredIndex === idx && (
                <div className="absolute -top-9 bg-[#003934] text-white text-[10px] font-semibold px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-20 transition-opacity animate-in fade-in zoom-in-95">
                  {item.amount}
                </div>
              )}

              {/* Bar */}
              <div
                style={{ height: `${item.heightPercent}%` }}
                className="w-full max-w-[28px] bg-[#003934] rounded-t-sm group-hover:bg-[#00554e] transition-all duration-300 shadow-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* X-Axis Labels */}
      <div className="flex justify-between pl-16 pr-2 pt-2 text-[11px] text-gray-400 font-medium">
        {chartData.map((item) => (
          <span key={item.label} className="text-center">
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
