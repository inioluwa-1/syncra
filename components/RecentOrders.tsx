"use client";

import React from "react";

interface OrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  productDescription: string;
  timestamp: string;
  status: string;
  statusColor: string;
  amount: string;
  image: string;
}

const orders: OrderItem[] = [
  {
    id: "1",
    orderNumber: "#UT-2841",
    customerName: "Amina Yusuf",
    productDescription: "Linen Wrap Dress - Olive Green / Size 12",
    timestamp: "Today, 10:32 AM",
    status: "Pending Payment",
    statusColor: "text-[#e65c27]",
    amount: "₦30,000",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "2",
    orderNumber: "#UT-2840",
    customerName: "Deborah E.",
    productDescription: "Linen Wrap Dress - Black / Size 10",
    timestamp: "Today, 10:15 AM",
    status: "Payment Received",
    statusColor: "text-[#007a5e]",
    amount: "₦28,500",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "3",
    orderNumber: "#UT-2839",
    customerName: "Chisom Okafor",
    productDescription: "Oversized Shirt - White / Size L",
    timestamp: "Yesterday, 6:20 PM",
    status: "Processing",
    statusColor: "text-gray-700",
    amount: "₦22,000",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "4",
    orderNumber: "#UT-2838",
    customerName: "Tolu Adebayo",
    productDescription: "Co-ord Set - Sand / Size M",
    timestamp: "Yesterday, 11:01 AM",
    status: "Shipped",
    statusColor: "text-[#4f46e5]",
    amount: "₦35,000",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "5",
    orderNumber: "#UT-2837",
    customerName: "Mary Johnson",
    productDescription: "Linen Wrap Dress - Olive Green / Size 14",
    timestamp: "May 17, 9:30 AM",
    status: "Delivered",
    statusColor: "text-[#007a5e]",
    amount: "₦30,000",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
];

export default function RecentOrders() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/[0.03]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <h3 className="text-base font-bold text-[#0b0b0b]">Recent Orders</h3>
        <button className="text-xs font-semibold text-gray-500 hover:text-[#003934] transition">
          View all
        </button>
      </div>

      {/* Orders List */}
      <div className="flex flex-col divide-y divide-gray-100/80">
        {orders.map((order) => (
          <div
            key={order.id}
            className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-gray-50/50 rounded-2xl px-2 -mx-2 transition"
          >
            {/* Left: Order ID & Product + Customer info */}
            <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
              <span className="text-xs font-medium text-gray-500 shrink-0 w-16">
                {order.orderNumber}
              </span>

              {/* Product Thumbnail */}
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                <img
                  src={order.image}
                  alt={order.customerName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Customer & Product details */}
              <div className="min-w-0 flex-1">
                <h4 className="text-[13.5px] font-bold text-[#0b0b0b] truncate">
                  {order.customerName}
                </h4>
                <p className="text-xs text-gray-500 truncate">
                  {order.productDescription}
                </p>
                <span className="text-[11px] text-gray-400 block mt-0.5">
                  {order.timestamp}
                </span>
              </div>
            </div>

            {/* Right: Status & Price Amount */}
            <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pl-16 md:pl-0">
              <span
                className={`text-xs font-semibold ${order.statusColor}`}
              >
                {order.status}
              </span>
              <span className="text-sm font-bold text-[#0b0b0b] w-20 text-right">
                {order.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
