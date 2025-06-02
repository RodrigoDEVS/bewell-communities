"use client";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="p-4">
      <Image
        src="/logo.png"
        alt="BE WELL Logo"
        width={120}
        height={40}
        className="w-auto h-auto"
      />
    </div>
  );
}
