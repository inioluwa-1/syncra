"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import StatCards from "@/components/StatCards";
import RecentOrders from "@/components/RecentOrders";
import SalesOverviewChart from "@/components/SalesOverviewChart";
import TopSellingProducts from "@/components/TopSellingProducts";
import PromoBanner from "@/components/PromoBanner";
import { Menu, X } from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#fffef0] text-[#0b0b0b]">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:flex h-full shrink-0">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative flex flex-col z-50 max-w-xs w-full shadow-2xl animate-in slide-in-from-left duration-300">
            <Sidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onCloseMobile={() => setMobileSidebarOpen(false)}
              className="h-full"
            />
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-xl bg-white/10"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#fffef0]">
        {/* Mobile Header Toggle */}
        <div className="lg:hidden flex items-center justify-between px-6 pt-4 pb-2">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-xl text-[#003934] bg-white border border-gray-200/80 shadow-sm hover:bg-[#003934]/10 transition"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold text-[#003934] text-lg">Syncra</span>
          <div className="w-9" /> {/* Spacer */}
        </div>

        {/* Top Navbar */}
        <Header onMenuClick={() => setMobileSidebarOpen(true)} />

        {/* Dashboard Main Body */}
        <main className="flex-1 px-6 md:px-8 pb-10 flex flex-col gap-6 md:gap-7 w-full">
          {/* Welcome Greeting Banner */}
          <section className="pt-1">
            <h1 className="text-2xl sm:text-3xl md:text-[30px] font-extrabold text-[#0b0b0b] tracking-tight flex items-center gap-2">
              Good morning, Veekee
              <span className="inline-block animate-bounce text-2xl md:text-3xl">
                👋
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1">
              Here&apos;s what&apos;s happening with your business today.
            </p>
          </section>

          {/* 4 Stat Cards */}
          <section>
            <StatCards />
          </section>

          {/* 2-Column Main Section Grid */}
          <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Left Column (Recent Orders + Promo Banner) */}
            <div className="xl:col-span-7 flex flex-col gap-6">
              <RecentOrders />
              <PromoBanner />
            </div>

            {/* Right Column (Sales Overview + Top Selling Products) */}
            <div className="xl:col-span-5 flex flex-col gap-6">
              <SalesOverviewChart />
              <TopSellingProducts />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
