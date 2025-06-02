import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  reactStrictMode: true,
  swcMinify: true,
  // Habilitar la exportación estática si es compatible con tu proyecto
  output: "export",
  // Configuración específica para Cloudflare
  images: {
    // Si usas Next.js Image, necesitarás configurar un loader personalizado o usar unoptimized
    unoptimized: true,
  },
  // Asegurarse de que los assets se sirvan correctamente desde la raíz
  assetPrefix: process.env.NODE_ENV === "production" ? undefined : undefined,
};

export default nextConfig;
