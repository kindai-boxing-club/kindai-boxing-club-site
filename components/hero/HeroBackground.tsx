/**
 * ヒーローセクションの背景コンポーネント
 */
import Image from "next/image";

export default function HeroBackground() {
  return (
    <>
      {/* Noise Overlay */}
      <div
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.1] mix-blend-overlay"
        style={{
          backgroundImage: 'url("/images/noise.svg")',
        }}
      />

      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/images/bg_hero.png"
          alt="Boxing Club Background"
          fill
          className="object-cover object-center opacity-60"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-transparent via-black/20 to-black/90" />
      </div>

      {/* Red Blur Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-red-600/20 rounded-full blur-[120px] animate-pulse z-0 pointer-events-none" />
    </>
  );
}
