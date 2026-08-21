"use client";

import React from "react";

interface ProductItem {
  id: string;
  name: string;
  salesCount: string;
  amount: string;
  image: string;
}

const topProducts: ProductItem[] = [
  {
    id: "1",
    name: "Linen Wrap Dress",
    salesCount: "124 sold",
    amount: "₦1,245,000",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Co-ord Set",
    salesCount: "96 sold",
    amount: "₦985,000",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Oversized Shirt",
    salesCount: "68 sold",
    amount: "₦650,000",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
];

export default function TopSellingProducts() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/[0.03] flex flex-col justify-between">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-[#003934] mb-4">
          Top Selling Products
        </h3>

        {/* Product rows */}
        <div className="flex flex-col gap-4">
          {topProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between gap-3 group cursor-pointer hover:bg-gray-50/70 p-2 -mx-2 rounded-2xl transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[#0b0b0b] truncate group-hover:text-[#003934] transition">
                    {product.name}
                  </h4>
                  <span className="text-xs text-gray-500 font-medium">
                    {product.salesCount}
                  </span>
                </div>
              </div>

              <span className="text-sm font-bold text-[#003934] shrink-0 text-right">
                {product.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* View All Products Button */}
      <button className="w-full mt-6 py-3.5 px-4 bg-[#003934] hover:bg-[#002b27] active:scale-[0.99] text-white font-semibold text-sm rounded-2xl shadow-sm transition-all duration-200 cursor-pointer">
        View all products
      </button>
    </div>
  );
}
