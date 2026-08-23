"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, MoreHorizontal, Loader2 } from "lucide-react";
import productsData from "@/data/products.json";

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId") || "1";
  const selectedSize = searchParams.get("size") || "Size M";
  const selectedColor = searchParams.get("color") || "Black Striped Green";

  const product =
    productsData.find((p) => p.id === productId) || productsData[0];

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    deliveryAddress: "",
    additionalInfo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Payload sent to the automation webhook
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phoneNumber,
      address: formData.deliveryAddress,
      notes: formData.additionalInfo,
      product: product.title,
      size: selectedSize,
      color: selectedColor,
      source: "Instagram", // update this if you're tracking where they clicked from
    };

    console.log("Customer filled form (sending to webhook):", payload);

    // Send the order to n8n so it lands in the Sheet/CRM.
    // Wrapped in try/catch so a failed request never blocks the customer
    // from continuing to WhatsApp.
    try {
      await fetch("/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Webhook failed, continuing anyway:", error);
    }

    // Build URL params and navigate straight to the WhatsApp confirmation screen (/pay)
    const params = new URLSearchParams({
      productId: product.id,
      size: selectedSize,
      color: selectedColor,
      name: formData.name,
      email: formData.email,
      phone: formData.phoneNumber,
      address: formData.deliveryAddress,
      info: formData.additionalInfo,
    });

    router.push(`/pay?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#fffef0] text-[#0b0b0b] font-sans flex flex-col items-center">
      {/* Fixed Top App Bar */}
      <header className="fixed top-0 inset-x-0 bg-[#fffef0]/95 backdrop-blur-sm z-50 border-b border-gray-100/50">
        <div className="w-full max-w-md mx-auto flex items-center justify-between px-5 py-3">
          {/* Syncra Logo */}
          <Link href="/" className="flex items-center cursor-pointer">
            <img
              src="https://res.cloudinary.com/de3ryzm92/image/upload/v1787430731/logo_pzlaia.png"
              alt="Syncra Logo"
              className="h-8 md:h-9 w-auto object-contain"
            />
          </Link>

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

      <div className="w-full max-w-md min-h-screen flex flex-col justify-between px-5 pt-20 pb-5">
        <div>
          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="p-1 -ml-1 mb-2 rounded-full hover:bg-black/5 active:scale-95 transition text-[#0b0b0b] block"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[1.5]" />
          </button>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-[13px] font-semibold text-[#0b0b0b] pl-1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="w-full px-4 py-3.5 bg-white border border-gray-200/90 rounded-2xl text-[14px] text-[#0b0b0b] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003934]/20 focus:border-[#003934] transition shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[13px] font-semibold text-[#0b0b0b] pl-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email Address"
                className="w-full px-4 py-3.5 bg-white border border-gray-200/90 rounded-2xl text-[14px] text-[#0b0b0b] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003934]/20 focus:border-[#003934] transition shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="phoneNumber"
                className="text-[13px] font-semibold text-[#0b0b0b] pl-1"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter Your Phone Number"
                className="w-full px-4 py-3.5 bg-white border border-gray-200/90 rounded-2xl text-[14px] text-[#0b0b0b] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003934]/20 focus:border-[#003934] transition shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]"
              />
            </div>

            {/* Deliver Address */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="deliveryAddress"
                className="text-[13px] font-semibold text-[#0b0b0b] pl-1"
              >
                Deliver Address
              </label>
              <input
                id="deliveryAddress"
                name="deliveryAddress"
                type="text"
                required
                value={formData.deliveryAddress}
                onChange={handleChange}
                placeholder="Enter Your Delivery Address"
                className="w-full px-4 py-3.5 bg-white border border-gray-200/90 rounded-2xl text-[14px] text-[#0b0b0b] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003934]/20 focus:border-[#003934] transition shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]"
              />
            </div>

            {/* Additional Info */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="additionalInfo"
                className="text-[13px] font-semibold text-[#0b0b0b] pl-1"
              >
                Additional Info
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={4}
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Anything you will like the brand to know about your order?"
                className="w-full px-4 py-3.5 bg-white border border-gray-200/90 rounded-2xl text-[14px] text-[#0b0b0b] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003934]/20 focus:border-[#003934] transition shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] resize-none"
              />
            </div>

            {/* Note Card */}
            <div className="bg-white rounded-[20px] p-5 border border-gray-100/50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] mt-2">
              <span className="text-[11px] font-bold tracking-[0.08em] text-[#9CA3AF] uppercase block mb-2">
                NOTE
              </span>
              <p className="text-[13px] text-[#6B7280] font-medium leading-relaxed">
                This Info helps process your orders faster and helps the vendor
                attend to you swiftly without back and forth. Just Straight to
                order fulfilment.
              </p>
            </div>

            {/* Next / Submit Button */}
            <div className="pt-6 pb-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-[17px] px-6 bg-[#003934] hover:bg-[#002824] active:scale-[0.98] text-white font-bold text-[15.5px] rounded-2xl shadow-[0_8px_20px_-6px_rgba(0,57,52,0.4)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Taking you to WhatsApp...</span>
                  </>
                ) : (
                  <span>Next</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fffef0] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#003934]" />
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
