"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MoreHorizontal,
  LayoutDashboard,
  X,
  ShoppingBag,
  Check,
  Search,
  Sparkles,
} from "lucide-react";
import productsData from "@/data/products.json";

export interface Product {
  id: string;
  title: string;
  color: string;
  size: string;
  price: string;
  numericPrice?: number;
  image: string;
  hasViewButton?: boolean;
  category?: string;
  description?: string;
  inStock?: boolean;
}

export default function StoreFrontPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cartCount, setCartCount] = useState(0);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Co-ords",
    "Tops",
    "Bottoms",
    "Dresses",
    "Outerwear",
  ];

  const filteredProducts = (productsData as Product[]).filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.color.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    setCartCount((prev) => prev + 1);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setSelectedProduct(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#fffef0] text-[#0b0b0b] font-sans flex flex-col items-center">
      {/* Fixed Top App Bar */}
      <header className="fixed top-0 inset-x-0 bg-[#fffef0]/95 backdrop-blur-sm z-50 border-b border-gray-100/50">
        <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex items-center justify-between px-5 py-3">
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

      {/* Outer Container */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl min-h-screen flex flex-col justify-between px-5 pt-20 pb-5">
        <div>

          {/* Heading Section */}
          <div className="mt-2 mb-5">
            <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#0b0b0b] tracking-tight leading-tight">
              All From Veekee Fashion House
            </h1>
            <p className="text-sm text-gray-600/80 font-normal mt-1">
              Curated picks from Veekee Fashion House
            </p>
          </div>

          {/* Category Filter Pills (Optional subtle selector) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-2 -mx-1 px-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#003934] text-white shadow-sm"
                    : "bg-white/80 border border-gray-200/70 text-gray-700 hover:bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid (2 Columns) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex flex-col group">
                {/* Product Card Image */}
                <Link
                  href={`/product/${product.id}`}
                  className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-gray-200 cursor-pointer shadow-sm group-hover:shadow-md transition-all duration-300 block"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.inStock === false && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 text-white text-[10px] rounded-md font-semibold">
                      Out of stock
                    </div>
                  )}
                </Link>

                {/* Product Info */}
                <Link
                  href={`/product/${product.id}`}
                  className="pt-2.5 pb-2 block cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-sm sm:text-[15px] font-bold text-[#0b0b0b] leading-tight truncate group-hover:text-[#003934] transition">
                      {product.title}
                    </h3>
                    <span className="text-[11px] sm:text-xs text-gray-500 whitespace-nowrap shrink-0">
                      {product.color} · {product.size}
                    </span>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-[#0b0b0b] block mt-1">
                    {product.price}
                  </span>
                </Link>

                {/* View Action Button */}
                {product.hasViewButton !== false && (
                  <Link
                    href={`/product/${product.id}`}
                    className="w-full py-2.5 px-4 bg-[#003934] hover:bg-[#002925] active:scale-[0.98] text-white font-medium text-sm rounded-xl transition shadow-sm cursor-pointer mt-0.5 text-center block"
                  >
                    View
                  </Link>
                )}
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center text-gray-500 text-sm">
              No products found in this category.
            </div>
          )}
        </div>

        {/* Bottom CTA Button */}
        <div className="sticky bottom-4 pt-6 pb-2 mt-6 bg-gradient-to-t from-[#fffef0] via-[#fffef0] to-transparent">
          <button
            onClick={() => {
              setSelectedCategory("All");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full py-[17px] px-6 bg-[#003934] hover:bg-[#002824] active:scale-[0.98] text-white font-bold text-[15.5px] rounded-2xl shadow-[0_8px_20px_-6px_rgba(0,57,52,0.4)] transition-all duration-200 text-center cursor-pointer"
          >
            View all from this store
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProduct(null)}
          />

          <div className="relative bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 text-gray-500 hover:text-black transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 mb-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-[#0b0b0b]">
                  {selectedProduct.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {selectedProduct.color} &bull; {selectedProduct.size}
                </p>
              </div>
              <span className="text-lg font-bold text-[#003934]">
                {selectedProduct.price}
              </span>
            </div>

            {selectedProduct.description && (
              <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                {selectedProduct.description}
              </p>
            )}

            <button
              onClick={() => handleAddToCart(selectedProduct)}
              disabled={addedSuccess}
              className="w-full mt-5 py-3 bg-[#003934] text-white font-semibold text-sm rounded-xl hover:bg-[#002a26] transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Added to Order</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order on Syncra</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
