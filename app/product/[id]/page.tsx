"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MoreHorizontal,
  Bookmark,
  Lock,
  Check,
  X,
  Share2,
  Sparkles,
} from "lucide-react";
import productsData from "@/data/products.json";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  // Find product by id or default to first product
  const product =
    productsData.find((p) => p.id === resolvedParams.id) || productsData[0];

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[2] || "M" : "M"
  );
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(1);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isProceeding, setIsProceeding] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const gallery = product.gallery || [product.image];
  const colors = product.colors || [
    { name: "White", hex: "#ffffff", border: true },
    { name: "Black", hex: "#0b0b0b" },
    { name: "Terracotta", hex: "#e66a2c" },
    { name: "Lavender", hex: "#b07af7" },
    { name: "Crimson", hex: "#b91c1c" },
  ];

  const handleProceed = () => {
    setIsProceeding(true);
    const colorName = colors[selectedColorIndex]?.name || product.color;
    router.push(
      `/checkout?productId=${product.id}&size=${selectedSize}&color=${encodeURIComponent(
        colorName
      )}`
    );
  };

  return (
    <div className="min-h-screen bg-[#fffef0] text-[#0b0b0b] font-sans flex flex-col items-center">
      {/* Fixed Top App Bar */}
      <header className="fixed top-0 inset-x-0 bg-[#fffef0]/95 backdrop-blur-sm z-50 border-b border-gray-100/50">
        <div className="w-full max-w-md mx-auto flex items-center justify-between px-5 py-3">
          {/* Syncra Logo */}
          <div className="flex items-center gap-1.5">
            <div className="text-[#003934] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
              </svg>
            </div>
            <span className="text-[17px] font-bold tracking-tight text-[#003934]">
              Syncra
            </span>
          </div>

          {/* Options Menu */}
          <button
            className="p-1 rounded-full hover:bg-black/5 active:scale-95 transition text-[#0b0b0b]"
            aria-label="More options"
          >
            <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
              <MoreHorizontal className="w-4 h-4 text-gray-700" />
            </div>
          </button>
        </div>
      </header>

      {/* Centered Mobile/Tablet Column Container */}
      <div className="w-full max-w-md min-h-screen flex flex-col justify-between px-5 pt-20 pb-5">
        <div>
          {/* Back Button */}
          <Link
            href="/"
            className="inline-block p-1 -ml-1 mb-2 rounded-full hover:bg-black/5 active:scale-95 transition text-[#0b0b0b]"
            aria-label="Back to store"
          >
            <ArrowLeft className="w-6 h-6 stroke-[1.5]" />
          </Link>

          {/* Product Image / Carousel */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/4.8] sm:aspect-[4/4.5] bg-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <img
              src={gallery[activeImageIndex] || product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-opacity duration-300"
            />

            {/* Pagination Dots */}
            {gallery.length > 1 && (
              <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-10">
                {gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeImageIndex === idx
                        ? "w-5 bg-[#003934]"
                        : "w-1.5 bg-black/25 hover:bg-black/40"
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Title & Bookmark */}
          <div className="mt-4 flex items-start justify-between gap-3">
            <h1 className="text-[26px] font-extrabold text-[#0b0b0b] tracking-tight leading-snug">
              {product.title}
            </h1>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-1.5 text-gray-800 hover:text-[#003934] transition active:scale-90"
              aria-label="Bookmark item"
            >
              <Bookmark
                className={`w-6 h-6 stroke-[1.5] ${
                  isBookmarked
                    ? "fill-[#003934] text-[#003934]"
                    : "text-gray-800"
                }`}
              />
            </button>
          </div>

          {/* Color & Store Badge Line */}
          <div className="mt-1 flex items-center justify-between gap-2 flex-wrap text-[13px]">
            <span className="text-gray-700 font-medium">
              <strong className="font-semibold text-gray-900">Color:</strong>{" "}
              {colors[selectedColorIndex]?.name || product.color} ·
            </span>

            <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition">
              <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-amber-500/60 p-0.5 bg-gradient-to-tr from-amber-400 to-rose-500 shrink-0">
                <img
                  src={
                    product.storeAvatar ||
                    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=120&auto=format&fit=crop"
                  }
                  alt={product.storeName || "Store"}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-[12px] font-semibold text-[#0b0b0b]">
                {product.storeName || "Veekee Fashion house.ng"}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-3 pb-3 border-b border-gray-100/80">
            <span className="text-[28px] font-bold text-[#0b0b0b] tracking-tight">
              {product.price}
            </span>
          </div>

          {/* Description */}
          <p className="mt-3 text-[14px] text-gray-600 leading-relaxed font-medium">
            {product.description ||
              "Elegant wrap dress made from breathable linen. Perfect for brunch, work or evening outings."}
          </p>

          {/* Select Size Section */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] font-bold text-[#0b0b0b]">
                Select Size
              </span>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="text-[13px] font-semibold text-[#007a5e] hover:underline cursor-pointer"
              >
                Size Guide
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {(product.sizes || ["XS", "S", "M", "L", "XL"]).map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3.5 rounded-xl text-[14px] font-semibold transition-all cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? "border-2 border-[#003934] bg-white text-[#003934] shadow-sm scale-105"
                        : "border border-gray-200/80 bg-white/70 text-gray-700 hover:border-gray-400 hover:bg-white"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Select Color Section */}
          <div className="mt-6 mb-6">
            <span className="text-[14px] font-bold text-[#0b0b0b] block mb-3">
              Select Color
            </span>

            <div className="grid grid-cols-5 gap-3">
              {colors.map((c, idx) => {
                const isSelected = selectedColorIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedColorIndex(idx)}
                    style={{ backgroundColor: c.hex }}
                    className={`h-[46px] rounded-xl transition-all duration-200 cursor-pointer relative shadow-sm ${
                      c.border || c.hex === "#ffffff"
                        ? "border border-gray-200"
                        : ""
                    } ${
                      isSelected
                        ? "ring-2 ring-offset-2 ring-offset-[#fffef0] ring-[#003934] scale-105"
                        : "hover:scale-102"
                    }`}
                    aria-label={c.name}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Sticky Action Area */}
        <div className="pt-2 pb-3">
          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            disabled={isProceeding}
            className="w-full py-[17px] px-6 bg-[#003934] hover:bg-[#002824] active:scale-[0.98] text-white font-bold text-[15.5px] rounded-2xl shadow-[0_8px_20px_-6px_rgba(0,57,52,0.4)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80"
          >
            {isProceeding ? (
              <span className="inline-block animate-pulse">Processing...</span>
            ) : (
              <span>Proceed</span>
            )}
          </button>

          {/* Security Subtext */}
          <div className="mt-3.5 flex items-center justify-center gap-2 text-[12px] text-gray-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-gray-600 stroke-[2]" />
            <span>Secure</span>
            <span>&bull;</span>
            <span>Private</span>
            <span>&bull;</span>
            <span>Instantly helpful</span>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSizeGuide(false)}
          />
          <div className="relative bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-[#003934]">Size Guide</h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="p-1 rounded-full text-gray-400 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-600">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-800 font-bold">
                    <th className="py-2">Size</th>
                    <th className="py-2">Bust (in)</th>
                    <th className="py-2">Waist (in)</th>
                    <th className="py-2">Hips (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 font-semibold">XS</td>
                    <td>32 - 33</td>
                    <td>24 - 25</td>
                    <td>34 - 35</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">S</td>
                    <td>34 - 35</td>
                    <td>26 - 27</td>
                    <td>36 - 37</td>
                  </tr>
                  <tr className="bg-[#003934]/5 font-semibold text-[#003934]">
                    <td className="py-2 font-bold">M</td>
                    <td>36 - 37</td>
                    <td>28 - 29</td>
                    <td>38 - 39</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">L</td>
                    <td>38 - 40</td>
                    <td>30 - 32</td>
                    <td>40 - 42</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">XL</td>
                    <td>41 - 43</td>
                    <td>33 - 35</td>
                    <td>43 - 45</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setShowSizeGuide(false)}
              className="w-full mt-5 py-2.5 bg-[#003934] text-white font-semibold text-xs rounded-xl"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
