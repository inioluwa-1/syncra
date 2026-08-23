"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, MoreHorizontal, Loader2 } from "lucide-react";
import productsData from "@/data/products.json";

function WhatsAppPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId") || "1";
  const selectedSize = searchParams.get("size") || "Size M";
  const selectedColor = searchParams.get("color") || "Black Striped Green";
  const customerName = searchParams.get("name") || "Customer";
  const customerEmail = searchParams.get("email") || "";
  const customerPhone = searchParams.get("phone") || "";
  const customerAddress = searchParams.get("address") || "";
  const additionalInfo = searchParams.get("info") || "";

  const product =
    productsData.find((p) => p.id === productId) || productsData[0];

  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleContinueToWhatsApp = () => {
    setIsRedirecting(true);

    // Format pre-filled WhatsApp message based on the user's requested template
    const storeNumber = "2348166080757";
    const storeName = product.storeName || "Veekee House";
    
    let message = `Hi ${storeName} 👋\nI'm interested in this item from your instagram\n\nProduct: ${product.title}\nColor: ${selectedColor}\nSize: ${selectedSize}\nPrice: ${product.price}\n\nMy details:\nName: ${customerName}\nEmail Address: ${customerEmail}\nPhone: ${customerPhone}`;
    
    if (customerAddress) {
      message += `\nAddress: ${customerAddress}`;
    }
    if (additionalInfo) {
      message += `\nNote: ${additionalInfo}`;
    }
    
    message += `\n\nKindly confirm availability and payment details.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${storeNumber}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsRedirecting(false);
    }, 700);
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

      {/* Outer Container */}
      <div className="w-full max-w-md min-h-screen flex flex-col justify-between px-5 pt-20 pb-5">
        <div>
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="p-1 -ml-1 mb-2 rounded-full hover:bg-black/5 active:scale-95 transition text-[#0b0b0b] block"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[1.5]" />
          </button>

          {/* Hero Graphic */}
          <div className="flex justify-center mt-2 mb-6">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/de3ryzm92/image/upload/v1787430731/handshake_lyvnjz.png"
                alt="Handshake"
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>
          </div>

          {/* Heading Section */}
          <div className="text-center mb-8 px-2">
            <h1 className="text-[26px] font-extrabold text-[#0b0b0b] tracking-tight">
              Great choice!
            </h1>
            <p className="text-[15px] font-medium text-[#0b0b0b] mt-1.5">
              You&apos;re all set to pay on WhatsApp.
            </p>
            <p className="text-[13px] text-[#7A7A7A] mt-1 leading-relaxed">
              Your details will be prefilled for a seamless checkout.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-[24px] p-6 py-7 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50 flex flex-col gap-6">
            {/* Product Name & Variant */}
            <div>
              <span className="text-[11px] font-bold tracking-[0.08em] text-[#9CA3AF] uppercase block">
                PRODUCT
              </span>
              <h3 className="text-[15.5px] font-bold text-[#0b0b0b] mt-1.5 leading-snug">
                {product.title}
              </h3>
              <p className="text-[13.5px] text-[#6B7280] mt-1 font-medium">
                {selectedColor} · · {selectedSize}
              </p>
            </div>

            {/* Price */}
            <div>
              <span className="text-[11px] font-bold tracking-[0.08em] text-[#9CA3AF] uppercase block">
                PRICE
              </span>
              <span className="text-[17px] font-extrabold text-[#0b0b0b] block mt-1.5">
                {product.price}
              </span>
            </div>

            {/* Store */}
            <div>
              <span className="text-[11px] font-bold tracking-[0.08em] text-[#9CA3AF] uppercase block">
                STORE
              </span>
              <span className="text-[14.5px] font-semibold text-[#0b0b0b] block mt-1.5">
                {product.storeName || "Veekee Fashion House"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom CTA Area */}
        <div className="pt-8 pb-3">
          {/* Continue to WhatsApp Button */}
          <button
            onClick={handleContinueToWhatsApp}
            disabled={isRedirecting}
            className="w-full py-[17px] px-6 bg-[#003934] hover:bg-[#002824] active:scale-[0.98] text-white font-bold text-[15.5px] rounded-2xl shadow-[0_8px_20px_-6px_rgba(0,57,52,0.4)] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-80"
          >
            {isRedirecting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Opening WhatsApp...</span>
              </>
            ) : (
              <>
                <span>Continue to WhatsApp</span>
                {/* WhatsApp Chat Bubble Icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-[22px] h-[22px] text-white"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.3C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.05 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.56 14.37C16.31 14.24 15.1 13.65 14.88 13.56C14.65 13.48 14.49 13.44 14.32 13.69C14.16 13.94 13.69 14.49 13.55 14.66C13.41 14.82 13.26 14.85 13.01 14.72C12.77 14.6 11.98 14.34 11.05 13.51C10.32 12.86 9.83 12.06 9.69 11.81C9.55 11.56 9.67 11.43 9.8 11.31C9.91 11.2 10.05 11.02 10.17 10.88C10.29 10.74 10.34 10.63 10.42 10.47C10.5 10.3 10.46 10.16 10.4 10.04C10.34 9.91 9.85 8.71 9.64 8.22C9.44 7.74 9.24 7.8 9.09 7.79C8.94 7.79 8.78 7.79 8.62 7.79C8.45 7.79 8.18 7.85 7.96 8.09C7.73 8.34 7.1 8.93 7.1 10.13C7.1 11.33 7.98 12.49 8.1 12.65C8.22 12.82 9.81 15.27 12.26 16.32C12.84 16.57 13.29 16.72 13.65 16.83C14.24 17.02 14.77 16.99 15.2 16.93C15.67 16.86 16.66 16.33 16.87 15.75C17.07 15.17 17.07 14.68 17.01 14.57C16.95 14.47 16.8 14.41 16.56 14.37Z" />
                </svg>
              </>
            )}
          </button>

          {/* Subtext info */}
          <p className="text-[12px] text-[#9CA3AF] text-center mt-3 max-w-[260px] mx-auto leading-normal font-medium">
            You&apos;ll be redirected to the store&apos;s WhatsApp to complete your
            payment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WhatsAppPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fffef0] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#003934]" />
        </div>
      }
    >
      <WhatsAppPaymentContent />
    </Suspense>
  );
}
