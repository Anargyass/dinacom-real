import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#F5EFE7] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-24 h-1 bg-[#D4C4B0] rounded-full opacity-50"></div>
      <div className="absolute top-32 left-16 w-16 h-1 bg-[#D4C4B0] rounded-full opacity-50"></div>
      <div className="absolute top-48 left-8 w-20 h-1 bg-[#D4C4B0] rounded-full opacity-50"></div>
      
      <div className="absolute top-16 right-10 w-28 h-1 bg-[#D4C4B0] rounded-full opacity-50"></div>
      <div className="absolute top-24 right-16 w-20 h-1 bg-[#D4C4B0] rounded-full opacity-50"></div>
      
      <div className="absolute bottom-32 left-12 w-24 h-1 bg-[#D4C4B0] rounded-full opacity-50"></div>
      <div className="absolute bottom-48 right-14 w-32 h-1 bg-[#D4C4B0] rounded-full opacity-50"></div>
      <div className="absolute bottom-40 right-10 w-20 h-1 bg-[#D4C4B0] rounded-full opacity-50"></div>

      {/* Main Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl">
          {/* Logo/Mascot Image */}
          <div className="flex justify-center mb-8 relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image 
                src="/images/logo depan.png"
                alt="Preder Owl Mascot"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

        

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link 
              href="/start"
              className="px-16 py-4 bg-[#4D96FF] text-white text-xl font-semibold rounded-lg hover:bg-[#3B82F6] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              MULAI
            </Link>
          </div>

          {/* Optional Subtitle */}
          <p className="mt-8 text-gray-600 text-lg">
            Platform pembelajaran interaktif untuk penyandang disleksia
          </p>
        </div>
      </div>
    </div>
  );
}
