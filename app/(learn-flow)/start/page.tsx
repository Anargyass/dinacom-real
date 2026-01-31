import Image from 'next/image';
import Link from 'next/link';

export default function StartPage() {
  return (
    <div className="relative min-h-screen bg-[#F5EFE7] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-24 h-1 bg-[#D4C4B0] rounded-full opacity-50"></div>
      <div className="absolute top-32 left-16 w-16 h-1 bg-[#D4C4B0] rounded-full opacity-50"></div>
      
      <div className="absolute top-16 right-10 w-28 h-1 bg-[#D4C4B0] rounded-full opacity-50"></div>
      <div className="absolute top-24 right-16 w-20 h-1 bg-[#D4C4B0] rounded-full opacity-50"></div>
      
      <div className="absolute bottom-32 left-12 w-24 h-1 bg-[#D4C4B0] rounded-full opacity-50"></div>
      <div className="absolute bottom-48 right-14 w-32 h-1 bg-[#D4C4B0] rounded-full opacity-50"></div>
      <div className="absolute bottom-40 right-10 w-20 h-1 bg-[#D4C4B0] rounded-full opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-1 pb-12 mr-1">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#257562] mb-16 text-center">
          Dari Mana Kamu Ingin Memulai?
        </h1>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Belajar dari Awal */}
          <Link href="/learn" className="group">
            <div className="bg-linear-to-br from-blue-200 to-blue-300 rounded-3xl p-12 h-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 border-4 border-blue-300 min-h-96">
              <div className="relative w-56 h-56 mb-8">
                <Image 
                  src="/images/belajar-dari-awal.png"
                  alt="Belajar dari Awal"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold text-[#257562] text-center">
                Belajar dari Awal
              </h2>
            </div>
          </Link>

          {/* Card 2: Siap Test */}
          <Link href="/tes" className="group">
            <div className="bg-linear-to-br from-yellow-200 to-yellow-300 rounded-3xl p-12 h-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 border-4 border-yellow-300 min-h-96">
              <div className="relative w-56 h-56 mb-8">
                <Image 
                  src="/images/siap-tes.png"
                  alt="Siap Test"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold text-[#C86432] text-center">
                Siap Test!
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
